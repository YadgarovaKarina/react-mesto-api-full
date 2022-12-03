import { Joi, celebrate, Segments } from 'celebrate';

export const urlSchema = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

export const userIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }).required(),
});

export const userBodyValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlSchema).uri({ scheme: ['http', 'https'] }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required(),
});

export const userProfileValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

export const userAvatarValidator = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().pattern(urlSchema).uri({ scheme: ['http', 'https'] }).required(),
  }),
});

export const userLoginValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
