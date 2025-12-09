<template>
  <collapsable-card
    :title="$t('app.filament_box.title.filament_box')"
    icon="$filament"
    draggable
    layout-path="dashboard.filament-box-card"
  >
    <v-card-text>
      <v-row v-if="!isLoaded">
        <v-col class="text-center grey--text">
          <v-progress-circular
            indeterminate
            size="20"
            width="2"
            class="mr-2"
          />
          {{ $t('app.filament_box.msg.loading') }}
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="(slot, index) in slots"
          :key="index"
          cols="6"
          sm="3"
        >
          <div class="filament-slot">
            <div class="slot-header text-overline mb-1">
              {{ $t('app.filament_box.label.slot') }} {{ index + 1 }}
            </div>
            <v-btn
              outlined
              block
              class="slot-btn"
              :color="getSlotColor(index)"
              @click="handleSelectSlot(index)"
            >
              <div
                v-if="getSlotSpool(index)"
                class="slot-content"
              >
                <v-icon
                  :color="getSlotColor(index)"
                  class="spool-icon mr-1"
                  small
                >
                  $filament
                </v-icon>
                <span class="slot-name text-truncate">
                  {{ getSlotSpool(index)?.filament_name || `ID: ${slot}` }}
                </span>
              </div>
              <span
                v-else
                class="grey--text"
              >
                {{ $t('app.filament_box.label.empty') }}
              </span>
            </v-btn>
            <v-btn
              v-if="slot != null"
              icon
              x-small
              class="clear-btn"
              @click.stop="handleClearSlot(index)"
            >
              <v-icon x-small>
                $close
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <filament-box-slot-dialog />
  </collapsable-card>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import StateMixin from '@/mixins/state'
import type { Spool } from '@/store/spoolman/types'
import FilamentBoxSlotDialog from './FilamentBoxSlotDialog.vue'

@Component({
  components: {
    FilamentBoxSlotDialog
  }
})
export default class FilamentBoxCard extends Mixins(StateMixin) {
  get slots (): (number | null)[] {
    return this.$typedGetters['filamentBox/getSlots']
  }

  get isLoaded (): boolean {
    return this.$typedState.filamentBox.loaded
  }

  getSlotSpool (index: number): Spool | undefined {
    return this.$typedGetters['filamentBox/getSlotSpool'](index)
  }

  getSlotColor (index: number): string {
    const spool = this.getSlotSpool(index)
    return spool?.filament.color_hex ?? (this.$vuetify.theme.dark ? '#fff' : '#000')
  }

  handleSelectSlot (index: number) {
    this.$typedCommit('filamentBox/setDialogState', {
      show: true,
      slotIndex: index
    })
  }

  handleClearSlot (index: number) {
    this.$typedDispatch('filamentBox/setSlot', { index, spoolId: null })
  }
}
</script>

<style lang="scss" scoped>
.filament-slot {
  position: relative;
}

.slot-header {
  text-align: center;
}

.slot-btn {
  height: 48px !important;
}

.slot-content {
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow: hidden;
}

.slot-name {
  flex: 1;
  text-align: left;
  font-size: 0.75rem;
}

.clear-btn {
  position: absolute;
  top: 0;
  right: -4px;
}
</style>
