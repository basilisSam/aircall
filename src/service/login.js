import { LOGIN_URL } from "../constants";

const login = async (username, password, navigate) => {
   await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    })
  })
    .then((r) => r.json())
    .then((token) => {
      sessionStorage.setItem("jwt", token.access_token);
      sessionStorage.setItem("refreshToken", token.refresh_token);
      navigate("/");
    });
};

const getAuthorization = () => {
  return { Authorization: "Bearer " + sessionStorage.getItem("jwt") };
};

const logout = (navigate) => {
  sessionStorage.clear();
  navigate("/login");
};

export { login, logout, getAuthorization };
