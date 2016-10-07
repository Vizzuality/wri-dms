import { GET_DATASETS, GET_DATASET } from 'actionNames';
import { BASE_API_URL } from 'constants';

import { showErrorMessage, showInfoMessage } from 'actions/flashMessage';
import { push } from 'react-router-redux';
import fetch from 'utils/fetch';

function formatDataset(dataset) {
  dataset.connectorType = dataset.connector_type;
  dataset.connectorProvider = dataset.provider;
  dataset.connectorUrl = dataset.connector_url;
  dataset.dataPath = dataset.data_path;
  delete dataset.connector_type;
  delete dataset.connector_provider;
  delete dataset.connector_url;
  delete dataset.data_path;

  return dataset;
}

function handleErrors(errors) {
  let message = '';
  if (errors) {
    for (let i = 0, length = errors.length; i < length; i++) {
      message += `, ${errors[i].detail}`;
    }
  } else {
    message = errors;
  }
  return showErrorMessage(message);
}

export function getDatasets() {
  return (dispatch, getState) => {
    // debugger; // eslint-disable-line no-restricted-syntax, no-debugger
    const state = getState();
    fetch(`${BASE_API_URL}/datasets?status=all${state.general.app ? `&app=${state.general.app}` : ''}`, { method: 'GET' }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json();
    }).then((data) => {
      dispatch({ type: GET_DATASETS, payload: data });
    });
  };
}

export function getDataset(id) {
  return (dispatch) => {
    fetch(`${BASE_API_URL}/datasets/${id}`, { method: 'GET' }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json();
    }).then((data) => {
      dispatch({ type: GET_DATASET, payload: formatDataset(data) });
    });
  };
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return response.json();
}

export function getDatasetComplete(id) {
  return (dispatch) => {
    const promises = [];
    promises.push(fetch(`${BASE_API_URL}/datasets/${id}`, { method: 'GET' }).then(handleResponse));
    promises.push(fetch(`${BASE_API_URL}/layers?dataset=${id}`, { method: 'GET' }).then(handleResponse));
    promises.push(fetch(`${BASE_API_URL}/widgets?dataset=${id}`, { method: 'GET' }).then(handleResponse));
    promises.push(fetch(`${BASE_API_URL}/metadata/${id}`, { method: 'GET' }).then(handleResponse));
    Promise.all(promises).then((data) => {
      const dataset = data[0];
      dataset.layers = data[1];
      dataset.widgets = data[2];
      dataset.metadata = data[3];
      // console.log('promise', formatDataset(dataset));
      dispatch({ type: GET_DATASET, payload: formatDataset(dataset) });
    });
  };
}

export function removeDataset(id) {
  return (dispatch) => {
    // debugger; // eslint-disable-line no-restricted-syntax, no-debugger
    fetch(`${BASE_API_URL}/datasets/${id}`, { method: 'DELETE' }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json();
    }).then((data) => {
      if (data.errors) {
        dispatch(handleErrors(data.errors));
      } else {
        dispatch(getDatasets());
        dispatch(showInfoMessage('Dataset removed successfully'));
      }
    });
  };
}

export function createDataset(dataset) {
  return (dispatch) => {
    fetch(`${BASE_API_URL}/datasets`, {
      method: 'POST',
      body: JSON.stringify(dataset),
    }).then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        dispatch(handleErrors(data.errors));
      } else {
        dispatch(push('/dataset'));
        dispatch(showInfoMessage('Dataset created successfully'));
      }
    }, (err) => {
      dispatch(showErrorMessage(err.message));
    });
  };
}
