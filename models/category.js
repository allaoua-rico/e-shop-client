const mongoose= require('mongoose');

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
  },
  { collection: 'productscategories' }
  );

//   const ProductCategory = mongoose.model('ProductCategory', categorySchema);

  // const productCategory = new ProductCategory({
  //   name: "Salon",
  //   desc:""
  // })
  // productCategory.save(function (err, doc) {
  //   console.log(doc._id);
  //   console.log(err);
  
  // }); 

  // for nodejs
  // export default mongoose.models.ProductCategory || mongoose.model("ProductCategory", categorySchema);

  //for express
module.exports =mongoose.models.ProductCategory || mongoose.model('ProductCategory', categorySchema,'productscategories');