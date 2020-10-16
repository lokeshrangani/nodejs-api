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
                            UserPK : response.id, 
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
        db.Quesion.create({
            QuizFK: req.QuizFK,
            InsertedBy: req.InsertedBy,
            Quesion: req.Quesion,
            option1: req.option1,
            option2: req.option2,
            option3: req.option3,
            option4: req.option4,
            status: req.status
        }).then((response)=>{
            // if(response){
            res.send({
                status : true,
                // QuestionId : response.id,
                messegge : "Question Created SuccessFully", 
            });
        })
    })
    // .then((response)=>{
    //         // if(response){
                res.send({
                    status : true,
                    // QuestionId : response.id,
                    messegge : "Question Created SuccessFully", 
                });
            // }else{
            //     res.send({
            //         status : false,
            //         messegge : "Something Went Wrong", 
            //     });
            // }
    
        // });
    // db.Options.create({
    //     QuesionFK: req.body.QuesionFK,
    //     InsertedBy: req.body.InsertedBy,
    //     option1: req.body.option1,
    //     option2: req.body.option2,
    //     option3: req.body.option3,
    //     option4: req.body.option4,
    //     status: req.body.status
    // }).then((response)=>{
    //     if(response){
    //         res.send({
    //             status : true,
    //             QuestionId : response.id,
    //             messegge : "Question Created SuccessFully", 
    //         });
    //     }else{
    //         res.send({
    //             status : false,
    //             messegge : "Something Went Wrong", 
    //         });
    //     }

    // });
}

controller.answerCheck = (req, res) => {
    var count = 0;
    const arr = req.body;
    arr.forEach(req => { 
        db.Quesion.findOne({
            where: {
                id: req.id,
                status: req.selectedAns
            }
        }).then((response) => {
            if(response){
                count = count + 1;
                console.log(count);
                // console
            }
        });
        console.log("-----------");
        console.log(count);
        console.log("-----------");
    });
    // console.log(count);
    // db.Quesion.findOne({
    //     where: {
    //         id: req.body.id,
    //         status: req.body.selectedAns
    //     }
    // }).then((response) => {
    //     if(response){
    //         res.send({
    //             status : true,
    //             messegge : "Correct answer..!", 
    //         });
    //     }else{
    //         res.send({
    //             status : false,
    //             messegge : "Wrong answer..!", 
    //         });
    //     }
    // });
};

controller.testToken = (req, res) => {
    res.send({
        status : true,
        message : "Token matched", 
        statusCode: 200
    });
};
module.exports = controller;