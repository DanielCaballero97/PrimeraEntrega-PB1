import { Router } from "express";
import CartsManager from "../managers/cartsManager.js";

const cartsRouter = Router();

const cartsManager = new CartsManager()

cartsRouter.post('/',async(req,res)=>{

    console.log(req.body);
    const {id , products} = req.body;
    const newCart ={
        id,
        products
    }
    cartsManager.addCart(newCart);
    res.sendStatus(201);

})

cartsRouter.get("/:cid",async(req,res)=>{

    try{
        const {cid} = req.params;
        const parseId = parseInt(cid);
        if(isNaN(parseId)){
            return res.send("invalid Id")
        }
        const cart = await cartsManager.getCartById(parseId)
        if(!cart){
            return res.send("404 cart not found");
        }
        return res.send({cart})
    }catch(error){
        console.log(error);
        return res.send("Cannot get the cart")
    }
})

cartsRouter.post("/:cid/product/:pid",async(req,res)=>{

    try{
        const {cid,pid} = req.params;
        const parseId = parseInt(cid);
        const parseIdProduct = parseInt(pid);
        if(isNaN(parseId)){
            return res.send("invalid Id")
        }
        const cart = await cartsManager.getCartById(parseId);
        if(!cart){
            return res.send("404 cart not found");
        }
        const loadedCart = await cartsManager.addProductsToCart(parseId,parseIdProduct);
        if(!loadedCart){
            return res.send("cannot load the cart");
        }
        return res.send({loadedCart})

    }catch(error){
        console.log(error);
        return res.send("cannot add the product :( ")
    }

})

export default cartsRouter;