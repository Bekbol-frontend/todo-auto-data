// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library
import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModel = mongoose.model<User>("User", userSchema);

type DuplicatedUsers = {
  email: string;
};

async function manageUsers(): Promise<DuplicatedUsers[]> {
  try {
    // Your code goes here
    await mongoose.connect("mongodb://localhost/mydatabase");

    const usersToAdd = [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" }, // Duplicate email
      { name: "Charlie", email: "alice@example.com" },
      { name: "David", email: "david@example.com" },
      { name: "Eve", email: "eve@example.com" },
      { name: "Frank", email: "bob@example.com" }, // Duplicate email
    ];

    await UserModel.deleteMany({});
    await UserModel.insertMany(usersToAdd);

    // Find duplicate emails
    const duplicatedEmails = await UserModel.aggregate([
      { $group: { _id: "$email", count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $project: { _id: 0, email: "$_id" } },
    ]);

    await mongoose.disconnect();

    return duplicatedEmails as DuplicatedUsers[];
  } catch (error) {
    throw error;
  }
}

module.exports = { manageUsers };
