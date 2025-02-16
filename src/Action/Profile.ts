import { Cmd } from "../Action"
import { _AuthState, AuthState, State } from "../State"

// TODO Give a onEnterRoute example
export function onEnterRoute(authState: AuthState): [State, Cmd] {
  return [authState, []]
}
