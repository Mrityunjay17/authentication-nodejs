
const { mongoose } = require('./../db/mongoose-db')
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
    Firstname: {
        minlength: 1,
        type: String,
        required: true,
        trim: true
    },
    Middlename: {

        type: String,
        trim: true,
    },
    Lastname: {
        type: String,
        trim: true,
    },
    DateofBirth: {
        type: Date
    },
    EmailId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email address'
        }
    },
    Password: {
        minlength: 6,
        type: String,
        required: true,
        trim: true,
    },
    Tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return ({
        _id: user._id,
        EmailId: user.EmailId
    });
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, "z[/+$s'c:^3O70:H").toString();

    user.Tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
};


UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, "z[/+$s'c:^3O70:H");
    }
    catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'Tokens.token': token,
        'Tokens.access': 'auth'
    });

};


UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({ EmailId: email }).then((user) => {
        if (!user) {
            return Promise.reject('User Not Found');
        }

        return new Promise((resolve, reject) => {
            // Use bcrypt.compare to csudoompare password and user.password
            bcrypt.compare(password, user.Password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject('Please check your password');
                }
            });
        });
    });
};

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('Password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.Password, salt, (err, hash) => {
                user.Password = hash;
                next();
            });
        });
    } else {
        next();
    }
});





var User = mongoose.model('user', UserSchema
);


module.exports = {
    User: User
}