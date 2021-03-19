import axios from 'axios';
import authHeader from './ auth-header';

const API_URL = 'https://primustrack.herokuapp.com/api/v1/';

class workspaceService {
    getWorkspace() {
        return axios
            .get(API_URL + 'workspaces', { headers: authHeader() });
    }

    getWorkspaceByID(id){
        return axios
            .get(API_URL + `workspaces/${id}`, { headers: authHeader() });
    }


}

export default new workspaceService();