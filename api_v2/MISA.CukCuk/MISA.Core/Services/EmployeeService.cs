
using MISA.Core.Consts;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Infrastructure;
using MISA.Core.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Services
{
    public class EmployeeService: BaseService<Employee>, IEmployeeService
    {
               
        IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {          
            _employeeRepository = employeeRepository;
        }


        public List<Employee> GetEmployeeByDepartment(Guid departmentId)
        {
            throw new NotImplementedException();
        }
    

        public List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            return _employeeRepository.GetEmployeesFilter(specs, departmentId, positionId);
        }

        
    }
}
