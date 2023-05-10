const mongoose = require('mongoose');
//making schema for notes
const notesSchema = new Schema({
    title: {
        type: Strring,
        required: true
    },
    description: {
        type: Strring,
        required: true
    },
    tag: {
        type: Strring,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('notes',notesSchema);