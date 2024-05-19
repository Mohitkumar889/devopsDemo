const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
    const addUpdateEventValidator = async (req, res, next) => {
        var v = {};
        if (req.body.eventId) {
            v = new Validator(req.body, {
                eventId: validations.event.id,
                title: validations.general.nullableString,
                image: validations.general.nullable,
                description: validations.general.nullableString,
                location: validations.general.nullableString,
            });
        } else {
            v = new Validator(req.body, {
                title: validations.general.requiredString,
                image: validations.general.required,
                description: validations.general.requiredString,
                location: validations.general.requiredString
            });
        }
        validate(v, res, next, req);
    };

    const eventIdValidator = async (req, res, next) => {
        const v = new Validator(req.params, {
            id: validations.event.id,
        });
        validate(v, res, next, req);
    }

    return {
        addUpdateEventValidator,
        eventIdValidator
    };
};
