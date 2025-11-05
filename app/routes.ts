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
      route("member/common-referral/invite", "./routes/referral.tsx", {
        id: "game-referral",
      }),
    ]),

    route("/promotion", "./routes/promotion.tsx", [
      route("account-login-quick", "./routes/login.tsx", {
        id: "promotion-login",
      }),
      route("new-register-entry/account", "./routes/signup.tsx", {
        id: "promotion-signup",
      }),
      route(
        "account-login-quick/forgot-password/:medium",
        "./routes/forgot-password.tsx",
        {
          id: "promotion-forgot-password",
        }
      ),
      route("member/wallet/:transaction_type", "./routes/transaction.tsx", {
        id: "promotion-transaction",
      }),
    ]),

    route("/", "./routes/index.tsx", [
      route("account-login-quick", "./routes/login.tsx", { id: "home-login" }),
      route("new-register-entry/account", "./routes/signup.tsx", {
        id: "home-signup",
      }),
      route("member/wallet/:transaction_type", "./routes/transaction.tsx", {
        id: "home-transaction",
      }),
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
      route(
        "member/new-profile-verify-phone",
        "./routes/profile-phone-verify.tsx",
        {
          id: "home-profile-verify-phone",
        }
      ),
      route(
        "member/new-profile-verify-email",
        "./routes/profile-email-verify.tsx",
        {
          id: "home-profile-verify-email",
        }
      ),
      route(
        "member/new-profile-verify-name",
        "./routes/profile-name-verify.tsx",
        {
          id: "home-profile-name-verify",
        }
      ),
      route(
        "member/new-profile-verify-dob",
        "./routes/profile-dob-verify.tsx",
        {
          id: "home-profile-dob-verify",
        }
      ),
      route("member/transaction-records", "./routes/transaction-records.tsx", {
        id: "home-transaction-records",
      }),
      route("member/change-password", "./routes/change-password.tsx", {
        id: "home-change-password",
      }),
      route("member/inbox/notifications", "./routes/notifications.tsx", {
        id: "home-notifications",
      }),
      route("member/common-referral/invite", "./routes/referral.tsx", {
        id: "home-referral",
      }),
      route("member/vip-points-exchange", "./routes/point-exchange.tsx", {
        id: "home-point-exchange",
      }),
      route("member/turnover/:status", "./routes/turnover.tsx", {
        id: "home-turnover",
      }),
      route("member/betting-records/:status", "./routes/betting-records.tsx", {
        id: "home-betting-records",
      }),
      route("member/real-time-bonus", "./routes/real-time-bonus.tsx", {
        id: "home-real-time-bonus",
      }),
      route("auto-pay/success", "./routes/auto-pay/success.tsx", {
        id: "home-auto-pay-success",
      }),
      route("auto-pay/cancel", "./routes/auto-pay/cancel.tsx", {
        id: "home-auto-pay-cancel",
      }),
    ]),

    route("/static-page/:page", "./routes/static-page.tsx", [
      route("account-login-quick", "./routes/login.tsx", {
        id: "static-page-login",
      }),
      route("new-register-entry/account", "./routes/signup.tsx", {
        id: "static-page-signup",
      }),
      route(
        "account-login-quick/forgot-password/:medium",
        "./routes/forgot-password.tsx",
        {
          id: "static-page-forgot-password",
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
