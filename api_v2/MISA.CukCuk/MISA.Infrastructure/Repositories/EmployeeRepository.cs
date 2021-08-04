using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Infrastructure.Repositories
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(IConfiguration configuration):base(configuration)
        {

        }

        public Employee GetEmployeeByCode(string employeeCode)
        {
            var sqlCommand = $"SELECT * FROM Employee WHERE EmployeeCode = '{employeeCode}'";
            var employeeDuplicate = _dbConnection.QueryFirstOrDefault<Employee>(sqlCommand);
            return employeeDuplicate;
        }

        public List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            var totalRecord = 0;
            var totalPage = 0;
            var input = specs != null ? specs : string.Empty;
            var parameters = new DynamicParameters();
            parameters.Add("@EmployeeCode", input, DbType.String);
            parameters.Add("@FullName", input, DbType.String);
            parameters.Add("@PhoneNumber", input, DbType.String);
            parameters.Add("@DepartmentId", departmentId, DbType.String);
            parameters.Add("@PositionId", positionId, DbType.String);
            parameters.Add("@PageIndex", 1);
            parameters.Add("@PageSize", 5);
            parameters.Add("@TotalRecord", direction:System.Data.ParameterDirection.Output);
            parameters.Add("@TotalPage", direction: System.Data.ParameterDirection.Output);
            
            var employees = _dbConnection.Query<Employee>("Proc_GetEmployeesPaging", parameters, commandType:CommandType.StoredProcedure).ToList();
            return employees;
        }
    }
}
