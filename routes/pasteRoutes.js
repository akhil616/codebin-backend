const express = require("express");
const {
  getPastes,
  getPaste,
  createPaste,
  deletePaste,
  updatePaste,
} = require("../controllers/pasteController");

const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

// check auth for these

// GET all public pastes
router.get("/", getPastes);

// GET single paste
router.get("/:id", getPaste);

// POST a new paste
router.use(checkAuth);
router.post("/", createPaste);

// POST Auth paste
// router.post("/", createAuthPaste);

// DELETE a paste
router.delete("/:id", deletePaste);

// UPDATE a paste
router.patch("/:id", updatePaste);

module.exports = router;
