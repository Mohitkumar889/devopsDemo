const TeamService = require("../services/TeamService");
const RegexEscape = require("regex-escape");
const helpers = require("../util/helpers");


module.exports = () => {

    const addUpdateTeam = async (req, res, next) => {
        console.log("teamController => addUpdateTeam");
        if (req.body.teamId) {
            await TeamService().updateTeam(req.body.teamId, req.body);
        } else {
            await TeamService().createTeam(req.body);
        }
        req.msg = "success";
        req.rData = {};
        next();
    };

    const teamDetails = async (req, res, next) => {
        console.log("teamController => teamDetails");
        let team = await TeamService().fetchDetail(req.params.id);
        req.msg = "success";
        req.rData = team;
        next();
    }

    const ActiveDeactiveTeam = async (req, res, next) => {
        console.log("teamController => ActiveDeactiveTeam");
        let team = await TeamService().fetchDetail(req.params.id);
        if (team.isActive == true) {
            await TeamService().updateTeam(req.params.id, { isActive: false });
        } else {
            await TeamService().updateTeam(req.params.id, { isActive: true });
        }
        req.msg = "Status Change Successfully.";
        req.rData = {};
        next();
    }

    const DeleteTeam = async (req, res, next) => {
        console.log("teamController => DeleteTeam");
        await TeamService().deleteTeam(req.params.id);
        req.msg = "Team_deleted";
        req.rData = {};
        next();
    }

    const getTeams = async (req, res, next) => {
        console.log("teamController => getTeams");
        let { page, limit, search, isActive } = req.query;
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
                        designation: { $regex: RegexEscape(search), $options: "i" },
                    },
                ],
            };
        }

        if (isActive) {
            query.isActive = JSON.parse(isActive);
        }

        let teams = await TeamService().getTeams(query, page, limit);
        let total = teams?.length;

        req.msg = "teams_list";
        req.rData = {
            search,
            page,
            limit,
            isActive,
            teams,
            total,
        };
        next();
    }

    return {
        addUpdateTeam,
        teamDetails,
        ActiveDeactiveTeam,
        DeleteTeam,
        getTeams
    }
}