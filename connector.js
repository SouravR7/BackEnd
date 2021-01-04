const mongoose = require("mongoose");
const { schema } = require("./Schema");
const Mogodb_String =
  "mongodb+srv://Admin:Admin@cluster0.gg7ua.mongodb.net/RuleEngine?retryWrites=true&w=majority";
mongoose
  .connect(Mogodb_String, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Established"))
  .catch((err) => console.log("error while connect !!", err));

const user_Collection = mongoose.model("User", schema);

exports.user_Collection = user_Collection;
