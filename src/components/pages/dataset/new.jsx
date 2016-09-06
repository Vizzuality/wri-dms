import React, { PropTypes } from 'react';

class DatasetNew extends React.Component {

  componentWillMount() {
    // if (!this.props.list) {
    //   this.props.getDatasets();
    // }
  }

  componentWillReceiveProps() {
    // if (nextProps.list !== this.props.list) {
    //   this.setState({ filteredList: nextProps.list });
    // }
  }

  render() {
    return (
      <div className="row">
        Crear
      </div>

    );
  }

}

DatasetNew.propTypes = {
  createDataset: PropTypes.func,
};

export default DatasetNew;
