using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    public class ServiceResult
    {
        /// <summary>
        /// Trang thai service: true - thanh cong, false - co loi validate
        /// </summary>
        public bool Success { get; set; } = true;
        public string DevMsg { get; set; }
        public string UserMsg { get; set; }
        public object Data { get; set; }
        public string MISACode { get; set; }
    }
}
