import dbConnect from "@/app/lib/mongo-connect";
import Session from "@/app/models/Session";
import Template from "@/app/models/Workout-Template";
import { NextResponse, NextRequest } from "next/server";
import _ from "lodash";
import { ObjectId } from "bson";
import { session } from "@/app/_types/types";
import {
  createMissingObjIds,
  prepareTemplate,
} from "@/app/api/_shared";
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    const date = params.get("date");
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
      console.error("An unknown error occurred:", err);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data: session = await req.json();
    if (!Array.isArray(data)) {
      return new NextResponse(
        JSON.stringify({
          message: "Request data should be an array",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    createMissingObjIds(data);

    const templateId: string =
      _.first(data).templateId || new ObjectId().toString();

    const existingTemplate = await Template.findOne({
      _id: templateId,
    });

    let tempDoc;
    if (!existingTemplate) {
      const template = prepareTemplate(templateId, "tets", "description", data);
      tempDoc = await Template.create(template);
    }
    const updatedDoc = await Template.findByIdAndUpdate(
      templateId,
      { sessions: data.map((datum) => datum._id) },
      { new: true } // <- returns the updated document
    );
    const existingIds = (
      await Session.find({
        _id: {
          $in: data.map((datum) => datum._id),
        },
      }).distinct("_id")
    ).map((id) => id.toString());

    const newData = data.filter((datum) => !existingIds.includes(datum._id));
    newData.forEach(async (datum) => await Session.create(datum));

    return new NextResponse(
      JSON.stringify({
        message: "data added",
        template: tempDoc || updatedDoc,
        new_sessions: newData,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    // Handle errors
    return new NextResponse(
      JSON.stringify({ message: "An error occured", error }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const { _id } = await req.json();
    const sessions = await Session.findOneAndDelete({ _id });
    if (!sessions) throw new Error("id given was not found");

    return NextResponse.json(sessions);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    } else {
      console.error("An unknown error occurred:", err);
    }
  }
}
