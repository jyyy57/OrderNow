import axios from 'axios'

export default function Request(url, params) {
  return axios({
    baseURL: "https://axios-app-b8cca.firebaseio.com/",
    url: url,
    method: 'get',
      ...params
  });
}
