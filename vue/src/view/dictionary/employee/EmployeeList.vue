<template>
  <div class="content">
    <div class="header-content">
      <div class="title">Danh sách nhân viên</div>
      <div class="content-feature">
        <!-- <button class="btn-icon" id="btn-add" @click="btnAddOnClick()">
          <div class="icon-add"></div>
          <div class="btn-text">Thêm nhân viên</div>
        </button> -->
        <BaseButton
          btnText="Thêm nhân viên"
          btnType="btn-icon"
          icon="icon-add"
          @click="btnAddOnClick"
        />
      </div>
    </div>
    <div class="filter-bar">
      <div class="filter-left">
        <input
          class="icon-search input-search"
          type="text"
          style="width: 275px"
          placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại"
          @keyup.enter="getEmployeeFilter()"
          v-model="employeeFilter"
        />
      
        <BaseCombobox :items="comboboxItems.positions" class="cbx" index="1" @update-item="updatePositions"/>
        
        <BaseCombobox :items="comboboxItems.departments" class="cbx" index="2"/>
      </div>
      <div class="filter-right">
        
        <BaseButton
          btnText="Xóa"
          btnType="second-button"
          @click="btnDeleteClick"
        />
        
        <BaseButton
          btnType="btn-refresh second-button"
          @click="loadData"
        />
      </div>
    </div>

    <BaseTable
      :data="Employees"
      :fields="tableField"
      :opened="opened"
      @row-on-dblclick="rowOnDblClick"
      @update-selected-items="updateItems"
    />
    <!-- <div class="grid grid-employee">
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
            <td>{{ employee.Gender }}</td>
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
    </div> -->

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
      :employeeProps="employeeCurrent"
      :formmode="formMode"
      :departments="departments"
      :positions="positions"
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

    <BaseLoader v-if="isShowLoader"/>
  </div>
</template>

<script>

import EmployeeDetail from "./EmployeeDetail.vue";
import EmployeeApi from '../../../api/employeeApi';
import DepartmentApi from '../../../api/departmentApi';
import PositionApi from '../../../api/positionApi'
import BaseTable from '../../../components/base/BaseTable.vue';

export default {
  name: "ThePage",
  components: {
    EmployeeDetail,
    BaseTable,
  },

  data() {
    return {
      Employees: [],
      isShowDetail: false,
      employeeCurrent: {},
      formMode: "",
      comboboxItems: {
        positions: [{value: "", text: "Tất cả vị trí", isSelected: true}],
        departments: [{value: "", text: "Tất cả phòng ban", isSelected: true}],
      },
      departments: [],
      positions: [],

      tableField: [
        {fieldName: "EmployeeCode", text: "Mã nhân viên"},
        {fieldName: "FullName", text: "Họ tên"},
        {fieldName: "GenderName", text: "Giới tính"},
        {fieldName: "DateOfBirth", text: "Ngày sinh", textAlign: "text-align-center", format: "date"},
        {fieldName: "PhoneNumber", text: "Điện thoại"},
        {fieldName: "Email", text: "Email"},
        {fieldName: "PositionName", text: "Chức vụ"},
        {fieldName: "DepartmentName", text: "Phòng ban"},
        {fieldName: "Salary", text: "Mức lương cơ bản", textAlign: "text-align-right", format: "money"},
        {fieldName: "WorkStatusName", text: "Tình trạng công việc"},
      ],

      opened: [],
      isShowPopupDel: false,
      isShowLoader: false,

      // pagination
      currentPage: 1,
      totalPages: 0,
      employeeFilter: "",
      positionFilter: "",
      departmentFilter: ""
    };
  },
  created() {
    this.loadData();
    this.iShowLoader = false;
  },
  computed: {
    cbxPosition(){
      return this.comboboxItems.positions;
    },
    cbxDepartment(){
      return this.comboboxItems.departments;
    }
  },
  watch: {
    comboboxItems: {
      handler: function(val){
        console.log(this.comboboxItems.positions);
        val.positions.forEach((item) => {
          if (item.isSelected == true) {
            this.positionFilter = item.value;
          }
        });
        val.departments.forEach((item) => {
          if (item.isSelected == true) {
            this.departmentFilter = item.value;
          }
        })
      },
      deep: true
    },
    
    positionFilter(){
      this.getEmployeeFilter()
    },
    departmentFilter(){
      this.getEmployeeFilter()
    },
    
  },
  methods: {
    // Ham lay du lieu tu api
    async loadData() {
      this.Employees = [];
      let me = this;
      me.isShowLoader = true;
      // Goi api thuc hien lay du lieu
      // axios.get(`http://cukcuk.manhnv.net/v1/Employees/employeeFilter?pageSize=20&pageNumber=1&employeeFilter=nv`).then((res) => {
      //   console.log(res.data);
      //   me.totalPages = res.data.TotalPage;
      //   setTimeout(function(){me.isShowLoader = false, me.Employees = res.data.Data;}, 500);
      //   me.currentPage = 1;
      // });
     
      const promise = await Promise.all([
                EmployeeApi.getEmployeeFilter("", "", "", 10, 1),
                DepartmentApi.getAll(),
                PositionApi.getAll()
            ]);
      me.totalPages = promise[0].data.TotalPage;
      me.currentPage = 1
      setTimeout(function(){
        me.isShowLoader = false;
        me.Employees = promise[0].data.Data;  
      }, 500);
      
      // axios.get("http://cukcuk.manhnv.net/v1/Positions").then((res) => {
      //   //console.log(res.data);
      //   res.data.forEach(function (item, index) {
      //     me.comboboxItems.positions[index+1] = {
      //       value: item.PositionId,
      //       text: item.PositionName,
      //       isSelected: false,
      //     };
      //   });
      // });

      promise[1].data.forEach(function(item, index){
        me.comboboxItems.departments[index+1] = {
          value: item.DepartmentId,
          text: item.DepartmentName,
          isSelected: false,
        }
      })
      this.departments = promise[1].data;
      promise[2].data.forEach(function(item, index){
        me.comboboxItems.positions[index+1] = {
          value: item.PositionId,
          text: item.PositionName,
          isSelected: false,
        }
      })
      this.positions = promise[2].data;
    },

    updatePositions(value){
      this.comboboxItems.positions = [...value];
    },

    // Click button them
    btnAddOnClick() {
      if (this.isShowDetail == false) {
        this.isShowDetail = true;
      }
      this.formMode = "add";
      console.log(this.isShowDetail);
    },
    // Ẩn form chi tiết
    cancel() {
      this.isShowDetail = false;
      this.employeeCurrent = {};
    },
    // Click chuột phải vào 1 hàng trong bảng
    rowOnDblClick(key) {
      this.isShowDetail = true;
      console.log(key.EmployeeId);
      this.formMode = "edit";
      this.employeeCurrent = key;
    },
    updateItems(items){
      this.opened = items
    },
    // Sự kiện khu click button Xóa
    btnDeleteClick() {
      console.log(this.opened[0].EmployeeId)
      if(this.opened.length > 0) {
        this.isShowPopupDel = true;   
      }
      
    },

    cancelPopup() {
      this.isShowPopupDel = false;
    },
    // Hàm xóa nhân viên
    async deleteEmployee() {
      var me = this;
      
      await EmployeeApi.delete(this.opened[0].EmployeeId); 
      me.isShowPopupDel = false;
      me.loadData(); 
    },

    toggle(id) {
      let i = this.opened.indexOf(id);
      if (i > -1) {
        this.opened.splice(i, 1);
      } else {
        this.opened = [];
        this.opened.push(id);
      }
      this.opened = {...this.opened}
    },
    async getEmployeeFilter(){
      this.currentPage = 1;
      this.Employees = [];
      let me = this;
      me.isShowLoader = true;
      console.log(me.comboboxItems)
      
      const res = await EmployeeApi.getEmployeeFilter(me.employeeFilter, me.departmentFilter, me.positionFilter, 10, me.currentPage);
      me.totalPages = res.data.TotalPage;
      setTimeout(function(){me.isShowLoader = false, me.Employees = res.data.Data;}, 500);
    },
    // Ham pagination
    async onPageChange(page) {
      console.log(page)
      this.currentPage = page;
      this.Employees = [];
      let me = this;
      me.isShowLoader = true;

      // Goi api thuc hien lay du lieu
      // axios.get(`http://cukcuk.manhnv.net/v1/Employees/employeeFilter?pageSize=20&pageNumber=${page}&employeeFilter=nv`).then((res) => {
      //   console.log(res.data.Data);
      //   setTimeout(function(){me.isShowLoader = false, me.Employees = res.data.Data;}, 500);
      // });
      const res = await EmployeeApi.getEmployeeFilter(this.employeeFilter, this.departmentFilter, this.positionFilter, 10, page);
      setTimeout(function(){me.isShowLoader = false, me.Employees = res.data.Data;}, 500);
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