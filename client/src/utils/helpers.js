export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getTokens = (accessToken, refreshToken) => {
  const AccessToken = localStorage.getItem("accessToken", accessToken);
  const RefreshToken = localStorage.getItem("refreshToken", refreshToken);
  return { AccessToken, RefreshToken };
};

export const removeTokens = (accessToken, refreshToken) => {
  localStorage.removeItem("accessToken", accessToken);
  localStorage.removeItem("refreshToken", refreshToken);
};