import { connect } from 'react-redux';

import App from 'components/pages/app';
import { push } from 'react-router-redux';
import { checkLogged, logout, goToLogin } from 'actions/login';
import { updateApp } from 'actions/general';

const mapStateToProps = (state, location) => ({
  login: state.login,
  token: location.location.query.token,
});

const mapDispatchToProps = (dispatch) => ({
  push: (where) => dispatch(push(where)),
  checkLogin: () => dispatch(checkLogged()),
  logout: () => dispatch(logout()),
  goToLogin: () => dispatch(goToLogin()),
  updateApp: (app) => dispatch(updateApp(app)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
