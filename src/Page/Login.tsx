import { JSX } from "react"
import { css } from "@emotion/css"
import { State } from "../State"
import { font } from "../View/Theme"
import { emit } from "../Runtime/React"
import { RemoteData } from "../../../core/Data/RemoteData"
import { ApiError } from "../Api"
import * as LoginApi from "../Api/Public/Login"
import * as LoginState from "../State/Login"
import * as LoginAction from "../Action/Login"
import { Maybe } from "../../../core/Data/Maybe"

export type Props = { state: State }
export default function LoginPage(props: Props): JSX.Element {
  const { formError, loginResponse } = props.state.login

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>Login Page</div>

      {errorMessage(formError, loginResponse)}

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault()
          emit(LoginAction.onSubmit())
        }}
      >
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => emit(LoginAction.onChange("Email", e.target.value))}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) =>
            emit(LoginAction.onChange("Password", e.target.value))
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

function errorMessage(
  formError: Maybe<LoginState.FormError>,
  response: RemoteData<ApiError<LoginApi.ErrorCode>, LoginApi.Payload>,
): JSX.Element {
  if (formError != null) {
    switch (formError) {
      case "INVALID_EMAIL":
        return <p>Invalid Email</p>
      case "INVALID_LENGTH":
      case "MISSING_NUMBER":
      case "MISSING_SYMBOL":
      case "CONTAINS_SPACE":
        return (
          <p>
            Password must be at least 8 chars with no spaces and include 1
            symbol and 1 number
          </p>
        )
    }
  }
  switch (response._t) {
    case "NotAsked":
      return <></>
    case "Loading":
      return <p>Logging you in...</p>
    case "Failure":
      return <p>{LoginApi.errorString(response.error)}</p>
    case "Success":
      return <p>Login Success! Redirecting you now...</p>
  }
}

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
  pageTitle: css({
    ...font.regularH1_42,
  }),
  form: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
}
