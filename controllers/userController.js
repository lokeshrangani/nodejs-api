const controller = {};
const db = require("../models");
const bcrypt = require('bcrypt');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const accessTokenSecret = 'youraccesstokensecret';

controller.list = (req, res) => {
    quizId= req.params;
    console.log(quizId);
    db.Quesion.findAll({
        where: {
            QuizFK: quizId.quizId
        }
    }).then((response) => {
        if(response != null){
            res.send({
                status : true,
                question : response
            })
        }
        else{
            res.send({
                status : false,
            })
        }
    });
};

controller.testToken = (req, res) => {
    res.send({
        status : true,
        message : "Token matched", 
        statusCode: 200
    });
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

controller.userLogin = (req, res, next) => {
    db.User.findOne({
        where: {
            email: req.body.email,
        }
    })
    .then((response) =>
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
                            UserPK : response.id, 
                            message : "Login Succesfully..!", 
                            token : accessToken,
                            statusCode: 200
                        });
                    }
                })
            }
            else{
                res.send({
                    status : false,
                    message : "Please Register ..!", 
                    statusCode: 200
                });
            }
        }
    );
};

controller.userForSendMail = (req,res) => {
    db.User.findOne({
        where: {
            email: req.body.email,
        }
    })
    .then((response) =>{
        if(response){
            let hash = md5(req.body.email);
            var Sendlink= "localhost:3000/api/user/password/reset/"+hash;
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'francesca.rolfson35@ethereal.email',
                    pass: 'SGBNF6hwshpTh7fMuG'
                }
            });

            var mailOptions = {
                from: '"Try Mail" <francesca.rolfson35@ethereal.email>',
                to: 'xifeg48473@glenwoodave.com',
                subject: 'Forgot Password',
                text: 'Hello',
                html: 'Link For Password Reset <a href='+Sendlink+' target="_blank">Link</a>'
              };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.send({
                    status: false,
                    message : "Something Went Wrong...Please Try Again"
                })
            } else {
                db.ResetPass.create({
                    UserFK: response.id,
                    code: hash,
                    status: "success"
                })
                res.send({
                    status: true,
                    message: "Messege Sent SuccessFully"
                    // message :"Please check Your Inbox For Reset Link"
                })
            }
            });
        }
        else{
            res.send({
                status:false,
                message:"User Not Found"
            })
        }
    })
}

controller.userForVerifyCode =(req,res) => {
    reqcode=req.params;
    db.ResetPass.findOne({
        where: {
          code : reqcode.code
        },
        order: [ [ 'createdAt', 'DESC' ]]
      }).then((response)=>{
        if(response){
            res.send({
                status: true,
                UserFK :response.UserFK,
                message : "User Found"
            })
        }else{
            res.send({
                status: false,
                message : "User Not Found"
            })
        }
      }); 
}

controller.userPassUpdate =(req,res) => {
    let hash = bcrypt.hashSync(req.body.password, 10);
    db.User.update({ 
        password : hash
        }, {
        where: {
            id: req.body.UserFK
        },
    })
    res.send({
        status:true,
        message:"Update Success"
    });
}

controller.quizSave = (req, res) => {
    db.Quiz.create({
        QuizTitle: req.body.QuizTitle,
        QuizStatus: req.body.QuizStatus,
        CreatedBy: req.body.CreatedBy,
        UserFK: req.body.UserFK
    }).then((response)=>{
        if(response){
            res.send({
                status : true,
                QuizId : response.id,
                messegge : "Quiz Created SuccessFully", 
            });
        }else{
            res.send({
                status : false,
                messegge : "Something Went Wrong", 
            });
        }

    });
};

controller.questionSave =(req,res) => {
    const arr = req.body; 
    arr.forEach(req => { 
        // check question exists or not
        db.Quesion.findOne({
            where: {
                QuizFK: req.QuizFK,
                Quesion: req.Quesion,
                option1: req.option1,
                option2: req.option2,
                option3: req.option3,
                option4: req.option4,
                status: req.status
            }
        }).then((check) => {
                if(!check){
                    db.Quesion.create({
                        QuizFK: req.QuizFK,
                        InsertedBy: req.InsertedBy,
                        Quesion: req.Quesion,
                        option1: req.option1,
                        option2: req.option2,
                        option3: req.option3,
                        option4: req.option4,
                        status: req.status
                    })
                }
            })
        })
        res.send({
            status : true,
            messegge : "Question Created SuccessFully", 
        });
};

controller.questionUpdateDetails =(req,res) => {
    questionId=req.params;
    // console.log(questionId.questionId)
    db.Quesion.findOne({
        where: {
            id: questionId.questionId,
        }
    }).then((check) => {   
        res.send({
            questionDetails: check
        })  
    });
};

controller.questionUpdateSave =(req,res) => {
    db.Quesion.update({ 
            QuizFK: req.body.QuizFK,
            Quesion: req.body.Quesion,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            status: req.body.status
        }, {
            where: {
                id: req.body.questionId
        },
    })
    res.send({
        status : true,
        messegge : "Question Update SuccessFully", 
    });
};

controller.answerCheck = (req, res,next) => {
    const arr = req.body;
    var count = 0;
    var len = arr.length;
    for(let i=0; i < len; i++){
        db.Quesion.findOne({
            where: {
                id: arr[i].id,
                status: arr[i].selectedAns
            }
        }).then((response) => {
            if(response){
                count = count+ 1;
                console.log(count);
            }else{
                count = count
            }
        }).catch(err => console.log(err));
    }
};




module.exports = controller;