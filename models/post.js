const mongoose = require('mongoose');
const { marked } = require('marked')
const slugify = require('slugify')
const { JSDOM } = require('jsdom')
const createDOMpurify = require('dompurify')
const DOMpurify = createDOMpurify(new JSDOM().window)

const postSchema = new mongoose.Schema({
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    cloudinary_id: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
},
{versionkey: false, timestamps: true}
)

postSchema.pre("validate", function(next){
    if(this.description){
        this.slug = slugify(this.description, {lower: true, strict: true})
    }

    if(this.markdown){
        this.sanitizedHtml = DOMpurify.sanitize(marked(this.markdown))
    }

    next();
})

module.exports = mongoose.model("Post", postSchema)