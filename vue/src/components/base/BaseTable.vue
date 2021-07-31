<template>
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
          <th class="text-align-right" fieldName="Salary" formatType="MoneyVnd">
            Mức lương cơ bản
          </th>
          <th fieldName="WorkStatus">Tình trạng công việc</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>

</template>

<style lang="css" src="../../css/common/grid.css">
    
</style>