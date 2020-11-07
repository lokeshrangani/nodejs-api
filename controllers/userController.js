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
            QuizFK: quizId.quizId,
            is_removed : "No"
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
        } else if(req.body.name == '' || req.body.email == '' || req.body.password==''){
            res.send({
                status : false,
                message : "Blank is not allowed..!", 
                statusCode: 200
            });
        }
        else {
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
                            UserName : response.name,
                            UserEmail : response.email, 
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
            var Sendlink= "http://localhost:3001/auth/reset/"+hash;
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'lilly.torp@ethereal.email',
                    pass: 'GUV839HeTGGTcfQ7nT'
                }
            });

            var mailOptions = {
                from: '"Forget Password" <lilly.torp@ethereal.email>',
                to: req.body.email,
                subject: 'Forgot Password',
                text: 'Hello ' +response.name ,
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
                    message: "Please check Your Inbox For Reset Link"
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
          code : reqcode.code,
          is_clicked : 0
        },
        order: [ [ 'createdAt', 'DESC' ]]
      }).then((response)=>{
            if(response){
                db.ResetPass.update({ 
                    is_clicked: 1,
                    }, {
                        where: {
                            id: response.id
                    },
                })
            res.send({
                status: true,
                UserFK :response.UserFK,
                message : "User Found"
            })
        }else{
            res.send({
                status: false,
                message : "Link Expired"
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
    if(req.body.QuizId !== ""){
        db.Quiz.update({ 
                QuizTitle: req.body.QuizTitle,
                QuizCode: req.body.QuizCode
            }, {
            where: {
                id: req.body.QuizId
            },
        })
       .then((response)=>{
            if(response){
                res.send({
                    status : true,
                    QuizId : response.id,
                    messegge : "Quiz Update SuccessFully", 
                });
            }else{
                res.send({
                    status : false,
                    messegge : "Something Went Wrong", 
                });
            }
        });
    }else{
        db.Quiz.create({
            QuizTitle: req.body.QuizTitle,
            QuizCode: req.body.QuizCode,
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
    }    
};

controller.questionSave =(req,res) => {
    const dataReq = req.body; 
    db.Quesion.create({
        QuizFK: dataReq.QuizFK,
        InsertedBy: dataReq.InsertedBy,
        Quesion: dataReq.Quesion,
        option1: dataReq.option1,
        option2: dataReq.option2,
        option3: dataReq.option3,
        option4: dataReq.option4,
        status: dataReq.status
    })

    // arr.forEach(req => { 
        // check question exists or not
        // db.Quesion.findOne({
        //     where: {
        //         QuizFK: req.QuizFK,
        //         Quesion: req.Quesion,
        //         option1: req.option1,
        //         option2: req.option2,
        //         option3: req.option3,
        //         option4: req.option4,
        //         status: req.status,
        //     }
        // }).then((check) => {
        //         if(!check){
        //             db.Quesion.create({
        //                 QuizFK: req.QuizFK,
        //                 InsertedBy: req.InsertedBy,
        //                 Quesion: req.Quesion,
        //                 option1: req.option1,
        //                 option2: req.option2,
        //                 option3: req.option3,
        //                 option4: req.option4,
        //                 status: req.status
        //             })
        //         }
        //     })
        // })
        res.send({
            status : true,
            messegge : "Question Created SuccessFully", 
        });
};

controller.questionRemove =(req,res) => {
    questionId=req.params.questionId;
    db.Quesion.update({       
            is_removed: "Yes"
        }, {
        where: {
            id: questionId,
        },
    }).then((respose)=>{
        res.send({
            status:true,
            message:"Remove success"
        })
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

controller.quizAddBy =(req,res) => {
    UserFK=req.params;
    db.Quiz.findAll({
        where: {
            UserFK: UserFK.id,
            QuizStatus: "Success",
        }
    }).then((check) => {   
        res.send({
            quizDetails: check
        })  
    });
};

controller.quizDetails =(req,res) => {
    UserFK=req.params;
    db.Quiz.findOne({
        where: {
            id: UserFK.id,
            QuizStatus: "Success",
        }
    }).then((check) => {   
        res.send({
            quizDetails: check
        })  
    });
};

controller.quizRemove =(req,res) => {
    QuizId=req.params.quizId;
    db.Quiz.update({       
            QuizStatus: "remove"
        }, {
        where: {
            id: QuizId,
        },
    }).then((respose)=>{
    var len = respose.length;
        for(let i=0; i < len; i++){
            db.Quesion.update({ 
                is_removed : 'Yes'
                }, {
                where: {
                    QuizFK : QuizId
                },
            })
        }
        res.send({
            status:true,
            message:" Remove success"
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

controller.answerCheck = (req, res, next) => {
    const arr = req.body;
    var len= Object.keys(arr).length;
    console.log(len);
    var count = 0;
    var temp = 0;
    
    Object.keys(arr).forEach(function(key) {
        // console.table('Key : ' + key + ', Value : ' + arr[key])
        // count = 0;
        db.Quesion.findOne({
            where: {
                id: key,
                status: arr[key]
            }
        }).then((response) => {
            if(response){
                ++count;
            }
            temp++;
            if(temp == (len-2)){
                db.Result.create({
                    UserFK: arr.UserFK,
                    QuizFK	: arr.quizId,
                    TotalMark: count*5
                })
                res.send({
                    status : true,
                    messegge : count*5, 
                });
            }    
        });
    });
};

controller.userStat=(req,res) => {
    db.Result.findAll({
        where: {
            // id : req.body.UserPK
            UserFK:1
        },
        include: [
            {
              model: db.User,
              attributes: ['name']
            },
            {
                model: db.Quiz,
                attributes: ['QuizTitle']
            }
          ],
    }).then(response => {
        if(response){
            res.send({status : true,quizDetails : response});
        }
    });
}
module.exports = controller;