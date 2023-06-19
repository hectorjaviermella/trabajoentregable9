
export default class CartsRepository {
 
  constructor(dao) {
    this.dao = dao;
  }
////////////////////////////////////////////////////////////////////////////  
    async getCarts() {
      try {
        console.log("entor carts repository");
       const carts = await this.dao.getCarts();      
      
       
        return carts;
      } catch (error) {
        throw new Error('Error retrieving carts from the database.');
      }
    }
////////////////////////////////////////////////////////////////////////////  
async getCartsById(cId) {
  try {
       

    const cart = await this.dao.getCartsById(cId);
    return cart;
  } catch (error) {
    throw new Error('Error retrieving the cart from the database.');
  }
}

////////////////////////////////////////////////////////////////////////////
async addCartVacio(cartData) {
  try {
    const createdCart = await this.dao.create(null);
    return createdCart;
  } catch (error) {
    throw new Error('Error creating the cart.');
  }
}
////////////////////////////////////////////////////////////////////////////
async createCart(cart) {
  try {
    //const cart = new cartModel(cartData);
    console.log("createCart reposi");
    const createdCart = await this.dao.createCart(cart);
    return createdCart;
  } catch (error) {
    throw new Error('Error creating the cart.');
  }
}
////////////////////////////////////////////////////////////////////////////
async addProductToCart(cId,pId,pquantity){
  try {
 
      let result;
    //recupero el carrito
    const cart = await this.dao.getCartsById({ _id: cId });
   
    if (cart=== undefined){
      return  "No existe el carrito";
   };
         let productstocart = cart.products;                      
         let indexproduct = productstocart.findIndex((product) => product.pId._id.equals(pId)); 
      
            ///let indexproduct = productstocart.findIndex((product) => product.pId.toString() === pId.toString());  
            if (indexproduct === -1){ //no encontro el producto 
           
              
              const productagregar = {"pId" : Object(pId) , "quantity" : Number(pquantity.quantity)};
              productstocart.push(productagregar);
              cart.products=productstocart; 
              const cartsactualizado = await this.updateCart(cId,cart);        
              return result ="the cart was updated correctly." //cartsactualizado      

              }else{ //encontro el  producto en mi carrito
                  //preparar objeto a modificar                  
                  productstocart[indexproduct].quantity=productstocart[indexproduct].quantity +  Number(pquantity.quantity);
                cart.products=productstocart;           
                const cartsactualizado = await this.updateCart(cId,cart);             
                  return result ="the cart was updated correctly" //cartsactualizado
              } 
   
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////////////////////
async updateCart(cId,cartnuevo) {
  try {
    const createdCart = await this.dao.updateCart( cId , cartnuevo);
    return createdCart;
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////////////////////
async deleteCart(cId) {
  try {
       let tempcarrito = await  this.dao.findOne({ _id: cId });
       let result;
       if (tempcarrito)
            result = await  this.dao.deleteOne({ _id: cId });
       else result="no exist to cart"
    return result;
  } catch (error) {
    console.log(error);
  }
};
////////////////////////////////////////////////////////////////////////////    

async  updateQuantitytoProductToCart(cId,pId,pquantity){
  try {
  
      let result="";
      let tempcarrito = await  this.dao.findOne({ _id: cId });
      if (tempcarrito)
           {
            let productstocart = tempcarrito.products;     
            let indiceProducto = await productstocart.findIndex((product) => product.pId == pId);           
                
            if (indiceProducto>=0)
                 {//encontrado el producto                   
                 result= await this.dao.updateOne(
                  {  _id: cId  },
                  { $set: { "products.$[prod].quantity": pquantity.quantity } },
                  { arrayFilters: [ { "prod.pId": pId} ] });
                
                  return result;
                 }else{
                  //no encontrado producto
                  return result="No exist product to cart";
                                  
                 }
           }else{
             //no existe el carrito
             return result="No exist cart";
           }
      
    return result;
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////////////////////
async updatetoListProducToCart(cId,listproduc) {
  try {

      let result="";
     
      let cart = await this.dao.findOne({ _id: cId });
      if (cart)
           {
           
            //recorro cada elemento de la lista a agregar
            for (let i = 0; i < listproduc.length ; i++) {
                      //lista de elementos del carrito
                        let productstocart = cart.products;  
                        let productemp =listproduc[i];                         
                        let pId=productemp.pId;                            
                  
                        let indiceProducto = await productstocart.findIndex((product) => product.pId.toString() === pId.toString());                          
                        
                        if(indiceProducto <0){//insertarlo 
                           
                            let newquantity = productemp.quantity;                          
                            const updateResponse = await fetch(`http://localhost:8080/api/carts/${cId}/product/${productemp.pId}`,{
                            method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify({quantity:newquantity})
                          });       
                        }else{ //actualizar la cantidad
                          //console.log("elemento  encontrado",productemp.pId);
                          let newquantity = cart.products[indiceProducto].quantity +1;
                          const updateResponse = await fetch(`http://localhost:8080/api/carts/${cId}/product/${productemp.pId}`,{
                            method:'PUT',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify({quantity:newquantity})
                          });         
                       
                        }               
               }  //ford         
               return result="Product modificado";
           }else{
             //no existe el carrito
             return result="No exist cart";
           }
      
    return result;
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////////////////////

async deleteProductToCart(cId,pId) {
  try {
    console.log("elimina un producto del carts.repository del deleteProductToCart"); 
      let result="";
      let tempcarrito = await this.dao.getCartsById(cId);
    
      if (tempcarrito)
           {
         
            let productstocart = tempcarrito.products;  
        
          
            let indiceProducto = await productstocart.findIndex((product) => product.pId._id.equals(pId));  
                 
            if (indiceProducto>=0)
                 {//encontrado el producto        
              

                 // result= await cartModel.updateOne({ _id: cId },  {$pull: {products: {pId: pId}}});
                 result= await this.dao.updateOnex({ _id: cId },  {$pull: {products: {pId: pId}}});
              
                 
                
                  return result;
                 }else{
                  //no encontrado producto
                  return result;;                                    
                 }
           }else{
             //no existe el carrito
             return result="No exist cart";
           }
      
    return result;
  } catch (error) {
    console.log(error);
  }
};
////////////////////////////////////////////////////////////////////////////
    
  }  
