using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Enums
{
    public enum Gender
    {
        /// <summary>
        /// Nam
        /// </summary>
        Male = 1,
        /// <summary>
        /// Nữ
        /// </summary>
        Female = 0,
        /// <summary>
        /// Khác
        /// </summary>
        Other = 2
    }

    /// <summary>
    /// Xác định trạng thái của object
    /// </summary>
    public enum EntityState
    {
        Add = 1,
        Update = 2,
        Delete = 3
    }
}
