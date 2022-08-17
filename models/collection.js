const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Name me!",
    },
    description: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      default: false,
      required: true,
    },
    packages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Package" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);
