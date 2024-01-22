import createCookie from "./createCookie";
const createSessionCookie = (id: string) =>
  createCookie(
    "sessionid",
    id,
    "/",
    true,
    new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
    "None",
    true
  );
export default createSessionCookie;
