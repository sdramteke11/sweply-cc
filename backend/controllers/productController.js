import Product from "../models/Product.js";
import fs from 'fs';
import fastcsv from 'fast-csv';

export const getProductList = async (req, res) =>{
    const { page = 1, limit = 10 } = req.body;

    try {
        const products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('userID','userName','name','email','mobileNo')
        .exec();

        const count = await Product.countDocuments();
        res.json({
            products,
            totalpages: Math.ceil(count/limit),
            currentpage : page
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
}

export const importCsv = async (req, res)=> {
    const {user} = req;
    const result = [];

    let stream = fs.createReadStream(req.file.path);
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on("data", function(data) {
        csvData.push({
          productId: data[0],
          productName: data[1],
          productDescription: data[2],
          productPrice: data[3],
          ProductImageURL: data[4],
          userID: user._id,
        });
      })
      .on("end", async () => {
        // remove the first line: header
        
        try {
            
        } catch (error) {
            
        }
        console.log(csvData);
      });
}