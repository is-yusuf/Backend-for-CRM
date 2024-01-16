import { sequelize, franchisor_information } from './models';
async function createUser() {
    try {
      const newUser = await User.create({ name: 'John Doe', age: 30 });
      console.log('New user created:', newUser);
    } catch (err) {
      console.error('Error creating user:', err);
    }
  }
  
  createUser();
  