import { GET_DATASETS } from 'actionNames';
import { BASE_API_URL } from 'constants';

import { showErrorMessage, showInfoMessage } from 'actions/flashMessage';
import { push } from 'react-router-redux';
import fetch from 'utils/fetch';

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
  return (dispatch) => {
    // debugger; // eslint-disable-line no-restricted-syntax, no-debugger
    fetch(`${BASE_API_URL}/datasets`, { method: 'GET' }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json();
    }).then((data) => {
      dispatch({ type: GET_DATASETS, payload: data });
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
