using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectWeb.Context;
using ProjectWeb.Models;

namespace ProjectWeb.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SubProductServicesController : ControllerBase
	{
		private readonly SubscriptionContext _context;
		public SubProductServicesController(SubscriptionContext context)
		{
			_context = context;
		}
		[HttpGet]
		public IActionResult Get()
		{
			try
			{
				var subServices = _context.SubProductServices.ToList();
				if (subServices.Count == 0)
				{
					return NotFound("Services List is Empty");
				}
				return Ok(subServices);
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			try
			{
				var subService = _context.SubProductServices.Find(id);
				if (subService == null)
				{
					return NotFound("Data Not Found");
				}
				return Ok(subService);
			}
			catch (Exception e)
			{

				return BadRequest(e);
			}
		}
		[HttpPost]
		public IActionResult Post(SubProductService model)
		{
			try
			{
				_context.SubProductServices.Add(model);
				_context.SaveChanges();
				return Ok(new
				{
					Message="Data added successfully"
				});
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpPut]
		public IActionResult Put(SubProductService model)
		{
			if (model == null || model.SubServiceId == 0)
			{
				if (model == null)
				{
					return BadRequest("Model data is invalid");
				}
				else if (model.ServiceId == 0)
				{
					return BadRequest($"Service {model.ServiceId} is invalid");
				}
			}
			try
			{
				var service = _context.SubProductServices.Find(model.SubServiceId);
				if (service == null)
				{
					return NotFound("Data Not Found");
				}
				service.SubServiceName = model.SubServiceName;
				service.Image = model.Image;
				_context.SaveChanges();
				return Ok("Service Data Updated");
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
				var data = _context.SubProductServices.FromSqlRaw("exec DELETESUBSERVICE @input={0}", id).ToList();
				_context.SaveChanges();
				return Ok(new { Message = "Service Data deleted successfully" });
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[Route("Count")]
		[HttpGet]
		public IActionResult Count()
		{
			try
			{
				var services = _context.SubProductServices.ToList();
				if (services.Count == 0)
				{
					return NotFound("Services List is Empty");
				}
				return Ok(services.Count());
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpPost("AddImg")]
		public IActionResult AddImg(IFormFile file)
		{
			try
			{
				if (file.Length > 0)
				{
					string path = @"F:\Final-Project\Project\src\assets\images\";
					if (!Directory.Exists(path))
					{
						Directory.CreateDirectory(path);
					}
					using (FileStream fileStream = System.IO.File.Create(path + file.FileName))
					{
						file.CopyTo(fileStream);
						fileStream.Flush();
					}
				}
				string path1 = "./assets/images/" + file.FileName;
				return Ok(new
				{
					path = path1
				}) ;
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}

		}
		[HttpGet("SubServDet")]
		public IActionResult SubServDet()
		{
			try
			{
				var result = from ps in _context.ProductServices
							 join sps in _context.SubProductServices on ps.ServiceId equals sps.ServiceId
							 select new
							 {
								 sps.SubServiceId,
								 ps.ServiceName,
								 sps.SubServiceName,
								 sps.Image
							 };
				if (result == null)
				{
					return NotFound(new { Message = "UserSubscriptions List is Empty" });
				}
				return Ok(result);
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}

		}
		[HttpGet("ById")]
		public IActionResult GetById(int id)
		{
			try
			{
				var subService =  _context.SubProductServices.Where(sps => sps.ServiceId == id).ToList();

				if (subService == null)
				{
					return NotFound(new { Message = "Data Not Found" });
				}
				return Ok(subService);
			}
			catch (Exception e)
			{

				return BadRequest(e);
			}

		}
	}
}
