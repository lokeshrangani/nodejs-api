const router = require('express').Router();
const jwt = require('jsonwebtoken');
var userController = require('../controllers/userController');
const accessTokenSecret = 'youraccesstokensecret'; 

router.post("/user/save", userController.userSave);
router.post("/user/login", userController.userLogin);

router.get("/questions", authenticateJWT, userController.list);


router.post("/quiz/save", authenticateJWT,userController.quizSave);
router.post("/quiz/question/save", authenticateJWT,userController.questionSave);
router.post("/quiz/answer/check", authenticateJWT,userController.answerCheck);


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