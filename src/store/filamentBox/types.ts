export interface FilamentBoxState {
  slots: (number | null)[];
  dialog: FilamentBoxDialogState;
  loaded: boolean;
}

export interface FilamentBoxDialogState {
  show: boolean;
  slotIndex?: number;
}
