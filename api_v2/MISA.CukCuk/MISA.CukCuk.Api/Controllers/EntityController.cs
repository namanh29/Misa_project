using Microsoft.AspNetCore.Mvc;
using MISA.Core.Consts;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EntityController<TEntity> : ControllerBase
    {
        ResponseError _responseError = new ResponseError();
        IBaseService<TEntity> _baseService;
        public EntityController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
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
                //var employeeContext = new EmployeeContext();
                var entity = _baseService.GetAll();
                //var employees = _dbConnection.Query<Employee>("Proc_GetEmployees", commandType: CommandType.StoredProcedure);

                if (entity.Count() > 0)
                {
                    return Ok(entity); // StatusCode (200, "MISA")
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
                _responseError.UserMsg = Core.Properties.Resources.ErrorException;
                return StatusCode(500, _responseError);
            }

        }

        /// <summary>
        /// Lấy danh sách nhân viên theo Id
        /// </summary>
        /// <param name="entityId">id của nhân viên</param>
        /// <returns>Danh sách nhân viên</returns>
        /// CreatedBy: PNANH (25/7/2021)
        [HttpGet("{entityId}")]
        public IActionResult Get(Guid entityId)
        {
            try
            {
                // Lay du lieu
                //var employeeContext = new EmployeeContext();
                var entity = _baseService.GetById(entityId);

                if (entity != null)
                {
                    return Ok(entity); // StatusCode (200, "MISA")
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
                _responseError.UserMsg = Core.Properties.Resources.ErrorException;
                return StatusCode(500, _responseError);
            }

        }

        /// <summary>
        /// Thêm mới nhân viên
        /// </summary>
        /// <param name="entity">Đối tượng employee sẽ thêm mới</param>
        /// <returns>
        /// 200 - thành công
        /// 201 - thêm mới thành công
        /// 400 - dữ liệu đầu vào không hợp lệ
        /// 500 - exception
        /// </returns>
        [HttpPost]
        public IActionResult Post([FromBody] TEntity entity)
        {
            try
            {
                var serviceResult = _baseService.Add(entity);
                // Validate dữ liệu:                           
                if (serviceResult.Success == false)
                {
                    return BadRequest(serviceResult);
                }          

                var rowAffects = (int)serviceResult.Data;

                
                if (rowAffects > 0)
                {
                    return Created(Core.Properties.Resources.Add_Success, entity);
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
                _responseError.UserMsg = Core.Properties.Resources.ErrorException;
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
        [HttpPut("{entityId}")]
        public IActionResult Put([FromBody] TEntity entity, [FromRoute] Guid entityId)
        {
            try
            {
                // Gan Id cho entity
                var keyProperty = entity.GetType().GetProperty($"{typeof(TEntity).Name}Id");
                keyProperty.SetValue(entity, entityId);

                var serviceResult = _baseService.Update(entity);

                // Validate dữ liệu:
                if (serviceResult.Success == false)
                {
                    return BadRequest(serviceResult);
                }

                // Lay du lieu
                int rowAffects = (int)serviceResult.Data;
            
                if (rowAffects > 0)
                {
                    return Created(Core.Properties.Resources.Update_Success, entity);
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
                _responseError.UserMsg = Core.Properties.Resources.ErrorException;
                return StatusCode(500, _responseError);
            }
        }

        [HttpDelete("{entityId}")]
        public IActionResult Delete(Guid entityId)
        {
            try
            {              
                var rowAffects = _baseService.Delete(entityId).Data;
              
                if ((int)rowAffects > 0)
                {
                    return Ok(Core.Properties.Resources.Delete_Success); // StatusCode (200, "MISA")
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
                _responseError.UserMsg = Core.Properties.Resources.ErrorException;
                return StatusCode(500, _responseError);
            }
        }

        #endregion
    }
}
