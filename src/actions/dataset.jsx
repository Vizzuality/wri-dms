import { GET_DATASETS } from 'actionNames';
import { BASE_API_URL } from 'constants';
import fetch from 'utils/fetch';

export function getDatasets() {
  return (dispatch) => {
    // debugger; // eslint-disable-line no-restricted-syntax, no-debugger
    fetch(`${BASE_API_URL}/datasets`, {
      method: 'GET',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response;
    }).then((data) => {
      dispatch({ type: GET_DATASETS, payload: data });
    });
  };
}

export function createDataset() {
  console.log('eeeoo');
}
