import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  date: { type: Date, default: Date.now }
});

export const Adoption = mongoose.model('Adoption', adoptionSchema);

export default Adoption;
