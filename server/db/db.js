const mongoose = require('mongoose');

const connection = async () => {
  try {
    const url = process.env.MONGODB_URL;
    if (!url) {
      throw new Error("MONGODB_URL environment variable is not defined");
    }

    await mongoose.connect(url);
    console.log("Database connected");
  } catch (error) {
    console.error("Database not connected", error);
  }
};

module.exports = {
  connection
};
