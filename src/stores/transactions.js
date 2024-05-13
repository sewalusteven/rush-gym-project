import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const useTransactionStore = defineStore('transaction-store', {
    state: () => ({
        transactions: [],
        transactionsData: null,
        errResponse: null,
        response: null
    }),
    actions: {
         fetch(page, limit, search = ""){
             let url =  `/transactions?perPage=${limit}&page=${page}`;
             if(search !== ""){
                 url = `/transactions?perPage=${limit}&page=${page}&search=${search}`
             }

           client.get(url).then(response => {
               this.transactions = response.data.data
               this.transactionsData = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         save(payload){
           client.post('/transactions', payload).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         remove(id){
           client.delete(`/transactions/${id}`).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
    }
})