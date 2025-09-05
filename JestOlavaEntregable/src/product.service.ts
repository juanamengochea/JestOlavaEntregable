import { Injectable } from '@nestjs/common';


let PRODUCTS = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
];

@Injectable()
export class ProductService {
  private lastId = 3;

  findAll() {
    return PRODUCTS;
  }

  findOne(id: number) {
    
    return PRODUCTS.find(product => product.id === id);
  }

  create(product: { name: string, price: number }) {
    this.lastId++;
    const newProduct = { id: this.lastId, ...product };
    PRODUCTS.push(newProduct);
    return newProduct;
  }

  update(id: number, updatedProduct: { name?: string, price?: number }) {
    const productIndex = PRODUCTS.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return null;
    }
    PRODUCTS[productIndex] = { ...PRODUCTS[productIndex], ...updatedProduct };
    return PRODUCTS[productIndex];
  }

  remove(id: number) {
    const productIndex = PRODUCTS.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return null;
    }
    const [removedProduct] = PRODUCTS.splice(productIndex, 1);
    return removedProduct;
  }
  
  
  reset() {
    PRODUCTS = [
      { id: 1, name: 'Laptop', price: 1200 },
      { id: 2, name: 'Mouse', price: 25 },
      { id: 3, name: 'Keyboard', price: 75 },
    ];
  }
}
