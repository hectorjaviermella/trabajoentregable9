import { Router } from "express";
import { createHash, isValidPassword } from "../utils.js";

import { userModel } from "../daos/mongo/model/user.js";

export const sessionsRouter = Router();
////////////////////////////////////////////////////////////////
export function logout(req, res) {

  req.session.destroy( err => {
    if (!err) {
             return res.send("Logout exitoso");
             //return res.redirect("/login");
    }
    else
         res.send("Logout no exitoso");
  })
};

////////////////////////////////////////////////////////////////////////////

export function register(req, res) {

    return res.send({ status: "sucess", message: "user registered" });
  }
;

//////////////////////////////////////////////////////////////////////////////////////////////////////
export function login(req, res) {

   
    if (!req.user)
      return res.status(401).send({ status: "error", error: "Unauthorized" });



    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
      cart: req.user.cart,

    };
    
    res.send({ status: "sucess", payload: req.user });
  }
;

//////////////////////////////////////////////////////////////////////////////////////////////////////
export async function restore(req, res) {
  try {
   

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).lean();
    if (!user) {
      return res
        .status(404)
        .send({ status: "error", error: "user does not exist" });
    }

    const hashedPassword = createHash(password);

    await userModel.updateOne({ email }, { password: hashedPassword });

    return res.send({
      status: "sucess",
      message: "succesfully updated password",
    });
  } catch (error) {
    console.log(error);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////
export function github(req, res) {
}
;
//////////////////////////////////////////////////////////////////////////////////////////////////////
export function githubcallback(req, res) {
    req.session.user = req.user;
   
    res.redirect("/products");
  }
;

////////////////////////////////////////////////////////////////////////////////////////////
export default sessionsRouter;