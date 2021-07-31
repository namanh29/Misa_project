<template>
    <div>
        <div class="label">{{label}}</div>
        <div class="dropdown" @keydown="keyEvent($event)" tabindex="0">
            <!-- <input class="dropdown-text" type="text" v-model="ddInput" disabled> -->
            <div class="dropdown-text" @click="toggleList">{{ddInput}}</div>
            <button @click="toggleList"><i class="arrow down" ></i></button>
            <div v-show="isShow" class="dropdown-list" >
                <div class="dropdown-item" 
                    v-for="(ddItem, index) in ddItems" 
                    :class="{selected:ddItem.isSelected, focusItem: index==currentFocus}"
                    :key="index"
                    @click="clickItem(ddItem)"
                    >
                    <i v-if="ddItem.isSelected" class="fas fa-check"></i>
                    {{ddItem.text}}
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        dropdownItems: {
            type: Array,

        },
        selectedItem: {
            type: String,
            default: ''
        }   
    },
    data() {
        return {
            isShow : false,
            ddInput: this.selectedItem,
            ddItems: [],
            currentFocus: 0
        }
    },
    // watch: {
    //      dropdowncomboboxItems.forEach(item=>{
    //             console.log(item);
    //             if(item.isSelected === true){
    //                 this.ddInput = item.text;
    //             }
    //         })
    //     }
        
    // },
    created() {
        this.dropdownItems.forEach(item=>{
            console.log(item);
            if(item.isSelected === true){
                this.ddInput = item.text;
            }
        })
    },
    methods: {
        toggleList(){
            this.isShow = !this.isShow;
            this.ddItems = this.dropdownItems
            this.currentFocus = 0;
            console.log(this.isShow)
        },

        clickItem(ddItem){
            this.currentFocus = 0;
            this.ddInput = ddItem.text;
            this.dropdownItems.forEach(item=>{
                item.isSelected = false;
                if(item.value == ddItem.value) {
                    item.isSelected = true;
                    this.isShow = !this.isShow
                    console.log(this.isShow)
                }
                
            })
            
        },

        

        keyEvent(event){
            
            if(this.ddItems.length != 0) {
                console.log(this.ddItems);
                if (event.keyCode == 40) {
                    event.preventDefault();
                    this.currentFocus++;
                    if (this.currentFocus >= this.ddItems.length) this.currentFocus = 0;
                    if (this.currentFocus < 0) this.currentFocus = (this.ddItems.length - 1);
                }
                else if (event.keyCode == 38) {
                    event.preventDefault();
                    this.currentFocus--;
                    if (this.currentFocus >= this.ddItems.length) this.currentFocus = 0;
                    if (this.currentFocus < 0) this.currentFocus = (this.ddItems.length - 1);
                }
                else if (event.keyCode == 13) {
                    event.preventDefault();
                    if(this.currentFocus > -1){
                        // let text = $(this).text();
                        // let value = $(this).attr('value');
                        // $('input').val(text);
                        // $('.dropdown-list').hide();

                        // $('input').attr('key', value);
                        this.clickItem(this.ddItems[this.currentFocus]);
                    }
                }
            }
            
        }
    }
}
</script>

<style lang="css">
    


</style>