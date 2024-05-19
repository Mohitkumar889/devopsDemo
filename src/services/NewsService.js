const News = require("../models/News");
const helpers = require("../util/helpers.js");

module.exports = () => {
    const createNews = (data) => {
        console.log("NewsService => createNews");
        return new Promise(function (resolve, reject) {
            News.create(data).then(resolve).catch(reject);
        });
    };

    const fetch = (id) => {
        console.log("NewsService => fetch");
        return new Promise(function (resolve, reject) {
            let orm = News.findById(id).select("-__v");
            orm.then(resolve).catch(reject);
        });
    };

    const fetchDetail = (id) => {
        console.log("NewsService => fetchDetail");
        return new Promise(function (resolve, reject) {
            let orm = News.findById(id).select("-__v");
            orm.then(resolve).catch(reject);
        });
    };

    const fetchByQuery = (query) => {
        console.log("NewsService => fetchByQuery");
        return new Promise(function (resolve, reject) {
            let orm = News.findOne(query).select("-__v");

            orm.then(resolve).catch(reject);
        });
    };

    const deleteNews = (id) => {
        console.log("NewsService => deleteNews");
        return new Promise(function (resolve, reject) {
            let orm = News.deleteOne({ _id: id });
            orm.then(resolve).catch(reject);
        });
    };

    const updateNews = (newsId, data) => {
        console.log("NewsService => updateNews");
        return new Promise(async function (resolve, reject) {
            await News.findByIdAndUpdate({ _id: newsId }, data)
                .then(resolve)
                .catch(reject);
        });
    };

    const getNews = (query, page, limit) => {
        console.log("NewsService => getNews");
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

            let orm = News.aggregate(pipeline);
            orm.then(resolve).catch(reject);
        });
    }



    return {
        createNews,
        fetchByQuery,
        deleteNews,
        updateNews,
        fetchDetail,
        fetch,
        getNews
    };
};