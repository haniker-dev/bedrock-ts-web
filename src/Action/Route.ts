import type { Cmd } from "../Action"
import { parseRoute } from "../Route"
import { _AuthState, _PublicState, State } from "../State"
import * as ProfileAction from "./Profile"

export function onUrlChange(state: State): [State, Cmd] {
  const route = parseRoute(window.location.href)
  const _state = _PublicState(state, { route })

  switch (route._t) {
    case "Home":
    case "Login":
    case "NotFound":
      return [_state, []]
    case "Profile":
      return _AuthState(ProfileAction.onEnterRoute, _state)
  }
}
