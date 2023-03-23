// import models
const Question = require('../../../models/questions');
const Option = require('../../../models/options');

//create option for question using provided id
module.exports.createOption = async (req, res) => {
    console.log("create option");
    try{
        let id = req.params.id;
        let question = await Question.findById(id);
        
        if(question){
           let option = await Option.create({
            content: req.body.content,
            votes: req.body.votes,
            question: req.params.id,
           });
           option.link_vote = "http://localhost:8000/api/v1/options/" + option.id + "/add_vote";
           option.save();
           question.options.push(option);
           question.save();

        res.status(200).json({
            option,
            data: {
                message: "option created",
            },
           });
        }
        res.status(200).json({question});
    } catch(err){
        console.log("Error : ",err);
        return;
    }    
};



//delete an option on the basis of its id
module.exports.optionDelete = async (req, res) => {
    // console.log("delete options");
    try{
        let id = req.params.id;

        //chek and find option exits or not
        let option = await Option.findById(id);
        console.log(option);
        

        // if option present then check for vote
        // if option has vote then don't delete
        if(option.votes > 0){
            res.status(404).json({
                data: {
                    message: "Can't delete! It has vote"
                },
            });
        }

        // delete option from Question's options array
        await Question.findByIdAndUpdate(option.question, {
            $pull: {options: id },
        });

        // delete option from option
        await Option.findByIdAndDelete(id);
        res.status(200).json({
            data: {
                message: "Option deleted successfully"
            },
        });
    }
    catch (err) {
        res.status(500).json({
            data: {
                message: "Internal server error"
            },
        });
    }
};


//adding vote to an option for particular question 
module.exports.addVote = async (req, res) => {
    console.log("add vote");
    try {
        let id = req.params.id;

        //find option if present then vote to it
        await Option.findByIdAndUpdate(id, {$inc: { votes : 1}});

        res.status(200).json({
            data: {
                message: "Voted Successfully"
            }
        });
    } catch (err){
        res.status(500).json({
            data: {
                message: "Internal server error"
            }
        });
    } 
};

