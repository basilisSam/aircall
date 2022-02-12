const loginAction = (username, password, navigate) => {
  const URL = "https://frontend-test-api.aircall.io/auth/login";
  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
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

export { loginAction, getAuthorization };
