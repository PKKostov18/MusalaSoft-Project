class Users {
    constructor(Id,FirstName, LastName, Email, Password)
    {
        this.Id = Id;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Password = Password;
    }
}

module.exports.Users = Users;