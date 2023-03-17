import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://10.19.237.190:8080',
  withCredentials: true,
});

export async function getRequest(URL: string) {
  return await axiosClient.get(`/${URL}`).then((response) => response);
}

export async function postRequest(
  URL: string,
  payload?: object,
  options?: object,
) {
  return await axiosClient
    .post(`/${URL}`, payload, options)
    .then((response) => response);
}

export async function patchRequest(
  URL: string,
  payload?: object,
  options?: object,
) {
  return await axiosClient
    .patch(`/${URL}`, payload, options)
    .then((response) => response);
}

export async function deleteRequest(URL: string) {
  return await axiosClient.delete(`/${URL}`).then((response) => response);
}
