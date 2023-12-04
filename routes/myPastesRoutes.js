const express = require("express");
const { getMyPastes } = require("../controllers/pasteController");

const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.use(checkAuth);
router.get("/", getMyPastes);

module.exports = router;
