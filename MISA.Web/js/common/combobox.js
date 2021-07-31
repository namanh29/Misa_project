$(document).ready(function () {
    checkValidate();
    clickComboboxItem();
    clickButtonCombobox();
    autocomplete();
    keyEvents();
});

var genders = [
    { text: "Nam", value: 1 },
    { text: "Nữ", value: 0 },
    { text: "Khác", value: 2 }
] 
var currentFocus ;

$.fn.getData = function () {
    return genders;
}
$.fn.getText = function () { 
    return $('.combobox-text').val();
}
$.fn.getValue = function () {
    return $('.combobox-text').attr('key');
}

function checkValidate(){
    $('.combobox-text').blur(function(){
        var text = $('.combobox-text').val();
        console.log(text);
        $.each(genders, function(index, item){
            if(text == item.text) {
                $('.combobox').removeClass('border-red');
                
                return false;
            }
            if(text != item.text && index == genders.length-1){
                $('.combobox').addClass('border-red');
            }
        })
        
    })
}

function clickButtonCombobox() {
    $('.combobox button').click(function () {
        currentFocus = 0;
        $('.combobox-list').empty();
        $.each(genders, function (index, item) {
            let gender = $(`<div class="combobox-item" value=${item.value}>${item.text}</div>`);
            if ($(gender).attr('value') == $('.combobox-text').attr('key')) {
                $(gender).addClass('item-selected');
            }
            if (index == 0) {
                $(gender).addClass('autocomplete-active');
            }
            
            
            $('.combobox-list').append(gender);
        })
        clickComboboxItem();
        var icon = $(`<i class="fas fa-check"></i>`);
        $('.item-selected').append(icon);
        $('.combobox-list').toggle();

    })
}

function clickComboboxItem() {
    $('.combobox-item').click(function () {
        let itemSiblings = $(this).siblings();
        $(itemSiblings).removeClass('item-selected');
        $(this).addClass('item-selected');
        //Lay text tren item gan cho input
        let text = $(this).text();
        let value = $(this).attr('value');
        $('.combobox-text').val(text);
        $('.combobox-list').hide();

        $('.combobox-text').attr('key', value);
    })
}

function keyEvents() {
    $('.combobox').keydown(function (e) {
        var x = $('.combobox-item');
        if (x == null) return ;
        let itemSiblings = x.siblings();
        $(itemSiblings).removeClass('autocomplete-active');
        //console.log(x);
        if (e.keyCode == 40) {
            e.preventDefault();
            currentFocus++;
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
        }
        else if (e.keyCode == 38) {
            e.preventDefault();
            currentFocus--;
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
        }
        else if (e.keyCode == 13) {
            e.preventDefault();
            if(currentFocus > -1){
                // let text = $(this).text();
                // let value = $(this).attr('value');
                // $('input').val(text);
                // $('.combobox-list').hide();

                // $('input').attr('key', value);
                x[currentFocus].click();
            }
        }
        
        /*add class "autocomplete-active":*/
        $(x[currentFocus]).addClass("autocomplete-active");
    });
}

function autocomplete() {
    var inp = document.getElementsByClassName('combobox-text')[0];
    inp.addEventListener("input", function (e) {
        currentFocus = 0;
        let val = $(this).val();
        if (val.length != 0) {
            $('.combobox-list').empty();
            $.each(genders, function (index, item) {
                if (item.text.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    let gender = $(`<div class="combobox-item" value=${item.value}>${item.text}</div>`);
                    // if ($(gender).attr('value') == $('.combobox-text').attr('key')) {
                    //     $(gender).addClass('item-selected');
                    // }
                    
                    console.log(gender);
                    $('.combobox-list').append(gender);
                    
                    $('.combobox-list').show();
                    $('.combobox-list .combobox-item').first().addClass('autocomplete-active');
                }
            })
            
            
            clickComboboxItem();

        }
        else {
            $('.combobox-list').hide();
        }
    })
}
