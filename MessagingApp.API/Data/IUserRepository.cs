using System.Collections.Generic;
using System.Threading.Tasks;
using MessagingApp.API.Models;

namespace MessagingApp.API.Data
{
    public interface IUserRepository
    {
         void Add<T>(T entity) where T: class;

         void Delete<T> (T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<Users>> GetUsers();
         Task<Users> GetUser(int id);
    }
}