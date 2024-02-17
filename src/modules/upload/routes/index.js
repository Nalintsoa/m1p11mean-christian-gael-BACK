const { Router } = require("express");
const UploadController = require("../controller/upload.controller");
const upload = require("@middlewares/multer");
const routes = Router();

const uploadController = new UploadController();

routes.post("/", upload.single("file"), uploadController.uploadFile);

module.exports = routes;