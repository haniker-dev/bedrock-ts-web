import { css } from "@emotion/css"
import { AuthState } from "../../State"
import { JSX } from "react"

type Props = { authState: AuthState; Page: React.FC<{ authState: AuthState }> }
export function AuthLayout(props: Props): JSX.Element {
  const { authState, Page } = props

  return (
    <div className={styles.container}>
      <Page authState={authState} />
    </div>
  )
}

const styles = {
  container: css({
    width: "100dvw",
    height: "100dvh",
  }),
}
