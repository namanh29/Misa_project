$(document).ready(function(){
    new EmployeeJS();
    // dialogDetail = $('.m-dialog').dialog({
    //     autoOpen: false,
    //     // fluid: true,
    //     width: 900,
        
    //      resizeable: true,
    //     modal: true
    // })
})

/**
 * Class quản lý các sự kiện cho trang Employee
 * CreatedBy: PNANH (04/07/2021)
 */
class EmployeeJS extends Base{
    constructor(){
        super();
        //this.loadData();
        this.getDataUrl();
        this.initEvents();
        
    }

    getDataUrl(){
        return "http://cukcuk.manhnv.net/v1/Employees";
    }

    /**
     * Load dữ liệu
     * CreatedBy: PNANH (04/07/2021)
     */
    // loadData(){
    //     // Lấy dữ liệu về
    //     $.ajax({
    //         url: "http://cukcuk.manhnv.net/v1/Employees",
    //         method: "GET",
    //     }).done(function(res) {
    //         var data = res;
    //         $.each(data, function(index, item){
    //             var dateOfBirth = item['DateOfBirth'];
    //             dateOfBirth = formatDate(dateOfBirth);
    //             var salary = item['Salary'];
    //             salary = formatMoney(salary);
    //             var gender = item.GenderName;
    //             if(gender == null){
    //                 gender = "";
    //             }
    //             var position = item.PositionName;
    //             if(position == null){
    //                 position = "";
    //             }
    //             var department = item.DepartmentName;
    //             if(department == null){
    //                 department = "";
    //             }
    //             var workStatus = item.WorkStatus;
    //             if (workStatus == null){
    //                 workStatus = "";
    //             }
    //             var tr = $(`<tr>
    //                             <td><div><span>`+ item['EmployeeCode'] +`</span></div></td>
    //                             <td><div><span>`+ item['FullName'] +`</span></div></td>
    //                             <td><div><span>`+ gender +`</span></div></td>
    //                             <td><div><span>`+ dateOfBirth +`</span></div></td>
    //                             <td><div><span>`+ item['PhoneNumber'] +`</span></div></td>
    //                             <td><div><span>`+ item['Email'] +`</span></div></td>
    //                             <td><div><span>`+ position +`</span></div></td>
    //                             <td><div><span>`+ department +`</span></div></td>
    //                             <td><div><span>`+ salary +`</span></div></td>
    //                             <td><div><span>`+ workStatus +`</span></div></td>
    //                         </tr>`)

    //             $('table tbody').append(tr);
    //         })
    //     }).fail(function(res) {

    //     })
    // }

    /**
     * Khởi tạo các sự kiện cho button, dropdown
     * CreatedBy: PNANH (6/7/2021)
     */
    initEvents(){
        var me = this;
        // Sự kiện khi click vào navbar
        $('.nav-item').click(function(){
            let navSibling = $(this).siblings();
            navSibling.removeClass('active')
            $(this).addClass('active');
        })
        $('#btn-refresh').click(function(){
            
            me.loadData();
        })
        // Click vào 1 hàng trong bảng
        $('tbody').on('click', 'tr', function(){
            // Xoa tat ca background color cua tr khac
            let trSibling = $(this).siblings();
            $(trSibling).removeClass('selected-row');
            // Hightlight row vua chon -> thay doi background color cua tr dang click
            $(this).addClass('selected-row');   
            
            // Lấy khóa chính của bản ghi
            var deleteId = $(this).attr('recordId');
            me.deleteId = deleteId;
            
        })

        // Click vào button xóa
        $('#btnDelete').click(function(){
            var deleteId = me.deleteId;
            // Gọi api xóa nhân viên
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/"+`${deleteId}`,
                type: "Delete",
                
                contentType: 'application/json-patch+json'
            }).done(function(res){
                // Sau khi lưu thành công: 
                // + đưa ra thông báo thành công
                alert('Xóa thành công!');
                
                // + load lại dữ liệu
                me.loadData();
                
            }).fail(function(res){

            })
        })

        // Double click vào 1 hàng trong bảng --> Hiển thị form chi tiết
        $('table tbody').on('dblclick', 'tr', function(){
            me.FormMode = 'Edit';
            // Lấy khóa chính của bản ghi
            var recordId = $(this).attr('recordId');
            me.recordId = recordId;
            console.log(recordId);
            // Gọi service lấy thông tin chi tiết qua id
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/"+`${recordId}`,
                type: "GET",
            }).done(function(res){
                // Binding lên form thông tin
                //console.log(res);
                var inputs = $('input[fieldName], div[fieldName]');
                var entity = {};
                $.each(inputs, function(index, input){
                    var propertyName = $(this).attr('fieldName');
                    var value = res[propertyName];
                    if($(input).hasClass('input-label')){
                        if($(input).attr('type') == "date" && value != null){            
                            value = value.substr(0,10);
                            //debugger;
                        }
                        $(this).val(value);
                    } else {
                        var itemLists = $(this).parent().parent().find('.item-list');
                        //console.log(itemLists);
                        $.each(itemLists, function(index, item){
                            if(value != null){
                                $(item).removeClass('item-list-selected');
                                if($(item).attr('key') == value){
                                    $(item).addClass('item-list-selected');
                                    // Xử lý dropdown
                                    var textdefault = $(item).text();
                                    var dropdownText = itemLists.parent().parent().find('.dropdown-text');
                                    dropdownText.text(textdefault);
                                }
                            }
                            
                            console.log(item);
                            
                        })
                    }
                    
                })
            }).fail(function(res){

            })
            $('.m-dialog').show();
            // Lấy dữ liệu vào form thông tin

        })
        // Sự kiện khi click vào button "thêm"
        $('#btn-add').click(me.btnAddOnClick.bind(me))

        // Sự kiện khi click "x" trên form chi tiết
        $('#btn-x-dialog').click(function(){
            $('.popup').show();
        })
        // Sự kiện khi click Hủy trên form chi tiết
        $('#btn-cancel-dialog').click(function(){
            $('.popup').show();
        })
        // Sự kiện khi click Tiếp tục nhận trên popup
        $('#btn-cancel-popup').click(function(){
            $('.popup').hide();
        })
        // Sự kiện khi click Đóng trên popup
        $('#btn-close').click(function(){
            $('.popup').hide();
            $('.m-dialog').hide();
        })
        // Sự kiện khi click "x" trên form chi tiết
        $('#btn-x-popup').click(function(){
            $('.popup').hide();
        })

        // Click button Luu tren form chi tiet
        $('#btn-save').click(me.btnSaveOnClick.bind(me))

        /**
         * Bắt buộc nhập
         * CreatedBy: PNANH (7/7/2021)
         */
        
        $('[required]').blur(function(){
            // Kiểm tra dữ liệu đã nhập, nếu trống thì cảnh báo
            var value = $(this).val();
            if(!value){
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được để trống');
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('title', '');
                $(this).attr('validate', true);
            }          
        })

        $('input[type="email"]').blur(function(){
            var email = $(this).val();
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(email)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng');
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('title', '');
                $(this).attr('validate', true); 
            }
        })

        

        // Click vao dropdown-select
        
        
    }

    

    /**
     * Hàm xử lý khi nhấn button "Thêm mới"
     * CreatedBy: PNANH (13/7/2021)
     */
    btnAddOnClick(){
        try {
            var me = this;
            me.FormMode = 'Add';
            // Hiển thị form thông tin
            $('.m-dialog').show();
            $('input').val(null);
            // Load dữ liệu cho các dropdown
            //me.getDataDropdowwn();
        } catch(e) {
            console.log(e);
        }
    }

    /**
     * Hàm xử lý khi nhấn button "Lưu"
     * CreatedBy: PNANH (13/7/2021)
     */
     btnSaveOnClick(){
        try {
            var me = this;
            // validate dữ liệu
            var inputValidates = $('input[required], input[type="email"]');
            $.each(inputValidates, function(index, input){
                $(input).trigger('blur');
            })

            var inputNotValids = $('input[validate="false"]');
            if(inputNotValids && inputNotValids.length > 0){
                alert("Dữ liệu không hợp lệ, vui lòng kiểm tra lại.");
                inputNotValids[0].focus();
                return;
            }

            // Thu thập thông tin dữ liệu đc nhập --> build thành object
            var inputs = $('input[fieldName], div[fieldName]');
            var entity = {};
            $.each(inputs, function(index, input){
                var propertyName = $(this).attr('fieldName');
                var value;
                if($(input).hasClass('input-label')){
                    value = $(this).val();
                } else if ($(input).hasClass('dropdown-text')) {
                    value = $(this).parent().parent().find('.item-list-selected').attr('key');
                } else {
                    value = $(this).attr('key');
                }
                
                entity[propertyName] = value;
                
            })
            console.log(entity);

            // gọi service tương ứng thực hiện lưu dữ liệu
            
            if(this.FormMode == 'Add'){
                
                
                $.ajax({
                    url: "http://cukcuk.manhnv.net/v1/Employees",
                    type: "POST",
                    data: JSON.stringify(entity),
                    contentType: 'application/json-patch+json'
                }).done(function(res){
                    // Sau khi lưu thành công: 
                    // + đưa ra thông báo thành công
                    alert('Thêm thành công!');
                    // + ẩn fom chi tiết
                    $('.m-dialog').hide();
                    // + load lại dữ liệu
                    me.loadData();
                    
                }).fail(function(res){
    
                })
            }
            else {
                var recordId = me.recordId;
                $.ajax({
                    url: "http://cukcuk.manhnv.net/v1/Employees/"+`${recordId}`,
                    type: "PUT",
                    data: JSON.stringify(entity),
                    contentType: 'application/json-patch+json'
                }).done(function(res){
                    // Sau khi lưu thành công: 
                    // + đưa ra thông báo thành công
                    alert('Sửa thành công!');
                    // + ẩn fom chi tiết
                    $('.m-dialog').hide();
                    // + load lại dữ liệu
                    me.loadData();
                    
                }).fail(function(res){
    
                })
            }
        } catch(e) {
            console.log(e);
        }
    }

    /**
     * Thêm dữ liệu
     * CreatedBy: PNANH (04/07/2021)
     */
    add(){

    }

    /**
     * Sửa dữ liệu
     * CreatedBy: PNANH (04/07/2021)
     */
    edit(){

    }

    /**
     * Xóa dữ liệu
     * CreatedBy: PNANH (04/07/2021)
     */
    delete(){

    }
}

/** -------------------------------------------
 * Format dữ liệu ngày tháng sang ngày/tháng/năm
 * @param {any} date tham số có kiểu dữ liệu bất kì
 * CreateBy: PNANH (04/07/2021)
 */
function formatDate(date) {
    var date = new Date(date);
    if(Number.isNaN(date.getTime())) {
        return "";
    } else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return `${day}/${month}/${year}`;
    }
}

/**
 * Hàm định dạng hiển thị tiền tệ 
 * @param {Number} money Số tiền
 * CreatedBy: PNANH (04/07/2021)
 */
function formatMoney(money){
    if(money) {
        return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    return "";
    
}