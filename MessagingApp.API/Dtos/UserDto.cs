using System.ComponentModel.DataAnnotations;

namespace MessagingApp.API.Dtos
{
    public class UserDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4,ErrorMessage= "Password Length should be in the range of 4 to 8 characters")]
        public string  Password { get; set; }
    }
}