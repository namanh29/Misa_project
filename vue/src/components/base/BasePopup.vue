<template>
    <div class="popup">
        <div class="popup-modal"></div>
        <div class="popup-content">
            <div class="popup-body">
                <div class="popup-header">{{title}}</div>
                <button id="btn-x-popup" class="btn-x" @click="btnCancel"></button>
                <div class="popup-main">
                    <div class="popup-icon" :class="type"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="popup-infor">
                        <slot></slot>
                    </div>
                </div>
            </div>
            <div class="popup-footer">
                <button id="btn-cancel-popup" class="m-second-button btn-cancel" @click="btnCancel">{{btnCancelText}}</button>
                <button id="btn-close" class="btn-default btn-close" @click="btnDelete" :style="{'background-color':bgColor}">{{btnConfirmText}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        info: String,
        btnCancelText: String,
        btnConfirmText: String,
        type: String
    },
    data() {
        return {
            bgColor: '',
        }
    },
    created() {
        if(this.type == 'delete'){
            this.bgColor = '#ff623d'
        }
    },
    methods: {
        btnCancel(){
            this.$emit("cancelPopup");
        },
        btnDelete(){
            this.$emit("confirmPopup");
        }
    }
}
</script>

<style lang="css">
    @import url('../../css/common/popup.css');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
    .warning {
        color: #ffc021;
    }
    .delete {
        color: #ff623d
    }
</style>