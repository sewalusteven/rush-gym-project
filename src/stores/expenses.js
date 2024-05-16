import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const useExpenseStore = defineStore('expense-store', {
    state: () => ({
        expenses: [],
        expensesData: null,
        errResponse: null,
        response: null
    }),
    actions: {
         fetch(page, limit, search = ""){
             let url =  `/expenses?perPage=${limit}&page=${page}`;
             if(search !== ""){
                 url = `/expenses?perPage=${limit}&page=${page}&search=${search}`
             }

           client.get(url).then(response => {
               this.expenses = response.data.data
               this.expensesData = response.data
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