const Router = require("express");
const router = new Router();
const postController = require("../controller/postControllers");
router.get("/", postController.get);
router.post("/add", postController.add);
router.get("/single/:id", postController.single);
router.put("/update/:id", postController.edit);
router.delete("/delete/:id", postController.deleteObj);
module.exports = router;
