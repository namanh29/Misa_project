using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using System.Data;
using MISA.Common.Entity;
using MISA.DataAccess;
using MISA.Business.Service;
using MISA.Common.Const;
using MISA.Business.Interface;

namespace MISA.CukCuk.Api
{
    /// <summary>
    /// Api Danh mục nhân viên
    /// CreatedBy: PNANH (25/7/2021)
    /// </summary>
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        ResponseError _responseError = new ResponseError();
        IEmployeeService _employeeService;
        IEmployeeContext _employeeContext;
        public EmployeeController(IEmployeeService employeeService, IEmployeeContext employeeContext)
        {
            _employeeService = employeeService;
            _employeeContext = employeeContext;
        }

        #region Methods
        /// <summary>
        /// Lấy toàn bộ nhân viên
        /// </summary>
        /// <returns>Danh sách nhân viên</returns>
        /// CreatedBy: PNANH (25/7/2021)
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                // Lay du lieu
                var employeeContext = new EmployeeContext();
                var employees = employeeContext.GetAll();
                //var employees = _dbConnection.Query<Employee>("Proc_GetEmployees", commandType: CommandType.StoredProcedure);
                
                if (employees.Count() > 0)
                {
                    return Ok(employees); // StatusCode (200, "MISA")
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                _responseError.ErrorCode = MISAConst.MISACodeErrorException;
                _responseError.DevMsg = ex.Message;
                _responseError.UserMsg = Common.Properties.Resources.ErrorException;
                return StatusCode(500, _responseError);
            }

        }

        /// <summary>
        /// Lấy danh sách nhân viên theo Id
        /// </summary>
        /// <param name="employeeId">id của nhân viên</param>
        /// <returns>Danh sách nhân viên</returns>
        /// CreatedBy: PNANH (25/7/2021)
        [HttpGet("{employeeId}")]
        public IActionResult Get(Guid employeeId)
        {
            try
            {
                // Lay du lieu
                var employeeContext = new EmployeeContext();
                var employee = employeeContext.GetById(employeeId);

                if (employee != null)
                {
                    return Ok(employee); // StatusCode (200, "MISA")
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                _responseError.ErrorCode = MISAConst.MISACodeErrorException;
                _responseError.DevMsg = ex.Message;
                _responseError.UserMsg = Common.Properties.Resources.ErrorException;
                return StatusCode(500, _responseError);
            }

        }

        /// <summary>
        /// Thêm mới nhân viên
        /// </summary>
        /// <param name="employee">Đối tượng employee sẽ thêm mới</param>
        /// <returns>
        /// 200 - thành công
        /// 201 - thêm mới thành công
        /// 400 - dữ liệu đầu vào không hợp lệ
        /// 500 - exception
        /// </returns>
        [HttpPost]
        public IActionResult Post([FromBody] Employee employee)
        {
            try {
                
                var serviceResult = _employeeService.Add(employee);
                // Validate dữ liệu:                           
                
                if(serviceResult.Success == false)
                {
                    return BadRequest(serviceResult);
                }
               
                // Sinh mới Id cho Employee
                employee.EmployeeId = Guid.NewGuid();


                // Lay du lieu
                //var rowAffects = _dbConnection.Execute("Proc_InsertEmployee", employee, commandType: CommandType.StoredProcedure);

                var rowAffects = (int)serviceResult.Data;
                if (rowAffects > 0)
                {
                    return Created("Thêm thành công", employee);
                }
                else
                {
                    return NoContent();
                }

            }
            catch (Exception ex)
            {
                _responseError.ErrorCode = MISAConst.MISACodeErrorException;
                _responseError.DevMsg = ex.Message;
                _responseError.UserMsg = Common.Properties.Resources.ErrorException;
                return StatusCode(500, _responseError);
            }
        }


        /// <summary>
        /// Sửa thông tin nhân viên
        /// </summary>
        /// <param name="employee">Đối tượng employee cần sửa</param>
        /// <param name="employeeId">Mã nhân viên cần sửa</param>
        /// <returns>
        /// 
        /// </returns>
        [HttpPut("{employeeId}")]
        public IActionResult Put([FromBody] Employee employee, Guid employeeId)
        {
            try
            {
                employee.EmployeeId = employeeId;
                
                var serviceResult = _employeeService.Update(employee);
                
                // Validate dữ liệu:
                if(serviceResult.Success == false)
                {
                    return BadRequest(serviceResult);
                }

                // Lay du lieu
                var rowAffects = (int)serviceResult.Data;
                if (rowAffects > 0)
                {
                    return Created("Sửa thành công", employee);
                }
                else
                {
                    return NoContent();
                }

            }
            catch (Exception ex)
            {
                _responseError.ErrorCode = MISAConst.MISACodeErrorException;
                _responseError.DevMsg = ex.Message;
                _responseError.UserMsg = Common.Properties.Resources.ErrorException;
                return StatusCode(500, _responseError);
            }
        }

        [HttpDelete("{employeeId}")]
        public IActionResult Delete(Guid employeeId)
        {
            try
            {
                var employeeContext = new EmployeeContext();

                var rowAffects = employeeContext.Delete(employeeId);

                // Them du lieu
                // Tra ve ket qua
                // - 200: Ok
                // - 201: Them moi thanh cong du lieu vao database
                // - 400: BadRequest - du lieu dau vao tu client khong hop le
                // - 404: Khong tim thay resource phu hop
                // - 500: Loi phia server
                if (rowAffects > 0)
                {
                    return Ok(1); // StatusCode (200, "MISA")
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                _responseError.ErrorCode = MISAConst.MISACodeErrorException;
                _responseError.DevMsg = ex.Message;
                _responseError.UserMsg = Common.Properties.Resources.ErrorException;
                return StatusCode(500, _responseError);
            }
        }

        #endregion

    }
}
