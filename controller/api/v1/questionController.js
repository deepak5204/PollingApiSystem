const Question = require("../../../models/questions");
const Option = require("../../../models/options");

//create question
module.exports.createQuestion = async function (req, res) {
  try {
    let question = await Question.create(req.body);

    //if question created then return json response
    if (question) {
      return res.json({
        question,
        data: { message: "question created successfully" },
      });
    } else {
      // if no question created return error response
      return res.status(500).json({
        data: { message: "Internal server error" },
      });
    }
  } catch (err) {
    console.log("Error while creating question", err);
    return;
  }
};

//View question
module.exports.viewQuestion = async (req, res) => {
  try {
    let question = await Question.findById(req.params.id).populate("options");
    res.status(200).json({
      message: "Success",
      data: {
        question
      }
    });
  } catch (err) {
    res.status(500).json({
        status: 'fail',
      data: {
        message: "Internal server error for viewing question",
      },
    });
  }
};

// vieq all question
module.exports.getAllQuestions = async (req, res) =>{
    try{
        const questions = await Question.find(); 
        res.status(200).json({
            message:'Success',
            data: {
                questions
            }
        })
    } catch (err){
        console.log(err);
        
    }
}

// Delete question
module.exports.deleteQuestion = async  (req, res) => {
  try {
    let id = req.params.id;
    let question = await Question.findById(id).populate({
      path: "options",
      select: "votes",
    });

    if (question) {
      let options = question.options;

      for (let i = 0; i < options.length; i++) {
        if (options[i].votes > 0) {
          return res.status(404).json({
            data: {
              message: "question option has some votes, Not Possible to delete",
            },
          });
        }
      }

      await Option.deleteMany({ question: id });
      await Question.findByIdAndDelete(id);

      res.status(200).json({
        message: "Question deleted successfully",
      });
    } else {
        res.status(404).json({ message: "Question not found" });
    }
  } catch (err) {
      res.status(500).json({
      message: "Internal server error, deleting question",
    });
  }
};
