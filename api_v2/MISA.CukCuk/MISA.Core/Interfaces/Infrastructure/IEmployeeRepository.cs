using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interfaces.Infrastructure
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        Employee GetEmployeeByCode(string employeeCode);
        /// <summary>
        /// Lấy dữ liệu theo các tiêu chí
        /// </summary>
        /// <param name="specs">Theo mã, tên hoặc số điện thoại nhân viên</param>
        /// <param name="departmentId">Id phòng ban</param>
        /// <param name="positionId">Id vị trí</param>
        /// <returns>Danh sách nhân viên theo tiêu chí</returns>
        /// CreatedBy: PNANH (3/8/2021)
        List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId);
    }
}
