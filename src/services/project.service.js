import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://primustrack.herokuapp.com/api/v1/';

class projectService {
    getProjects() {
        return axios
            .get(API_URL + 'projects', { headers: authHeader() });
    }

    createProject(payload){
        return axios
            .post(API_URL + 'projects', payload, { headers: authHeader() });
    }


    getProject(payload){
        return axios
            .get(API_URL + `projects/${payload}`, { headers: authHeader() });
    }


}

export default new projectService();
