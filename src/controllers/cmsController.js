const CmsService = require("../services/CmsService");
const RegexEscape = require("regex-escape");
const helpers = require("../util/helpers");


module.exports = () => {

    const addContactUs = async (req, res, next) => {
        console.log("cmsController => addContactUs");
        await CmsService().createContactUs(req.body);
        req.msg = "success";
        req.rData = {};
        next();
    };

    const getContactUs = async (req, res, next) => {
        console.log("cmsController => getContactUs");
        let { page, limit, search } = req.query;
        page = page ? parseInt(page) : "";
        limit = limit ? parseInt(limit) : "";
        let query = {};
        if (search) {
            query = {
                $or: [
                    {
                        name: { $regex: RegexEscape(search), $options: "i" },
                    },
                    {
                        subject: { $regex: RegexEscape(search), $options: "i" },
                    },
                ],
            };
        }

        let contactUs = await CmsService().getContactUs(query, page, limit);
        let total = contactUs?.length;

        req.msg = "contact_us_list";
        req.rData = {
            search,
            page,
            limit,
            contactUs,
            total,
        };
        next();
    }

    const deleteContactUs = async (req, res, next) => {
        console.log("cmsController => DeleteEvent");
        await CmsService().deleteContactUs(req.params.id);
        req.msg = "ContactUs_deleted";
        req.rData = {};
        next();
    }

    const getTermAndCondition = async (req, res, next) => {
        console.log("cmsController => getTermAndCondition");
        let Settings = await CmsService().fetchByQueryCms({});
        if (Settings) {
            req.rData = Settings.termsAndConditions;
        } else {
            req.rCode = 0;
            req.msg = "Settings_not_found";
            req.rData = {};
        }

        next();
    };

    const addTermAndCondition = async (req, res, next) => {
        console.log("cmsController => addTermAndCondition");

        let { termsAndConditions } = req.body;

        let Settings = await CmsService().fetchByQueryCms({});

        if (Settings && (Settings.termsAndConditions || Settings.termsAndConditions == "")) {
            await CmsService().updateCms(Settings._id, {
                termsAndConditions,
            });
        } else {
            await CmsService().addCms({ termsAndConditions });
        }

        req.rData = {};
        req.msg = "success";
        next();
    };

    const getAboutUs = async (req, res, next) => {
        console.log("cmsController => getAboutUs");
        let Settings = await CmsService().fetchByQueryCms({});
        if (Settings) {
            req.rData = Settings.aboutUs;
        } else {
            req.rCode = 0;
            req.msg = "Settings_not_found";
            req.rData = {};
        }

        next();
    };

    const addAboutUs = async (req, res, next) => {
        console.log("cmsController => addAboutUs");

        let { aboutUs } = req.body;

        let Settings = await CmsService().fetchByQueryCms({});

        if (Settings && (Settings.aboutUs || Settings.aboutUs == "")) {
            await CmsService().updateCms(Settings._id, {
                aboutUs,
            });
        } else {
            await CmsService().addCms({ aboutUs });
        }

        req.rData = {};
        req.msg = "success";
        next();
    };

    const getPrivacyPolicy = async (req, res, next) => {
        console.log("cmsController => getTermAndCondition");
        let Settings = await CmsService().fetchByQueryCms({});
        if (Settings) {
            req.rData = Settings.privacyPolicy;
        } else {
            req.rCode = 0;
            req.msg = "Settings_not_found";
            req.rData = {};
        }

        next();
    };

    const addPrivacyPolicy = async (req, res, next) => {
        console.log("cmsController => addPrivacyPolicy");

        let { privacyPolicy } = req.body;

        let Settings = await CmsService().fetchByQueryCms({});

        if (Settings && (Settings.privacyPolicy || Settings.privacyPolicy == "")) {
            await CmsService().updateCms(Settings._id, {
                privacyPolicy,
            });
        } else {
            await CmsService().addCms({ privacyPolicy });
        }

        req.rData = {};
        req.msg = "success";
        next();
    };


    return {
        addContactUs,
        getContactUs,
        deleteContactUs,
        getTermAndCondition,
        addTermAndCondition,
        getAboutUs,
        addAboutUs,
        getPrivacyPolicy,
        addPrivacyPolicy
    }
}