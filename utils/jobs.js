class Jobs {
    constructor(JobId, JobTtile, CompanyName, Category, City, WorkTime,  Description, Salary, PublishedOn)
    {
        this.JobId = JobId;
        this.JobTtile = JobTtile;
        this.CompanyName = CompanyName;
        this.Category = Category;
        this.City = City;
        this.WorkTime = WorkTime;
        this.Description = Description;
        this.Salary = Salary;
        this.PublishedOn = PublishedOn;
    }
}

module.exports = Jobs;