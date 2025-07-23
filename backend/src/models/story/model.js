const { Schema, model, Types } = require("mongoose");

const storySchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    user_story: {
      type: String,
      required: true,
    },
    qa: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          default: null,
        },
      },
    ],
    enhanced_story: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Story", storySchema);
