import { Joi, celebrate, Segments } from 'celebrate';

export const urlSchema = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

export const cardIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }).required(),
});

export const cardBodyValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlSchema).uri({ scheme: ['http', 'https'] }).required(),
  }),
});
