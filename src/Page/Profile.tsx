import { JSX } from "react"
import { css } from "@emotion/css"
import { AuthState } from "../State"
import { font } from "../View/Theme"
import * as LoginAction from "../Action/Login"
import { emit } from "../Runtime/React"

export type Props = { authState: AuthState }
export default function ProfilePage(props: Props): JSX.Element {
  const { profile } = props.authState

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>Profile Page</div>
      <p>Hello, {profile.name.unwrap()}!</p>
      <button onClick={() => emit(LoginAction.logout())}>Log out</button>
    </div>
  )
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
}
