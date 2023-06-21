using System;
using System.Collections.Generic;

namespace ProjectWeb.Models;

public partial class UserSubscription
{
    public int SubscriptionId { get; set; }

    public int? UserId { get; set; }

    public int? SubscriptionTierId { get; set; }

    public DateTime? SubscriptionDate { get; set; }

    public DateTime? SubscriptionEndDate { get; set; }

    public virtual SubscriptionTier? SubscriptionTier { get; set; }

    public virtual User? User { get; set; }
}
