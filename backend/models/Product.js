import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productId:{
        type:Number,
        required : true
    },
    productName:{
        type:String,
        required : true
    },
    productDescription:{
        type:String,
        required : true
    },
    productPrice:{
        type:Number,
        required : true
    },
    ProductImageURL:{
        type:String,
        required : true
    },
    userID:{
        type:mongoose.Types.ObjectId, ref:'User'
    }
    
});
export default mongoose.model('Product', ProductSchema);