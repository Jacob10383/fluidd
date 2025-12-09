import type { FilamentBoxState } from './types'

export const defaultState = (): FilamentBoxState => {
  return {
    slots: [null, null, null, null],
    dialog: {
      show: false
    },
    loaded: false
  }
}

export const state = defaultState()
