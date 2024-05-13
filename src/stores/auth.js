import {defineStore} from "pinia";
import {authClient, client} from "@/customAxios.js";


export const useAuthStore = defineStore('auth-store', {
    state: () => ({
        errResponse: null,
        response: null
    }),
    actions: {
         login(payload){
           authClient.post('/login', payload).then(response => {
               this.response = response.data
               localStorage.setItem('token', this.response.data.token);
               localStorage.setItem('user', JSON.stringify(this.response.data.user));
           }).catch(err => {
               this.errResponse =  err.response.data
           })
        },
        logout(){
            localStorage.clear();
            client.post('/logout').then(response => {
                this.response = response.data
                location.reload()
            }).catch(err => {
                this.errResponse =  err.response.data
            })
        },
    }
})