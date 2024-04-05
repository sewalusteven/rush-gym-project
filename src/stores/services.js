import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const useServiceStore = defineStore('service-store', {
    state: () => ({
        services: [],
        errResponse: null,
        response: null
    }),
    actions: {
         fetch(){
           client.get('/services').then(response => {
               this.services = response.data.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         save(payload){
           client.post('/services', payload).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         remove(id){
           client.delete(`/services/${id}`).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
    }
})