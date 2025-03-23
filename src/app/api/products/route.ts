import dbConnect from "@/app/lib/mongo-connect";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";


interface session {
  _id: string;
  exercise: string; 
  weight: number;
  reps: number;
  sets: number;
  volume: number;
  date: string;
}

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
    const products = await Product.find({
      date: {
        $eq: date,
      },
    });
    return NextResponse.json(products);
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
    const existingIds = (await Product.find({
      _id: {
        $in: data.map((datum) => datum._id),
      },
    }).distinct("_id")).map((id) => id.toString()); 
    const newData = data.filter((datum) => !existingIds.includes(datum._id));
    console.log(newData);
    newData.forEach(async (datum) => await Product.create(datum));

    return new NextResponse(
      JSON.stringify({
        message: "data added",
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
    const products = await Product.findOneAndDelete({ _id });
    if (!products) throw new Error("id given was not found");

    return NextResponse.json(products);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    } else {
      console.error("An unknown error occurred:", err);
    }
  }
}
