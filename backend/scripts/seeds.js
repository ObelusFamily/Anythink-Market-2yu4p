//TODO: seeds script should come here, so we'll be able to put some data in our local env

const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
require("../models/User");
require("../models/Item");
require("../models/Comment");
const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

async function main() {
  const createdUsers = [];
  const createdItems = [];

  for (let i = 0; i < 100; i++) {
    const user = new User({
      username: faker.helpers.unique(faker.random.alpha, [10]),
      email: faker.helpers.unique(faker.internet.email),
    });
    user.setPassword(faker.internet.password());
    await user.save();
    createdUsers.push(user);
  }

  for (let i = 0; i < 100; i++) {
    const item = new Item({
      title: faker.random.words(3),
      description: faker.random.words(10),
      image: "",
      tagList: [],
      seller: createdUsers[Math.floor(Math.random() * createdUsers.length)],
    });
    await item.save();
    createdItems.push(item);
  }

  for (let i = 0; i < 100; i++) {
    const item = createdItems[Math.floor(Math.random() * createdItems.length)];
    const comment = new Comment({
      body: faker.random.words(20),
      item,
      seller: createdUsers[Math.floor(Math.random() * createdUsers.length)],
    });
    await comment.save();
    item.comments = item.comments.concat([comment]);
    await item.save();
  }
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
