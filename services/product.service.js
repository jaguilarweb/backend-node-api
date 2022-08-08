const faker = require('faker');

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
        image: faker.image.imageUrl()
      });
    }
  }

  createProduct(product) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product
    }
    this.products.push(newProduct);
    return newProduct;
  }

  findAllProducts() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, changes) {
    const index = this.products.findIndex(product => product.id === id);
    if(index === -1) {
      throw new Error('Product not found');
    }
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes
      };
      return this.products[index];

  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if(index === -1) {
      throw new Error('Product not found');
    }else{
      this.products.splice(index, 1);
      return {id};
    }
  }

}

module.exports = ProductService;
