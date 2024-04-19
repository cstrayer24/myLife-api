import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import prsima from "../prisma";
import {
  Prisma,
  countedActivity,
  exercise,
  timedActivity,
} from "@prisma/client";
import writeLogs from "../writeLogs";

export default function makeWorkout(
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
          const warmup = await prsima.stretch.create({
            data: {
              type: data.warmup.type,
              reps: data.warmup.reps,
            },
          });

          const cooldown = await prsima.stretch.create({
            data: {
              reps: data.cooldown.reps,
              type: data.cooldown.type,
            },
          });
          let activity: countedActivity | timedActivity;
          if (data.exercise.trackingType === "timed") {
            activity = await prsima.timedActivity.create({
              data: {
                minutes: data.exercise.minutes,
                seconds: data.exercise.seconds,
              },
            });
          } else {
            activity = await prsima.countedActivity.create({
              data: {
                rps: data.exercise.reps,
                sets: data.exercise.sets,
              },
            });
          }
          const exercise = await prsima.exercise.create({
            data: {
              activityid: activity.id,
              type: data.exercise.type,
            },
          });
          await prsima.workout.create({
            data: {
              name: data.name,
              warmupStretchid: warmup.id,
              coolDownStretchid: cooldown.id,
              mainExerciseid: exercise.id,
            },
          });
        } catch (e) {
          writeLogs(e.message);
          res.writeHead(500, "err");
          res.end();
          return;
        }
      });
  });
}
