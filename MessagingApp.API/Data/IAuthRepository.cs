using System.Threading.Tasks;
using MessagingApp.API.Models;

namespace MessagingApp.API.Data
{
    public interface IAuthRepository
    {
         Task<Users> Register(Users user, string password);
         Task<Users> Login (string username, string password);
         Task<bool> UserExists(string username);
         
    }
}