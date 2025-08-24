import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./Models/Post.Model.js"; // your Post model

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const seedPosts = [
  { title: "Blog Post 1", content: "This is the content of blog post 1.", author: "Author 1" },
  { title: "Blog Post 2", content: "This is the content of blog post 2.", author: "Author 2" },
  { title: "Blog Post 3", content: "This is the content of blog post 3.", author: "Author 3" },
  { title: "Blog Post 4", content: "This is the content of blog post 4.", author: "Author 4" },
  { title: "Blog Post 5", content: "This is the content of blog post 5.", author: "Author 5" },
  { title: "Blog Post 6", content: "This is the content of blog post 6.", author: "Author 6" },
  { title: "Blog Post 7", content: "This is the content of blog post 7.", author: "Author 7" },
  { title: "Blog Post 8", content: "This is the content of blog post 8.", author: "Author 8" },
  { title: "Blog Post 9", content: "This is the content of blog post 9.", author: "Author 9" },
  { title: "Blog Post 10", content: "This is the content of blog post 10.", author: "Author 10" },
  { title: "Blog Post 11", content: "This is the content of blog post 11.", author: "Author 11" },
  { title: "Blog Post 12", content: "This is the content of blog post 12.", author: "Author 12" },
  { title: "Blog Post 13", content: "This is the content of blog post 13.", author: "Author 13" },
  { title: "Blog Post 14", content: "This is the content of blog post 14.", author: "Author 14" },
  { title: "Blog Post 15", content: "This is the content of blog post 15.", author: "Author 15" },
  { title: "Blog Post 16", content: "This is the content of blog post 16.", author: "Author 16" },
  { title: "Blog Post 17", content: "This is the content of blog post 17.", author: "Author 17" },
  { title: "Blog Post 18", content: "This is the content of blog post 18.", author: "Author 18" },
  { title: "Blog Post 19", content: "This is the content of blog post 19.", author: "Author 19" },
  { title: "Blog Post 20", content: "This is the content of blog post 20.", author: "Author 20" },
  { title: "Blog Post 21", content: "This is the content of blog post 21.", author: "Author 21" },
  { title: "Blog Post 22", content: "This is the content of blog post 22.", author: "Author 22" },
  { title: "Blog Post 23", content: "This is the content of blog post 23.", author: "Author 23" },
  { title: "Blog Post 24", content: "This is the content of blog post 24.", author: "Author 24" },
  { title: "Blog Post 25", content: "This is the content of blog post 25.", author: "Author 25" },
  { title: "Blog Post 26", content: "This is the content of blog post 26.", author: "Author 26" },
  { title: "Blog Post 27", content: "This is the content of blog post 27.", author: "Author 27" },
  { title: "Blog Post 28", content: "This is the content of blog post 28.", author: "Author 28" },
  { title: "Blog Post 29", content: "This is the content of blog post 29.", author: "Author 29" },
  { title: "Blog Post 30", content: "This is the content of blog post 30.", author: "Author 30" },
  { title: "Blog Post 31", content: "This is the content of blog post 31.", author: "Author 31" },
  { title: "Blog Post 32", content: "This is the content of blog post 32.", author: "Author 32" },
  { title: "Blog Post 33", content: "This is the content of blog post 33.", author: "Author 33" },
  { title: "Blog Post 34", content: "This is the content of blog post 34.", author: "Author 34" },
  { title: "Blog Post 35", content: "This is the content of blog post 35.", author: "Author 35" },
  { title: "Blog Post 36", content: "This is the content of blog post 36.", author: "Author 36" },
  { title: "Blog Post 37", content: "This is the content of blog post 37.", author: "Author 37" },
  { title: "Blog Post 38", content: "This is the content of blog post 38.", author: "Author 38" },
  { title: "Blog Post 39", content: "This is the content of blog post 39.", author: "Author 39" },
  { title: "Blog Post 40", content: "This is the content of blog post 40.", author: "Author 40" },
  { title: "Blog Post 41", content: "This is the content of blog post 41.", author: "Author 41" },
  { title: "Blog Post 42", content: "This is the content of blog post 42.", author: "Author 42" },
  { title: "Blog Post 43", content: "This is the content of blog post 43.", author: "Author 43" },
  { title: "Blog Post 44", content: "This is the content of blog post 44.", author: "Author 44" },
  { title: "Blog Post 45", content: "This is the content of blog post 45.", author: "Author 45" },
  { title: "Blog Post 46", content: "This is the content of blog post 46.", author: "Author 46" },
  { title: "Blog Post 47", content: "This is the content of blog post 47.", author: "Author 47" },
  { title: "Blog Post 48", content: "This is the content of blog post 48.", author: "Author 48" },
  { title: "Blog Post 49", content: "This is the content of blog post 49.", author: "Author 49" },
  { title: "Blog Post 50", content: "This is the content of blog post 50.", author: "Author 50" },
  { title: "Blog Post 51", content: "This is the content of blog post 51.", author: "Author 51" },
  { title: "Blog Post 52", content: "This is the content of blog post 52.", author: "Author 52" },
  { title: "Blog Post 53", content: "This is the content of blog post 53.", author: "Author 53" },
  { title: "Blog Post 54", content: "This is the content of blog post 54.", author: "Author 54" },
  { title: "Blog Post 55", content: "This is the content of blog post 55.", author: "Author 55" },
  { title: "Blog Post 56", content: "This is the content of blog post 56.", author: "Author 56" },
];


const importData = async () => {
  try {
    await Post.deleteMany(); // Clear old data
    await Post.insertMany(seedPosts);
    console.log("Data Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
