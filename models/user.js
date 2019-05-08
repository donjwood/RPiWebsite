const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {  
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            required: false
        },
        middleName: {
            type: DataTypes.STRING,
            required: false
        },
        lastName: {
            type: DataTypes.STRING,
            required: false
        },
        email: {
            type: DataTypes.STRING,
            required: false
        },
        userName: {
            type: DataTypes.STRING,
            required: true
        }, 
        password: {
            type: DataTypes.STRING,
            required: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            required: true
        }
    });

    //Authenticate username and password.
    User.authenticate = function (userName, password) {

        //Wrap it in a promise since this calls async methods.
        return new Promise(function(resolve, reject) {

            User.findOne({ where: { userName: userName } }).then(function(user) {
            
                if (user != undefined) {
                    bcrypt.compare(password, user.password, function(err, authenticated) {
                        if (authenticated) {
                            resolve(user);
                        } else {
                            resolve(undefined);
                        }
                    });
                } else {
                    resolve(undefined);
                }   
            });
        });
    }

    //Hash a password.
    User.hashPassword = function (password) {
        return bcrypt.hashSync(password, 10);
    }

    //Verify the password.
    User.prototype.verifyPassword = function (password) {

        //Declare user object so it is scoped correctly in promise.
        var user = this;

         //Wrap it in a promise since this calls async methods.
         return new Promise(function(resolve, reject) {
            bcrypt.compare(password, user.password, function(err, verified) {
                resolve(verified);
            });  
           
        });
    }

    return User;
};