import type { ActionTree } from 'vuex'
import type { FilamentBoxState } from './types'
import type { RootState } from '../types'
import { SocketActions } from '@/api/socketActions'

const KEY = 'filamentBox.slots'

export const actions = {
  /**
   * Reset our store
   */
  async reset ({ commit }) {
    commit('setReset')
  },

  /**
   * Init - load slots from moonraker database
   */
  async init () {
    // Request the data from the database
    // The response will be handled by onFilamentBoxRead
    SocketActions.serverRead(KEY, undefined, {
      dispatch: 'filamentBox/onFilamentBoxRead'
    })
  },

  /**
   * Handle database read response
   */
  async onFilamentBoxRead ({ commit }, payload: { key: string; value?: (number | null)[] }) {
    if (payload?.value && Array.isArray(payload.value)) {
      commit('setSlots', payload.value)
    } else {
      // No data found, but we're still loaded
      commit('setLoaded', true)
    }
  },

  /**
   * Save slots to moonraker database
   */
  async saveSlots ({ state }) {
    SocketActions.serverWrite(KEY, state.slots)
  },

  /**
   * Set a single slot and persist
   */
  async setSlot ({ commit, dispatch }, payload: { index: number; spoolId: number | null }) {
    commit('setSlot', payload)
    await dispatch('saveSlots')
  }
} satisfies ActionTree<FilamentBoxState, RootState>
