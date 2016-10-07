import React, { PropTypes } from 'react';
import App from 'containers/pages/app';
import DatasetList from 'containers/pages/dataset/list';
import DatasetNew from 'containers/pages/dataset/new';
import DatasetShow from 'containers/pages/dataset/show';
import { Router, Route, IndexRoute } from 'react-router';


function Routes(props) {
  return (
    <Router history={props.history}>
      <Route path="/:app" component={App}>
        <Route path="dataset">
          <IndexRoute component={DatasetList} />
          <Route path="new" component={DatasetNew} />
          <Route path=":id" component={DatasetShow} />
        </Route>
      </Route>
    </Router>
  );

}

Routes.propTypes = {
  history: PropTypes.object,
};

export default Routes;
