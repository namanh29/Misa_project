import { BaseApi } from "./index";
class PositionApi extends BaseApi {
    constructor(){
        super();
        this.entity = 'position';
    }
}

export default new PositionApi()