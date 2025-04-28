import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/root-layout.tsx", [
    route("/", "./routes/index.tsx", [
      route("account-login-quick", "./routes/login.tsx", { id: "home-login" }),
      route("new-register-entry/account", "./routes/signup.tsx", {
        id: "home-signup",
      }),
    ]),
    ...prefix("about", [
      route("/", "./routes/about.tsx", [
        route("account-login-quick", "./routes/login.tsx", {
          id: "about-login",
        }),
        route("new-register-entry/account", "./routes/signup.tsx", {
          id: "about-signup",
        }),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
