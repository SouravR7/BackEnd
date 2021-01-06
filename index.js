const express = require("express");
const app = express();
const port = 7000;
app.use(express.json());
const { user_Collection } = require("./connector");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/api/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const existingUser = await user_Collection.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: "User account already exists" });
    }
    const newUser = new user_Collection({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
    // console.log('newUser')
    // console.log(newUser)
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await user_Collection.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User account does not exists" });
    }
    const isMatch = await user_Collection.findOne({ password: password });
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      id: user._id,
      name: user.firstname,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
