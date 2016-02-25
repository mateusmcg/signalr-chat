using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SignalR.Server.Models;

namespace SignalR.Server.SignalRHubs
{
    public class MapHub : Hub
    {
        private static List<MapClient> ConnectedClientList = new List<MapClient>();

        public void ShowClientOnMap(MapClient clientToShowOnMap)
        {
            ConnectedClientList.Add(clientToShowOnMap);
            Clients.All.addClientToMap(clientToShowOnMap);
        }

        public void RemoveClientOnMap(MapClient clientToRemoveFromMap)
        {
            ConnectedClientList.Remove(clientToRemoveFromMap);
            Clients.All.removeClientFromMap(clientToRemoveFromMap);
        }
    }
}