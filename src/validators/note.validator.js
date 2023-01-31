import Joi from "@hapi/joi";

export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    titel: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string().optional()
  })
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
}