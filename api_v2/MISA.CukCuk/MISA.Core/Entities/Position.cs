using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    public class Position : BaseEntity
    {
        #region Properties
        [PrimaryKey]
        public Guid PositionId { get; set; }
        [Required]
        [CheckDuplicate]
        [DisplayName("Mã vị trí")]
        [MaxLength(20)]
        public string PositionCode { get; set; }
        public string PositionName { get; set; }
        public string Description { get; set; }
        #endregion
    }
}
