<template>
    <div class="navbar">
        <div class="logo-site">
            <div class="toggle-icon"></div>
            <div class="cukcuk-logo"></div>
        </div>
        <div class="navbar-content">
            <router-link to="/dic/overview" class="nav-item">
                <div class="navbar-item-icon nav-item1"></div>
                <div class="navbar-item-text">Tổng quan</div>
            </router-link>
            <router-link to="/dic/report" class="nav-item">
                <div class="navbar-item-icon nav-item2"></div>
                <div class="navbar-item-text">Báo cáo</div>
            </router-link>
            <router-link to="/dic/purchase" class="nav-item">
                <div class="navbar-item-icon nav-item3"></div>
                <div class="navbar-item-text">Mua hàng</div>
            </router-link>
            <router-link to="/dic/employee" class="nav-item ">
                <div class="navbar-item-icon nav-item4"></div>
                <div class="navbar-item-text">Danh mục nhân viên</div>
            </router-link>
            <router-link to="/dic/customer" class="nav-item">
                <div class="navbar-item-icon nav-item4"></div>
                <div class="navbar-item-text">Danh mục khách hàng</div>
            </router-link>
            <router-link to="/dic/setting" class="nav-item">
                <div class="navbar-item-icon nav-item5"></div>
                <div class="navbar-item-text">Thiết lập hệ thống</div>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    @import url('../../css/layout/navbar.css');
    .router-link-active {
        background-color: #019601 !important;
        color: #ffffff !important;
    }
    .router-link-active .navbar-item-icon{
        filter: brightness(0) invert(1);
    }
</style>

<script>

    

export default {
    
}
</script>