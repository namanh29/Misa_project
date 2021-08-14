<template>
    <div>
        <button :class="[btnType, {'short-text': isShortText}]" v-on="$listeners" :style="{'background-color': bgColor}">
          <div 
            v-if="btnType=='btn-icon'"
            class="icon-btn">
              <div :class="icon"></div>
          </div>
          <div class="btn-text">{{btnText}}</div>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShortText: this.btnText?.split(" ").length < 3
        }
    },
    props: {
        btnType: String,
        btnText: String,
        icon: {
            type: String,
            default: ""
        },
        bgColor: String
    },
    
}
</script>