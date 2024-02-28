// custom validation
import { validationTest } from "./middleWare/validateMiddleWare.js";

app.post("/api/v1/test", validationTest, (req, res) => {
  const { name } = req.body;
  res.status(200).json({ msg: `created for ${name}` });
});

export const validationTest = withValidationError([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 5, max: 25 })
    .withMessage("required min 5 to max 25 char length")
    .trim(),
]);
