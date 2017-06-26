import Immutable from 'immutable';
import { fetchSchedule } from '~/lib/schedules';

const prefix = 'schedules/';
const types = {
  set: {
    schedule: `${prefix}set/schedule`,
  },
};

export function setSchedule(payload) {
  return {
    type: types.set.schedule,
    payload,
  };
}

export function getSchedule(id) {
  return dispatch => {
    return fetchSchedule(id).then(data => {
      dispatch(
        setSchedule({
          id,
          data,
        })
      );
    });
  };
}

export default function schedules(state = Immutable.Map(), action = {}) {
  switch (action.type) {
    case types.set.schedule:
      return state.set(action.payload.id, action.payload.data);
    default:
      return state;
  }
}
