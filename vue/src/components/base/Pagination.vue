<template>
    <div class="page-num">
        <div class="page">
            <button @click="onClickFirstPage" :disabled="isInFirstPage">
              <img src="../../assets/icon/btn-firstpage.svg" alt="" />
            </button>
        </div>
        <div class="page">
            <button @click="onClickPrePage" :disabled="isInFirstPage">
              <img src="../../assets/icon/btn-prev-page.svg" alt="" />
            </button>
        </div>
        <div class="page-num-item"
            v-for="(page,index) in pages" :key="index">
            <button @click="onClickPage(page.name)" :disabled="page.isDisabled" :class="{active: isPageActive(page.name)}">
              {{page.name}}
            </button>
        </div>
        
        <div class="page">
            <button @click="onClickNextPage" :disabled="isInLastPage">
                <img src="../../assets/icon/btn-next-page.svg" alt="" />
            </button>
        </div>
        <div class="page">
            <button @click="onClickLastPage" :disabled="isInLastPage">
                <img src="../../assets/icon/btn-lastpage.svg" alt="" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 4
        },
        totalPages: {
            type: Number,
            required: true
        },
        
        currentPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        startPage(){
            // Khi ở page đầu
            if(this.currentPage === 1) {
                return 1;
            }
            // Khi ở page cuối
            if(this.currentPage === this.totalPages){
                return this.totalPages - this.maxVisibleButtons + 1;
            }
            // Khi ở các page giữa 
            return this.currentPage - 1;
        },
        endPage(){
            return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        },
        pages() {
            const range = [];
            for(let i = this.startPage; i <= this.endPage; i++){
                range.push({name: i, isDisabled: i === this.currentPage});
            }
            return range;
        },
        isInFirstPage(){
            return this.currentPage === 1;
        },
        isInLastPage(){
            return this.currentPage === this.totalPages;
        }
    },
    methods: {
        onClickFirstPage(){
            this.$emit('pagechanged', 1);
        },
        onClickPrePage(){
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page){
            this.$emit('pagechanged', page)
        },
        onClickNextPage(){
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage(){
            this.$emit('pagechanged', this.totalPages);
        },
        isPageActive(page){
            return this.currentPage === page;
        }
    },
}
</script>

<style lang="css">
    .page-num {
        display: flex;
        margin: auto 10px;
    }
    .page-num > div {
        width: 30px;
        height: 30px;
        margin: auto 10px;
        
    }
    .page > button {
        border: none;
        width: 100%;
        height: 100%;
        background-color: white;
    }
    .page-num-item > button {
        display: inline-block;
        width: 100%;
        height: 100%;
        border: 1px solid #bbbbbb;
        border-radius: 30px;
        text-align: center;
        line-height: 30px;
        background-color: #ffffff;
    }
    .page-num-item button:hover {
        background-color: #e5e5e5;
        cursor: pointer;
    }
    
    .page-num-item .active  {
        background-color: #019160 !important;
        color: white !important;
    }
</style>