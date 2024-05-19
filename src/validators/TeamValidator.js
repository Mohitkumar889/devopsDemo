const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
    const addUpdateTeamValidator = async (req, res, next) => {
        var v = {};
        if (req.body.teamId) {
            v = new Validator(req.body, {
                teamId: validations.team.id,
                name: validations.general.nullableString,
                image: validations.general.nullable,
                designation: validations.general.nullableString
            });
        } else {
            v = new Validator(req.body, {
                name: validations.general.requiredString,
                image: validations.general.required,
                designation: validations.general.requiredString
            });
        }
        validate(v, res, next, req);
    };

    const teamIdValidator = async (req, res, next) => {
        const v = new Validator(req.params, {
            id: validations.team.id,
        });
        validate(v, res, next, req);
    }

    return {
        addUpdateTeamValidator,
        teamIdValidator
    };
};
