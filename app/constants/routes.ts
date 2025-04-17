export enum GuestRoute {
  Home = "/",
  NotFound = "/404",
  Exclusive = "/exclusive"
}

export enum ProtectedRoute {
  Deposit = "/user/deposit",
  Profile = "/user/profile",
  Settings = "/user/settings",
  Cricket = "/sports/cricket"
}

export enum UnProtectedRoute {
  Login = "/auth/login",
  Signup = "/auth/signup",
  ForgotPassword = "/auth/forgot-password"
}
