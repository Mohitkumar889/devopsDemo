const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
    const addUpdateNewsValidator = async (req, res, next) => {
        var v = {};
        if (req.body.newsId) {
            v = new Validator(req.body, {
                newsId: validations.news.id,
                title: validations.general.nullableString,
                image: validations.general.nullable,
                description: validations.general.nullableString
            });
        } else {
            v = new Validator(req.body, {
                title: validations.general.requiredString,
                image: validations.general.required,
                description: validations.general.requiredString
            });
        }
        validate(v, res, next, req);
    };

    const newsIdValidator = async (req, res, next) => {
        const v = new Validator(req.params, {
            id: validations.news.id,
        });
        validate(v, res, next, req);
    }

    return {
        addUpdateNewsValidator,
        newsIdValidator
    };
};
