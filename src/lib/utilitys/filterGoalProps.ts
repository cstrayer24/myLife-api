import { goal } from "@prisma/client";
import setObj from "./setObj";

export default function filterGoalProps(gp: goal[]) {
  const newGoalsArr = [];

  gp.forEach((v) => {
    const newObjKeys = Object.keys(v).filter((k) => k === "userId");
    newGoalsArr.push(setObj<goal>(newObjKeys, v));
  });

  return newGoalsArr;
}
