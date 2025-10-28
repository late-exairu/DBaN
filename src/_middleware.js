import { auth } from "./auth";

export default auth((_req) => {
  // const isLoggedIn = !!req.auth;
  // console.log("ROUTE: ", req.nextUrl.pathname);
  // console.log("IS LOGGED IN?", isLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
