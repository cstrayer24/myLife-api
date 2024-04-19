import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import prsima from "../prisma";
import writeLogs from "../writeLogs";

export default function makeDiet(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  useCors(req, res, (req, res) => {
    const chunks = [];

    req
      .on("data", (c) => {
        chunks.push(c);
      })
      .on("end", async () => {
        try {
          if (req.method !== "POST") {
            res.writeHead(405, "wrong method");
            res.end();
            return;
          }

          const sessionid = req.headers["x-sessionid"];
          if (!sessionid) {
            res.writeHead(403, "unauthorized");
            res.end();
            return;
          }

          const data = chuncksToJson(chunks);
          const breakfast = await prsima.meal.create({
            data: {
              drink: data.breakfast.drink,
              carb: data.breakfast.carb,
              mainProtien: data.breakfast.protein,
              fruit: data.breakfast.fruit,
              vegtable: data.breakfast.vegetable,
            },
          });
          const lunch = await prsima.meal.create({
            data: {
              drink: data.lunch.drink,
              carb: data.lunch.carb,
              mainProtien: data.lunch.protein,
              fruit: data.lunch.fruit,
              vegtable: data.lunch.vegetable,
            },
          });
          const dinner = await prsima.meal.create({
            data: {
              drink: data.dinner.drink,
              carb: data.dinner.carb,
              mainProtien: data.dinner.protein,
              fruit: data.dinner.fruit,
              vegtable: data.dinner.vegetable,
            },
          });
          const diet = await prsima.diet.create({
            data: {
              name: data.name,
              dinner: dinner.id,
              breakfastid: breakfast.id,
              lunchid: lunch.id,
            },
          });

          res.writeHead(200, "success");
          res.end();
          return;
        } catch (err) {
          writeLogs(err.message);
          res.writeHead(500, "internal error");
          res.end();
          return;
        }
      });
  });
}
