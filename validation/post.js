const Validator = require("validator"),
  isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be a minimum of 10 and max 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
