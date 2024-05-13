import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const usePaymentMethodStore = defineStore('payment-method-store', {
    state: () => ({
        methods: [],
        errResponse: null,
        response: null
    }),
    getters: {
        methodItems: state => {
            let items =  [{label: 'Select Payment Method', value: ''}]
            state.methods.forEach(m => { items.push({ label: m.method, value : m.id} ) })
            return items
        }
    },
    actions: {
         fetch(){
           client.get('/payment-methods').then(response => {
               this.methods = response.data.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         save(payload){
           client.post('/payment-methods', payload).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
         remove(id){
           client.delete(`/payment-methods/${id}`).then(response => {
               this.response = response.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        },
    }
})