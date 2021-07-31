using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interfaces.Infrastructure
{
    public interface IBaseRepository<MISAEntity>
    {
        public List<MISAEntity> GetAll();
        public MISAEntity GetById(Guid entityId);
    }
}
