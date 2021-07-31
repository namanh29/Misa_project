$(document).ready(function(){
    getDataDropdowwn();
    eventsDropdown();
});

/**
     * Lấy dữ liệu cho các dropdown
     * CreatedBy: PNANH (04/07/2021)
     */
function getDataDropdowwn(){
    var ddListDepartment = $('#ddListDepartment');
    ddListDepartment.empty();
    // Lấy dữ liệu các phòng ban
    $.ajax({
        type: "GET",
        url: "http://cukcuk.manhnv.net/api/Department",

    }).done(function (res) {
        if (res) {
            $.each(res, function (index, item) {
                var option, key;
                if (index == 0) {
                    option = $(`<div class="item-list item-list-selected" key="${item.DepartmentId}">${item.DepartmentName}</div>`);


                } else {
                    option = $(`<div class="item-list" key="${item.DepartmentId}">${item.DepartmentName}</div>`);
                }


                ddListDepartment.append(option);
                //console.log(option);
            })
            // Xử lý dropdown
            var textdefault = ddListDepartment.find('.item-list-selected').text();
            var dropdownText = ddListDepartment.parent().find('.dropdown-text');
            dropdownText.text(textdefault);

            //debugger;
        }
    }).fail(function (res) {

    })

    var ddListPosition = $('#ddListPosition');
    ddListPosition.empty();
    // Lấy dữ liệu các vị trí
    $.ajax({
        type: "GET",
        url: "http://cukcuk.manhnv.net/v1/Positions",

    }).done(function (res) {
        if (res) {
            $.each(res, function (index, item) {
                var option;
                if (index == 0) {
                    option = $(`<div class="item-list item-list-selected" key="${item.PositionId}">${item.PositionName}</div>`);

                } else {
                    option = $(`<div class="item-list" key="${item.PositionId}">${item.PositionName}</div>`);
                }

                ddListPosition.append(option);
                //console.log(option);
            })
            // Xử lý dropdown
            var textdefault = ddListPosition.find('.item-list-selected').text();
            var dropdownText = ddListPosition.parent().find('.dropdown-text');
            dropdownText.text(textdefault);
            //debugger;
        }
    }).fail(function (res) {

    })
}

function eventsDropdown(){
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
    $('.dropdown-list').on('click', '.item-list', function(){
        var dropdown = $(this).parent().parent();
        var dropdownSelect = dropdown.find('.dropdown-select');
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