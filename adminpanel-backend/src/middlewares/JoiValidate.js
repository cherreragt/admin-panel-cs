const JoiValidate = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    const valid = error == null;

    if (!valid) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');

      return res.status(422).json({ error: message });
    }
    next();
  };
};

module.exports = { JoiValidate };
