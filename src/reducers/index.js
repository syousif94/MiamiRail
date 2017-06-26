import { combineReducers } from 'redux';
import routes from '~/reducers/routes';
import schedules from '~/reducers/schedules';
import active from '~/reducers/appState';

export default combineReducers({
  routes,
  schedules,
  active,
});
