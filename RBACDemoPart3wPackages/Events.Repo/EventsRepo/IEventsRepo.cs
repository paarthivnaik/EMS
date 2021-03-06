﻿using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EventsRepo
{
    public interface IEventsRepo
    {
        Task<Tuple<long,string>> Save(EventInfo obj);
        Task<long> Update(EventInfo obj);
        Task<EventInfo> GetById(long eventInfoId);
        Task<List<EventInfo>> GetAll();
        Task<bool> Delete(long eventInfoId);
    }
}