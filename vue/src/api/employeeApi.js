import axios from "axios";
import { BaseApi } from "./index";
class EmployeeApi extends BaseApi {
    constructor(){
        super();
        this.entity = "employee";
        
    }
    async getEmployeeFilter(specs, departmentId, positionId, pageSize, pageIndex){
        return await axios.get(`${this.url}/${this.entity}/filter?specs=${specs}&departmentid=${departmentId}&positionid=${positionId}&pagesize=${pageSize}&pageindex=${pageIndex}`)
        
    }
    
}

export default new EmployeeApi()