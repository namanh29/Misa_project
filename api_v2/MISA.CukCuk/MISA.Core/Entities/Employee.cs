
using MISA.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    /// <summary>
    /// Thông tin nhân viên
    /// </summary>
    /// CreatedBy: PNAnh (24/7/2021)
    public class Employee : BaseEntity
    {
        #region Properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        [PrimaryKey]
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// Mã nhân viên
        /// </summary>
        [Required]
        [CheckDuplicate]
        [DisplayName("Mã nhân viên")]
        [MaxLength(20)]
        public string EmployeeCode { get; set; }
        /// <summary>
        /// Ten
        /// </summary>
        public string FirstName { get; set; }
        public string LastName { get; set; }

        /// <summary>
        /// Họ và tên
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        public Gender? Gender { get; set; }
        public string GenderName
        {
            get
            {
                if (this.Gender == Enums.Gender.Male) return "Nam";
                else if (this.Gender == Enums.Gender.Female) return "Nữ";
                else return "Không xác định";
            }
        }
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }
        public string IdentityNumber { get; set; }
        public DateTime? IdentityDate { get; set; }
        public string IdentityPlace { get; set; }
        public DateTime? JoinDate { get; set; }
        public int MartialStatus { get; set; }
        public int EducationalBackground { get; set; }
        public Guid QualificationId { get; set; }
        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public Guid PositionId { get; set; }
        public string PositionName { get; set; }
        public int WorkStatus { get; set; }
        public string WorkStatusName
        {
            get
            {
                if (WorkStatus == 1) return "Đang làm việc";
                else return "Nghỉ hưu";
            }
        }
        public string PersonalTaxCode { get; set; }
        public double Salary { get; set; }

        #endregion

        #region Method
        
        #endregion
    }
}
