<template>
    <div id="toast">
        <ToastMsgItem
            v-for="(toastItem,index) in toastList"
            :key="index"
            :toast="toastItem"
            @removeToast="removeToast"
        />
    </div>
</template>
<script>
import ToastMsgItem from './ToastMsgItem.vue'
export default {
    name: "ToastMessage",
    components: {ToastMsgItem},
    props: {
        newToast: {
            type: Object
        }
    },
    data() {
        return {
            toastList: [],
            countRemovedToast: 0
        }
    },
    
    watch: {
        newToast(){
            this.toastList.push(this.newToast);
        },
        countRemovedToast(){
            if(this.toastList.length == this.countRemovedToast){
                this.toastList = [];
                this.countRemovedToast = 0;
            }
        }
    },
    methods: {
        removeToast(){
            //this.toastList = this.toastList.filter(item => item !== toast);
            this.countRemovedToast++;
            console.log(this.countRemovedToast)
        }
    },
}
</script>

<style lang="css">
    #toast {
        position: fixed;
        top: 32px;
        right: 32px;
        z-index: 10000;
    }
</style>