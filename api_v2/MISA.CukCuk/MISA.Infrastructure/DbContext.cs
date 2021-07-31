using Dapper;
using MISA.Core.Interfaces.Infrastructure;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Infrastructure
{
    public class DbContext<MISAEntity>:IBaseRepository<MISAEntity> where MISAEntity : class
    {
        #region Fields
        public IDbConnection _dbConnection;
        string _connectionString;
        #endregion
        public DbContext()
        {
            _connectionString = "" +
                    "Host=47.241.69.179;" +
                    "Port=3306;" +
                    "Database=MISA.CukCuk_MF892_PNANH;" +
                    "User Id=dev;" +
                    "Password=12345678";
                    
            _dbConnection = new MySqlConnection(_connectionString);
        }

        #region Methods

        /// <summary>
        /// Lấy tất cả
        /// </summary>
        /// <returns>List object</returns>
        /// Createdby: PNANH (29/7/2021)
        public List<MISAEntity> GetAll()
        {
            var className = typeof(MISAEntity).Name;
            var sqlCommnad = $"SELECT * FROM {className}";
            var entities = _dbConnection.Query<MISAEntity>(sqlCommnad).ToList();
            return entities;
        }

        /// <summary>
        /// Lấy thông tin đối tượng theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns></returns>
        public MISAEntity GetById(Guid entityId)
        {
            var className = typeof(MISAEntity).Name;
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@entityId", entityId);
            var sqlCommnad = $"SELECT * FROM {className} WHERE {className}Id = @entityId";
            
            var entity = _dbConnection.QueryFirstOrDefault<MISAEntity>(sqlCommnad, parameters);
            return entity;
        }
        #endregion
    }
}
