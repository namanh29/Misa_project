<template>
  <div class="m-dialog dialog-detail" title="Thông tin nhân viên">
    <div class="dialog-modal"></div>
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="header-title">Thông tin nhân viên</div>
        <button id="btn-x-dialog" class="btn-x" @click="btnCancelClick()"></button>
      </div>
      <div class="dialog-main">
        <div class="dialog-avatar">
          <div class="avatar-img"></div>
          <div class="avatar-des">
            <p>(Vui lòng chọn ảnh có định</p>
            <p>dạng</p>
            <p>.jpg, .jpeg, .png, .gif. )</p>
          </div>
        </div>

        <div class="dialog-infor">
          <div class="infor-common">
            <p>A. Thông tin chung:</p>
            <hr />
            <div class="label-infor">
              
              <BaseInput label="Mã nhân viên"
                          type="text"
                          v-model="employee.EmployeeCode"
                          :required="true"
                          ref="input1"
                          >
              </BaseInput>
              <!-- <div>
                <div class="label">Họ và tên (<span>*</span>)</div>
                <input
                  id="txtFullName"
                  class="input-label"
                  fieldName="FullName"
                  type="text"
                  required
                  v-model="employee.FullName"
                />
              </div> -->
              <BaseInput label="Họ và tên"
                          type="text"
                          v-model="employee.FullName"
                          :required="true"
                          ref="input2"
                          >
              </BaseInput>
            </div>
            <div class="label-infor">
              
              <BaseInput label="Ngày sinh"
                          type="date"
                          v-model="dateOfBirth"
                          :required="false"
                          >
              </BaseInput>
              <div>
                <div class="label">Giới tính</div>
                
                <BaseCombobox :comboboxItems="comboboxItems.genders" />
              </div>
            </div>
            <div class="label-infor">
              
              <BaseInput label="Số CMTND/ Căn cước"
                          type="text"
                          v-model="employee.IdentityNumber"
                          :required="true"
                          ref="input3"
                          >
              </BaseInput>
              
              <BaseInput label="Ngày cấp"
                          type="date"
                          v-model="identityDate"
                          :required="false"
                          >
              </BaseInput>
            </div>
            <div class="label-infor">
              
              <BaseInput label="Nơi cấp"
                          type="text"
                          v-model="employee.IdentityPlace"
                          :required="false"
                          >
              </BaseInput>
            </div>
            <div class="label-infor">
              
              <BaseInput label="Email"
                          type="email"
                          v-model="employee.Email"
                          :required="true"
                          ref="input4"
                          >
              </BaseInput>
              
              <BaseInput label="Số điện thoại"
                          type="text"
                          v-model="employee.PhoneNumber"
                          :required="true"
                          field="phone"
                          ref="input5"
                          >
              </BaseInput>
            </div>
          </div>
          <div class="infor-work">
            <p>B. THÔNG TIN CÔNG VIỆC</p>
            <hr />
            <div class="label-infor">
              <BaseCombobox
                  label="Vị trí"
                  :comboboxItems="comboboxItems.positions"
                  :selectedItem="employee.PositionName"
                />
              <BaseCombobox
                  label="Phòng ban"
                  :comboboxItems="comboboxItems.departments"
                  :selectedItem="employee.DepartmentName"
                />
            </div>
            <div class="label-infor">
              
              <BaseInput label="Mã số thuế cá nhân"
                          type="text"
                          v-model="employee.PersonalTaxCode"
                          :required="false"
                          >
              </BaseInput>
              
              <BaseInput label="Mức lương cơ bản"
                          type="text"
                          v-model="employee.Salary"
                          :required="false"
                          field="salary"
                          >
              </BaseInput>
            </div>
            <div class="label-infor">
              
              <BaseInput label="Ngày gia nhập công ty"
                          type="date"
                          v-model="joinDate"
                          :required="false"
                          >
              </BaseInput>
              <BaseCombobox
                  label="Tình trạng công việc"
                  :comboboxItems="comboboxItems.workStatus"
                  :selectedItem="employee.WorkStatus"
                />
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button id="btn-save" class="btn-icon" @click="btnSaveClick()">
          <div class="icon-save"><i class="far fa-save"></i></div>
          <div class="btn-text">Lưu</div>
        </button>
        <button
          id="btn-cancel-dialog"
          class="m-second-button btn-cancel"
          @click="btnCancelClick()"
        >
          Hủy
        </button>
      </div>
    </div>

    <BasePopup v-if="isShowPopup" 
              @cancelPopup="cancelPopup" 
              @confirmPopup="closePopup"
              title="Đóng form thông tin chung"
              btnConfirmText="Đóng"
              btnCancelText="Tiếp tục nhập"
              type="warning">
              
              <p>Bạn có chắc muốn đóng form nhập <b>"Thông tin chung của</b></p>
                        <p><b>thủ tục 603"</b> hay không?</p>
    </BasePopup>
  </div>
</template>

<style lang="css" >
  @import url('../../../css/common/dialog.css');
</style>

<script>
import axios from "axios";

export default {
  name: "EmployeeDetail",

  created() {
    this.createData();
  },

  props: {
    employee: Object,
    formmode: String,
  },

  data() {
    return {
      formMode: this.formmode,
      isShowPopup: false, 
      dateOfBirth : this.formatDate(this.employee.DateOfBirth),
      identityDate : this.formatDate(this.employee.IdentityDate),
      joinDate: this.formatDate(this.employee.JoinDate),
      
      comboboxItems: {
        genders: [
          { value: 1, text: "Nam", isSelected: false },
          { value: 0, text: "Nữ", isSelected: false },
          { value: 2, text: "Không xác định", isSelected: false },
        ],
        positions: [],
        departments: [],
        workStatus: [
          { value: 1, text: "Đang làm việc", isSelected: false },
          { value: 0, text: "Nghỉ hưu", isSelected: false },
        ],
      },
      t: 0,
    };
  },

  methods: {
    createData() {
      let me = this;
      // Goi api thuc hien lay du lieu
      axios.get("http://cukcuk.manhnv.net/v1/Positions").then((res) => {
        //console.log(res.data);
        res.data.forEach(function (item, index) {
          me.comboboxItems.positions[index] = {
            value: item.PositionId,
            text: item.PositionName,
            isSelected: false,
          };
          if (
            me.comboboxItems.positions[index].value == me.employee.PositionId
          ) {
            me.comboboxItems.positions[index].isSelected = true;
            
          }
        });
      });
      axios.get("http://cukcuk.manhnv.net/api/Department").then((res) => {
        //console.log(res.data);
        res.data.forEach(function (item, index) {
          me.comboboxItems.departments[index] = {
            value: item.DepartmentId,
            text: item.DepartmentName,
            isSelected: false,
          };
          if (
            me.comboboxItems.departments[index].value ==
            me.employee.DepartmentId
          ) {
            me.comboboxItems.departments[index].isSelected = true;
          }
        });
      });
      console.log(me.comboboxItems.positions);

      this.comboboxItems.genders.forEach((item) => {
        console.log(item);
        if (item.value == this.employee.Gender) {
          item.isSelected = true;
        }
      });
      this.comboboxItems.workStatus.forEach((item) => {
        console.log(item);
        if (item.value == this.employee.WorkStatus) {
          item.isSelected = true;
        }
      });
    },

    btnCancelClick() {
      this.isShowPopup = true;
       
    },

    btnSaveClick() {
      var me = this;
      let isInvalid = false;
      const indexInvalid = [];
      
      // Validate du lieu
      Object.entries(this.$refs).forEach(function(item,index){
        item[1].$refs.BaseInput.focus();
        item[1].$refs.BaseInput.blur();
        if(item[1].invalid == true){
          isInvalid = true;
          indexInvalid.push(index);
        }
      })
      if(isInvalid == true){
        //alert("Dữ liệu không hợp lệ, vui lòng kiểm tra lại.");
        this.$store.commit('setToast', {
          type: 'warning',
          message: "Dữ liệu không hợp lệ, vui lòng kiểm tra lại"
        })
        Object.entries(this.$refs)[indexInvalid[0]][1].$refs.BaseInput.focus();
        console.log(indexInvalid)
        return;
      }
      // Cap nhat cac thuoc tinh trong employee
      this.employee.DateOfBirth = this.dateOfBirth;
      this.comboboxItems.genders.forEach((item) => {
        if (item.isSelected == true) {
          this.employee.Gender = item.value;
        }
      });
      this.comboboxItems.positions.forEach((item) => {
        if (item.isSelected == true) {
          this.employee.PositionId = item.value;
        }
      });
      this.comboboxItems.departments.forEach((item) => {
        if (item.isSelected == true) {
          this.employee.DepartmentId = item.value;
        }
      });
      this.comboboxItems.workStatus.forEach((item) => {
        if (item.isSelected == true) {
          this.employee.WorkStatus = item.value;
        }
      });
      console.log(this.comboboxItems);
      console.log(this.employee);
      if (this.formmode == "add") {
        axios
          .post("http://cukcuk.manhnv.net/v1/Employees", this.employee)
          .then(function (res) {
            console.log(res);
            //alert("Thêm thành công!");
            me.$store.commit('setToast', {
              type: 'success',
              message: "Thêm thành công"
            })
            me.$emit("cancels");
            me.$emit("loadData");
          });
      } else {
        axios.put(`http://cukcuk.manhnv.net/v1/Employees/${this.employee.EmployeeId}`, this.employee).then(function(res){
          console.log(res.data);
          //alert("Sửa thành công!");
          me.$store.commit('setToast', {
            type: 'success',
            message: "Sửa thành công"
          })
          me.$emit("cancels");
          me.$emit("loadData");
        });
      }
      
    },

    formatDate(d) {
      if (d != null) {
        return d.substr(0, 10);
      }
    },

    cancelPopup(){
      this.isShowPopup = false;
    },
    closePopup(){
      this.$emit("cancels");
    }
  },
};
</script>