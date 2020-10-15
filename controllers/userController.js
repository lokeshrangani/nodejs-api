const controller = {};
const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';

controller.list = (req, res) => {
    db.User.findAll().then(todos => res.send(todos));
};

controller.userSave = (req, res) => {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then((response) => {
        if(response) {
            res.send({
                status : false, 
                message : "User Already Exist..!", 
                statusCode: 200
            });
        } else {
            let hash = bcrypt.hashSync(req.body.password, 10);
            db.User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            res.send({
                status : true,
                message : "New User Created..!", 
                statusCode: 200
            });
        }
    });
};

controller.userLogin = (req, res) => {
    db.User.findOne({
        where: {
            email: req.body.email,
        }
    }).then((response) =>
        {
            if(response) {
                bcrypt.compare(req.body.password, response.password, function(err, isMatch) {
                    if (err) {
                    throw err
                    } else if (!isMatch) {
                        res.send({
                            status : false,
                            message : "Incorect Usename or Password..!", 
                            statusCode: 200
                        });
                    } else {
                        const accessToken = jwt.sign({ email: req.body.email }, accessTokenSecret);
                        res.send({
                            status : true,
                            message : "Welcome "+ response.name, 
                            token : accessToken,
                            statusCode: 200
                        });
                    }
                })
            }
            else{
                res.send({
                    status : false,
                    message : "Something Wrong..!", 
                    statusCode: 200
                });
            }
        }
    );
};

controller.testToken = (req, res) => {
    res.send({
        status : true,
        message : "Token matched", 
        statusCode: 200
    });
};
module.exports = controller;