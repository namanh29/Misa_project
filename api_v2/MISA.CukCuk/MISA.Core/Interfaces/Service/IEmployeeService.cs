
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
        object GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId, int pageSize, int pageIndex);
        List<Employee> GetEmployeeByDepartment(Guid departmentId);
    }
}
