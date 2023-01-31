// import models
const Question = require('../../../models/questions');
const Option = require('../../../models/options');

//create option for question using provided id
module.exports.createOption = async function(req, res){
    // console.log("create option");
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

           return res.json({
            option,
            data: {
                message: "option created",
            },
           });
        }
        return res.json({question});
    } catch(err){
        console.log("Error : ",err);
        return;
    }    
}



//delete an option on the basis of its id
module.exports.optionDelete = async function(re, res){
    console.log("delete options");

};


//adding vote to an option for particular question 
module.exports.addVote = async function(req, res) {
    console.log("add vote");
};

