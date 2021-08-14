using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    public class EmployeeController : EntityController<Employee>
    {
        IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService):base(employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("filter")]
        public IActionResult GetEmployeeFilter([FromQuery] string specs, [FromQuery]Guid? departmentId, [FromQuery]Guid? positionId, [FromQuery]int pageSize, [FromQuery]int pageIndex)
        {
            return Ok(_employeeService.GetEmployeesFilter(specs, departmentId, positionId, pageSize, pageIndex));
        }
    }
}
