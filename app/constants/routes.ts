export enum GuestRoute {
  Home = "/",
  NotFound = "/404",
  Exclusive = "/exclusive",
}

export enum ProtectedRoute {
  Deposit = "/user/deposit",
  Profile = "/user/profile",
  Settings = "/user/settings",
  Cricket = "/sports/cricket",
}

export enum UnProtectedRoute {
  Login = "account-login-quick",
  Signup = "new-register-entry/account",
  ForgotPassword = "/auth/forgot-password",
}
