//Importo mongoose y paginate como en el ejemplo del after
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = "products";

const productSchema = new mongoose.Schema({//Le invento parametros que usare
    name: { type: String, required: true},
    price: { type: Number, required: true},
    category: {type: String, required: true},
    available: { type: Boolean, default: true}
});

//Plugin
productsSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productCollection, productSchema);

export default Product;