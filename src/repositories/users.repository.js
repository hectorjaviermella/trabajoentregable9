
  
export default class UsersRepository {
    constructor(dao) {
      this.dao = dao;
    }
   
      async getUsers(query,limit,page,pCategory,pStatus,sort){
          try {
            let users=0;          
            users = await this.dao.paginate(query, {limit:limit,page:page,pCategory,pStatus,lean:true,sort:sort});   
                             
            return users;
          } catch (error) {
              throw new Error('Error retrieving Users from the database.');
          }
        };
  
  //////////////////////////////////////////////////////////////////////////  
  async getUsersById(username){
      try {
        console.log("entro a getUserbyid " + username);
       // const user = await userService.findOne({ email: username }).lean();
        const users = await this.dao.getUsersById(username);
        return users;
      } catch (error) {
        console.log(error);
      }
    };
  
  /////////////////////////////////////////////////////////////////////////  
  async addUser(user){
      try {
        const createdUser = await this.dao.create(user);
        return createdUser;
      } catch (error) {
        console.log(error);
      }
    };
  
  
  /////////////////////////////////////////////////////////////////////////////////
  async deleteUser(pId){
      try {
          let result = await  this.dao.deleteOne({ _id: pId });
        return result;
      } catch (error) {
        console.log(error);
      }
    };
  /////////////////////////////////////////////////////////////////////////////////////
  async updateUser(pId,usernuevo){
      try {
        const createdUser = await this.dao.updateOne({ _id: pId }, usernuevo);
        return createdUser;
      } catch (error) {
        console.log(error);
      }
    };
  
    }  
    
   