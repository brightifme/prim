import AuthService from '../services/auth.service';

const initialState = {
    loggedIn: false,
    userDetail: null,
    token: null,
    workspaces: null
};

export const auth = {
    namespaced: true,
    state: initialState,
    getters: {
        user: (state) => state.userDetail,
        // inviteUser: (state) => state.invite_user,
        // canInvite: (state, getter, rootState, rootGetters) => {
        //     const cur = rootGetters['workspace/currentWorkSpace']
        //     if(cur){
        //         return cur.allow_members_invite || (cur.workspace_admin.email === state?.userDetail?.email)
        //     }
        //     return false
        // },
        // manageCollaborator: state =>  state.manage_collaborator,
        // activities: state => state.activities
    },
    actions: {
         loginUser({ commit }, user) {
            return AuthService.login(user).then(
                res => {
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    commit('loginSuccess', res.data);
                    return Promise.resolve(res);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
        verify({ commit }, token) {
            return AuthService.verifyUser(token).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
        // getActivities({commit, state}){
        //         apiClient.get('/users/activity')
        //             .then(data => {
        //                 commit('SET_ACTIVITIES', data.data.data.activities)
        //             })
        // },
        
    },
    mutations: {
        loginSuccess(state, data) {
            state.loggedIn = true;
            state.userDetail = data.userData;
            state.token = data.token;
          
        },
        loginFailure(state) {
            state.loggedIn = false;
            state.userDetail = null;
        },
        logout(state) {
            state.loggedIn = false;
            state.userDetail = null;
        },
        registerSuccess(state) {
            state.loggedIn = false;
        },
        registerFailure(state) {
            state.loggedIn = false;
        },

    }
};