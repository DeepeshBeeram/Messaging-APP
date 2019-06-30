using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessagingApp.API.Data;
using MessagingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UserController(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetUsers() {
            var users = await _repo.GetUsers();
            var userListReturn = _mapper.Map<IEnumerable<UserListDto>>(users);
            return Ok(userListReturn);
            
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Getuser( int id){
            var user = await _repo.GetUser(id);
            var userReturn = _mapper.Map<UserDetailsDto>(user);

            return Ok(userReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserDto updatedto) 
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
            return Unauthorized();
            }

            var userRep = await _repo.GetUser(id) ;
            _mapper.Map(updatedto, userRep);

            if(await _repo.SaveAll())
            return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

    }
}