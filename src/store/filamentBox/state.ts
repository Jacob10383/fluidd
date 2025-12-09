import type { FilamentBoxState } from './types'

export const defaultState = (): FilamentBoxState => {
  return {
    slots: [null, null, null, null],
    dialog: {
      show: false
    }
  }
}

export const state = defaultState()
