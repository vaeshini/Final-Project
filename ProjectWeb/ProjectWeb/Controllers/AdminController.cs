using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using ProjectWeb.Models;
using ProjectWeb.Context;
using Microsoft.EntityFrameworkCore;

namespace ProjectWeb.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		private readonly SubscriptionContext _context;
		public AdminController(SubscriptionContext context)
		{
			_context = context;
		}
		[HttpGet]
		public IActionResult Get()
		{
			try
			{
				var admin = _context.Admins.ToList();
				if (admin == null)
				{
					return NotFound("Data Not Found");
				}
				return Ok(admin);
			}
			catch (Exception e)
			{

				return BadRequest(e);
			}
		}
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			try
			{
				var user = _context.Admins.Find(id);
				if (user == null)
				{
					return NotFound("Data Not Found");
				}
				return Ok(user);
			}
			catch (Exception e)
			{

				return BadRequest(e);
			}
		}
		[HttpPost]
		public IActionResult Post(Admin model)
		{
			try
			{
				_context.Admins.Add(model);
				_context.SaveChanges();
				return Ok(new { Message = "Data Added Successfully" });
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpPut]
		public IActionResult Put(Admin model)
		{
			if (model == null || model.AdminId == 0)
			{
				if (model == null)
				{
					return BadRequest("Model data is invalid");
				}
				else if (model.AdminId == 0)
				{
					return BadRequest($"Admin {model.AdminId} is invalid");
				}
			}
			try
			{
				var admin = _context.Admins.Find(model.AdminId);
				if (admin == null)
				{
					return NotFound("Data Not Found");
				}
				admin.FirstName = model.FirstName;
				admin.LastName = model.LastName;
				admin.UserName = model.UserName;
				admin.Password = model.Password;
				_context.SaveChanges();
				return Ok(new { Message = "Admin Data Updated" });
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpDelete]
		public IActionResult Delete(int id)
		{
			try
			{
				var admin = _context.Admins.Find(id);
				if (admin == null)
				{
					return NotFound("User not found");
				}
				_context.Admins.Remove(admin);
				_context.SaveChanges();
				return Ok("Admin Data deleted successfully");
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpPost("authenticate")]
		public IActionResult Authenticate(Admin model)
		{
			if (model == null)
				return BadRequest();
			var user = _context.Admins.FirstOrDefault(a => a.UserName == model.UserName && a.Password == model.Password);

			if (user == null)
				return NotFound(new { Message = "User Not Found!" });

			string token = CreateJwt(user);
			return Ok(new
			{
				Token = token,
				Message = "Login Successful"
			});
		}
		private string CreateJwt(Admin model)
		{
			var jwtTokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes("veryverysecrete.....");
			var identity = new ClaimsIdentity(new Claim[]
			{
				new Claim(ClaimTypes.PrimarySid,model.AdminId.ToString()),
				new Claim(ClaimTypes.Name,model.FirstName),
				new Claim(ClaimTypes.Surname,model.LastName),
				new Claim(ClaimTypes.NameIdentifier ,model.UserName)
			});
			var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = identity,
				Expires = DateTime.Now.AddDays(1),
				SigningCredentials = credentials
			};
			var token = jwtTokenHandler.CreateToken(tokenDescriptor);
			return jwtTokenHandler.WriteToken(token);
		}
		[HttpGet("DeleteUserSubDet")]
		public IActionResult DeleteDetails()
		{
			try
			{
				var data = _context.Admins.FromSqlRaw("exec DELETEUSERSUBSCRIPTION").ToList();
				_context.SaveChanges();
				return Ok(new { Message = "User Data deleted successfully" });
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}

	}
	
}
