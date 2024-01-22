const createCookie = (
  key: string,
  value: string,
  path?: string,
  httpOnly?: boolean,
  expiresAt?: Date,
  SameSite?: "None" | "strict" | "lax",
  secure?: boolean
) => {
  return `${key}=${value};${path ? `path=${path};` : ""}${
    httpOnly ? "httpOnly;" : ""
  }${expiresAt ? `Expires=${expiresAt.toUTCString()};` : ""}${
    secure ? "Secure;" : ""
  }${SameSite ? `SameSite=${SameSite}` : ""}`;
};

export default createCookie;
