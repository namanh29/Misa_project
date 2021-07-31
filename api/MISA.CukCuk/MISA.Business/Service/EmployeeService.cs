using MISA.Business.Interface;
using MISA.Common.Entity;
using MISA.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Business.Service
{
    public class EmployeeService: IEmployeeService
    {
        public ServiceResult ServiceResult;
        IEmployeeContext _employeeContext;
        public EmployeeService(IEmployeeContext employeeContext)
        {
            ServiceResult = new ServiceResult();
            _employeeContext = employeeContext;
        }

        /// <summary>
        /// Hàm xử lý nghiệp vụ khi thêm nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public ServiceResult Add(Employee employee)
        {
            //var employeeContext = new EmployeeContext();
            // 1. Check mã nhân viên đã có chưa
            if (string.IsNullOrEmpty(employee.EmployeeCode))
            {
                ServiceResult.Success = false;
                ServiceResult.MISACode = "MISA-001";
                ServiceResult.UserMsg = Common.Properties.Resources.ValidateError_EmployeeCodeEmpty;
                return ServiceResult;
            }
            
            // 2. Check mã nhân viên có trùng không
            if (_employeeContext.CheckDuplicateEmployeeCode(employee.EmployeeCode))
            {
                ServiceResult.Success = false;
                ServiceResult.MISACode = "MISA-002";
                ServiceResult.UserMsg = Common.Properties.Resources.ValidateError_EmployeeCodeExist;
                return ServiceResult;
            }
            ServiceResult.Data = _employeeContext.Add(employee);
            return ServiceResult;
        }

        /// <summary>
        /// Hàm xử lý nghiệp vụ khi sửa nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public ServiceResult Update(Employee employee)
        {
            //var employeeContext = new EmployeeContext();
            // 1. Check mã nhân viên đã có chưa
            if (string.IsNullOrEmpty(employee.EmployeeCode))
            {
                ServiceResult.Success = false;
                ServiceResult.MISACode = "MISA-001";
                ServiceResult.UserMsg = Common.Properties.Resources.ValidateError_EmployeeCodeEmpty;
                return ServiceResult;
            }

            // 2. Check mã nhân viên có trùng không
            if (_employeeContext.CheckDuplicateEmployeeCode(employee.EmployeeCode, employee.EmployeeId))
            {
                ServiceResult.Success = false;
                ServiceResult.MISACode = "MISA-002";
                ServiceResult.UserMsg = Common.Properties.Resources.ValidateError_EmployeeCodeExist;
                return ServiceResult;
            }
            
            ServiceResult.Data = _employeeContext.Update(employee);
            return ServiceResult;
        }
    }
}
