"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var dotenv_1 = require("dotenv");
var writeLogs_1 = require("./writeLogs");
//route handlers
var make_letter_reciver_1 = require("./route-handlers/make-letter-reciver");
var step1_1 = require("./route-handlers/registration/step1");
var step2_1 = require("./route-handlers/registration/step2");
var step3_1 = require("./route-handlers/registration/step3");
var step4_1 = require("./route-handlers/registration/step4");
var login_1 = require("./route-handlers/login");
var getbaseUserData_1 = require("./route-handlers/getbaseUserData");
var getSignedUrl_1 = require("./route-handlers/getSignedUrl");
var set_pfp_url_1 = require("./route-handlers/set-pfp-url");
var set_user_setting_1 = require("./route-handlers/set-user-setting");
var make_goal_1 = require("./route-handlers/make-goal");
var get_goals_1 = require("./route-handlers/get-goals");
var change_goal_status_1 = require("./route-handlers/change-goal-status");
var get_products_1 = require("./route-handlers/get-products");
var add_to_cart_1 = require("./route-handlers/add-to-cart");
var get_cart_items_1 = require("./route-handlers/get-cart-items");
var remove_cart_item_1 = require("./route-handlers/remove-cart-item");
var create_checkout_session_shop_1 = require("./route-handlers/create-checkout-session-shop");
var clear_cart_1 = require("./route-handlers/clear-cart");
var make_path_1 = require("./route-handlers/make-path");
var make_workout_1 = require("./route-handlers/make-workout");
var get_group_by_keyword_1 = require("./route-handlers/get-group-by-keyword");
(0, dotenv_1.config)();
console.log("starting at ".concat(new Date().toLocaleTimeString()));
var server = (0, http_1.createServer)(function (req, res) {
    (0, writeLogs_1.default)("request from ".concat(req.url, " at ").concat(new Date().getUTCDay()));
    console.log("api request");
    switch (req.url) {
        case "/test":
            res.write("hi");
            res.end();
            break;
        case "/newsletter/signup":
            (0, make_letter_reciver_1.default)(req, res);
            break;
        case "/registration-step1":
            (0, step1_1.default)(req, res);
            break;
        case "/registration-step2":
            (0, step2_1.default)(req, res);
            break;
        case "/registration-step3":
            (0, step3_1.default)(req, res);
            break;
        case "/registration-step4":
            (0, step4_1.default)(req, res);
            break;
        case "/user-login":
            (0, login_1.default)(req, res);
            break;
        case "/getBaseUserData":
            (0, getbaseUserData_1.default)(req, res);
            break;
        case "/get-signed-url":
            (0, getSignedUrl_1.default)(req, res);
            break;
        case "/set-pfp-url":
            (0, set_pfp_url_1.default)(req, res);
            break;
        case "/set-user-setting":
            (0, set_user_setting_1.default)(req, res);
            break;
        case "/make-goal":
            (0, make_goal_1.default)(req, res);
            break;
        case "/get-goals":
            (0, get_goals_1.default)(req, res);
            break;
        case "/change-goal-status":
            (0, change_goal_status_1.default)(req, res);
            break;
        case "/get-products":
            (0, get_products_1.default)(req, res);
            break;
        case "/add-to-cart":
            (0, add_to_cart_1.default)(req, res);
            break;
        case "/get-cart-items":
            (0, get_cart_items_1.default)(req, res);
            break;
        case "/remove-cart-item":
            (0, remove_cart_item_1.default)(req, res);
            break;
        case "/create-checkout-session-shop":
            (0, create_checkout_session_shop_1.default)(req, res);
            break;
        case "/clear-cart":
            (0, clear_cart_1.default)(req, res);
            break;
        case "/make-path":
            (0, make_path_1.default)(req, res);
            break;
        case "/make-workout":
            (0, make_workout_1.default)(req, res);
            break;
        case "/get-group-by-keyword":
            console.log("here");
            (0, get_group_by_keyword_1.default)(req, res);
            break;
    }
});
console.log("running on ".concat(process.env.PORT));
server.listen(parseInt(process.env.PORT));
