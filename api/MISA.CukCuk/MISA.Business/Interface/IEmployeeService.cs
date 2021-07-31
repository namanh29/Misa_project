using MISA.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Business.Interface
{
    public interface IEmployeeService
    {
        public ServiceResult Add(Employee employee);
        public ServiceResult Update(Employee employee);

    }
}
