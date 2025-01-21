import {defineStore} from "pinia";
import {client} from "@/customAxios.js";


export const useMemberStore = defineStore('member-store', {
    state: () => ({
        members: [],
        errResponse: null,
        response: null
    }),
    getters: {
        memberItems: state => {
            let items =  [{label: 'Select Member', value: ''}]
            state.members.forEach(m => { items.push({ label: m.name, value : m.id} ) })
            return items;
        }
    },
    actions: {
         fetchMembers(){
           client.get('/members').then(response => {
               this.members = response.data.data
           }).catch(err => {
               this.errResponse =  err.response.data
           })
        },
        save(payload){
            client.post('/members', payload).then(response => {
                this.response = response.data
            }).catch(err => {
                this.errResponse =  err.response.data
            })
        },
        remove(id){
            client.delete(`/members/${id}`).then(response => {
                this.response = response.data
            }).catch(err => {
                this.errResponse =  err.response.data
            })
        },
        update(id, body){
            client.put(`/members/${id}`, body).then(response => {
                this.response = response.data
            }).catch(err => {
                this.errResponse =  err.response.data
            })
        },
    }
})