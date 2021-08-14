import { BaseApi } from "./index";
export class DepartmentApi extends BaseApi {
    constructor(){
        super();
        this.entity = 'department';
    }
}

export default new DepartmentApi()