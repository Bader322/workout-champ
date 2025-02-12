import dbConnect from "@/app/lib/mongo-connect";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({});
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
    const data: [] = await req.json();
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
    data.map(async (datum) => await Product.create(datum));

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
