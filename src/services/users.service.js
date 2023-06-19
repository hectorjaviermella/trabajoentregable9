
import { userRepository } from "../repositories/index.js";
import UserDTO from "../daos/dtos/user.dto.js";

export default class UserService {
  constructor() {}

///////////////////////////////////////////////////////////

getUsers(query,limit,page,pCategory,pStatus,sort) {
    const users = userRepository.getUsers(query,limit,page,pCategory,pStatus,sort);
    return users;
  }

////////////////////////////////////////////////////////////////////////
getUsersById(pId) {
    const user = userRepository.getUsersById(pId);
    return user;
  }
////////////////////////////////////////////////////////////////////////

create(user) {
    const result = userRepository.addUser(user);
    return result;
  }
////////////////////////////////////////////////////////////////////////

updateUser(pId,usernuevo) {
    const createdUser = userRepository.updateUser(pId,usernuevo);
    return createdUser;
  }
////////////////////////////////////////////////////////////////////////

deleteUser(pId) {
    const result = userRepository.deleteUser(pId);
    return result;
  }



/////////////////////////////////////////////////////////////////////////////////////
}


