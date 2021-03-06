using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Infrastructure;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Infrastructure
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity>, IDisposable where TEntity : BaseEntity
    {
        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        protected IDbConnection _dbConnection = null;
        protected string _className;
        #endregion
        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            _dbConnection = new MySqlConnection(_connectionString);
            _className = typeof(TEntity).Name;
        }
        public int Add(TEntity entity)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    rowAffects = _dbConnection.Execute($"Proc_Insert{_className}", entity, commandType: CommandType.StoredProcedure);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
                
            }
            
            return rowAffects;
        }

        public int Delete(Guid entityId)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@EntityId", entityId);
                    var sqlCommand = $"DELETE FROM {_className} WHERE {_className}Id = @EntityId";
                    // Lay du lieu
                    rowAffects = _dbConnection.Execute(sqlCommand, parameters);
                    transaction.Commit();
                }
                catch (Exception)
                {

                    transaction.Rollback();
                }
                
            }
            
            return rowAffects;
        }

        public List<TEntity> GetAll()
        {
            //var sqlCommnad = $"SELECT * FROM {_className}";
            var entities = _dbConnection.Query<TEntity>($"Proc_Get{_className}s", commandType:CommandType.StoredProcedure).ToList();
            return entities;
        }

        public TEntity GetById(Guid entityId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@entityId", entityId);
            var sqlCommnad = $"SELECT * FROM {_className} WHERE {_className}Id = @entityId";

            var entity = _dbConnection.QueryFirstOrDefault<TEntity>(sqlCommnad, parameters);
            return entity;
        }

        public int Update(TEntity entity)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    rowAffects = _dbConnection.Execute($"Proc_Update{_className}", entity, commandType: CommandType.StoredProcedure);
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                }
                
            }
            
            return rowAffects;
        }

        public TEntity GetByProperty(TEntity entity, PropertyInfo property)
        {
            var propertyName = property.Name;
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"{_className}Id").GetValue(entity);
            var sqlCommand = string.Empty;
            if(entity.EntityState == Core.Enums.EntityState.Add)
            {
                sqlCommand = $"SELECT * FROM {_className} WHERE {propertyName} = '{propertyValue}'";
            }
            else if(entity.EntityState == Core.Enums.EntityState.Update)
            {
                sqlCommand = $"SELECT * FROM {_className} WHERE {propertyName} = '{propertyValue}' AND {_className}Id <> '{keyValue}'";
            }
            else
            {
                return null;
            }
            var entityReturn = _dbConnection.QueryFirstOrDefault<TEntity>(sqlCommand);
            return entityReturn;
        }

        public void Dispose()
        {
            if(_dbConnection.State == ConnectionState.Open)
            {
                _dbConnection.Close();
            }
        }
    }

}
          
