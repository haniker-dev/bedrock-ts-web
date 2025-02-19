import { Action, cmd } from "../Action"
import { _UpdateProfileState, UpdateProfileState } from "../State/UpdateProfile"
import * as FieldString from "../../../core/Data/Form/FieldString"
import * as UpdateProfileApi from "../Api/Auth/UpdateProfile"
import * as RD from "../../../core/Data/RemoteData"
import { _AuthState, AuthState } from "../State"
import { createPasswordE } from "../../../core/App/User/Password"

export function onChangeState(fields: Partial<UpdateProfileState>): Action {
  return (state) =>
    _AuthState((authState: AuthState) => {
      return [_UpdateProfileState(authState, fields), cmd()]
    }, state)
}

export function onSubmit(params: UpdateProfileApi.BodyParams): Action {
  return (state) =>
    _AuthState((authState: AuthState) => {
      return [
        _UpdateProfileState(authState, { updateResponse: RD.loading() }),
        cmd(UpdateProfileApi.call(params).then(onSubmitResponse)),
      ]
    }, state)
}

function onSubmitResponse(response: UpdateProfileApi.Response): Action {
  return (state) =>
    _AuthState((authState: AuthState) => {
      if (response._t === "Left") {
        return [
          _UpdateProfileState(authState, {
            updateResponse: RD.failure(response.error),
          }),
          cmd(),
        ]
      }

      const { user } = response.value
      return [
        _UpdateProfileState(
          { ...authState, profile: user },
          {
            updateResponse: RD.success(response.value),
            newPassword: FieldString.init("", createPasswordE),
            confirmPassword: FieldString.init("", createPasswordE),
            currentPassword: FieldString.init("", createPasswordE),
          },
        ),
        cmd(),
      ]
    }, state)
}
