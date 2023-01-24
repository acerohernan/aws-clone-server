const User = require("../models/User");
const Widget = require("../models/Widget");
const { initialWidgetsv2 } = require("../constants/widgets");
const { createJWT } = require("../services/jwt");
const Home = require("../models/Home");

async function register(req, res) {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) return res.status(400).send("Email already exists");

  const newUser = await User.create({
    email,
    password,
  });

  await newUser.save();

  /* Creating the widgets */

  /* let creationWidgetsPromises = [];
  for (const widget of initialWidgets) {
    const created = Widget.create({ ...widget, user_id: newUser._id }).then(
      (result) => result.save()
    );
    creationWidgetsPromises.push(created);
  }

  await Promise.all(creationWidgetsPromises); */

  const userHome = await Home.create({
    user_id: newUser._id,
    widgets: initialWidgetsv2,
  });

  await userHome.save();

  res.status(200).send(newUser);
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(401).send("Email not exists");

  const isValid = user.password === password;

  if (!isValid) return res.status(401).send("Invalid Credentials");

  const token = createJWT({ sub: user._id });

  res.status(200).send({ token });
}

async function getAllWidgets(req, res) {
  const user_id = req.user.id;

  const widgets = await Widget.find({ user_id });

  res.status(200).send(widgets);
}

async function addWidgets(req, res) {
  const user_id = req.user.id;
  const { items } = req.body;
  const result = await Widget.updateMany(
    {
      user_id,
      _id: {
        $in: items,
      },
    },
    {
      $set: {
        isAdded: true,
      },
    }
  );

  res.status(200).send("Success");
}

async function getHomeWidgets(req, res) {
  const user_id = req.user.id;

  const home = await Home.findOne({ user_id });

  if (!home) return res.status(400).send("Home not found");

  res.status(200).send(home.widgets);
}
async function putHomeWidgets(req, res) {
  const user_id = req.user.id;

  const { widgets } = req.body;

  await Home.updateOne(
    { user_id },
    {
      $set: {
        widgets,
      },
    }
  );

  res.status(200).send("Success");
}

module.exports = {
  register,
  login,
  getAllWidgets,
  addWidgets,
  getHomeWidgets,
  putHomeWidgets,
};
