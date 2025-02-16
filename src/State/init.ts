import { Route } from "../Route"
import { AuthState, State } from "../State"
import * as AuthToken from "../Data/AuthToken"
import { initLoginState } from "./Login"
import { User } from "../../../core/App/User"

export function initState(route: Route): State {
  const token = AuthToken.get()
  return {
    _t: token == null ? "Public" : "LoadingAuth",
    route,
    login: initLoginState(),
  }
}

export function initAuthState(profile: User, state: State): AuthState {
  return {
    ...state,
    _t: "Auth",
    profile,
  }
}
