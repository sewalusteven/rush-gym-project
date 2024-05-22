import {defineStore} from "pinia";
import {authClient, client} from "@/customAxios.js";


export const useAuthStore = defineStore('auth-store', {
    state: () => ({
        users: [],
        errResponse: null,
        response: null
    }),
    actions: {
        fetchUsers() {
            client.get('/users').then(response => {
                this.users = response.data.data;
            }).catch(err => {
                this.errResponse = err.response.data;
            });
        },
        registerUser(payload) {
            client.post('/users/register', payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then(response => {
                this.response = response.data;
            }).catch(err => {
                this.errResponse =  err.response.data;
            })
        },
        updateProfile(payload) {
            client.post('/users/update', payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then(response => {
                this.response = response.data;
            }).catch(err => {
                this.errResponse =  err.response.data;
            })
        },
        changePassword(payload) {
            client.put('/users/change-password', payload).then(response => {
                this.response = response.data;
            }).catch(err => {
                this.errResponse =  err.response.data;
            })
        },
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