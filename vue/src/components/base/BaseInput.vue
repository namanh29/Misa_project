<template>
  <div>
    <div class="label">
      {{ label }} <span v-if="required">(<span>*</span>)</span>
    </div>
    <div class="input-box">
      <input
      class="input-label"
      :class="{'invalid':invalid, 'text-right':field=='salary'}"
      :style="{'text-align':textAlign}"
      :type="type"
      :value="value"
      :name = "field"
      @input="updateValue($event.target.value)"
      @blur="onBlur($event.target)"
      ref="BaseInput"
      v-tooltip.top="{content: message}"
    />
    <div v-if="field=='salary'" class="currency-type">(VNĐ)</div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: "BaseInput",
  created() {
    if(this.field == 'salary'){
      this.textAlign = 'right'
    }
  },
  props: {
    label: {
      type: String
    },
    type: {
      type: String
    },
    value: {
      type: [String, Number]
    },
    required: {
      type: Boolean
    },
    field: {
      type: String
    },
    
  },

  data() {
      return {
          invalid: false,
          message: '',
          textAlign: ''
      }
  },

  methods: {
    updateValue: function (value) {
      this.$emit("input", value);
    },
    onBlur(e){
        if(this.required == true){
            if(e.value == '') {
                this.invalid=true;
                this.message = 'Trường này không được bỏ trống'
            }
            else {
                this.invalid = false;
                this.message = ''
            }
        }
        if(e.type == 'email' && e.value != '' ){
            if( this.validateEmail(e.value) == false){
                this.invalid = true;
                this.message = 'Email không hợp lệ'
            }
            else {
                this.invalid = false;
                this.message = ''
            }
        }
        if(e.name == 'phone' && e.value != '' ){
            if( this.validatePhone(e.value) == false){
                this.invalid = true;
                this.message = 'Số điện thoại không hợp lệ'
            }
            else {
                this.invalid = false;
                this.message = ''
            }
        }
        if(e.name == 'salary'  ){
            if(  this.validateSalary(e.value) == false && e.value != ''){
                this.invalid = true;
                this.message = 'Tiền lương không hợp lệ'
            }
            else {
                this.invalid = false;
                this.message = ''
            }
        }
    },
    validateEmail(email){
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    validatePhone(phone){
      var re = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
      return re.test(phone);
    },

    validateSalary(salary){
      var re = /^[0-9]+$/;
      return re.test(salary);
    }
  }
}
</script>

<style lang="css" scoped>
@import url("../../css/common/input.css");
@import url("../../css/common/dialog.css");
@import url("../../css/common/tooltip.css");
.invalid {
    border: 1px solid #FF4747;
}
.input-box {
  position: relative;
}
.currency-type {
  position: absolute;
  right: 8px;
  top: 0px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.7);
}
.text-right {
  padding-right: 48px;
}
  
</style>