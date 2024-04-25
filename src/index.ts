import { createServer } from "http";
import { config } from "dotenv";

import writeLogs from "./writeLogs";
//route handlers
import makeLetterReciver from "./route-handlers/make-letter-reciver";
import step1 from "./route-handlers/registration/step1";
import step2 from "./route-handlers/registration/step2";
import step3 from "./route-handlers/registration/step3";
import step4 from "./route-handlers/registration/step4";
import login from "./route-handlers/login";
import getBaseUserData from "./route-handlers/getbaseUserData";
import getSignedUrl from "./route-handlers/getSignedUrl";
import setPfpUrl from "./route-handlers/set-pfp-url";
import setUserSetting from "./route-handlers/set-user-setting";
import makeGoal from "./route-handlers/make-goal";
import getGoals from "./route-handlers/get-goals";
import changeGoalStatus from "./route-handlers/change-goal-status";
import getProducts from "./route-handlers/get-products";
import addToCart from "./route-handlers/add-to-cart";
import getCartItems from "./route-handlers/get-cart-items";
import removeCartItem from "./route-handlers/remove-cart-item";
import createCheckoutSessionShop from "./route-handlers/create-checkout-session-shop";
import clearCart from "./route-handlers/clear-cart";
import makePath from "./route-handlers/make-path";
import makeWorkout from "./route-handlers/make-workout";
import getGroupByKeyword from "./route-handlers/get-group-by-keyword";

config();
console.log(`starting at ${new Date().toLocaleTimeString()}`);
const server = createServer((req, res) => {
  writeLogs(`request from ${req.url} at ${new Date().getUTCDay()}`);
  console.log("api request");
  switch (req.url) {
    case "/test":
      res.write("hi");

      res.end();
      break;

    case "/newsletter/signup":
      makeLetterReciver(req, res);

      break;

    case "/registration-step1":
      step1(req, res);

      break;

    case "/registration-step2":
      step2(req, res);
      break;

    case "/registration-step3":
      step3(req, res);
      break;

    case "/registration-step4":
      step4(req, res);
      break;

    case "/user-login":
      login(req, res);
      break;
    case "/getBaseUserData":
      getBaseUserData(req, res);
      break;
    case "/get-signed-url":
      getSignedUrl(req, res);
      break;

    case "/set-pfp-url":
      setPfpUrl(req, res);
      break;
    case "/set-user-setting":
      setUserSetting(req, res);
      break;
    case "/make-goal":
      makeGoal(req, res);

      break;

    case "/get-goals":
      getGoals(req, res);
      break;
    case "/change-goal-status":
      changeGoalStatus(req, res);

      break;

    case "/get-products":
      getProducts(req, res);
      break;

    case "/add-to-cart":
      addToCart(req, res);
      break;
    case "/get-cart-items":
      getCartItems(req, res);
      break;
    case "/remove-cart-item":
      removeCartItem(req, res);
      break;
    case "/create-checkout-session-shop":
      createCheckoutSessionShop(req, res);
      break;
    case "/clear-cart":
      clearCart(req, res);
      break;

    case "/make-path":
      makePath(req, res);

      break;
    case "/make-workout":
      makeWorkout(req, res);
      break;

    case "/get-group-by-keyword":
      console.log("here");
      getGroupByKeyword(req, res);
      break;
  }
});

console.log(`running on ${process.env.PORT}`);

server.listen(parseInt(process.env.PORT));
