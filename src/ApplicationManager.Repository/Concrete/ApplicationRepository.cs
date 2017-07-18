using System;
using System.Linq;
using ApplicationManager.DAL.Entites;

namespace ApplicationManager.Repository.Concrete
{
    public class ApplicationRepository : IBaseRepository<ApplicationEntiry>
    {
        public ApplicationEntiry Add(ApplicationEntiry entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<ApplicationEntiry> Find()
        {
            throw new NotImplementedException();
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