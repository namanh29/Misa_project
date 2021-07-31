using MISA.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DataAccess
{
    public interface IEmployeeContext
    {
        public int Add(Employee employee);
        public int Update(Employee employee);
        public int Delete(Guid employeeId);
        public bool CheckDuplicateEmployeeCode(string employeeCode);
        public bool CheckDuplicateEmployeeCode(string employeeCode, Guid employeeId);
    }
}
