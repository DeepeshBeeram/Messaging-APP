using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MessagingApp.API.Data;
using MessagingApp.API.Dtos;
using MessagingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MessagingApp.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;

        }

        [HttpPost("register")]

        public async Task<IActionResult> register(UserDto userdto)
        {

            userdto.UserName = userdto.UserName.ToLower();

            if (await _repo.UserExists(userdto.UserName))
                return BadRequest("User name already exists");

            var userToCreate = new Users
            {
                UserName = userdto.UserName
            };

            var createdUser = await _repo.Register(userToCreate, userdto.Password);
            return StatusCode(201);

        }

        [HttpPost("login")]

        public async Task<IActionResult> Login(UserLoginDto userloginDTO)
        {
            var userdto = await _repo.Login(userloginDTO.Username.ToLower(), userloginDTO.Password);

            if (userdto == null)
                return Unauthorized();

            var claims = new[]
            {
                  new Claim(ClaimTypes.NameIdentifier, userdto.Id.ToString()),
                  new Claim(ClaimTypes.Name, userdto.UserName)

              };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds

            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok( new {
                token = tokenHandler.WriteToken(token)
            });




           }




    }
}