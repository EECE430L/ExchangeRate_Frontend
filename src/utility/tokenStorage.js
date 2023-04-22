export function saveUserToken(userToken) {
  localStorage.setItem("userToken", userToken);
}
export function getUserToken() {
  return localStorage.getItem("userToken");
}
export function clearUserToken() {
  return localStorage.removeItem("userToken");
}