using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectWeb.Models;
using ProjectWeb.Context;
using Microsoft.EntityFrameworkCore;

namespace ProjectWeb.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserSubscriptionsController : ControllerBase
	{
		private readonly SubscriptionContext _context;
		public UserSubscriptionsController(SubscriptionContext context)
		{
			_context = context;
		}
		[HttpGet]
		public IActionResult Get()
		{
			try
			{
				var subscribes = _context.UserSubscriptions.ToList();
				if (subscribes.Count == 0)
				{
					return NotFound("UserSubscriptions List is Empty");
				}
				return Ok(subscribes);
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
				var subscribe = _context.UserSubscriptions.Find(id);
				if (subscribe == null)
				{
					return NotFound("Data Not Found");
				}
				return Ok(subscribe);
			}
			catch (Exception e)
			{

				return BadRequest(e);
			}
		}
		[HttpPost]
		public IActionResult Post(Payment model)
		{
			try
			{
				var data = _context.UserSubscriptions.FromSqlRaw("exec ADDDETAILS @uid ={0},@sid ={1},@dur ={2}", model.UserId,model.SubscriptionTierId,model.Duration).ToList();
				_context.SaveChanges();

				return Ok(new { Message="Data Added Successfully" });
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpPut]
		public IActionResult Put(UserSubscription model)
		{
			if (model == null || model.SubscriptionTierId == 0)
			{
				if (model == null)
				{
					return BadRequest("Model data is invalid");
				}
				else if (model.UserId == 0)
				{
					return BadRequest($"UserSubscriptions {model.SubscriptionTierId} is invalid");
				}
			}
			try
			{
				var subscribe = _context.UserSubscriptions.Find(model.SubscriptionTierId);
				if (subscribe == null)
				{
					return NotFound("Data Not Found");
				}
				subscribe.UserId = model.UserId;
				subscribe.SubscriptionTierId = model.SubscriptionTierId;
				subscribe.SubscriptionDate = model.SubscriptionDate;
				subscribe.SubscriptionEndDate = model.SubscriptionEndDate;
				_context.SaveChanges();
				return Ok("UserSubscriptions Data Updated");
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
				var subscribe = _context.UserSubscriptions.Find(id);
				if (subscribe == null)
				{
					return NotFound("UserSubscriptions not found");
				}
				_context.UserSubscriptions.Remove(subscribe);
				_context.SaveChanges();
				return Ok("UserSubscriptions Data deleted successfully");
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
				var subscribes = _context.UserSubscriptions.ToList();
				if (subscribes == null)
				{
					return NotFound("UserSubscriptions List is Empty");
				}
				return Ok(subscribes.Count());
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[Route("Sub")]
		[HttpGet]
		public IActionResult Sub()
		{
			try
			{
				var subscribes =_context.UserSubscriptions.Select(u => u.UserId).Distinct();

				if (subscribes == null)
				{
					return NotFound("UserSubscriptions List is Empty");
				}
				return Ok(subscribes.Count());
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[Route("Notsub")]
		[HttpGet]
		public IActionResult NotSub()
		{
			try
			{
				var result = from user in _context.Users
							 where !(from subscription in _context.UserSubscriptions
									 select subscription.UserId).Contains(user.UserId)
							 select user;


				if (result == null)
				{
					return NotFound("UserSubscriptions List is Empty");
				}
				return Ok(result.Count());
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
		[HttpGet("Report")]
		public IActionResult Report()
		{
			try
			{
				var result = from ps in _context.ProductServices
							 join sps in _context.SubProductServices on ps.ServiceId equals sps.ServiceId into subServices
							 from sps in subServices.DefaultIfEmpty()
							 join st in _context.SubscriptionTiers on sps.SubServiceId equals st.SubServiceId into tiers
							 from st in tiers.DefaultIfEmpty()
							 join us in _context.UserSubscriptions on st.SubscriptionTierId equals us.SubscriptionTierId into subscriptions
							 from us in subscriptions.DefaultIfEmpty()
							 group new { ps, sps, st, us } by new
							 {
								 ps.ServiceName
							 } into g
							 select new
							 {
								 g.Key.ServiceName,
								 TotalSubscription = g.Count(x => x.us != null)
							 };


				if (result == null)
				{
					return NotFound(new { Message="UserSubscriptions List is Empty" });
				}
				return Ok(result);
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}

		}
	}
}
