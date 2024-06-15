const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoatSchema = new Schema(
  {
    ben_id: { type: String }, // Assuming ben_id is the reference to Benefic model
    health: { type: String },
    isAlive: { type: Boolean },
    gender: { type: String, enum: ["Male", "Female", "Unknown"] },
    currentWeight: { type: Number },
    weightArray: [
      {
        weight: { type: Number },
        date: { type: Date },
      },
    ],
    breed: { type: String },
    age: { type: Number }, // Calculated based on date of birth (dob) field
    isPregnant: { type: Boolean },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model("Goat", GoatSchema);
