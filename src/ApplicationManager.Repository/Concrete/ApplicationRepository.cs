using System;
using System.Linq;
using ApplicationManager.DAL.Entites;
using ApplicationManager.DAL;
using Microsoft.EntityFrameworkCore;
namespace ApplicationManager.Repository.Concrete
{
    public class ApplicationRepository : IBaseRepository<ApplicationEntiry>
    {
        private readonly AppDbContext _appContext;
        public ApplicationRepository(AppDbContext appContext)
        {
            _appContext = appContext;
        }
        public ApplicationEntiry Add(ApplicationEntiry entity)
        {
            _appContext.Applications.Add(entity);
            _appContext.SaveChanges();
            return entity;
        }

        public IQueryable<ApplicationEntiry> Find()
        {
            return _appContext.Applications.Include(c=>c.ApplicationStatus).Include(c=>c.District);
        }

        public ApplicationEntiry FindById(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<ApplicationEntiry> FindPage(int page, int count)
        {
            throw new NotImplementedException();
        }

        public ApplicationEntiry Remove(ApplicationEntiry entity)
        {
            throw new NotImplementedException();
        }

        public ApplicationEntiry Update(ApplicationEntiry entity)
        {
            throw new NotImplementedException();
        }
    }
}