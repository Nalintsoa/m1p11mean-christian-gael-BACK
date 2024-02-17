class UploadController {
    uploadFile(req, res) {
        try {
            res.status(200).send(req.file);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = UploadController;