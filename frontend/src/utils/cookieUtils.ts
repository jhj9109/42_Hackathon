export const ACCESS_TOKEN_STR = 'access_token';

export const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
export const mySetCookie = (cookieName: string, cookieValue: string) => {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 30); // 30일 후 만료
  const cookieString = `${cookieName}=${cookieValue};secure=true;expires=${expirationDate.toUTCString()};path=/`;
  document.cookie = cookieString;
}