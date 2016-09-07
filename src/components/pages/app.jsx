import React, { PropTypes } from 'react';
import Header from 'components/commons/header';
import { GrowlerContainer } from 'flash-notification-react-redux';
import { setToken } from 'utils/fetch';

class AppView extends React.Component {

  componentWillMount() {
    if (this.props.token) {
      setToken(this.props.token);
    }
    this.props.checkLogin();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.login.correct === false && this.props.login.correct !== nextProps.login.correct) {
      this.props.goToLogin();
    } else if (this.props.token) {
      window.location = '/';
    }
  }

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <GrowlerContainer />
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>

    );
  }

}

AppView.propTypes = {
  children: PropTypes.node,
  goToLogin: PropTypes.func,
  checkLogin: PropTypes.func,
  logout: PropTypes.func,
  login: PropTypes.object,
  token: PropTypes.string,
};

export default AppView;
