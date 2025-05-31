import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("./layouts/root-layout.tsx", [
    route("/games/:gametype", "./routes/game-type.tsx", [
      route("account-login-quick", "./routes/login.tsx", { id: "game-login" }),
      route("new-register-entry/account", "./routes/signup.tsx", {
        id: "game-signup",
      }),
      route(
        "account-login-quick/forgot-password/:medium",
        "./routes/forgot-password.tsx",
        {
          id: "game-forgot-password",
        }
      ),
    ]),

    route("/", "./routes/index.tsx", [
      route("account-login-quick", "./routes/login.tsx", { id: "home-login" }),
      route("new-register-entry/account", "./routes/signup.tsx", {
        id: "home-signup",
      }),
      route("member/wallet/deposit", "./routes/deposit.tsx"),
      route(
        "account-login-quick/forgot-password/:medium",
        "./routes/forgot-password.tsx",
        {
          id: "home-forgot-password",
        }
      ),
    ]),
  ]),

  layout("./layouts/game-layout.tsx", [
    route(
      "/open-game/:pcode/:ptype/:gcode/:operator",
      "./routes/open-game.tsx"
    ),
  ]),
] satisfies RouteConfig;
