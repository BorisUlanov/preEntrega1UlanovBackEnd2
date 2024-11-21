import UserModel from '../../models/user.model.js'; 

class UserDAO {
  async getAll() {
    try {
      return await UserModel.find(); 
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  }


  async create(userData) {
    try {
      return await UserModel.create(userData);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw error;
    }
  }
}

export default new UserDAO();