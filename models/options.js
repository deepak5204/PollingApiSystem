const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
        },
        votes: {
            type: Number,
        },
        link_vote: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
