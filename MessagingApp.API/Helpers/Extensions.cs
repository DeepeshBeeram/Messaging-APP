using System;

namespace MessagingApp.API.Helpers
{
    public static class Extensions
    {
         public static int CalculateAge(this DateTime theDatetime) { 
            var age = DateTime.Today.Year - theDatetime.Year;
            if (theDatetime.AddYears(age) > DateTime.Today){
                age--;
            }

            return age;
            
         }
    }
}