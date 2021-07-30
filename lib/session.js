import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD || "",
    cookieName: "with-iron-session",
    cookieOptions: {
      secure: process.env.NODE_END === "production" ? true : false,
    },
  });
}
