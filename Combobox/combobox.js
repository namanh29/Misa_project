$(document).ready(function () {
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
var currentFocus = -1;

$.fn.getData = function () {
    return genders;
}
$.fn.getText = function () { 
    return $('.combobox-text').val();
}
$.fn.getValue = function () {
    return $('.combobox-text').attr('key');
}

function clickButtonCombobox() {
    $('.combobox button').click(function () {
        currentFocus = -1;
        $('.combobox-list').empty();
        $.each(genders, function (index, item) {
            let gender = $(`<div class="combobox-item" value=${item.value}>${item.text}</div>`);
            if ($(gender).attr('value') == $('input').attr('key')) {
                $(gender).addClass('item-selected');
            }
            $('.combobox-list').append(gender);
        })
        clickComboboxItem();
        $('.combobox-list').toggle();

    })
}

function clickComboboxItem() {
    $('.combobox-item').click(function () {
        // let itemSiblings = $(this).siblings();
        // $(itemSiblings).removeClass('item-selected');
        // $(this).addClass('item-selected');
        // Lay text tren item gan cho input
        let text = $(this).text();
        let value = $(this).attr('value');
        $('input').val(text);
        $('.combobox-list').hide();

        $('input').attr('key', value);
    })
}

function keyEvents() {
    $('.combobox').keydown(function (e) {
        var x = $('.combobox-item');
        if (x == null) return ;
        let itemSiblings = x.siblings();
        $(itemSiblings).removeClass('autocomplete-active');
        console.log(x);
        if (e.keyCode == 40) {
            currentFocus++;
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
        }
        else if (e.keyCode == 38) {
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
        console.log(currentFocus);
        
        /*add class "autocomplete-active":*/
        $(x[currentFocus]).addClass("autocomplete-active");
    });
}

function autocomplete() {
    var inp = document.getElementsByClassName('combobox-text')[0];
    console.log(inp);
    inp.addEventListener("input", function (e) {
        currentFocus = -1;
        let val = $(this).val();
        if (val.length != 0) {
            $('.combobox-list').empty();
            $.each(genders, function (index, item) {
                if (item.text.substr(0, val.length) == val) {
                    let gender = $(`<div class="combobox-item" value=${item.value}>${item.text}</div>`);
                    if ($(gender).attr('value') == $('input').attr('key')) {
                        $(gender).addClass('item-selected');
                    }
                    console.log(gender);
                    $('.combobox-list').append(gender);
                    $('.combobox-list').show();
                }
            })
            clickComboboxItem();

        }
        else {
            $('.combobox-list').hide();
        }
    })
}
