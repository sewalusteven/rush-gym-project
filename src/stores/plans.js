import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const usePlansStore = defineStore('plans-store', {
    state: () => ({
        plans: [],
        errResponse: null,
        response: null
    }),
    actions: {
         fetchPlans(){
           client.get('/plans').then(response => {
               this.response = response.data
               this.plans = response.data.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        }
    }
})