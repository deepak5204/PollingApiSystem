const Question = require('../../../models/questions');

//create question
module.exports.createQuestion = async function(req, res) {
    console.log("create Question");
    try {
        let question = await Question.create(req.body);
        
        //if question created then return json response
        if(question){
            return res.json({
                question,
                data: { message: "question created successfully" },
            });
        } else {
            // if no question created return error response
            return res.status(500).json({
                data: { message: "Internal server error"},
            });
        } 
    } catch (err){
        console.log("Error while creating question", err);
        return;
    }
};

//View question
module.exports.viewQuestion = async function(req, res) {
    console.log("view Question");
    try{
        let question = await Question.findById(req.params.id).populate("options");
        return res.json({ question });
    } catch (err) {
        return res.status(500).json({
            data: {
                message: "Internal server error for viewing question",
            },
        });
    }
};


// Delete question
module.exports.deleteQuestion = async function(req, res) {
    console.log("delete Question");
}