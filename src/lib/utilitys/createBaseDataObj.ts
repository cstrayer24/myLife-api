import type { baseUser } from "../types/userBaseData";

import type {
  mental_profile,
  User,
  diet_profile,
  physical_profile,
} from "@prisma/client";
import baseData, {
  dietBaseData,
  mentalBaseData,
  physicalBaseData,
} from "../types/userBaseData";

import setObj from "./setObj";

export default function createBaseDataObj(
  user: User,
  diet: diet_profile,
  physical: physical_profile,
  mental: mental_profile
) {
  //filter the rest of the keys

  const userKeys = Object.keys(user).filter(
    (v) =>
      ![
        "diet_profile",
        "mental_profile",
        "physical_profile",
        "password",
      ].includes(v) && !v.includes("id")
  );
  const dietKeys = Object.keys(diet).filter(
    (v) => !["id", "userId", "userID"].includes(v)
  );
  const physicalKeys = Object.keys(physical).filter(
    (v) => !["id", "userId", "useriD"].includes(v)
  );
  const mentalKeys = Object.keys(mental).filter(
    (v) => !["id", "userid", "userID"].includes(v)
  );

  const data: baseData = {
    info: setObj<baseUser>(userKeys, user),
    physical: setObj<physicalBaseData>(physicalKeys, physical),
    diet: setObj<dietBaseData>(dietKeys, diet),
    mental: setObj<mentalBaseData>(mentalKeys, mental),
  };
  return data;
}
