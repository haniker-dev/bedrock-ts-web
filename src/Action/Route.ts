import { Action, Cmd, cmd } from "../Action"
import { parseRoute, Route, toPath } from "../Route"
import { _AuthState, _PublicState, State } from "../State"
import * as ProfileAction from "./Profile"

/**
 * Navigate to a Route
 * WARN This should be the only function used for navigation
 * If you try to use window.history.pushState directly,
 * onUrlChange will not be triggered
 */
export function navigateTo(route: Route): Action {
  return (state: State) => {
    return [
      { ...state, route },
      cmd(
        Promise.resolve().then(() => {
          // NOTE window.dispatchEvent is synchronous
          // Hence, this is wrapped in a promise
          // NOTE history.pushState does not trigger popstate event
          // so we are triggering it manually (See Subscription.ts)
          window.history.pushState(null, "", toPath(route))
          window.dispatchEvent(new PopStateEvent("popstate"))
          return null
        }),
      ),
    ]
  }
}

export function onUrlChange(state: State): [State, Cmd] {
  const route = parseRoute(window.location.href)
  const _state = _PublicState(state, { route })

  switch (route._t) {
    case "Home":
    case "Login":
    case "NotFound":
      return [_state, cmd()]
    case "Profile":
      return _AuthState(ProfileAction.onEnterRoute, _state)
  }
}
