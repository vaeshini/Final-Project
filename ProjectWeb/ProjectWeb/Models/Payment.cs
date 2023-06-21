namespace ProjectWeb.Models
{
	 public partial class Payment
	{
		public int UserId { get; set; }

		public int? SubscriptionTierId { get; set; }

		public int? Duration{ get; set; }

	}
}
