using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace RBACv3.Common
{
    public class MultiDelete
    {
        public async Task<bool> Delete(string url)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["EMSAPIBaseURL"].ToString());
                    HttpResponseMessage responseMessage = await client.GetAsync(url);
                    if (responseMessage.IsSuccessStatusCode)
                    {
                        var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                        var status = JsonConvert.DeserializeObject<bool>(responseData);
                        return status;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
    }
}