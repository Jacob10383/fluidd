<template>
  <app-dialog
    v-model="open"
    :title="$t('app.filament_box.title.select_spool_for_slot', { slot: (slotIndex ?? 0) + 1 })"
    max-width="600"
  >
    <v-card-text>
      <v-text-field
        v-model="search"
        outlined
        dense
        hide-details
        :placeholder="$t('app.general.label.search')"
        append-icon="$magnify"
        class="mb-4"
        @focus="$event.target.select()"
      />

      <v-list
        dense
        class="spool-list"
      >
        <v-list-item
          v-for="spool in filteredSpools"
          :key="spool.id"
          :class="{ 'v-list-item--active primary': spool.id === selectedSpoolId }"
          @click="selectedSpoolId = spool.id"
        >
          <v-list-item-icon>
            <v-icon :color="getSpoolColor(spool)">
              $filament
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ spool.filament_name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ spool.filament.material || 'Unknown' }}
              <span v-if="spool.remaining_weight != null">
                · {{ $filters.getReadableWeightString(spool.remaining_weight) }} remaining
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <small class="grey--text">ID: {{ spool.id }}</small>
          </v-list-item-action>
        </v-list-item>

        <v-list-item v-if="filteredSpools.length === 0">
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              {{ $t('app.file_system.msg.not_found') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>

    <template #actions>
      <v-spacer />
      <app-btn
        text
        color="warning"
        @click="open = false"
      >
        {{ $t('app.general.btn.cancel') }}
      </app-btn>
      <app-btn
        color="primary"
        :disabled="selectedSpoolId == null"
        @click="handleConfirm"
      >
        {{ $t('app.general.btn.save') }}
      </app-btn>
    </template>
  </app-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import StateMixin from '@/mixins/state'
import type { Spool } from '@/store/spoolman/types'

@Component
export default class FilamentBoxSlotDialog extends Mixins(StateMixin) {
  search = ''
  selectedSpoolId: number | null = null

  @Watch('open')
  onOpen () {
    if (this.open && this.slotIndex != null) {
      const slots = this.$typedGetters['filamentBox/getSlots']
      this.selectedSpoolId = slots[this.slotIndex] ?? null
      this.search = ''
    }
  }

  get open (): boolean {
    return this.$typedState.filamentBox.dialog.show
  }

  set open (val: boolean) {
    this.$typedCommit('filamentBox/setDialogState', {
      ...this.$typedState.filamentBox.dialog,
      show: val
    })
  }

  get slotIndex (): number | undefined {
    return this.$typedState.filamentBox.dialog.slotIndex
  }

  get availableSpools (): Spool[] {
    return this.$typedGetters['spoolman/getAvailableSpools']
      .filter((s: Spool) => !s.archived)
  }

  get filteredSpools (): Spool[] {
    if (!this.search) return this.availableSpools
    const query = this.search.toLowerCase()
    return this.availableSpools.filter(spool =>
      spool.filament_name?.toLowerCase().includes(query) ||
      spool.filament.material?.toLowerCase().includes(query) ||
      spool.id.toString().includes(query)
    )
  }

  getSpoolColor (spool: Spool): string {
    return spool.filament.color_hex ?? (this.$vuetify.theme.dark ? '#fff' : '#000')
  }

  handleConfirm () {
    if (this.slotIndex != null && this.selectedSpoolId != null) {
      this.$typedDispatch('filamentBox/setSlot', {
        index: this.slotIndex,
        spoolId: this.selectedSpoolId
      })
    }
    this.open = false
  }
}
</script>

<style lang="scss" scoped>
.spool-list {
  max-height: 400px;
  overflow-y: auto;
}
</style>
