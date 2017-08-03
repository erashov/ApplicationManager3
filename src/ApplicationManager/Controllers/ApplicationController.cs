using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ApplicationManager.Repository;
using ApplicationManager.DAL.Entites;
using ApplicationManager.Model.View;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApplicationManager.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationController : Controller
    {
        IBaseRepository<ApplicationEntiry> _application;
        public ApplicationController(IBaseRepository<ApplicationEntiry> application)
        {
            _application = application;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<ApplicationEntiry> Get()
        {
            return _application.Find();
        }

        [HttpGet]
        [Route("get")]
        public async Task<PagingModelView<ApplicationEntiry>> Get(int page, int pageSize, string sort, string order)
        {
            var t1 = Task.Run(() => _application.FindPage(page+1, pageSize));
            var t2 = Task.Run(() => _application.Find().Count());

            await Task.WhenAll(t1, t2);
            return new PagingModelView<ApplicationEntiry>() { Items = t1.Result, Total_Count = t2.Result };
        }

        //[HttpGet]
        //[Route("get")]
        //public PagingModelView<ApplicationEntiry> Get(int page, int pageSize, string sort, string order)
        //{

        //    return new PagingModelView<ApplicationEntiry>() { Items = _application.FindPage(page, pageSize), Total_Count = _application.Find().Count() };
        //}

        [HttpGet]
        [Route("getpage")]
        public IQueryable<ApplicationEntiry> GetPage(int page, int pageSize) => _application.FindPage(page, pageSize);

        [HttpGet]
        [Route("getAll")]
        public IQueryable<ApplicationEntiry> GetAll() => _application.Find();//.FindPage(page, pageSize);


        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]ApplicationEntiry value)
        {
            _application.Add(value);
        }


        [HttpPut()]
        public ApplicationEntiry Put([FromBody]ApplicationEntiry value)
        {
            return _application.Update(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
