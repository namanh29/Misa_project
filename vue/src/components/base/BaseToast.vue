<template>
  
    <div 
        class="toast"
        :class="type"
    >
      <div class="toast-icon">
        <i :class="icons[type]"></i>
      </div>
      <div class="toast-body">
        <p class="toast-message">{{ message }}</p>
      </div>
      <div class="toast-close" @click="onclick">
        <i class="fas fa-times"></i>
      </div>
    </div>
  
</template>

<script>
export default {
  props: {
    type: String,
    message: String,
    
  },
  data() {
    return {
      icons: {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-triangle",
        error: "fas fa-exclamation-circle",
      },
      isShowToast: false,
      removeId: '',
    };
  },
  created() {
    this.toast(5000);
  },
  methods: {
    onclick() {
      this.$emit("cancel");
      clearTimeout(this.removeId);
    },
    toast( duration = 5000 ) {
      var me = this;
      // auto remove toast
      this.removeId = setTimeout(function () {
        me.$emit("cancel");
      }, duration + 1000);

      // remove toast when click
      
    },
  },
};
</script>

<style lang="css">
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
.toast {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 2px;
  padding: 20px 0;
  border-left: 4px solid;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.08);
  margin-top: 24px;
  margin-left: 24px;
  min-width: 250px;
  max-width: 300px;
  transition: all linear 0.3s;
  animation: slideInLeft ease .3s, fadeOut linear 1s 3s forwards
}
@keyframes slideInLeft {
  from {
    transform: translateX(calc(100% + 32px));
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fadeOut {
  to {
    opacity: 0;
  }
}
.toast-icon {
  padding: 0 16px;
  font-size: 24px;
}
.toast-close {
  padding: 0 16px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.toast-body {
  flex-grow: 1;
}
.toast-title {
  font-size: 15;
  font-weight: 600;
  color: #333;
}
.toast-msg {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
  line-height: 1.5;
}
.success {
  border-color: #019160;
}
.success .toast-icon,
.success .toast-close {
  color: #019160;
}
.info {
  border-color: #2f86eb;
}
.info .toast-icon,
.info .toast-close {
  color: #2f86eb;
}
.warning {
  border-color: #ffc021;
}
.warning .toast-icon,
.warning .toast-close {
  color: #ffc021;
}
.error {
  border-color: #ff623d;
}
.error .toast-icon,
.error .toast-close {
  color: #ff623d;
}


</style>