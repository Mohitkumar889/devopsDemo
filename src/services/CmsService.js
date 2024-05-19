const Cms = require("../models/Cms.js");
const ContactUs = require("../models/ContactUs.js");
const helpers = require("../util/helpers.js");

module.exports = () => {
    const createContactUs = (data) => {
        console.log("CmsService => createContactUs");
        return new Promise(function (resolve, reject) {
            ContactUs.create(data).then(resolve).catch(reject);
        });
    };

    const getContactUs = (query, page, limit) => {
        console.log("CmsService => getContactUs");
        if (page) {
            page -= 1;
        }
        return new Promise(async function (resolve, reject) {
            let pipeline = [
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        subject: 1,
                        message: 1
                    }
                },
                { $sort: { createdAt: -1 } },
            ];
            pipeline.push({ $match: query });
            if (limit) {
                pipeline.push({ $skip: page * limit },
                    { $limit: limit });
            }
            let orm = ContactUs.aggregate(pipeline);
            orm.then(resolve).catch(reject);
        });
    }

    const deleteContactUs = (id) => {
        console.log("CmsService => deleteContactUs");
        return new Promise(function (resolve, reject) {
            let orm = ContactUs.deleteOne({ _id: id });
            orm.then(resolve).catch(reject);
        });
    };

    const addCms = (data) => {
        return new Promise(function (resolve, reject) {
            Cms.create(data).then(resolve).catch(reject);
        });
    };


    const fetchByQueryCms = (query) => {
        console.log("CmsService => fetchByQuery");
        return new Promise(function (resolve, reject) {
            let orm = Cms.findOne(query).select("").sort({ _id: -1 });
            orm.then(resolve).catch(reject);
        });
    };

    const updateCms = (SettingsId, data) => {
        console.log("SettingsService => resetPassword");
        return new Promise(async function (resolve, reject) {
            await Cms.findByIdAndUpdate({ _id: SettingsId }, data)
                .then(resolve)
                .catch(reject);
        });
    };



    return {
        createContactUs,
        getContactUs,
        deleteContactUs,
        fetchByQueryCms,
        addCms,
        updateCms,

    };
};