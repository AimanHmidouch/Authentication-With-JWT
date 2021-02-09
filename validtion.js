import Joi from '@hapi/joi';

// Register validation with @hapi/joi

export const registerValidation = (data) => {
    const schema = Joi.object({
        name : Joi.string()
                .min(6)
                .required(),
        email : Joi.string()
                .min(6)
                .required()
                .email(),
        password: Joi.string()
                .min(6)
                .required(),
        isAdmin: Joi.boolean()
    });
    return schema.validate(data);
}

export const loginValidation = (data) => {
    const schema = Joi.object({
        email : Joi.string()
                .min(6)
                .required()
                .email(),
        password: Joi.string()
                .min(6)
                .required()
    });
    return schema.validate(data);
}

