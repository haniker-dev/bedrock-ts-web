import { css } from "@emotion/css"
import { AuthState } from "../../../State"
import { JSX } from "react"
import { localImage } from "../../ImageLocalSrc"
import { navigate } from "../../Link"
import { toRoute } from "../../../Route"
import { color, font, theme } from "../../Theme"
import { emit } from "../../../Runtime/React"
import * as LoginAction from "../../../Action/Login"

type Props = { authState: AuthState }
export default function (props: Props): JSX.Element {
  const { authState } = props

  return (
    <div className={styles.container}>
      <a
        {...navigate(toRoute("Home", {}))}
        className={styles.logo}
      >
        <img src={localImage.logo.unwrap()} />
      </a>
      <div className={styles.menuItems}>
        <a
          {...navigate(toRoute("Home", {}))}
          className={
            authState.route._t === "Home"
              ? styles.menuItemActive
              : styles.menuItem
          }
        >
          Home
        </a>
        <a
          {...navigate(toRoute("Profile", {}))}
          className={
            authState.route._t === "Profile"
              ? styles.menuItemActive
              : styles.menuItem
          }
        >
          Profile
        </a>
        <button
          onClick={() => emit(LoginAction.logout())}
          className={styles.menuItem}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: css({
    display: "flex",
    padding: theme.s4,
    gap: theme.s4,
    justifyContent: "space-between",
    alignItems: "center",
  }),
  logo: css({
    display: "flex",
  }),
  menuItems: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  menuItem: css({
    ...font.medium14,
    color: color.secondary500,
    textDecoration: "none",
    padding: `${theme.s2} ${theme.s4}`,
    border: theme.s0,
    backgroundColor: color.transparent,
    cursor: "pointer",
  }),
  menuItemActive: css({
    ...font.medium14,
    color: color.neutral0,
    textDecoration: "none",
    padding: `${theme.s2} ${theme.s4}`,
    border: theme.s0,
    backgroundColor: color.primary500,
    cursor: "pointer",
    borderRadius: theme.br2,
  }),
}
