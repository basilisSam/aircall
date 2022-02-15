import {LOGIN_URL} from "../constants";
import {fetchWrapper} from "../api/fetchApi";

const login = async (username, password, navigate) => {
    fetchWrapper({
        endpoint: LOGIN_URL,
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {
            username,
            password,
        }
    })
        .then((token) => {
            sessionStorage.setItem("jwt", token.access_token);
            sessionStorage.setItem("refreshToken", token.refresh_token);
            navigate("/");
        });
};

const getAuthorizationToken = () => {
    return "Bearer " + sessionStorage.getItem("jwt");
};

const logout = (navigate) => {
    sessionStorage.clear();
    navigate("/Login");
};

export {login, logout, getAuthorizationToken};
