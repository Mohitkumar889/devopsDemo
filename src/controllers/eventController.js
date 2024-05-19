const EventService = require("../services/EventService");
const RegexEscape = require("regex-escape");
const helpers = require("../util/helpers");


module.exports = () => {

    const addUpdateEvent = async (req, res, next) => {
        console.log("eventController => addUpdateEvent");
        req.body.geo_json_location = { type: "Point", coordinates: [req.body.lat ? req.body.lat : 0, req.body.long ? req.body.long : 0] };
        if (req.body.eventId) {
            await EventService().updateEvent(req.body.eventId, req.body);
        } else {
            await EventService().createEvent(req.body);
        }
        req.msg = "success";
        req.rData = {};
        next();
    };

    const eventDetails = async (req, res, next) => {
        console.log("eventController => teamDetails");
        let event = await EventService().fetchDetail(req.params.id);
        req.msg = "success";
        req.rData = event;
        next();
    }

    const ActiveDeactiveEvent = async (req, res, next) => {
        console.log("eventController => ActiveDeactiveEvent");
        let team = await EventService().fetchDetail(req.params.id);
        if (team.isActive == true) {
            await EventService().updateEvent(req.params.id, { isActive: false });
        } else {
            await EventService().updateEvent(req.params.id, { isActive: true });
        }
        req.msg = "Status Change Successfully.";
        req.rData = {};
        next();
    }

    const DeleteEvent = async (req, res, next) => {
        console.log("eventController => DeleteEvent");
        await EventService().deleteEvent(req.params.id);
        req.msg = "Event_deleted";
        req.rData = {};
        next();
    }

    const getEvents = async (req, res, next) => {
        console.log("eventController => getEvents");
        let { page, limit, search, isActive } = req.query;
        page = page ? parseInt(page) : "";
        limit = limit ? parseInt(limit) : "";
        let query = {};
        if (search) {
            query = {
                $or: [
                    {
                        title: { $regex: RegexEscape(search), $options: "i" },
                    },
                    {
                        location: { $regex: RegexEscape(search), $options: "i" },
                    },
                ],
            };
        }

        if (isActive) {
            query.isActive = JSON.parse(isActive);
        }

        let events = await EventService().getEvents(query, page, limit);
        let total = events?.length;

        req.msg = "events_list";
        req.rData = {
            search,
            page,
            limit,
            isActive,
            events,
            total,
        };
        next();
    }

    return {
        addUpdateEvent,
        eventDetails,
        ActiveDeactiveEvent,
        DeleteEvent,
        getEvents
    }
}