const faker = require('faker');
const boom = require('@hapi/boom');

class ProductService {

  //Como no tenemos una base de datos, simulamos una base de datos con un array de productos.
  //Esto significa que los datos están en memoria y no en la base de datos.
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async createProduct(product){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findAllProducts() {
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find(product => product.id === id);
    if(!product) {
      throw boom.notFound('Product not found');
    }
    if(product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async updateProduct(id, changes) {
    const index = this.products.findIndex(product => product.id === id);
    if(index === -1) {
      throw boom.notFound('Product not found');
    }
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes
      };
      return this.products[index];
  }

  async deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if(index === -1) {
      throw boom.notFound('Product not found');
    }else{
      this.products.splice(index, 1);
      return {id};
    }
  }

}

module.exports = ProductService;
