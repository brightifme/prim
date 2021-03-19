import WorkspaceService from '../services/workspace.service';

const initialState = {
    workspaces: [],
    currentWorkspace: null,
};

export const workspace = {
    namespaced: true,
    state: initialState,
    getters: {
        workspaces: (state) => state.workspaces,
        currentWorkspace: (state) => state.currentWorkspace,

    },
    actions: {
        fetchWorkspaces({ commit }) {
            return WorkspaceService.getWorkspace().then(
                res => {
                    commit('setWorkspace', res.data.data);
                    return Promise.resolve(res);
                }
            );
        },

        fetchCurrentWorkspace({ commit }, id) {
            return WorkspaceService.getWorkspaceByID(id).then(
                res => {
                    commit('setCurrentWorkspace', res.data.data);
                    return Promise.resolve(res);
                }
            );
        },


        
    },
    mutations: {
        setWorkspace(state, payload) {
            state.workspaces = payload
            state.currentWorkspace = payload[0] ?? null
        },
        setCurrentWorkspace(state, payload) {
            state.currentWorkspace = payload
        }

    }
};