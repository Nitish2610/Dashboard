import mongoose from "mongoose";
const ActionHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    actionType: {
      type: String,
      enum: ["view", "download"],
    },
  },
  { timestamps: true }
);
export const ActionHistory = mongoose.model(
  "ActionHistory",
  ActionHistorySchema
);
