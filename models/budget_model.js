const mongoose = require ('mongoose')

const budgetmodel = new mongoose.Schema({ 
    title:{
        required: true,
        type: String,
        trim: true,
    },
    value:{
        type: Number,
        required: true
    }, 
    color:{
        type: String,
        uppercase: true,
        required: true,
        validate: {
            validator: function(value) {
              // Using a regular expression to check if the value is a valid hexadecimal color code
              return /^#([A-Fa-f0-9]{6})$/.test(value);
            },
            message: 'only hexadecimal color value (e.g., "#FFFFFF").'
        },

    }
}, {collection:'chartdata'})

module.exports = mongoose.model('budget', budgetmodel)