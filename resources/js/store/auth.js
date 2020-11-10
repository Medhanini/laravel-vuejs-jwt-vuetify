export default {
    state:{
        loggedIn:'',
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
        performLoginAction({commit}, payload){
            return new Promise( (resolve, reject) => {
                axios.post('http://127.0.0.1:8000/api/auth/login',{
                    email:payload.email,
                    password:payload.password
                    }).then(res =>{
                        commit('SET_token', res.data.access_token)
                        commit('SET_user', res.data.user)
                        commit('SET_loggedIn', true)
                        resolve(res)
                    }
                    ).catch( err => {
                        reject(err)
                    })
            })
        },
        performLogoutAction({state,commit}){
            commit('SET_token', '')
            commit('SET_user', '')
            commit('SET_loggedIn', false)
        }
    },
    getters:{
        get_loggedIn(state){
            return state.loggedIn
        }
    }
}