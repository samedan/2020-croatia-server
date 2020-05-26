const { rentals, users, images } = require('./data');
const Rental = require('../models/rental');
const User = require('../models/user');
const Booking = require('../models/booking');
const CloudinaryImage = require('../models/cloudinary-image');

class FakeDB {
  async clean() {
    await Rental.deleteMany({});
    await CloudinaryImage.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});
  }

  async addData() {
    await Rental.create(rentals);
    await CloudinaryImage.create(images);
    await User.create(users);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = FakeDB;
