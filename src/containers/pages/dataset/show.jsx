import { connect } from 'react-redux';

import DatasetShow from 'components/pages/dataset/show';
import { getDatasetComplete, removeDataset } from 'actions/dataset';

const mapStateToProps = (state) => ({
  dataset: state.dataset.show,
});

const mapDispatchToProps = (dispatch) => ({
  getDataset: (id) => dispatch(getDatasetComplete(id)),
  removeDataset: (id) => dispatch(removeDataset(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetShow);
