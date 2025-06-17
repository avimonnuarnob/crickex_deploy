import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("./layouts/root-layout.tsx", [
    route("/terms-and-conditions", "./routes/terms-and-conditions.tsx", [
      route("account-login-quick", "./routes/login.tsx", { id: "terms-login" }),
      route("new-register-entry/account", "./routes/signup.tsx", {
        id: "terms-signup",
      }),
      route(
        "account-login-quick/forgot-password/:medium",
        "./routes/forgot-password.tsx",
        {
          id: "terms-forgot-password",
        }
      ),
    ]),

    route("/responsible-gaming", "./routes/responsible-gaming.tsx", [
      route("account-login-quick", "./routes/login.tsx", {
        id: "responsible-login",
      }),
      route("new-register-entry/account", "./routes/signup.tsx", {
        id: "responsible-signup",
      }),
      route(
        "account-login-quick/forgot-password/:medium",
        "./routes/forgot-password.tsx",
        {
          id: "responsible-forgot-password",
        }
      ),
    ]),

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
      route("member/new-profile-info", "./routes/profile.tsx", {
        id: "home-profile",
      }),
      route("member/transaction-records", "./routes/transaction-records.tsx", {
        id: "home-transaction-records",
      }),
      route("member/change-password", "./routes/change-password.tsx", {
        id: "home-change-password",
      }),
      route("member/inbox/notifications", "./routes/notifications.tsx", {
        id: "home-notifications",
      }),
    ]),
  ]),

  layout("./layouts/game-layout.tsx", [
    route(
      "/open-game/:pcode/:ptype/:gcode/:operator",
      "./routes/open-game.tsx"
    ),
  ]),
] satisfies RouteConfig;
