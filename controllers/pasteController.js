const Paste = require("../models/pasteModel");
const mongoose = require("mongoose");

// GET all Pastes
const getPastes = async (req, res) => {
  const pastes = await Paste.find({ visibility: "Public" }).limit(8).sort({
    createdAt: -1,
  });
  res.status(200).json(pastes);
};

// GET a single paste
const getPaste = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such paste" });
  }
  const paste = await Paste.findById(id);
  if (!paste) {
    return res.status(404).json({ error: "No such paste" });
  }
  res.status(200).json(paste);
};

// POST a new paste
const createPaste = async (req, res) => {
  const { title, visibility, body } = req.body;
  try {
    let paste;
    if (req.user) {
      const user_id = req.user._id;
      paste = await Paste.create({ title, visibility, body, user_id });
    } else {
      paste = await Paste.create({ title, visibility, body, user_id: "" });
    }
    res.status(200).json(paste);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Authorization controllers

// GET All Pastes (public/private)
const getMyPastes = async (req, res) => {
  const user_id = req.user._id;
  const pastes = await Paste.find({ user_id }).sort({
    createdAt: -1,
  });
  res.status(200).json(pastes);
};

// Delete paste
const deletePaste = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such paste" });
  }
  const paste = await Paste.findOneAndDelete({ _id: id });
  if (!paste) {
    return res.status(404).json({ error: "No such pastes" });
  }
  res.status(200).json({ paste, redirect: "/" });
};

// UPDATE paste
const updatePaste = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such paste" });
  }
  const paste = await Paste.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!paste) {
    return res.status(404).json({ error: "No such paste" });
  }
  res.status(200).json({ paste, redirect: id });
};

module.exports = {
  getPastes,
  getPaste,
  createPaste,
  getMyPastes,
  deletePaste,
  updatePaste,
};
