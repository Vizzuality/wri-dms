import { connect } from 'react-redux';
import Header from 'components/commons/header';
import { push } from 'react-router-redux';
import { updateApp } from 'actions/general';

function changeApp(app) {
  const path = window.location.pathname;
  const part = path.substring(path.indexOf('/', 1), path.length);
  return push(`/${app}${part}`);
}

const mapStateToProps = (state) => ({
  app: state.general.app,
});

const mapDispatchToProps = (dispatch) => ({
  changeApp: (app) => {
    dispatch(changeApp(app));
    dispatch(updateApp(app));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
