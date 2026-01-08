const Case = require('../models/Case');

// Create a new case
exports.createCase = async (req, res) => {
  try {
    if (!req.body.customer_id) {
      return res.status(400).json({ message: "Customer is required" });
    }

    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create case" });
  }
};

// Get all cases
exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find()
      .populate('customer_id', 'name') // only get customer name
      .populate('assigned_to', 'username'); // only get username
    res.json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cases" });
  }
};

// Update a case
exports.updateCase = async (req, res) => {
  try {
    const updated = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Case not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update case" });
  }
};

// Delete a case
exports.deleteCase = async (req, res) => {
  try {
    const deleted = await Case.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Case not found" });
    }
    res.json({ message: "Case deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete case" });
  }
};
