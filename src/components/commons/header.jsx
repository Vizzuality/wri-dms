import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import applications from 'config/applications.json';

class Header extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.changeApp(e.target.value);
  }

  render() {
    let optionsArray = [<option key={0} value="all">All</option>];
    if (applications) {
      applications.map((el, index) => {
        optionsArray.push(<option value={el} key={index + 1}>{el}</option>);
        return el;
      });
    }
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">WRI DMS</li>
            <li>
              <Link activeClassName="active" to="/dataset">Datasets</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li>
              <select onChange={this.onChange} value={this.props.app || ''}>
                {optionsArray}
              </select>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}

Header.propTypes = {
  app: PropTypes.string,
  changeApp: PropTypes.func,
};

export default Header;
