$(document).ready(function(){
    new CustomerJS();
})

/**
 * Class quản lý các sự kiện cho trang Employee
 * CreatedBy: PNANH (04/07/2021)
 */
class CustomerJS extends Base{
    constructor(){
        super();
        //this.loadData();
        this.getDataUrl();
        this.initEvents();
    }

    getDataUrl(){
        return "http://cukcuk.manhnv.net/v1/Employees";
    }

    initEvents(){
        $('.nav-item').click(function(){
            let navSibling = $(this).siblings();
            navSibling.removeClass('active')
            $(this).addClass('active');
        })
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
 * Load dữ liệu
 * CreatedBy: PNANH (04/07/2021)
 */
function loadData(){
    
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
        return day + '/' + month + '/' + year;
    }
}

/**
 * Hàm định dạng hiển thị tiền tệ 
 * @param {Number} money Số tiền
 * CreatedBy: PNANH (04/07/2021)
 */
function formatMoney(money){
    if(money == null){
        return "";
    }
    else {
        var num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        return num;
    }
    
}