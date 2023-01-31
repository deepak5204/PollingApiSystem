const Question = require('../../../models/questions');
const Option = require("../../../models/options");

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
    try{
        let id = req.params.id;
        let question = await Question.findById(id).populate({
            path: "options",
            select: "votes",
        });

        if(question){
            
            let options = queston.options;

            for(let i = 0; i < options.length; i++){
                if(option[i].votes > 0){
                    return res.status(404).json({
                        data: {
                            message: "question option has some votes, Not Possible to delete",
                        },
                    });
                }
            }
            
            await Option.deleteMany({question: id});
            await Question.findByIdAndDelete(id);

            return res.status(200).json({
                message: "Question deleted successfully",
            });
        } else {
            return res.status(404).json({message: "Question not found"});
        }
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error, deleting question"
        });
    }
}