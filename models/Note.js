// Require mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noteSchema = new Schema({

  article_id: {
    type: Schema.Types.ObjectId
  },
  body: {
    type: String
  }
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;
