const IP= "127.0.0.1:8000"
const Domain = `http://${IP}`
export const environment = {
    apiLogin: `${Domain}/api/v1/auth/login`,
    apiRefreshToken: `${Domain}/api/v1/auth/refresh`,
    apiLogout: `${Domain}/api/v1/auth/logout`,
    apiGetUser: `${Domain}/api/v1/user/getProfile`,
    apiGetToken: `${Domain}/api/v1/earn/coininfo`,
};
