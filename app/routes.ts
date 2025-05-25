import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/root-layout.tsx", [
    route("/games/:gametype", "./routes/game-type.tsx", [
      route("account-login-quick", "./routes/login.tsx", { id: "game-login" }),
      route("new-register-entry/account", "./routes/signup.tsx", {
        id: "game-signup",
      }),
    ]),

    route("/", "./routes/index.tsx", [
      route("account-login-quick", "./routes/login.tsx", { id: "home-login" }),
      route("new-register-entry/account", "./routes/signup.tsx", {
        id: "home-signup",
      }),
      route("member/wallet/deposit", "./routes/deposit.tsx"),
    ]),
  ]),

  layout("./layouts/game-layout.tsx", [
    route(
      "/open-game/:pcode/:ptype/:gcode/:operator",
      "./routes/open-game.tsx"
    ),
  ]),
] satisfies RouteConfig;
