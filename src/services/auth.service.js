import axios from 'axios';

const API_URL = 'https://primustrack.herokuapp.com/api/v1/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'auth/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('token', JSON.stringify(response.data.accessToken));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('token');
    }

    register(user) {
        return axios.post(API_URL + 'auth/register', {
            full_name: user.full_name,
            email: user.email,
            password: user.password
        });
    }

    getMe() {
        return axios.get(API_URL + 'users/me');
    }

    checkUser(userid){
        return axios.get(API_URL + 'basic-user/'+userid);
    }

    verifyUser(token){
        return axios.post(API_URL + 'auth/verify-email/?token='+token);
    }
    forgotPassword(token){
        console.log(token);
        return axios.post(API_URL + 'auth/forgot-password', {
            token: token
        });
    }
    resetPassword(data){
        return axios.post(API_URL + 'auth/reset-password', {
            token: data.token,
            new_password: data.new_password
        });
    }

    resendVerification(email){
        return axios.post(API_URL + 'auth/resend-verification', {
            email: email
        });
    }
}

export default new AuthService();