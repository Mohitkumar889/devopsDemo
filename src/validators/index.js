const validator = require("node-input-validator");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware.js");
const helpers = require("../util/helpers.js");
const { models } = require("../models");
validator.extend("unique", async function ({ value, args }) {
  console.log("ValidatorsIndex => unique", args);
  console.log(args);

  let result = null;

  if (args.length > 2) {
    result = await models[args[0]]
      .findOne({
        // where: {
        [args[1]]: value,
        [args[2]]: { $ne: args[3] }
        // }
      })
  } else {
    // console.log(models[args[0]], [args[1]], value, "dsjkdsjk");
    result = await models[args[0]]
      .findOne({
        [args[1]]: value
      })
  }
  return !result ? true : false;
});

/**
 * to check given id exists in given table
 * additional column checks can be passed in pairs
 * e.g exists:table_name,primary_id,col1,value1,col2,value2 and so on
 * col-value must be in pairs
 */
validator.extend("exists", async function ({ value, args }) {
  console.log("ValidatorsIndex => exists");
  console.log(value);
  console.log(args);
  let result = await models[args[0]].find({
    [args[1]]: value,
  });

  return result.length > 0 ? true : false;
});

validator.extend("allowedValues", ({ value, args }) => {
  return args.indexOf(value) > -1 ? true : false;
});


/**
 * to check given time is with am/pm
 */

validator.extend('ampmTime', async (value) => {
  console.log("ValidatorsIndex => ampmTime");
  const timePattern = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

  if (!timePattern.test(value.value)) {
    return false;
    // throw new Error(`The ${field} field must be in the format hh:mm AM/PM.`);
  }
  return true;
});

/**
 * to check given time is 24hr format
 */

validator.extend('hrlyTime', async (value) => {
  console.log("ValidatorsIndex => hrlyTime");
  const timePattern = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
  if (!timePattern.test(value.value)) {
    return false;
    // throw new Error(`The ${field} field must be in the format hh:mm AM/PM.`);
  }
  return true;
});

validator.extendMessages(
  {
    required: "The :attribute field must not be empty.",
    email: "E-mail must be a valid email address.",
    exists: "The :attribute is not found!",
  },
  "en"
);

module.exports = {
  //common function to send validation response
  validate: (v, res, next, req = null) => {
    console.log("ValidatorsIndex => validate");

    if (
      v.check().then(function (matched) {
        if (!matched) {
          req.rCode = 0;
          let message = helpers().getErrorMessage(v.errors);

          ResponseMiddleware(req, res, next, message);
        } else {
          next();
        }
      })
    );
  },

  validations: {
    general: {
      requiredNumeric: "required|numeric",
      requiredBoolean: "required|boolean",
      requiredArray: "required|array",
      requiredEmail: "required|email",
      required: "required",
      nullable: "nullable",
      requiredInt: "required|integer",
      requiredString: "required|string|maxLength:255",
      requiredStrings: "required|string",
      nullableString: "nullable|string|maxLength:255",
      requiredText: "required|string|maxLength:5000",
      nullableText: "nullable|string|maxLength:5000",
      requiredTodayOrAfterDate: "required|dateAfterToday:today,.|date",
      requiredDate: "required|date",
      nullableDate: "nullable|date",
      nullableBoolean: "nullable|boolean",
      nullableArray: "nullable|array",
    },
    user: {
      id: "required|string|exists:User,_id|maxLength:250",
      email: "required|string|unique:User,email|maxLength:50",
      mobile: "required|string|unique:User,mobileNumber|maxLength:50",
      existsEmail: "required|email|exists:User,email|maxLength:50",
      existsmobile: "required|string|exists:User,mobileNumber|maxLength:50",
      nullablemail: "email|unique:User,email|maxLength:50",
    },
    team: {
      id: "required|string|exists:Team,_id|maxLength:250",
    },
    event: {
      id: "required|string|exists:Event,_id|maxLength:250",
    },
    news: {
      id: "required|string|exists:News,_id|maxLength:250",
    },
    contactUs: {
      id: "required|string|exists:ContactUs,_id|maxLength:250",
    },
  },
};
