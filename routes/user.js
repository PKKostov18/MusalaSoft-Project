class Users {
    constructor(Id,username, first_name, last_name, age, city,  phone, email, password)
    {
        this.Id = Id;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}

module.exports = Users;