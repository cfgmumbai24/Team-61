const Goat = require("../models/goat.model");

const addgoats = async (req, res, next) => {
  try {
    const {
      tag,
      dob,
      weight,
      breed,
      gender,
      color,
      vaccinations,
      issueDate,
      updatedWeight,
      insurance,
      isAlive,
      diseases,
      sellingPrice,
      numberOfChildren,
      children,
      comments,
      beneficId,
    } = req.body;

    // Check for required fields
    if (!tag || !dob || !weight) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Tag, DOB, and Weight are required fields.",
        });
    }

    // Create a new Goat object
    const newGoat = new Goat({
      tag,
      dob,
      weight,
      breed,
      gender,
      color,
      vaccinations,
      issueDate,
      updatedWeight,
      insurance,
      isAlive,
      diseases,
      sellingPrice,
      numberOfChildren,
      children,
      comments,
      beneficId,
    });

    // Save the Goat to the database
    await newGoat.save();

    res.status(201).json({ success: true, data: newGoat });
  } catch (err) {
    console.error("Error in adding goat:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { addgoats };
