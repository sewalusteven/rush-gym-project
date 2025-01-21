import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const useActivePlanStore = defineStore('active-plan-store', {
    state: () => ({
        activePlans: [],
        activePlansData: null,
        errResponse: null,
        response: null
    }),
    actions: {
         fetch(page, limit, search = ""){
             let url =  `/active-plans?perPage=${limit}&page=${page}`;
             if(search !== ""){
                 url = `/active-plans?perPage=${limit}&page=${page}&search=${search}`
             }

           client.get(url).then(response => {
               this.activePlans = response.data.data
               this.activePlansData = response.data
           }).catch(err => {
               this.errResponse =  err.response.data
           })
        },
         save(payload){
           client.post('/active-plans', payload).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response.data
           })
        },
         remove(id){
           client.delete(`/active-plans/${id}`).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response.data
           })
        },
         deposit(id, body){
           client.post(`/active-plans/${id}/deposit`, body).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response.data
           })
        },
    }
})