// import { model, Schema } from "mongoose";
// import bcrypt from "bcrypt";
// import validator from "validator";
// import requireAuth from "../middleware/requireAuth.js";
// const clientSchema = Schema({
//   lastName: {
//     type: String,
//     required: true,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// clientSchema.statics.login = async function (username, password) {
//   try {
//     // Find user by username
//     const user = await this.findOne({ username });

//     // If user not found, don't reveal username existence
//     if (!user) {
//       throw new Error("Invalid login credentials");
//     }

//     // Compare provided password with stored hashed password
//     const match = await bcrypt.compare(password, user.password);

//     // If passwords don't match, don't reveal username existence
//     if (!match) {
//       throw new Error("Invalid login credentials");
//     }

//     // If everything is correct, return user
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

// clientSchema.statics.signup = async function (
//   username,
//   password,
//   firstName,
//   lastName,
//   email
// ) {
//   const existUsername = await this.findOne({ username: username });
//   const existEmail = await this.findOne({ email: email });

//   // Validation
//   if (!username || !password || !firstName || !lastName || !email) {
//     throw Error("All fields required");
//   }

//   if (existUsername) {
//     throw Error("Acount already existe");
//   }
//   if (existEmail) {
//     throw Error("Acount already existe");
//   }

//   if (!validator.isEmail(email)) {
//     throw Error("Email invalid, Try again");
//   }
//   if (!validator.isStrongPassword(password)) {
//     throw Error("Weak Password");
//   }
//   if (!validator.isAlpha(lastName)) {
//     throw Error("Last name is invalid, Only characters");
//   }
//   if (!validator.isAlpha(firstName)) {
//     throw Error("Fisrt name is invalid, Only characters");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashedPasswod = await bcrypt.hash(password, salt);

//   const user = await this.create({
//     username,
//     password: hashedPasswod,
//     firstName,
//     lastName,
//     email,
//   });
//   return user;
// };

// export default model("client", clientSchema);
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const clientSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

clientSchema.statics.login = async function (username, password) {
  try {
    // Find user by username
    const user = await this.findOne({ username: username });

    // If user not found, throw specific error
    if (!user) {
      throw new Error("Username not found");
    }

    // Compare provided password with stored hashed password
    // const match = await bcrypt.compare(password, user.password);

    // If passwords don't match, throw specific error
    if (password!=user.password) {
      throw new Error("Invalid password");
    }
    console.log(user);
    // If everything is correct, return user
    return user;
  } catch (error) {
    throw error;
  }
};

clientSchema.statics.signup = async function (
  username,
  password,
  firstName,
  lastName,
  email
) {
  const existUsername = await this.findOne({ username: username });
  const existEmail = await this.findOne({ email: email });

  // Validation
  if (!username || !password || !firstName || !lastName || !email) {
    throw Error("All fields required");
  }

  if (existUsername) {
    throw Error("Acount already existe");
  }
  if (existEmail) {
    throw Error("Acount already existe");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email invalid, Try again");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Weak Password");
  }
  if (!validator.isAlpha(lastName)) {
    throw Error("Last name is invalid, Only characters");
  }
  if (!validator.isAlpha(firstName)) {
    throw Error("Fisrt name is invalid, Only characters");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPasswod = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    password: hashedPasswod,
    firstName,
    lastName,
    email,
  });
  return user;
};

export default mongoose.model("client", clientSchema);
