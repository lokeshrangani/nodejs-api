const router = require('express').Router();
const jwt = require('jsonwebtoken');
var userController = require('../controllers/userController');
const accessTokenSecret = 'youraccesstokensecret'; 

// user API
router.post("/user/save", userController.userSave);
router.post("/user/login", userController.userLogin);

router.post("/user/password/sendEmail", userController.userForSendMail);
router.get("/user/password/reset/:code", userController.userForVerifyCode);
router.post("/user/password/update", userController.userPassUpdate);

router.get("/questions/:quizId", authenticateJWT, userController.list); //Questions List API

// Quiz API
router.post("/quiz/save", authenticateJWT,userController.quizSave);
router.post("/quiz/question/save", authenticateJWT,userController.questionSave);
router.post("/quiz/answer/check", authenticateJWT,userController.answerCheck);

router.get("/quiz/question/update/:questionId", authenticateJWT,userController.questionUpdateDetails);
router.post("/quiz/question/updateSave", authenticateJWT,userController.questionUpdateSave);

// Token Test API
router.get("/testToken",authenticateJWT, userController.testToken);

// Token Verification
function authenticateJWT (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, email) => {
            if (err) {
                return res.send({
                    status : false,
                    message : "Unauthorized"
                });
            }
            req.email = email;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}
module.exports = router;