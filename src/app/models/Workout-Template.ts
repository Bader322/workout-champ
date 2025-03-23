// Is like user, but for the workout templates
// The template is a model that will be used to save the workout templates
// template will have a one to many relationship with the session
//  One template can have many sessions
//  One session can belong to one template

import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITemplate extends Document {
  title?: string;
  description?: string;
  sessions: Types.ObjectId[];
}

const schema: Schema = new mongoose.Schema(
  {
    title: {
      String,
    },
    description: {
      String,
    },
    sessions: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Template =
  mongoose.models.Template || mongoose.model<ITemplate>("Template", schema);

export default Template;
