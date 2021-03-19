import projectService from '../services/project.service';

const initialState = {
    projects: [],
    showCreateModal: false,
    newProject: null,
    manageFiles: null,
    currentproject: null
};


export const projects = {
    namespaced: true,
    state: initialState,
    getters: {
        projects(state) {
            return state.projects;
        },
        currentproject(state){
            return state.currentproject
        },
        newProject(state){
            return state.newProject
        },
        manageFiles(state){
            return state.manageFiles
        }
    },
    actions: {
        getProjects({ commit }) {
            return projectService.getProjects().then(
                res => {
                    commit('setProjets', res.data.data);
                    return Promise.resolve(res);
                }
            );
        },

        createProject({ commit }, payload) {
            return projectService.createProject(payload).then(
                res => {
                    commit('setProjets', res.data.data);
                    return Promise.resolve(res);
                }
            );
        },

        getProject({ commit }, payload) {
            return projectService.getProject(payload).then(
                res => {
                    commit('getProject', res.data.data);
                    return Promise.resolve(res);
                }
            );
        },


        
    },
    mutations: {
        setProjets(state, payload) {
            state.projects = payload;
        },

        getProject(state, payload) {
            state.currentproject = payload;
        },

    }
};