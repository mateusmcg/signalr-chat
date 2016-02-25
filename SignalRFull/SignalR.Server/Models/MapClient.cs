using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalR.Server.Models
{
    public class MapClient
    {
        public string ClientId { get; set; }
        public Location ClientLocation { get; set; }
    }
}