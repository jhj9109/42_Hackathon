import axios from 'axios';

const NGROK_URL = "https://69b9-121-135-181-61.jp.ngrok.io";
const JAEJYUKI_URL = "http://10.18.201.217:8080/"
const testHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${"hyeonjan"}`,
}

/**
 * TODO: 구동 당시 환경에 따라 수정 필수
 * 토요일 저녁 기준 쿠키로 인증에 실패해서 임시로 헤더로 인증 시도
 */
// const axiosClient = axios.create({
//   baseURL: JAEJYUKI_URL,
//   withCredentials: true,
//   headers: testHeaders
// });

const axiosClient = axios.create({
  baseURL: 'http://10.19.237.190:8080',
  withCredentials: true,
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
