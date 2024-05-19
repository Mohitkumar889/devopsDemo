const Event = require("../models/Event");
const helpers = require("../util/helpers.js");

module.exports = () => {
    const createEvent = (data) => {
        console.log("EventService => createEvent");
        return new Promise(function (resolve, reject) {
            Event.create(data).then(resolve).catch(reject);
        });
    };

    const fetch = (id) => {
        console.log("EventService => fetch");
        return new Promise(function (resolve, reject) {
            let orm = Event.findById(id).select("-__v -geo_json_location");
            orm.then(resolve).catch(reject);
        });
    };

    const fetchDetail = (id) => {
        console.log("EventService => fetchDetail");
        return new Promise(function (resolve, reject) {
            let orm = Event.findById(id).select("-__v -geo_json_location");
            orm.then(resolve).catch(reject);
        });
    };

    const fetchByQuery = (query) => {
        console.log("EventService => fetchByQuery");
        return new Promise(function (resolve, reject) {
            let orm = Event.findOne(query).select("-__v -geo_json_location");

            orm.then(resolve).catch(reject);
        });
    };

    const deleteEvent = (id) => {
        console.log("EventService => deleteEvent");
        return new Promise(function (resolve, reject) {
            let orm = Event.deleteOne({ _id: id });
            orm.then(resolve).catch(reject);
        });
    };

    const updateEvent = (eventId, data) => {
        console.log("EventService => updateEvent");
        return new Promise(async function (resolve, reject) {
            await Event.findByIdAndUpdate({ _id: eventId }, data)
                .then(resolve)
                .catch(reject);
        });
    };

    const getEvents = (query, page, limit) => {
        console.log("EventService => getEvents");
        if (page) {
            page -= 1;
        }
        return new Promise(async function (resolve, reject) {
            let pipeline = [
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        image: 1,
                        location: 1,
                        lat: 1,
                        long: 1,
                        description: 1,
                        isActive: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                },
                { $sort: { createdAt: -1 } },
            ];
            pipeline.push({ $match: query });
            if (limit) {
                pipeline.push({ $skip: page * limit },
                    { $limit: limit });
            }
            let orm = Event.aggregate(pipeline);
            orm.then(resolve).catch(reject);
        });
    }



    return {
        createEvent,
        fetchByQuery,
        deleteEvent,
        updateEvent,
        fetchDetail,
        fetch,
        getEvents
    };
};