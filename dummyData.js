const mongoose = require('mongoose');
const Task = require('./models/task');
const User = require('./models/user');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');

  // Create a dummy user
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');

  let user = await User.findOne({ username: 'testuser' });

  if (!user) {
    const hashedPassword = await bcrypt.hash('password', 10);
    user = new User({
      username: 'testuser',
      password: hashedPassword,
      oauthId: '1234567890'
    });
    await user.save();
    console.log('Hashed password for testuser:', hashedPassword);
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  console.log('Generated token:', token);

  // Create dummy tasks
  const task1 = new Task({
    title: 'Task 1',
    description: 'Description for Task 1',
    status: 'pending',
    user: user._id
  });
  await task1.save();

  const task2 = new Task({
    title: 'Task 2',
    description: 'Description for Task 2',
    status: 'completed',
    user: user._id
  });
  await task2.save();

  console.log('Dummy data inserted successfully');
  mongoose.disconnect();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
