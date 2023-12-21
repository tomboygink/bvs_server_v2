export function openModal(setState: (state: boolean) => void) {
  setState(true);
}

export function closeModal(setState: (state: boolean) => void) {
  setState(false);
}
