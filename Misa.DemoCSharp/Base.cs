using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Misa.DemoCSharp
{
    class Base
    {
        public static void SetName<TEntity>(TEntity entity, string name)
        {
            entity.GetType().GetProperty("FullName").SetValue(entity, name);
        }
    }
}
