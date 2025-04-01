import dbConnect from '@/app/lib/mongo-connect';
import Session from '@/app/models/Session';
import Template from '@/app/models/Workout-Template';
import { NextResponse, NextRequest } from 'next/server';
import _ from 'lodash';
import { ObjectId } from 'bson';
import { session } from '@/app/_types/types';
import { createMissingObjIds, prepareTemplate } from '@/app/api/_shared';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    const date = params.get('date');
    if (!date) {
      return NextResponse.json(
        { error: "Missing 'date' parameter" },
        { status: 400 }
      );
    }
    const sessions = await Session.find({
      date: {
        $eq: date,
      },
    });
    return NextResponse.json(sessions);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    } else {
      console.error('An unknown error occurred:', err);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: session[] = await req.json();
    await dbConnect();

    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { message: 'Invalid content type. Expected application/json' },
        { status: 415 } // Unsupported Media Type
      );
    }

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { message: 'Request data should be a non-empty array' },
        { status: 400 }
      );
    }

    createMissingObjIds(data);

    // Determine template ID
    const templateId: string =
      _.first(data)?.templateId || new ObjectId().toString();

    // Validate template ID
    if (!ObjectId.isValid(templateId)) {
      return NextResponse.json(
        { message: 'Invalid template ID' },
        { status: 400 }
      );
    }

    // Find or create template
    let template;
    const existingTemplate = await Template.findOne({ _id: templateId });

    if (existingTemplate) {
      // Improved template creation with more robust input handling
      // Update template with session IDs
      await Template.findByIdAndUpdate(
        templateId,
        {
          sessions: data
            .filter((datum) => !datum.markForRemoval)
            .map((d) => d._id),
        },
        { new: true, runValidators: true }
      );
    } else {
      const templateData = prepareTemplate(
        templateId,
        'Untitled Template',
        'No description provided',
        data
      );
      template = await Template.create(templateData);
      template = existingTemplate;
    }

    // Find existing sessions to avoid duplicates
    const existingIds = new Set(
      (
        await Session.find({
          _id: { $in: data.map((datum) => datum._id) },
        }).distinct('_id')
      ).map((id) => id.toString())
    );

    // Prepare new sessions for bulk insert
    const newSessions = data.filter((datum) => !existingIds.has(datum._id));

    // Bulk create new sessions if any
    let createdSessions = [];
    if (newSessions.length > 0) {
      createdSessions = await Session.insertMany(newSessions, {
        ordered: false,
      });
    }

    // Prepare response
    return NextResponse.json(
      {
        message: 'Data processed successfully',
        template: template,
        new_sessions: createdSessions,
        total_sessions_processed: data.length,
        total_new_sessions: createdSessions.length,
      },
      { status: 200 }
    );
  } catch (error) {
    // Improved error handling
    console.error('POST route error:', error);

    // Differentiate between validation and server errors
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: 'Validation Error',
          details: Object.values(error.errors).map((err) => err.message),
        },
        { status: 400 }
      );
    }

    // Generic server error
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const params = url.searchParams;
  const _id = params.get('_id');
  try {
    await dbConnect();

    if (!_id) {
      return NextResponse.json(
        { error: "Missing '_id' parameter" },
        { status: 400 }
      );
    }

    const deletionResult = await Session.deleteMany({
      _id: { $in: _id },
    });

    // Ensure you're waiting for deletion to complete
    if (deletionResult.deletedCount === 0) {
      return NextResponse.json(
        {
          message: `No documents found to delete`,
          ids: _id,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: `Object Id: ${_id} was removed from the database`,
        _id,
        deletedCount: deletionResult.deletedCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('An error occurred:', err);

    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
