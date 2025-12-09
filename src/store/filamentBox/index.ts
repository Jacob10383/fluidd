import type { Module } from 'vuex'
import { state } from './state'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import type { FilamentBoxState } from './types'
import type { RootState } from '../types'

export const filamentBox = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
} satisfies Module<FilamentBoxState, RootState>
