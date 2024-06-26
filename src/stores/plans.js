import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const usePlansStore = defineStore('plans-store', {
    state: () => ({
        plans: [],
        errResponse: null,
        response: null
    }),
    getters: {
        planItems: state => state.plans.map(p => { return { label: p.name, value : p.id} })
    },
    actions: {
         fetchPlans(){
           client.get('/plans').then(response => {
               this.plans = response.data.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         save(payload){
           client.post('/plans', payload).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         remove(id){
           client.delete(`/plans/${id}`).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
    }
})