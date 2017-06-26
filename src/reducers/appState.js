const prefix = 'appState/';
const types = {
  set: `${prefix}active`,
};

export function setActive(payload) {
  return {
    type: types.set,
    payload,
  };
}

export default function active(state = true, action = {}) {
  if (action.type === types.set) {
    return action.payload;
  }
  return state;
}
