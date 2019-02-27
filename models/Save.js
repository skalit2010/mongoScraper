// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var SaveSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
  },
   byline: {
   type: String,
  },
 
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Save = mongoose.model("Save", SaveSchema);


module.exports = Save;
