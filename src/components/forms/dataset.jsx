import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import InputForm from 'components/forms/inputForm';
import SelectForm from 'components/forms/selectForm';
import MultiselectForm from 'components/forms/multiselectForm';
import datasetConfig from 'config/datasetConfig.json';
import applications from 'config/applications.json';

const DatasetForm = (props) => {

  const { handleSubmit, pristine, reset, submitting, connectorTypeValue } = props;
  const connectorTypes = Object.keys(datasetConfig.connectorTypes).map((el) => ({ label: el, value: el }));
  let connectorProviders = [];
  if (connectorTypeValue && datasetConfig.connectorTypes[connectorTypeValue]) {
    connectorProviders = datasetConfig.connectorTypes[connectorTypeValue].map((el) => ({ label: el, value: el }));
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset className="fieldset">
        <legend>Basic information</legend>
        <div className="row">
          <div className="columns medium-6">
            <label>Name</label>
            <div>
              <Field name="name" component={InputForm} type="text" />
            </div>
          </div>
          <div className="columns medium-6">
            <label>Applications</label>
            <div>
              <Field name="application" component={SelectForm} options={applications} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns medium-6">
            <label>Connector type</label>
            <div>
              <Field name="connectorType" component={SelectForm} options={connectorTypes} />
            </div>
          </div>
          <div className="columns medium-6">
            <label>Connector providers</label>
            <div>
              <Field name="connectorProvider" component={SelectForm} options={connectorProviders} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns medium-12">
            <label>Tags</label>
            <div>
              <Field name="tags" component={MultiselectForm} />
            </div>
          </div>
        </div>
      </fieldset>
      {connectorTypeValue === 'json' && <fieldset className="fieldset">
        <legend>JSON Dataset</legend>
        <div className="row">
          <div className="columns medium-6">
            <label>Data path</label>
            <div>
              <Field name="dataPath" component={InputForm} type="text" />
            </div>
          </div>
        </div>
      </fieldset>}
      {(connectorTypeValue === 'rest' || connectorTypeValue === 'document') && <fieldset className="fieldset">
        <div className="row">
          <div className="columns medium-6">
            <label>Connector URL</label>
            <div>
              <Field name="connectorUrl" component={InputForm} type="url" />
            </div>
          </div>
        </div>
      </fieldset>}
      <div className="row">
        <div className="columns medium-6">
          <button type="submit" disabled={submitting} className="success button">Submit</button>
          <button type="button" disabled={pristine || submitting} className="button" onClick={reset}>Clear</button>
        </div>
      </div>
    </form>
  );
};

DatasetForm.propTypes = {
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  handleSubmit: PropTypes.func,
  connectorTypeValue: PropTypes.any,
};

export default DatasetForm;
