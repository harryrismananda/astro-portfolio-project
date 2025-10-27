import { defineMiddleware } from "astro:middleware";
import { Users } from "../models/users";
import * as jose from "jose"

export const onRequest = defineMiddleware( async (context, next) => {
  const publicRoutes = ["/", "/portfolio", "/login", "/register", "/resume"];
  const url = new URL(context.request.url)
  if (publicRoutes.some(route => url.pathname.startsWith(route))) {
    return next();
  }

  const authHeader = context.request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Invalid token", { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  if(!token) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    // Assuming verifyToken is a function that verifies the JWT token
    const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET);
    const verifiedToken = await jose.jwtVerify(token, secret);
    const user = await Users.where("_id", verifiedToken.payload.id).first();
    if (!user) {
      return context.redirect("/login");
    }
    const payload = { id: user._id, username: user.username };
    context.locals.user = payload;
    return next();

  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }
});
