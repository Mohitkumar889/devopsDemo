const User = require("../models/User");
const helpers = require("../util/helpers.js");

module.exports = () => {
    const registerAdmin = (data) => {
        console.log("UserService => registerAdmin");
        return new Promise(function (resolve, reject) {
            User.create(data).then(resolve).catch(reject);
        });
    };

    const fetch = (id) => {
        console.log("UserService => fetch");
        return new Promise(function (resolve, reject) {
            let orm = User.findById(id).select("-password -time -otp");
            orm.then(resolve).catch(reject);
        });
    };

    const fetchDetail = (id) => {
        console.log("UserService => fetchDetail");
        return new Promise(function (resolve, reject) {
            let orm = User.findById(id).select("-password -time -otp -token");
            orm.then(resolve).catch(reject);
        });
    };

    const fetchByQuery = (query) => {
        console.log("UserService => fetchByQuery");
        return new Promise(function (resolve, reject) {
            let orm = User.findOne(query).select("-password");

            orm.then(resolve).catch(reject);
        });
    };

    const verifyPassword = (id, password) => {
        console.log("AdminService => verifyPassword");
        return new Promise(async function (resolve, reject) {
            let admin = await User.findById(id);

            if (!admin) resolve(false);
            let v = await helpers().checkPassword(password, admin.password);

            return resolve(v);
        });
    };

    const deleteAdmin = (id) => {
        return new Promise(function (resolve, reject) {
            let orm = User.deleteOne({ _id: id });
            orm.then(resolve).catch(reject);
        });
    };

    const resetPassword = (adminId, password) => {
        console.log("AdminService => resetPassword");
        return new Promise(async function (resolve, reject) {
            let admin = await User.findByIdAndUpdate({ _id: adminId }, { password: password, is_logout: true })
                .then(resolve)
                .catch(reject);
        });
    };

    const updateProfile = (adminId, data) => {
        console.log("AdminService => resetPassword");
        return new Promise(async function (resolve, reject) {
            await User.findByIdAndUpdate({ _id: adminId }, data).then(resolve).catch(reject);
        });
    };

    const getUser = (query, page, limit) => {
        return new Promise(function (resolve, reject) {
            let orm = User.find(query)
                .select("-password -__v")
                .sort({ _id: -1 })
                // .skip(page * limit)
                .limit(limit);
            orm.then(resolve).catch(reject);
        });
    };

    const countUser = (query) => {
        return new Promise(function (resolve, reject) {
            let orm = User.countDocuments(query);
            orm.then(resolve).catch(reject);
        });
    };

    return {
        fetch,
        fetchByQuery,
        registerAdmin,
        verifyPassword,
        getUser,
        countUser,
        deleteAdmin,
        resetPassword,
        updateProfile,
        fetchDetail,
    };
};