import { combineReducers } from 'redux';
import { loadRoutes, fetchRoutes } from '~/lib/routes';

const prefix = 'routes/';
const types = {
  loading: `${prefix}loading`,
  set: {
    routes: `${prefix}set/routes`,
  },
  select: {
    stop: `${prefix}select/stop`,
  },
};

export function setLoading() {
  return {
    type: types.loading,
  };
}

export function setRoutes(payload) {
  return {
    type: types.set.routes,
    payload,
  };
}

export function selectStop(payload) {
  return {
    type: types.select.stop,
    payload,
  };
}

export function load() {
  return dispatch => {
    return loadRoutes().then(routes => {
      if (routes) {
        dispatch(setRoutes(routes));
      } else {
        dispatch(setLoading());
        return fetchRoutes().then(routes => {
          if (routes) {
            dispatch(setRoutes(routes));
          }
        });
      }
    });
  };
}

function loaded(state = true, action = {}) {
  switch (action.type) {
    case types.loading:
      return false;
    case types.set.routes:
      return true;
    default:
      return state;
  }
}

function loading(state = false, action = {}) {
  switch (action.type) {
    case types.loading:
      return true;
    case types.set.routes:
      return false;
    default:
      return state;
  }
}

function lines(state = null, action = {}) {
  switch (action.type) {
    case types.set.routes:
      return action.payload.lines;
    default:
      return state;
  }
}

function stops(state = null, action = {}) {
  switch (action.type) {
    case types.set.routes:
      return action.payload.stops;
    default:
      return state;
  }
}

function selected(state = null, action = {}) {
  switch (action.type) {
    case types.select.stop:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  loaded,
  loading,
  lines,
  stops,
  selected,
});
