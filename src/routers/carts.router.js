
import { Router } from "express";
import { checkPermisosUsuario } from "../middlewares/auth.js";
import { getCardId, createCart,addProductToCart,deleteCardId,deleteProductToCard,updateQuantitytoProductToCart,updatetoListProducToCart,purchase} from "../controllers/carts.controller.js";
import {getTicketsById,createTicket } from "../controllers/tickets.controller.js";


export const cartsrouter = Router();


//////////////////////////////////////////////////////////////////////////////////////////////

cartsrouter.get("/:cId", getCardId);

//////////////////////////////////////////////////////////////////////////////////////////////
cartsrouter.post("/", createCart);
  
/////////////////////////////////////////////////////////////////////////////////////////////
//agregar  un producto al  carrito
cartsrouter.post("/:cId/product/:pId", checkPermisosUsuario,addProductToCart);

//////////////////////////////////////////////////////////////////////////////////////
//elimina un carrito
cartsrouter.delete("/:cId", deleteCardId);

////////////////////////////////////////////////////////////////////////////////////////////////
//elimina un producto del carrito especifico
cartsrouter.delete("/:cId/product/:pId", deleteProductToCard);

  ////////////////////////////////////////////////////////////////////////////////////////////////
//actualizar la cantidad de unidades de un producto que se encuentra en el carrito
cartsrouter.put("/:cId/product/:pId", updateQuantitytoProductToCart);

 //////////////////////////////////////////////////////////////////////////////////////
//PUT actualiza el carrito con un arreglo de productos
cartsrouter.put("/:cId", updatetoListProducToCart);


//////////////////////////////////////////////////////////////////////////////////////
//agregar  un ticket de la compra de un  carrito
cartsrouter.get("/:cId/purchase",purchase);



export default cartsrouter;