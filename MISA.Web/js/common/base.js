class Base {
    constructor(){
        this.getDataUrl();
        this.loadData();
        this.initEventsCommon();
    }
    
    /**
     * Lấy api dữ liệu
     * CreatedBy: PNANH (5/7/2021)
     * @returns 
     */
    getDataUrl(){
        return "http://cukcuk.manhnv.net/v1/Employees";
    }
    
    /**
     * Load dữ liệu
     * CreatedBy: PNANH (5/7/2021)
     */
    loadData(){
        try {
            // Lấy thông tin các cột dữ liệu
            var columns = $('table thead th');
            var fieldNames = []; 
            
            $.ajax({
                url: this.getDataUrl(),
                method: "GET", //GET: lấy dữ liệu, POST: thêm mới, PUT: sửa
                // contentType: "application/json",
                // dataType: "json"
            }).done(function(res){
                $.each(res, function(index, obj){
                    var tr = $(`<tr></tr>`);
                    // Lấy thông tin dữ liệu sẽ map vs các cột
                    $.each(columns, function(index, item){
                        var td = $(`<td><div></div></td>`);
                        var fieldName = $(item).attr('fieldName');
                        // var value = `${obj[fieldName]}`;
                        var value = obj[fieldName];
                        var formatType = $(item).attr('formatType');
                        switch(formatType){
                            case "ddmmyyyy":
                                td.addClass("text-align-center")
                                value = formatDate(value);
                                break;
                            case "MoneyVnd":
                                td.addClass("text-align-right")
                                value = formatMoney(value);
                                break;
                                    
                            default:
                                break;
                        }
                        
                            
                        td.append(value);
                        
                        $(tr).append(td);
                        
                    })
                    // console.log(tr.html());
                    $('table tbody').append(tr);
                })
            }).fail(function(res){

            })
        } catch (e) {
            console.log(e);
        }
        
    }
//#region 
    initEventsCommon(){
        // Click vào button refresh
        var me = this;
        $('#btn-refresh').click(function(){
            alert("a");
            me.loadData();
        })
    }
}
//#endregion