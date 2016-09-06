import { connect } from 'react-redux';

import DatasetList from 'components/pages/dataset/list';
import { getDatasets } from 'actions/dataset';

const mapStateToProps = (state) => ({
  list: state.dataset.list,
});

const mapDispatchToProps = (dispatch) => ({
  getDatasets: () => dispatch(getDatasets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetList);
