using System;
using System.Linq;
using AutoMapper;
using MessagingApp.API.Dtos;
using MessagingApp.API.Models;

namespace MessagingApp.API.Helpers
{
    public class UserMapper: Profile
    {
        public UserMapper()
        {
            CreateMap<Users, UserListDto>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom( src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember( dest => dest.Age, opt => {
                opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
            });
            CreateMap<Users, UserDetailsDto>()
            .ForMember( dest => dest.PhotoUrl, opt => {
                opt.MapFrom( src => src.Photos.FirstOrDefault(p=>p.IsMain).Url);
            }).ForMember( dest => dest.Age, opt => {
                opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
            });
            CreateMap<Photo, PhotoDto>();
            CreateMap<UpdateUserDto, Users>();

        }

       


        
        
    }
}