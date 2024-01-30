import { createServer } from "http";
import { config } from "dotenv";
//route handlers
import makeLetterReciver from "./route-handlers/make-letter-reciver";
import step1 from "./route-handlers/registration/step1";
import step2 from "./route-handlers/registration/step2";
import step3 from "./route-handlers/registration/step3";
import writeLogs from "./writeLogs";
import step4 from "./route-handlers/registration/step4";
import login from "./route-handlers/login";
import getBaseUserData from "./route-handlers/getbaseUserData";

config();
console.log(`starting at ${new Date().toLocaleTimeString()}`);
const server = createServer((req, res) => {
  writeLogs(`request from ${req.url} at ${new Date().getUTCDay()}`);
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
  }
});

console.log(`running on ${process.env.PORT}`);

server.listen(parseInt(process.env.PORT));
