using System;
using System.Collections.Generic;

namespace ProjectWeb.Models;

public partial class SubscriptionTier
{
    public int SubscriptionTierId { get; set; }

    public string? TierName { get; set; }

    public decimal? Price { get; set; }

    public int? Duration { get; set; }

    public int? SubServiceId { get; set; }

    public virtual SubProductService? SubService { get; set; }

    public virtual ICollection<UserSubscription> UserSubscriptions { get; set; } = new List<UserSubscription>();
}
