import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const useMemberStore = defineStore('member-store', {
    state: () => ({
        members: [],
        errResponse: null,
        response: null
    }),
    actions: {
         fetchMembers(){
           client.get('/members').then(response => {
               this.response = response.data
               this.members = response.data.data
           }).catch(err => {
               this.errResponse =  err.response
           })
        }
    }
})