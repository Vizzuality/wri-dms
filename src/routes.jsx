import React, { PropTypes } from 'react';
import App from 'containers/pages/app';
import DatasetList from 'containers/pages/dataset/list';
import DatasetNew from 'containers/pages/dataset/new';
import { Router, Route, IndexRoute } from 'react-router';


function Routes(props) {
  return (
    <Router history={props.history}>
      <Route path="/" component={App}>
        <Route path="dataset">
          <IndexRoute component={DatasetList} />
          <Route path="new" component={DatasetNew} />
        </Route>
      </Route>
    </Router>
  );

}

Routes.propTypes = {
  history: PropTypes.object,
};

export default Routes;
