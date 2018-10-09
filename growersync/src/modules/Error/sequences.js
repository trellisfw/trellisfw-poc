import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import { sequence } from 'cerebral'

export const onClosePressed = sequence('onClosePressed', [
  set(state`Error.open`, false)
]);
