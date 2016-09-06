import { connect } from 'react-redux';

import App from 'components/pages/app';
import { push } from 'react-router-redux';
import { checkLogged, logout, goToLogin } from 'actions/login';

const mapStateToProps = (state, location) => ({
  login: state.login,
  token: location.location.query.token,
});

const mapDispatchToProps = (dispatch) => ({
  push: (where) => dispatch(push(where)),
  checkLogin: () => dispatch(checkLogged()),
  logout: () => dispatch(logout()),
  goToLogin: () => dispatch(goToLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
