
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

        protected override bool ValidateCustom(Employee entity)
        {
            return true;
        }
        public List<Employee> GetEmployeeByDepartment(Guid departmentId)
        {
            throw new NotImplementedException();
        }
    

        public object GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId, int pageSize, int pageIndex)
        {
            return _employeeRepository.GetEmployeesFilter(specs, departmentId, positionId, pageSize, pageIndex);
        }

        
    }
}
