const { default: mongoose } = require("mongoose");


const postSchema = new mongoose.Schema({
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commnet",
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        usernmae: String
    },
    image: {
        type: String
    },
    likes: [{ type : String }]
},{
    timestamps: true,
})

module.exports = mongoose.model("Post", postSchema);