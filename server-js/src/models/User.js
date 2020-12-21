import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, 'First Name is required'] },
    lastName:  { type: String, required: [true, 'Last Name is required'] },
    zipCode:  { type: String, required: [true, 'Zip code is required'] },
    city:  { type: String, required: [true, 'City is required'] },
    state:  { type: String, required: [true, 'State is required'] },
    street:  { type: String, required: [true, 'Street is required'] },
    company:  { type: String, required: [true, 'Company is required'] },
    title:  { type: String, required: [true, 'Title is required'] },
    email: {type: String, required: [false] }
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

export default User;
