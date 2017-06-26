import { AppState } from 'react-native';
import store from '~/store';
import { setActive } from '~/reducers/appState';

function updateState(state) {
  const active = state === 'active';
  store.dispatch(setActive(active));
}

export function watchAppState() {
  AppState.addEventListener('change', updateState);
}
