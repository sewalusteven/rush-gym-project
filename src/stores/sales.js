import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const useSaleStore = defineStore('sales-store', {
    state: () => ({
        sales: [],
        salesData: null,
        errResponse: null,
        response: null
    }),
    actions: {
         fetch(page, limit, search = ""){
             let url =  `/sales?perPage=${limit}&page=${page}`;
             if(search !== ""){
                 url = `/sales?perPage=${limit}&page=${page}&search=${search}`
             }

           client.get(url).then(response => {
               this.sales = response.data.data
               this.salesData =  response.data
           }).catch(err => {
               this.errResponse =  err.response.data
           })
        },
         save(payload){
           client.post('/sales', payload).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response.data
           })
        },
         remove(id){
           client.delete(`/sales/${id}`).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response.data
           })
        },
    }
})