import { Action, cmd, perform } from "../Action"
import { _LoginState, LoginState } from "../State/Login"
import * as LoginApi from "../Api/Public/Login"
import * as LogoutApi from "../Api/Auth/Logout"
import * as RD from "../../../core/Data/RemoteData"
import * as AuthToken from "../Data/AuthToken"
import { navigateTo, toRoute } from "../Route"
import { initAuthState, initState } from "../State/init"

export function onChangeState(fields: Partial<LoginState>): Action {
  return (state) => {
    return [_LoginState(state, fields), cmd()]
  }
}

export function logout(): Action {
  return (state) => {
    return [state, cmd(LogoutApi.call().then(AuthToken.remove).then(onLogout))]
  }
}

function onLogout(): Action {
  return (_state) => {
    return [initState(toRoute("Login", { redirect: null })), cmd()]
  }
}

export function onSubmit(params: LoginApi.BodyParams): Action {
  return (state) => {
    return [
      _LoginState(state, { loginResponse: RD.loading() }),
      cmd(LoginApi.call(params).then(onSubmitResponse)),
    ]
  }
}

function onSubmitResponse(response: LoginApi.Response): Action {
  return (state) => {
    if (response._t === "Left") {
      return [
        _LoginState(state, {
          loginResponse: RD.failure(response.error),
        }),
        cmd(),
      ]
    }

    const { user, accessToken, refreshToken } = response.value

    AuthToken.set({
      userID: user.id,
      accessToken,
      refreshToken,
    })

    return [
      _LoginState(initAuthState(user, state), {
        loginResponse: RD.success(response.value),
      }),
      cmd(perform(navigateTo(toRoute("Home", {})))),
    ]
  }
}
