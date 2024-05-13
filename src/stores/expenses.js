import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const useExpenseStore = defineStore('expense-store', {
    state: () => ({
        expenses: [],
        errResponse: null,
        response: null
    }),
    actions: {
         fetch(){
           client.get('/expenses').then(response => {
               this.expenses = response.data.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         save(payload){
           client.post('/expenses', payload).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         remove(id){
           client.delete(`/expenses/${id}`).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
    }
})