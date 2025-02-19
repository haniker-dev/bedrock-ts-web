import { BaseSyntheticEvent } from "react"
import { navigateTo, Route, toPath } from "../Route"
import { emit } from "../Runtime/React"

export function navigate(route: Route, onClick?: () => void) {
  return {
    onClick: (e: BaseSyntheticEvent) => {
      emit(navigateTo(route))
      if (onClick) {
        onClick()
      }
      e.preventDefault()
    },
    href: toPath(route),
  }
}

export function goBack(): void {
  history.back()
}
