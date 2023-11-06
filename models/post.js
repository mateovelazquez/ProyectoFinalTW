const mongoose = require('mongoose');
const { marked } = require('marked')
const slugify = require('slugify')
const { JSDOM } = require('jsdom')
const createDOMpurify = require('dompurify')
const DOMpurify = createDOMpurify(new JSDOM().window)

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // slug: {
    //     type: String,
    //     unique: true,
    //     required: true
    // },
    // sanitizedHtml: {
    //     type: String,
    //     required: true
    // }
},
{versionkey: false, timestamps: true}
)

// postSchema.pre("validate", function(next){
//     if(this.title){
//         this.slug = slugify(this.title, {lower: true, strict: true})
//     }

//     if(this.markdown){
//         this.sanitizedHtml = DOMpurify.sanitize(marked(this.markdown))
//     }

//     next();
// })

module.exports = mongoose.model("Post", postSchema)