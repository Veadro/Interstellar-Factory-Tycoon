// character.js
// TODO:
// npm install bcrypt

const createCharacter = async (db, name, bio, password) => {
    // Check if the character name already exists
    const existingCharacter = await db.collection('characters').findOne({ name });
  
    if (existingCharacter) {
      throw new Error('Character name already exists');
    }
  
    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);
  
    // Create a new character object
    const newCharacter = {
      name,
      bio,
      password: hashedPassword,
      resources: [],
      created_at: new Date(),
    };
  
    // Insert the new character into the database
    const result = await db.collection('characters').insertOne(newCharacter);
  
    // Return the newly created character
    return result.ops[0];
  };
  
  const hashPassword = async (password) => {
    // Use a suitable hashing library, like bcrypt, to hash the password
    // const bcrypt = require('bcrypt');
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    // For demonstration purposes, we return the password as is
    // Replace this line with the bcrypt code above
    return password;
  };
  
  module.exports = {
    createCharacter,
  };
