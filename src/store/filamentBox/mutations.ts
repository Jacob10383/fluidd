import Vue from 'vue'
import type { MutationTree } from 'vuex'
import type { FilamentBoxDialogState, FilamentBoxState } from './types'
import { defaultState } from './state'

export const mutations = {
  setReset (state) {
    Object.assign(state, defaultState())
  },

  setSlots (state, payload: (number | null)[]) {
    state.slots = payload
    state.loaded = true
  },

  setSlot (state, payload: { index: number; spoolId: number | null }) {
    Vue.set(state.slots, payload.index, payload.spoolId)
  },

  setDialogState (state, payload: FilamentBoxDialogState) {
    state.dialog = payload
  },

  setLoaded (state, payload: boolean) {
    state.loaded = payload
  }
} satisfies MutationTree<FilamentBoxState>
