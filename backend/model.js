const mongoose = require("mongoose");
const DokumenSchema = new mongoose.Schema(
  {
    judul: {
      type: String,
      required: [true, "judul Must be Insert"],
    },
    content: {
      type: String,
      default:"",
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dokumen", DokumenSchema);