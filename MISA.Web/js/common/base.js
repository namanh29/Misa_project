class Base {
    constructor(){
        this.loadData();
    }
    loadData(){
        // Lấy thông tin các cột dữ liệu
        var column = $('table thead th');
        var fieldNames = []; 
        
        
        $.ajax({
            url: "",
            method: "GET"
        }).done(function(res){
            $.each(res, function(index, obj){
                var tr = $(`<tr></tr>`);
                // Lấy thông tin dữ liệu sẽ map vs các cột
                $.each(column, function(index, item){
                    var td = `<td><div><span></span></div></td>`;
                    var fieldName = $(item).attr('fieldName');
                    $
                })
            })
        })
    }
}