import dbConnect from '@/app/lib/mongo-connect';
import Template from '@/app/models/Workout-Template';
import Session from '@/app/models/Session';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'bson';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const params = url.searchParams;
    const _id = params.get('_id');

    if (!_id) {
      // get templates
      const templates = await Template.find();
      return NextResponse.json(templates);
    }

    // // Validate template ID
    if (!ObjectId.isValid(_id)) {
      return NextResponse.json(
        { message: 'Invalid template ID' },
        { status: 400 }
      );
    }

    const sessions = await Session.find(
      { templateId: { $in: _id } },
      { _id: 0, templateId: 0, created_at: 0, updated_at: 0 }
    );

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
    await dbConnect();
    const data: any = await req.json();
    if (!Array.isArray(data)) {
      return new NextResponse(
        JSON.stringify({
          message: 'Request data should be an array',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    data.forEach(async (datum) => await Template.create(datum));

    return new NextResponse(
      JSON.stringify({
        message: 'data added',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    // Handle errors
    return new NextResponse(
      JSON.stringify({ message: 'An error occured', error }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const { _id } = await req.json();
    const template = await Template.findOneAndDelete({ _id });
    if (!template) throw new Error('id given was not found');

    return NextResponse.json(template);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    } else {
      console.error('An unknown error occurred:', err);
    }
  }
}
