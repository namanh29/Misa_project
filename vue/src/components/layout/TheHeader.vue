<template>
    <div class="header">   
        <BaseDropdown
            :dropdownItems="dropdownItems.titles"
            class="header-title"
        />
        
        <div class="header-user">
            <div class="avatar-img"></div>
            <div>Nguyễn Văn Mạnh</div>
            <div class="option"></div>
        </div>
    </div>
</template>
<style lang="css" scoped>
    @import url('../../css/layout/header.css');
    .header .header-title input{
        font-size: 15px;
        font-weight: bold;
        border: none;
    }
</style>
<script>
    export default {
        name:"TheHeader",
        data() {
            return {
                dropdownItems: {
                    titles: [
                        { value: 0, text: "Nhà hàng Biển Đông", isSelected: true },
                        { value: 1, text: "Nhà hàng Biển Tây", isSelected: false },
                        { value: 2, text: "Nhà hàng Biển Nam", isSelected: false },
                    ],
                }
            }   
        },
    }
</script>