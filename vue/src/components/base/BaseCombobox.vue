<template>
    <div>
        <div class="label">{{label}}</div>
        <div class="combobox" 
            @keydown="keyEvent($event)" 
            :class="{'cbx-active':cbxActive}" 
            :tabindex="index"
        >
            <input class="combobox-text" 
                type="text" 
                v-model="cbxInput" 
                @input="autocomplete" 
                @focus="cbxActive = true"
                @blur="onBlur"
                >
            <button @click="toggleList"><span class="icon-button"><i :class="{'arrow down':!isShow, 'arrow up': isShow}"></i></span></button>
            <div v-if="isShow" class="combobox-list" >
                <div class="combobox-item" 
                    v-for="(cbxItem, index) in cbxItems" 
                    :class="{selected:cbxItem.isSelected, focusItem: index==currentFocus}"
                    :key="index"
                    @click="clickItem(cbxItem.text)"
                    >
                    <i v-if="cbxItem.isSelected" class="fas fa-check"></i>
                    {{cbxItem.text}}
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

export default {
    props: {
        label: String,
        selectedPosition: Number,
        comboboxItems: Array,
        selectedItem: {
            type: [String, Number],
        },
        index: String
    },
    data() {
        return {
            isShow : false,
            cbxInput: this.selectedItem,
            cbxItems: [],
            currentFocus: 0,
            cbxActive: false
        }
    },
    
    created() {
        this.comboboxItems.forEach(item=>{
            console.log(item);
            if(item.isSelected === true){
                this.cbxInput = item.text;
            }
        })
    },
    methods: {
        toggleList(){
            this.isShow = !this.isShow;
            this.cbxActive = this.isShow
            this.cbxItems = this.comboboxItems
            this.currentFocus = 0;
        },
        onBlur() {
            this.cbxActive = false;
            
        },
        clickItem(text){
            this.currentFocus = 0;
            this.cbxInput = text;
            this.comboboxItems.forEach(item=>{
                item.isSelected = false;
                if(item.text == text) {
                    item.isSelected = true;
                    this.isShow = !this.isShow;
                    this.cbxActive = false;
                }
                
            })
            
            
        },

        autocomplete(){
            this.currentFocus = 0;
            var me = this;
            this.isShow = true;
            
            var val = this.cbxInput;
            if(val.length != 0){
                this.cbxItems = [];
                this.comboboxItems.forEach(function(item){
                    item.isSelected = false;
                    if (item.text.toUpperCase().includes(val.toUpperCase()) ) {
                        me.cbxItems.push(item)
                    }
                    
                })
            }
            else {
                this.cbxItems = [];
            }
            
        },

        keyEvent(event){
            
            if(this.cbxItems.length != 0) {
                console.log(this.cbxItems);
                if (event.keyCode == 40) {
                    event.preventDefault();
                    this.currentFocus++;
                    if (this.currentFocus >= this.cbxItems.length) this.currentFocus = 0;
                    if (this.currentFocus < 0) this.currentFocus = (this.cbxItems.length - 1);
                }
                else if (event.keyCode == 38) {
                    event.preventDefault();
                    this.currentFocus--;
                    if (this.currentFocus >= this.cbxItems.length) this.currentFocus = 0;
                    if (this.currentFocus < 0) this.currentFocus = (this.cbxItems.length - 1);
                }
                else if (event.keyCode == 13) {
                    event.preventDefault();
                    if(this.currentFocus > -1){
                        // let text = $(this).text();
                        // let value = $(this).attr('value');
                        // $('input').val(text);
                        // $('.combobox-list').hide();

                        // $('input').attr('key', value);
                        this.clickItem(this.cbxItems[this.currentFocus].text);
                    }
                }
            }
            
        }
    }
}
</script>

<style lang="css" scoped>
    button{
        position: relative;
    }
    .icon-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .arrow {
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    
  }
  
  .right {
    transform:  rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  
  .left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }
  
  .up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }
  
  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  .focusItem {
      background-color: #e9ebee;
  }
  .cbx-active {
      border-color: #019160;
  }
</style>