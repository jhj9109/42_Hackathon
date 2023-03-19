import axios from 'axios';
import { ACCESS_TOKEN_STR } from '../utils/cookieUtils';

export const getToken = () => localStorage.getItem(ACCESS_TOKEN_STR) ?? ""

const NGROK_URL = "https://69b9-121-135-181-61.jp.ngrok.io";
export const NEED_SECURE = false; // secure가 필요하고 안필요하고

export const JAEHYUKI_URL = 
  NEED_SECURE
  ? "https://10.18.201.217:8080"
  : "http://10.18.201.217:8080"

const testHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
}

axios.defaults.baseURL = 'https://example.com/api/';
axios.defaults.withCredentials = true;
const axiosClient = axios.create({
  baseURL: JAEHYUKI_URL,
  withCredentials: true,
  headers: testHeaders,
});

export async function getRequest(URL: string) {
  return await axiosClient.get(`/${URL}`).then((response) => response);
}

// TODO: 임시로 만든거, 올바르지 않다면 수정 요망
export async function putRequest(
  URL: string,
  payload?: object,
  options?: object,
) {
  return await axiosClient
    .put(`/${URL}`, payload, options)
    .then((response) => response);
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
