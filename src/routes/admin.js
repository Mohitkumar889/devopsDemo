const adminRouter = require("express").Router();
const UserController = require("../controllers/userController");
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const authValidator = require("../validators/AuthValidator");
const teamValidator = require("../validators/TeamValidator");
const TeamController = require("../controllers/teamController");
const eventValidator = require("../validators/EventValidator");
const EventController = require("../controllers/eventController");
const newsValidator = require("../validators/NewsValidator");
const NewsController = require("../controllers/newsController");
const CmsController = require("../controllers/cmsController");

/**
 * Auth
 */

adminRouter.post(
    "/register",
    authValidator().validateRegister,
    ErrorHandlerMiddleware(UserController().AdminRegister),
    ResponseMiddleware
);

adminRouter.post(
    "/adminLogin",
    authValidator().validateAdminLogin,
    ErrorHandlerMiddleware(UserController().AdminLogin),
    ResponseMiddleware
);

adminRouter.post(
    "/adminForgotPassword",
    authValidator().validateAdminForgotPassword,
    ErrorHandlerMiddleware(UserController().AdminForgotPassword),
    ResponseMiddleware
);

adminRouter.post(
    "/verifyOtp",
    AuthMiddleware().verifyAdminToken,
    authValidator().validateAdminVerifyOtp,
    ErrorHandlerMiddleware(UserController().AdminVerifyOtp),
    ResponseMiddleware
);

adminRouter.patch(
    "/resetPassword",
    AuthMiddleware().verifyAdminToken,
    authValidator().validateResetPassword,
    ErrorHandlerMiddleware(UserController().adminResetPassword),
    ResponseMiddleware
);

adminRouter.patch(
    "/changePassword",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    authValidator().validateChangePassword,
    ErrorHandlerMiddleware(UserController().adminChangePassword),
    ResponseMiddleware
);

/**
 * Teams
 */

adminRouter.post(
    "/addUpdateTeam",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    teamValidator().addUpdateTeamValidator,
    ErrorHandlerMiddleware(TeamController().addUpdateTeam),
    ResponseMiddleware
);

adminRouter.get(
    "/team/:id",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    teamValidator().teamIdValidator,
    ErrorHandlerMiddleware(TeamController().teamDetails),
    ResponseMiddleware
);

adminRouter.patch(
    "/team/:id",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    teamValidator().teamIdValidator,
    ErrorHandlerMiddleware(TeamController().ActiveDeactiveTeam),
    ResponseMiddleware
);

adminRouter.delete(
    "/team/:id",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    teamValidator().teamIdValidator,
    ErrorHandlerMiddleware(TeamController().DeleteTeam),
    ResponseMiddleware
);

adminRouter.get(
    "/team",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    ErrorHandlerMiddleware(TeamController().getTeams),
    ResponseMiddleware
);

/**
 * Events
 */

adminRouter.post(
    "/event",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    eventValidator().addUpdateEventValidator,
    ErrorHandlerMiddleware(EventController().addUpdateEvent),
    ResponseMiddleware
);

adminRouter.get(
    "/event/:id",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    eventValidator().eventIdValidator,
    ErrorHandlerMiddleware(EventController().eventDetails),
    ResponseMiddleware
);

adminRouter.patch(
    "/event/:id",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    eventValidator().eventIdValidator,
    ErrorHandlerMiddleware(EventController().ActiveDeactiveEvent),
    ResponseMiddleware
);

adminRouter.delete(
    "/event/:id",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    eventValidator().eventIdValidator,
    ErrorHandlerMiddleware(EventController().DeleteEvent),
    ResponseMiddleware
);

adminRouter.get(
    "/event",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    ErrorHandlerMiddleware(EventController().getEvents),
    ResponseMiddleware
);


/**
 * News
 */

adminRouter.post(
    "/news",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    newsValidator().addUpdateNewsValidator,
    ErrorHandlerMiddleware(NewsController().addUpdateNews),
    ResponseMiddleware
);

adminRouter.get(
    "/news/:id",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    newsValidator().newsIdValidator,
    ErrorHandlerMiddleware(NewsController().newsDetails),
    ResponseMiddleware
);

adminRouter.patch(
    "/news/:id",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    newsValidator().newsIdValidator,
    ErrorHandlerMiddleware(NewsController().ActiveDeactiveNews),
    ResponseMiddleware
);

adminRouter.delete(
    "/news/:id",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    newsValidator().newsIdValidator,
    ErrorHandlerMiddleware(NewsController().DeleteNews),
    ResponseMiddleware
);

adminRouter.get(
    "/news",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    ErrorHandlerMiddleware(NewsController().getNews),
    ResponseMiddleware
);

/**
 * CMS
 */
adminRouter.post(
    "/contactUs",
    authValidator().addContactUs,
    ErrorHandlerMiddleware(CmsController().addContactUs),
    ResponseMiddleware
);

adminRouter.get(
    "/contactUs",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    ErrorHandlerMiddleware(CmsController().getContactUs),
    ResponseMiddleware
);

adminRouter.delete(
    "/contactUs/:id",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    authValidator().contactIdValidator,
    ErrorHandlerMiddleware(CmsController().deleteContactUs),
    ResponseMiddleware
)

adminRouter.get(
    "/termAndCondition",
    ErrorHandlerMiddleware(CmsController().getTermAndCondition),
    ResponseMiddleware
);

adminRouter.post(
    "/termAndCondition",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    ErrorHandlerMiddleware(CmsController().addTermAndCondition),
    ResponseMiddleware
);

adminRouter.get(
    "/aboutUs",
    ErrorHandlerMiddleware(CmsController().getAboutUs),
    ResponseMiddleware
);

adminRouter.post(
    "/aboutUs",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    ErrorHandlerMiddleware(CmsController().addAboutUs),
    ResponseMiddleware
);

adminRouter.get(
    "/privacyPolicy",
    ErrorHandlerMiddleware(CmsController().getPrivacyPolicy),
    ResponseMiddleware
);

adminRouter.post(
    "/privacyPolicy",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    ErrorHandlerMiddleware(CmsController().addPrivacyPolicy),
    ResponseMiddleware
);

adminRouter.get(
    "/logOut",
    AuthMiddleware().verifyAdminToken,
    AuthMiddleware().verifyAdminIsLoggedIn,
    ErrorHandlerMiddleware(UserController().adminLogout),
    ResponseMiddleware
);

module.exports = adminRouter;