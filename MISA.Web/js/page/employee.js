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
            alert("a");
            me.loadData();
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
        // Click button Luu tren form chi tiet
        $('#btn-save').click(function(){
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
            // thu thập thông tin dữ liệu đc nhập --> build thành object
            var workStatus, gender, positionId, departmentId;
            // Id Tình trạng làm việc
            if($('#txtWorkStatus').text() == "Đang làm việc"){
                workStatus = 1;
            }
            else {
                workStatus = 0;
            }
            // Id gender
            if($('#ddGender').text() == "Nam") {
                gender = 1;
            }
            else if ($('#ddGender').text() == "Nữ") {
                gender = 0;
            }
            else {
                gender = 2;
            }
            // Id vị trí
            if($('#ddPositionName').text() == "Phòng Nhân sự"){
                positionId = "5bd71cda-209f-2ade-54d1-35c781481818";
            }
            else if($('#ddPositionName').text() == "Phòng Tài Chính"){
                positionId = "589edf01-198a-4ff5-958e-fb52fd75a1d4";
            }
            else {
                positionId = "548dce5f-5f29-4617-725d-e2ec561b0f41";
            }
            // Id phòng ban
            if($('#ddDepartmentName').text() == "Phòng đào tạo"){
                departmentId = "17120d02-6ab5-3e43-18cb-66948daf6128";
            }
            else if($('#ddDepartmentName').text() == "Phòng Công nghệ"){
                departmentId = "4e272fc4-7875-78d6-7d32-6a1673ffca7c";
            }
            else {
                departmentId = "469b3ece-744a-45d5-957d-e8c757976496";
            }
            var employee = {
                
                "EmployeeCode": $('#txtEmployeeCode').val(),
                
                "FullName": $('#txtFullName').val(),
                
                "DateOfBirth": $('#dtDateOfBirth').val(),
                "PhoneNumber": $('#txtPhoneNumber').val(),
                "Email": $('#txtEmail').val(),
                
                "IdentityNumber": $('#txtIdentityNumber').val(),
                "IdentityDate": $('#dtIdentityDate').val(),
                "IdentityPlace": $('#txtIdentityPlace').val(),
                
                
                "WorkStatus": workStatus,
                "PersonalTaxCode": $('#txtTaxCode').val(),
                "Salary": $('#txtSalary').val(),
                "PositionId" : positionId,
                // "PositionName": $('#ddPositionName').text(),
                "DepartmentId" : departmentId,
                // "DepartmentName": $('#ddDepartmentName').text(),
                "Gender": gender,
                // "GenderName": $('#ddGender').text(),
                "JoinDate": $('#dtJoinDate').val()
                
            }
            debugger;
            // gọi service tương ứng thực hiện lưu dữ liệu
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees",
                type: "POST",
                data: JSON.stringify(employee),
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
            
        })

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