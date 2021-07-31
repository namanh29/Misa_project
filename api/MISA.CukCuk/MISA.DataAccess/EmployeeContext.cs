using Dapper;
using MISA.Common.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DataAccess
{
    public class EmployeeContext:DbContext<Employee>, IEmployeeContext
    {
        // Thêm mới:
        public int Add(Employee employee)
        {
            // Sinh mới Id cho Employee
            employee.EmployeeId = Guid.NewGuid();

            // Lay du lieu
            var rowAffects = _dbConnection.Execute("Proc_InsertEmployee", employee, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        // Sửa:
        public int Update(Employee employee)
        {
            // Lay du lieu
            var rowAffects = _dbConnection.Execute("Proc_UpdateEmployee", employee, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        // Xóa:
        public int Delete(Guid employeeId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@EmployeeId", employeeId);
            var sqlCommand = $"DELETE FROM Employee WHERE EmployeeId = @EmployeeId";
            // Lay du lieu
            var rowAffects = _dbConnection.Execute(sqlCommand, parameters);
            return rowAffects;
        }

        /// <summary>
        /// Hàm check mã nhân viên đã tồn tại hay chưa khi thêm
        /// </summary>
        /// <param name="employeeCode"></param>
        /// <returns>Đã tồn tại - true, Chưa tồn tại - false</returns>
        public bool CheckDuplicateEmployeeCode(string employeeCode)
        {
            var isDuplicate = false;
            // Truy cập database check xem mã nhân viên có hay chưa           
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@EmployeeCode", employeeCode);
            var sqlCommand = "SELECT EmployeeCode FROM Employee WHERE EmployeeCode = @EmployeeCode";
            var res = _dbConnection.QueryFirstOrDefault<string>(sqlCommand, parameters);
            if (res != null)
            {
                isDuplicate = true;
            }
            return isDuplicate;
        }

        /// <summary>
        /// Hàm check mã nhân viên đã tồn tại hay chưa khi sửa 
        /// </summary>
        /// <param name="employeeCode"></param>
        /// <param name="employeeId"></param>
        /// <returns>Đã tồn tại - true, Chưa tồn tại - false</returns>
        public bool CheckDuplicateEmployeeCode(string employeeCode, Guid employeeId)
        {
            var isDuplicate = false;
            // Truy cập database check xem mã nhân viên có hay chưa           
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@EmployeeCode", employeeCode);
            parameters.Add("@EmployeeId", employeeId);
            var sqlCommand = "SELECT EmployeeCode FROM Employee WHERE EmployeeCode = @EmployeeCode AND EmployeeId != @EmployeeId";
            var res = _dbConnection.QueryFirstOrDefault<string>(sqlCommand, parameters);
            if (res != null)
            {
                isDuplicate = true;
            }
            return isDuplicate;
        }
    }
}
