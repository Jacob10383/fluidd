import type { GetterTree } from 'vuex'
import type { FilamentBoxState } from './types'
import type { RootState } from '../types'
import type { Spool } from '../spoolman/types'

export const getters = {
  getSlots: (state): (number | null)[] => {
    return state.slots
  },

  getSlotSpool: (state, getters, rootState, rootGetters) => (index: number): Spool | undefined => {
    const spoolId = state.slots[index]
    if (spoolId == null) return undefined
    return rootGetters['spoolman/getSpoolById'](spoolId)
  }
} satisfies GetterTree<FilamentBoxState, RootState>
