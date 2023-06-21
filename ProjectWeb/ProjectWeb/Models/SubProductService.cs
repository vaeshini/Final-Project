using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectWeb.Models;

public partial class SubProductService
{
    public int SubServiceId { get; set; }

    public string? SubServiceName { get; set; }

    public string? Image { get; set; }

    public int? ServiceId { get; set; }

    public virtual ProductService? Service { get; set; }

    public virtual ICollection<SubscriptionTier> SubscriptionTiers { get; set; } = new List<SubscriptionTier>();
}
