import React, { PropTypes } from 'react';
import DatasetForm from 'containers/forms/dataset';

class DatasetNew extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.createDataset(this.formatDatasetToSave(values));
  }

  formatDatasetToSave(values) {
    return {
      dataset: {
        connector_type: values.connectorType,
        connector_provider: values.connectorProvider,
        connector_url: values.connectorUrl,
        dataset_attributes: {
          application: values.application,
          name: values.name,
          tags: values.tags,
          data_path: values.dataPath,
        },
      },
    };
  }

  render() {
    return (
      <div className="row">
        <DatasetForm onSubmit={this.onSubmit} />
      </div>

    );
  }

}

DatasetNew.propTypes = {
  createDataset: PropTypes.func,
};

export default DatasetNew;
