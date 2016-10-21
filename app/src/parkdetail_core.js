
export function updateSelectedPark(state, selectedPark) {
  return state.merge({'current_park': selectedPark});
}

