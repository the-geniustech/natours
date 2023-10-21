/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

// UPDATE SETTINGS
export const updateSettings = async (data, type) => {
  try {
    const urlPath = type === 'password' ? 'updatemypassword' : 'updateme';

    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8000/api/v1/users/${urlPath}`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} was successfully updated`);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
