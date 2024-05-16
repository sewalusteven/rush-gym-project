
import { defineStore } from 'pinia'
import {client} from "@/customAxios.js";

export const useCounterStore = defineStore('counter', {
  state: () => ({
    membersData: null,
    salesData: null,
    transactionsData: null,
    expensesData: null,
    errResponse: null
  }),
  actions: {
    fetchMemberStats(){
      client.get('/members/counts').then(response => {
        this.membersData = response.data.data
      }).catch(err => {
        this.errResponse = err.response.data
      })
    },
    fetchTransactionStats(){
      client.get('/transactions/counts').then(response => {
        this.transactionsData = response.data.data
      }).catch(err => {
        this.errResponse = err.response.data
      })
    },
    fetchSalesStats(){
      client.get('/sales/counts').then(response => {
        this.salesData = response.data.data
      }).catch(err => {
        this.errResponse = err.response.data
      })
    },
    fetchExpensesStats(){
      client.get('/expenses/counts').then(response => {
        this.expensesData = response.data.data
      }).catch(err => {
        this.errResponse = err.response.data
      })
    },
  }
})
