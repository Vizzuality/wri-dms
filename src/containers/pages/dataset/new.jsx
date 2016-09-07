import { connect } from 'react-redux';

import DatasetNew from 'components/pages/dataset/new';
import { createDataset } from 'actions/dataset';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  createDataset: (dataset) => dispatch(createDataset(dataset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetNew);
