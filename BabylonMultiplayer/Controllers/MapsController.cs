using System.Web.Http;
using BabylonMultiplayer.Entities;

namespace BabylonMultiplayer.Controllers
{
    [RoutePrefix("api/maps")]
    public class MapsController
        : ApiController
    {
        [HttpGet]
        [Route]
        public IHttpActionResult Get()
        {
            return Ok(new [] { new Map("test1"), new Map("test2") });
        }

        [HttpGet]
        [Route("{name}")]
        public IHttpActionResult Get(string name)
        {
            return Ok(new Map(name));
        }
    }
}