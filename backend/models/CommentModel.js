import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: "User"},
  text: String,
  replies: {type: [{type: Schema.Types.ObjectId, ref: "Comment",}], default: []},
});

export default model("Comment", CommentSchema);