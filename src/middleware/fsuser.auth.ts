import * as Joi from "joi";
import moment from "moment";

export let validateUser = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    password: Joi.string().required().min(8).alphanum(),
    firstName: Joi.string()
      .required()
      .regex(/^[a-zA-Z]+$/),
    lastName: Joi.string()
      .required()
      .regex(/^[a-zA-Z]+$/),
    gender: Joi.string().valid("MALE", "FEMALE").required(),
    dob: Joi.date().less(moment("2010-01-01").toDate()).required(),
    name: Joi.string().min(2).max(50),
  });

  const result: any = schema.validate(req.body);
  if (result && result.error) {
    return res.status(400).json({
      error: result.error.details.map(function (el) {
        return el.message;
      }),
    });
  }
  else {
    next();
  }
};
