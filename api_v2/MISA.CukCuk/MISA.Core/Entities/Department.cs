using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    public class Department : BaseEntity
    {
        #region Properties
        [PrimaryKey]
        public Guid DepartmentId { get; set; }
        [Required]
        [CheckDuplicate]
        [DisplayName("Mã phòng ban")]
        [MaxLength(20)]
        public string DepartmentCode { get; set; }
        public string DepartmentName { get; set; }
        public string Description { get; set; }
        #endregion
    }
}
