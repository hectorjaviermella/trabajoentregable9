import { Router } from "express";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
import  productsService  from "../services/products.service.js";
import  cartsService  from "../services/carts.service.js";
import  {sendEmail} from "../controllers/mail.controller.js";
import { mockingproducts} from "../controllers/products.controller.js";
import { loggerTest} from "../controllers/logger.controller.js";


import {login,register,current, restore,inicio,getProducts, getProductsById,getCartsById,ticket} from "../controllers/views.controller.js";

export const viewsRouter = Router();

//////////////////////////////////////////////////////////////////////////////////////////////

viewsRouter.get("/login", checkLogged,login);
//////////////////////////////////////////////////////////////////////////////////////////////
viewsRouter.get("/register", checkLogged,register);

//////////////////////////////////////////////////////////////////////////////////////////////
viewsRouter.get("/current", checkLogin,current);

//////////////////////////////////////////////////////////////////////////////////////////////
viewsRouter.get("/restore", restore);
//////////////////////////////////////////////////////////////////////////////////////////////
viewsRouter.get("/", checkLogged,inicio);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//muestra todo los productos 
viewsRouter.get("/products", getProducts);

///////////////////////////////////////////////////////////////////////////////////
//muestra un producto
viewsRouter.get("/product/:pId", getProductsById);

/////////////////////////////////////////////////////////////////////////////////////
//muestra un carrito
viewsRouter.get("/cart/:cId", getCartsById);

///////////////////////////////////////////////////////////////
//envia un email
viewsRouter.get("/mail",sendEmail);

///////////////////////////////////////////////////////////////
//crea una lista de productos con facker para pruebas
viewsRouter.get("/mockingproducts", mockingproducts);

///////////////////////////////////////////////////////////////
//viewsRouter.get("/cart/:cid/purchase",ticket)
viewsRouter.get("/ticket/:cId",ticket)

///////////////////////////////////////////////////////////////
//envia un testeo de errores
viewsRouter.get("/loggerTest",loggerTest);


export default viewsRouter;