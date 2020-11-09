export default {
    state:{
        loggedIn: false,
        user: null,
        token: null
    },
    mutations:{
        SET_token(state,payload){
            state.token = payload
        },
        SET_user(state,payload){
            state.user = payload
        },
        SET_loggedIn(state,payload){
            state.loggedIn = payload
        }
    },
    actions:{
         
    },
    getters:{
        get_loggedIn(state){
            return state.loggedIn
        }
    }
}