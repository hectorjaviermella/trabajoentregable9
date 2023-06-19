import { userModel } from "./model/user.js";

class User {
  constructor() {}
  
 
//////////////////////////////////////////////////////////
  getUsers = async () => {
    const user = await userModel.find();
    return user;
  };
///////////////////////////////////////////////////////
  getUsersById = async (cartId) => {
   
    const user = await userModel.findOne({cart: cartId});
    
    return user;
  };
////////////////////////////////////////////////////////
  createUser = async (user) => {
    const createdUser = await userModel.create(user);
    return createdUser;
  };
}
/////////////////////////////////////////////////////////
export const userMongo = new User();