import prsima from "../../prisma";

export default async function getUserFromSessionid(sessionid: string) {
  const session = await prsima.session.findFirst({
    where: {
      id: sessionid,
    },
  });

  const user = await prsima.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  return user;
}
