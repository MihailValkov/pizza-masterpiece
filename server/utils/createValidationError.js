class ValidationError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.name = 'CustomValidationError';
    this.code = code;
  }
}

module.exports = { ValidationError };
