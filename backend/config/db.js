import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://aliagamdnhectorgbl:XuoWNF8H82tnzSrL@cluster0.ru2noft.mongodb.net/delivery-restaurant').then(() => console.log("DB Connected"));
}
