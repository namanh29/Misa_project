using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    
    public class DepartmentController : EntityController<Department>
    {
        public DepartmentController(IBaseService<Department> baseService) : base(baseService)
        {

        }       
    }
}
