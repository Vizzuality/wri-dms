import { connect } from 'react-redux';

import DatasetList from 'components/pages/dataset/list';
import { getDatasets, removeDataset } from 'actions/dataset';

const mapStateToProps = (state) => ({
  list: state.dataset.list,
  app: state.general.app,
});

const mapDispatchToProps = (dispatch) => ({
  getDatasets: () => dispatch(getDatasets()),
  removeDataset: (id) => dispatch(removeDataset(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetList);
