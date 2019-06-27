using System.Collections.Generic;
using MessagingApp.API.Models;
using Newtonsoft.Json;

namespace MessagingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _contex;
        public Seed(DataContext contex)
        {
            _contex = contex;

        }

        public void SeedUsers() {
            var usersData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<Users>>(usersData);

            foreach (var user in users)
            {
                byte[] passwordHash, passwordSalt;
                createPassword("password", out passwordHash, out passwordSalt );
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.UserName = user.UserName.ToLower();

                _contex.Users.Add(user);

            }

            _contex.SaveChanges();
        }

        private void createPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {

                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}