<template>
  <div class="content">
    <div class="header-content">
      <div class="title">Danh sách nhân viên</div>
      <div class="content-feature">
        <button class="btn-icon" id="btn-add" @click="btnAddOnClick()">
          <div class="icon-add"></div>
          <div class="btn-text">Thêm nhân viên</div>
        </button>
      </div>
    </div>
    <div class="filter-bar">
      <div class="filter-left">
        <input
          class="icon-search input-search"
          type="text"
          style="width: 275px"
          placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại"
        />
      
        <BaseCombobox :comboboxItems="comboboxItems.positions" class="cbx" index="1"/>
        
        <BaseCombobox :comboboxItems="comboboxItems.departments" class="cbx" index="2"/>
      </div>
      <div class="filter-right">
        <button id="btnDelete" class="m-second-button" @click="btnDeleteClick">
          Xóa
        </button>
        <button
          id="btn-refresh"
          class="m-second-button m-btn-refresh"
          @click="loadData"
        ></button>
      </div>
    </div>

    <div class="grid grid-employee">
      <table border="0" cellspacing="0">
        <colgroup>
          <col style="width: 120px" />
          <col style="width: 170px" />
          <col style="width: 130px" />
          <col style="width: 120px" />
          <col style="width: 120px" />
          <col style="width: 260px" />
          <col style="width: 120px" />
          <col style="width: 120px" />
          <col style="width: 130px" />
          <col style="width: 130px" />
        </colgroup>
        <thead>
          <tr>
            <th fieldName="EmployeeCode">Mã nhân viên</th>
            <th fieldName="FullName">Họ tên</th>
            <th fieldName="GenderName">Giới tính</th>
            <th
              class="text-align-center"
              fieldName="DateOfBirth"
              formatType="ddmmyyyy"
            >
              Ngày sinh
            </th>
            <th fieldName="PhoneNumber">Điện thoại</th>
            <th fieldName="Email">Email</th>
            <th fieldName="PositionName">Chức vụ</th>
            <th fieldName="DepartmentName">Phòng ban</th>
            <th
              class="text-align-right"
              fieldName="Salary"
              formatType="MoneyVnd"
            >
              Mức lương cơ bản
            </th>
            <th fieldName="WorkStatus">Tình trạng công việc</th>
          </tr>
        </thead>
        <tbody v-if="!iShowLoader">
          <tr 
            v-for="employee in Employees"
            v-bind:key="employee.EmployeeId"
            @dblclick="rowOnDblClick(employee)"
            @click="toggle(employee.EmployeeId)"
            :class="{ opened: opened.includes(employee.EmployeeId) }"
            
          >
            <td>{{ employee.EmployeeCode }}</td>
            <td>{{ employee.FullName }}</td>
            <td>{{ employee.GenderName }}</td>
            <td class="text-align-center">
              {{ formatDate(employee.DateOfBirth) }}
            </td>
            <td>{{ employee.PhoneNumber }}</td>
            <td v-tooltip.top="{content: employee.Email}">{{ employee.Email }}</td>
            <td>{{ employee.PositionName }}</td>
            <td>{{ employee.DepartmentName }}</td>
            <td class="text-align-right">{{ formatMoney(employee.Salary) }}</td>
            <td>{{ employee.WorkStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="paging-bar">
      <div class="page-num">Hiển thị 1-10/1000 nhân viên</div>
      <!-- <div class="page-num">
        <div class="page">
          <button><img src="../../../assets/icon/btn-firstpage.svg" alt="" /></button>
        </div>
        <div class="page">
          <button><img src="../../../assets/icon/btn-prev-page.svg" alt="" /></button>
        </div>
        <div class="page-num-item">
          <button>1</button>
        </div>
        <div class="page-num-item">
          <button>2</button>
        </div>
        <div class="page-num-item">
          <button>3</button>
        </div>
        <div class="page-num-item">
          <button>4</button>
        </div>
        <div class="page">
          <button @click="onclick"><img src="../../../assets/icon/btn-next-page.svg" alt="" /></button>
        </div>
        <div class="page">
          <button><img src="../../../assets/icon/btn-lastpage.svg" alt="" /></button>
        </div>
      </div> -->
      <Pagination
        :total-pages="totalPages"
        
        :current-page="currentPage"
        @pagechanged="onPageChange"
      />
      <div class="page-num">10 nhân viên/trang</div>
    </div>

    <EmployeeDetail
      v-if="isShowDetail"
      @cancels="cancel()"
      @loadData="loadData()"
      :employee="employeeCurrent"
      :formmode="formMode"
    />
    <BasePopup
      v-if="isShowPopupDel"
      @cancelPopup="cancelPopup"
      @confirmPopup="deleteEmployee"
      title="Xóa nhân viên"
      btnConfirmText="Xóa"
      btnCancelText="Hủy"
      type="delete"
    >
      <p>Bạn có chắc muốn xóa <b>"Thông tin của</b>
      <b>nhân viên này"</b> hay không?</p>
    </BasePopup>

    <!-- <div id="toast">
      <BaseToast 
        v-if="isShowToastDel"
        type="success"
        message="Xóa thành công"
      />
      <BaseToast 
        v-if="isShowToastAdd"
        type="success"
        message="Thêm thành công"
        @cancel="cancelToast"
      />
    </div> -->
    <BaseLoader v-if="isShowLoader"/>
  </div>
</template>

<script>
import axios from "axios";
import EmployeeDetail from "./EmployeeDetail.vue";
import Pagination from '../../../components/base/Pagination.vue';


export default {
  name: "ThePage",
  components: {
    EmployeeDetail,
    Pagination,
   
  },
  data() {
    return {
      Employees: [],
      isShowDetail: false,
      employeeCurrent: {},
      formMode: "",
      comboboxItems: {
        positions: [{value: 0, text: "Tất cả vị trí", isSelected: true}],
        departments: [{value: 0, text: "Tất cả phòng ban", isSelected: true}],
      },

      opened: [],
      isShowPopupDel: false,
      isShowToastAdd: false,
      isShowToastDel: false,
      isShowLoader: false,

      // pagination
      currentPage: 1,
      totalPages: 0
    };
  },
  created() {
    this.loadData();
    this.iShowLoader = false;
  },
  props: {},
  methods: {
    // Ham lay du lieu tu api
    loadData() {
      this.Employees = [];
      let me = this;
      me.isShowLoader = true;
      // Goi api thuc hien lay du lieu
      axios.get(`http://cukcuk.manhnv.net/v1/Employees/employeeFilter?pageSize=20&pageNumber=1&employeeFilter=nv`).then((res) => {
        console.log(res.data);
        me.totalPages = res.data.TotalPage;
        setTimeout(function(){me.isShowLoader = false, me.Employees = res.data.Data;}, 500);
        me.currentPage = 1;
      });

      axios.get("http://cukcuk.manhnv.net/v1/Positions").then((res) => {
        //console.log(res.data);
        res.data.forEach(function (item, index) {
          me.comboboxItems.positions[index+1] = {
            value: item.PositionId,
            text: item.PositionName,
            isSelected: false,
          };
        });
      });
      axios.get("http://cukcuk.manhnv.net/api/Department").then((res) => {
        //console.log(res.data);
        res.data.forEach(function (item, index) {
          me.comboboxItems.departments[index+1] = {
            value: item.DepartmentId,
            text: item.DepartmentName,
            isSelected: false,
          };
        });
      });
    },

    // Hàm hiển thị toast
    onclick(){
      this.cancelToast();
      this.isShowToastAdd = true;
      console.log(this.isShowToastAdd)
    },
    // Ẩn toast
    cancelToast(){
      this.isShowToastAdd = false;
    },
    // Click button them
    btnAddOnClick() {
      if (this.isShowDetail == false) {
        this.isShowDetail = true;
      }
      this.formMode = "add";
      console.log(this.isShowDetail);
    },

    cancel() {
      this.isShowDetail = false;
      this.employeeCurrent = {};
    },

    rowOnDblClick(key) {
      this.isShowDetail = true;
      console.log(key.EmployeeId);
      this.formMode = "edit";
      this.employeeCurrent = key;
    },

    btnDeleteClick() {
      this.isShowPopupDel = true;
      // var me = this;
      // this.opened.forEach(function(item){
      //   axios.delete(`http://cukcuk.manhnv.net/v1/Employees/${item}`).then((res)=>{
      //     console.log(res);
      //     me.loadData();
      //   })
      // })
    },
    cancelPopup() {
      this.isShowPopupDel = false;
    },

    deleteEmployee() {
      var me = this;
      this.opened.forEach(function (item) {
        axios
          .delete(`http://cukcuk.manhnv.net/v1/Employees/${item}`)
          .then((res) => {
            console.log(res);
            me.loadData();
            me.isShowPopupDel = false;
            me.isShowToastDel = true;
          });
      });
    },

    toggle(id) {
      let i = this.opened.indexOf(id);
      if (i > -1) {
        this.opened.splice(i, 1);
      } else {
        this.opened = [];
        this.opened.push(id);
      }
    },

    // Ham pagination
    onPageChange(page) {
      console.log(page)
      this.currentPage = page;
      
      this.Employees = [];
      let me = this;
      me.isShowLoader = true;
      // Goi api thuc hien lay du lieu
      
      axios.get(`http://cukcuk.manhnv.net/v1/Employees/employeeFilter?pageSize=20&pageNumber=${page}&employeeFilter=nv`).then((res) => {
        console.log(res.data.Data);
        setTimeout(function(){me.isShowLoader = false, me.Employees = res.data.Data;}, 500);
        
      });
    },
    /** -------------------------------------------
     * Format dữ liệu ngày tháng sang ngày/tháng/năm
     * @param {any} date tham số có kiểu dữ liệu bất kì
     * CreateBy: PNANH (04/07/2021)
     */
    formatDate(d) {
      var date = new Date(d);
      if (Number.isNaN(date.getTime())) {
        return "";
      } else {
        var day = date.getDate(),
          month = date.getMonth() + 1,
          year = date.getFullYear();
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        return `${day}/${month}/${year}`;
      }
    },

    /**
     * Hàm định dạng hiển thị tiền tệ
     * @param {Number} money Số tiền
     * CreatedBy: PNANH (04/07/2021)
     */
    formatMoney(money) {
      if (money) {
        return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      }
      return "";
    },
  },
};
</script>

<style scoped>
@import url("../../../css/layout/content.css");
@import url("../../../css/common/tooltip.css");
.cbx {
  width: 200px;
  margin-left: 16px;
}
.selectedrow {
  background-color: #019160 !important;
}
.opened {
  background-color: #019160 !important;
}


</style>