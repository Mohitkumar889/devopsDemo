const NewsService = require("../services/NewsService");
const RegexEscape = require("regex-escape");
const helpers = require("../util/helpers");


module.exports = () => {
    const addUpdateNews = async (req, res, next) => {
        console.log("newsController => addUpdateNews");
        if (req.body.newsId) {
            await NewsService().updateNews(req.body.newsId, req.body);
        } else {
            await NewsService().createNews(req.body);
        }
        req.msg = "success";
        req.rData = {};
        next();
    };

    const newsDetails = async (req, res, next) => {
        console.log("newsController => newsDetails");
        let news = await NewsService().fetchDetail(req.params.id);
        req.msg = "success";
        req.rData = news;
        next();
    }

    const ActiveDeactiveNews = async (req, res, next) => {
        console.log("newsController => ActiveDeactiveNews");
        let news = await NewsService().fetchDetail(req.params.id);
        if (news.isActive == true) {
            await NewsService().updateNews(req.params.id, { isActive: false });
        } else {
            await NewsService().updateNews(req.params.id, { isActive: true });
        }
        req.msg = "Status Change Successfully.";
        req.rData = {};
        next();
    }

    const DeleteNews = async (req, res, next) => {
        console.log("newsController => DeleteNews");
        await NewsService().deleteNews(req.params.id);
        req.msg = "News_deleted";
        req.rData = {};
        next();
    }

    const getNews = async (req, res, next) => {
        console.log("newsController => getNews");
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
                        description: { $regex: RegexEscape(search), $options: "i" },
                    },
                ],
            };
        }

        if (isActive) {
            query.isActive = JSON.parse(isActive);
        }

        let news = await NewsService().getNews(query, page, limit);
        let total = news?.length;

        req.msg = "news_list";
        req.rData = {
            search,
            page,
            limit,
            isActive,
            news,
            total,
        };
        next();
    }

    return {
        addUpdateNews,
        newsDetails,
        ActiveDeactiveNews,
        DeleteNews,
        getNews
    }
}