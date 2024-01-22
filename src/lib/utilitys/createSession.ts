import { IncomingMessage, ServerResponse } from "http";
import prsima from "../../prisma";

import createCookie from "./createCookie";
export default async function createSession(userId: string) {
  const weekFromNow = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);
  try {
    const session = await prsima.session.create({
      data: {
        userId,
        expiresAt: weekFromNow,
      },
    });

    return session;
  } catch (error) {
    console.log(error);
  }
}
