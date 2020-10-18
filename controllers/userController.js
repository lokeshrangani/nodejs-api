const controller = {};
const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = db.User;
const accessTokenSecret = 'youraccesstokensecret';

controller.list = (req, res) => {
    db.User.findAll().then(test => res.send(test));
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
                        // db.User.update({ 
                        //     is_online: "Yes"
                        //   }, {
                        //     where: {
                        //         id: response.id
                        //     },
                        //     returning: true, // needed for affectedRows to be populated
                        //     plain: true // makes sure that the returned instances are just plain objects
                        //   })
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
    var i;
    const arr = req.body;
    var flag = 0;
    var count = 0;
    // for (let i of arr) {
    //     count = i.id*5;
    //     console.log(i);
    // }
    // console.log(count);

     arr.map(( index) => {
        var flag = 0;
        db.Quesion.findOne({
            where: {
                id: index.id,
                status: index.selectedAns
            }
        }).then(response => {
            if(response) {
                // count = count + index;
                // return count;
                // return index;
                // console.log(response)
                // return count;
                countFunction();
                flag = 1;
            }
        }).catch(err => console.log(err));
        if(flag == 1) {
            count = count +1;
        }
        function countFunction()
        {
            count++;
            next();
        }
    });
    // const cache = new Map();
    // cache.set(req.body);

    // for (const [ key, value ] of cache) {  
    //     console.log(`Cache item: "${key}" with values ${JSON.stringify(value)}`)
    //   }




    // for (var index in arr) {  
    //     if(index==0){
    //         index=index+1;
    //     }
    //     count= index*5;
    // }

    // arr.forEach(req => { 
    //     db.Quesion.findOne({
    //         where: {
    //             id: req.id,
    //             status: req.selectedAns
    //         }
    //     }).then((response) => {
    //         if(response){
    //             count = count + 1;
    //         }
    //     });
    // });

};


module.exports = controller;