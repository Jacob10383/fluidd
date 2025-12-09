import type { MutationTree } from 'vuex'
import type { FilamentBoxDialogState, FilamentBoxState } from './types'
import { defaultState } from './state'

export const mutations = {
  setReset (state) {
    Object.assign(state, defaultState())
  },

  setSlots (state, payload: (number | null)[]) {
    state.slots = payload
  },

  setSlot (state, payload: { index: number; spoolId: number | null }) {
    state.slots[payload.index] = payload.spoolId
  },

  setDialogState (state, payload: FilamentBoxDialogState) {
    state.dialog = payload
  }
} satisfies MutationTree<FilamentBoxState>
