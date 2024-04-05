import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const useSaleStore = defineStore('sales-store', {
    state: () => ({
        sales: [],
        errResponse: null,
        response: null
    }),
    actions: {
         fetch(){
           client.get('/sales').then(response => {
               this.sales = response.data.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         save(payload){
           client.post('/sales', payload).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         remove(id){
           client.delete(`/sales/${id}`).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
    }
})