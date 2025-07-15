const IP= "127.0.0.1:8000"
let Domain = `http://${IP}`
Domain="https://remarkably-arriving-imp.ngrok-free.app"
export const environment = {
    apiLogin: `${Domain}/api/v1/auth/login`,
    apiRefreshToken: `${Domain}/api/v1/auth/refresh`,
    apiLogout: `${Domain}/api/v1/auth/logout`,
    apiGetUser: `${Domain}/api/v1/user/getProfile`,
    apiRegister: `${Domain}/api/v1/auth/signup`,
   
};
