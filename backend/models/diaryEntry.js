import mongoose from 'mongoose';

const diaryEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mood: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    enum: ['sunny', 'cloudy', 'rainy', 'snowy', 'stormy'],
    required: true
  },
});

const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema);
export default DiaryEntry;