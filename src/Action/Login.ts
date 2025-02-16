import { Action, cmd, perform } from "../Action"
import { _LoginState } from "../State/Login"
import * as LoginApi from "../Api/Public/Login"
import * as LogoutApi from "../Api/Auth/Logout"
import * as RD from "../../../core/Data/RemoteData"
import * as AuthToken from "../Data/AuthToken"
import { createEmailE } from "../../../core/Data/User/Email"
import { createPasswordE } from "../../../core/App/User/Password"
import { navigateTo } from "./Route"
import { toRoute } from "../Route"
import { initAuthState, initState } from "../State/init"

export type Field = "Email" | "Password"

export function onChange(field: Field, value: string): Action {
  return (state) => {
    return [
      _LoginState(state, {
        email: field === "Email" ? value : state.login.email,
        password: field === "Password" ? value : state.login.password,
      }),
      cmd(),
    ]
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

export function onSubmit(): Action {
  return (state) => {
    const emailM = createEmailE(state.login.email)
    if (emailM._t === "Left") {
      return [
        _LoginState(state, {
          formError: emailM.error,
        }),
        cmd(),
      ]
    }

    const passwordM = createPasswordE(state.login.password)
    if (passwordM._t === "Left") {
      return [
        _LoginState(state, {
          formError: passwordM.error,
        }),
        cmd(),
      ]
    }

    return [
      _LoginState(state, {
        formError: null,
        loginResponse: RD.loading(),
      }),
      cmd(
        LoginApi.call({
          email: emailM.value,
          password: passwordM.value,
        }).then(onSubmitResponse),
      ),
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

    AuthToken.set({
      userID: response.value.user.id,
      accessToken: response.value.accessToken,
      refreshToken: response.value.refreshToken,
    })

    return [
      _LoginState(initAuthState(response.value.user, state), {
        loginResponse: RD.success(response.value),
      }),
      cmd(perform(navigateTo(toRoute("Profile", {})))),
    ]
  }
}
