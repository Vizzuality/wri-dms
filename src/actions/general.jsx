import { UPDATE_APP } from 'actionNames';

export function updateApp(app) {
  let appValue = app;
  if (app === 'all') {
    appValue = null;
  }
  return {
    type: UPDATE_APP,
    payload: appValue,
  };
}
