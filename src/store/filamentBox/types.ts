export interface FilamentBoxState {
  slots: (number | null)[];
  dialog: FilamentBoxDialogState;
}

export interface FilamentBoxDialogState {
  show: boolean;
  slotIndex?: number;
}
