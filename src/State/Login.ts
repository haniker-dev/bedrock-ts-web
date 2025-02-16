import * as LoginApi from "../../../core/Api/Public/Login"
import { ErrorPassword } from "../../../core/App/User/Password"
import { Maybe } from "../../../core/Data/Maybe"
import * as RD from "../../../core/Data/RemoteData"
import { ErrorEmail } from "../../../core/Data/User/Email"
import { ApiError } from "../Api"
import type { State } from "../State"

export type LoginState = {
  email: string
  password: string
  formError: Maybe<FormError>
  loginResponse: RD.RemoteData<ApiError<LoginApi.ErrorCode>, LoginApi.Payload>
}

export type FormError = ErrorEmail | ErrorPassword

export function initLoginState(): LoginState {
  return {
    email: "",
    password: "",
    formError: null,
    loginResponse: RD.notAsked(),
  }
}

export function _LoginState(state: State, login: Partial<LoginState>): State {
  return { ...state, login: { ...state.login, ...login } }
}
