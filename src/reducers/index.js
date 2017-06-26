import { combineReducers } from 'redux';
import routes from '~/reducers/routes';
import schedules from '~/reducers/schedules';

export default combineReducers({
  routes,
  schedules,
});
