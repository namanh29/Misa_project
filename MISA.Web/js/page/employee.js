$(document).ready(function(){
    new EmployeeJS();
    dialogDetail = $('.m-dialog').dialog({
        autoOpen: false,
        fluid: true,
        minWidth: 700,
        resizeable: true,
        position: ({my: "center", at: "center"}),
        modal: true
    })
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
        // 
        $('.nav-item').click(function(){
            let navSibling = $(this).siblings();
            navSibling.removeClass('active')
            $(this).addClass('active');
        })
        // Click vào 1 hàng trong bảng
        $('tbody').on('click', 'tr', function(){
            // Xoa tat ca background color cua tr khac
            let trSibling = $(this).siblings();
            $(trSibling).removeClass('selected-row');
            // Hightlight row vua chon -> thay doi background color cua tr dang click
            $(this).addClass('selected-row');            
        })
        // Double click vào 1 hàng trong bảng --> Hiển thị form chi tiết
        $('table tbody').on('dblclick', 'tr', function(){
            $('.m-dialog').show();
        })
        // Sự kiện khi click vào button "thêm"
        $('#btn-add').click(function(){
            $('.m-dialog').show();
        })
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

        // Xử lý dropdown
        var textdefault = $('.dropdown .item-list-selected').text();
        $('dropdown .dropdown-text').html(textdefault);

        // Click vao dropdown-select
        $('.dropdown-select').click(function(){
            var dropdownList = $(this).parent().find('.dropdown-list')
            dropdownList.toggle();
            var icon = $(this).find('.dropdown-icon i')
            
            // let dropdownSibling = $(this).siblings();
            // $(dropdownSibling).removeClass('dropdown-selected');
            
            if($(this).hasClass('dropdown-selected')){
                $(this).removeClass('dropdown-selected')
            }
            else {
                $(this).addClass('dropdown-selected')
            }
           
            if(icon.hasClass('up')) {
                icon.removeClass('up');
                icon.addClass('down');
            }
            else {
                icon.removeClass('down');
                icon.addClass('up');
            }
            
            
        })

        // Click chọn item-list
        $('.item-list').click(function(){
            var dropdown = $(this).parent().parent();
            var dropdownSelect = dropdown.find('.dropdown-select')
            var icon = dropdown.find('.dropdown-icon i');
            var text = $(this).text();
            let trSibling = $(this).siblings();
            $(trSibling).removeClass('item-list-selected');
            $(this).addClass('item-list-selected')
            dropdown.find('.dropdown-text').html(text);
            
            if(dropdownSelect.hasClass('dropdown-selected')){
                dropdownSelect.removeClass('dropdown-selected');
                
            }

            if(icon.hasClass('up')) {
                icon.removeClass('up');
                icon.addClass('down');
            }
            else {
                icon.removeClass('down');
                icon.addClass('up');
            }
            
            $(this).parent().hide();
            
        })
        
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

/**
 * 
 */


/**
 * Load dữ liệu
 * CreatedBy: PNANH (04/07/2021)
 */

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
    // if(money == null){
    //     return "";
    // }
    // else {
    //     var num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    //     return num;
    // }
    if(money) {
        return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    return "";
    
}