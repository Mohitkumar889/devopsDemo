const Team = require("../models/Team");
const helpers = require("../util/helpers.js");

module.exports = () => {
    const createTeam = (data) => {
        console.log("TeamService => createTeam");
        return new Promise(function (resolve, reject) {
            Team.create(data).then(resolve).catch(reject);
        });
    };

    const fetch = (id) => {
        console.log("TeamService => fetch");
        return new Promise(function (resolve, reject) {
            let orm = Team.findById(id).select("-__v");
            orm.then(resolve).catch(reject);
        });
    };

    const fetchDetail = (id) => {
        console.log("TeamService => fetchDetail");
        return new Promise(function (resolve, reject) {
            let orm = Team.findById(id).select("-__v");
            orm.then(resolve).catch(reject);
        });
    };

    const fetchByQuery = (query) => {
        console.log("TeamService => fetchByQuery");
        return new Promise(function (resolve, reject) {
            let orm = Team.findOne(query).select("-__v");

            orm.then(resolve).catch(reject);
        });
    };

    const deleteTeam = (id) => {
        console.log("TeamService => deleteTeam");
        return new Promise(function (resolve, reject) {
            let orm = Team.deleteOne({ _id: id });
            orm.then(resolve).catch(reject);
        });
    };

    const updateTeam = (teamId, data) => {
        console.log("TeamService => updateTeam");
        return new Promise(async function (resolve, reject) {
            await Team.findByIdAndUpdate({ _id: teamId }, data)
                .then(resolve)
                .catch(reject);
        });
    };

    const getTeams = (query, page, limit) => {
        console.log("TeamService => getTeams");
        if (page) {
            page -= 1;
        }
        return new Promise(async function (resolve, reject) {
            let pipeline = [
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        image: 1,
                        header: 1,
                        designation: 1,
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

            let orm = Team.aggregate(pipeline);
            orm.then(resolve).catch(reject);
        });
    }



    return {
        createTeam,
        fetchByQuery,
        deleteTeam,
        updateTeam,
        fetchDetail,
        fetch,
        getTeams
    };
};