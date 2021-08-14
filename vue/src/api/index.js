import axios from "axios"
export class BaseApi {
    
    constructor() {
        this.url = 'https://localhost:44326/api/v1';
        this.entity = "";
    }
    async getAll(){
        return await axios.get(`${this.url}/${this.entity}`)
    }
    async getById(id){
        return await axios.get(`${this.url}/${this.entity}/${id}`)
    }
    async add(data){
        return await axios.post(`${this.url}/${this.entity}`, data)
    }
    async update(id, data){
        return await axios.put(`${this.url}/${this.entity}/${id}`, data)
    }
    async delete(id){
        return await axios.delete(`${this.url}/${this.entity}/${id}`)
    }
}