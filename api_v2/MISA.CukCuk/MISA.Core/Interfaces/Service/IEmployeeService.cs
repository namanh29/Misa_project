
using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interfaces.Service
{
    public interface IEmployeeService: IBaseService<Employee>
    {
        List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId);
        List<Employee> GetEmployeeByDepartment(Guid departmentId);
    }
}
