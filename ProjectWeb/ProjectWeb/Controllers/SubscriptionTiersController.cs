using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectWeb.Models;
using ProjectWeb.Context;

namespace ProjectWeb.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SubscriptionTiersController : ControllerBase
	{
		private readonly SubscriptionContext _context;
		public SubscriptionTiersController(SubscriptionContext context)
		{
			_context = context;
		}
		[HttpGet]
		public IActionResult Get()
		{
			try
			{
				var tiers = _context.SubscriptionTiers.ToList();
				if (tiers.Count == 0)
				{
					return NotFound("SubscriptionTiers List is Empty");
				}
				return Ok(tiers);
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
				var tier = _context.SubscriptionTiers.Find(id);
				if (tier == null)
				{
					return NotFound("Data Not Found");
				}
				return Ok(tier);
			}
			catch (Exception e)
			{

				return BadRequest(e);
			}
		}
		[HttpPost]
		public IActionResult Post(SubscriptionTier model)
		{
			try
			{
				_context.SubscriptionTiers.Add(model);
				_context.SaveChanges();
				return Ok(new { Message = "Data Added Successfully" });
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpPut]
		public IActionResult Put(SubscriptionTier model)
		{
			if (model == null || model.SubscriptionTierId == 0)
			{
				if (model == null)
				{
					return BadRequest("Model data is invalid");
				}
				else if (model.SubscriptionTierId == 0)
				{
					return BadRequest($"User {model.SubscriptionTierId} is invalid");
				}
			}
			try
			{
				var tier = _context.SubscriptionTiers.Find(model.SubscriptionTierId);
				if (tier == null)
				{
					return NotFound("Data Not Found");
				}
				tier.TierName = model.TierName;
				tier.Price = model.Price;
				tier.Duration = model.Duration;
				tier.SubServiceId = model.SubServiceId;
				_context.SaveChanges();
				return Ok(new {Message= "SubscriptionTier Data Updated" });
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
				var tier = _context.SubscriptionTiers.Find(id);
				if (tier == null)
				{
					return NotFound("Tier not found");
				}
				_context.SubscriptionTiers.Remove(tier);
				_context.SaveChanges();
				return Ok("SubscriptionTier Data deleted successfully");
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpGet("Subscription")]
		public IActionResult RemainingSubTier()
		{
			try
			{
				var tiers = from s in _context.SubProductServices
										 where !_context.SubscriptionTiers.Any(t => t.SubServiceId == s.SubServiceId)
										 select s;

				if (tiers == null)
				{
					return NotFound(new { Status="SubscriptionTiers List is Empty" });
					
				}
				return Ok(tiers);

			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpGet("SubDetails")]
		public IActionResult SubDetails()
		{

			try
			{
				var result = from ps in _context.ProductServices
							 join sps in _context.SubProductServices on ps.ServiceId equals sps.ServiceId into subServices
							 from sps in subServices
							 join st in _context.SubscriptionTiers on sps.SubServiceId equals st.SubServiceId into tiers
							 from st in tiers
							 select new
							 {
								 st,
								 ps.ServiceName,
								 sps.SubServiceName
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
				var subService = _context.SubscriptionTiers.Where(sps => sps.SubServiceId == id).ToList();

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
