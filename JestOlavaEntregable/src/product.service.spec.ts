import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    
    service.reset();
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería devolver todos los productos', () => {
      const products = service.findAll();
      expect(products.length).toBeGreaterThan(0);
      expect(products[0]).toHaveProperty('id');
    });
  });

  describe('findOne', () => {
    it('debería encontrar un producto por ID', () => {
      const product = service.findOne(1);
      expect(product).toEqual({ id: 1, name: 'Laptop', price: 1200 });
    });

    it('debería devolver undefined si el producto no es encontrado', () => {
      const product = service.findOne(999);
      expect(product).toBeUndefined();
    });
  });

  describe('create', () => {
    it('debería crear un nuevo producto', () => {
      const newProduct = { name: 'Monitor', price: 300 };
      const createdProduct = service.create(newProduct);
      
      expect(createdProduct).toHaveProperty('id');
      expect(createdProduct.name).toEqual(newProduct.name);
      expect(createdProduct.price).toEqual(newProduct.price);
      expect(service.findAll().length).toBe(4);
    });
  });

  describe('update', () => {
    it('debería actualizar un producto y devolverlo', () => {
      const updatedData = { price: 1150 };
      const updatedProduct = service.update(1, updatedData);
      
      expect(updatedProduct).toEqual({ id: 1, name: 'Laptop', price: 1150 });
      expect(service.findOne(1)).toEqual({ id: 1, name: 'Laptop', price: 1150 });
    });

    it('debería devolver null si el producto a actualizar no es encontrado', () => {
      const updatedProduct = service.update(999, { name: 'Non-existent Product' });
      expect(updatedProduct).toBeNull();
    });
  });

  describe('remove', () => {
    it('debería eliminar un producto y devolver el producto eliminado', () => {
      const initialCount = service.findAll().length;
      const removedProduct = service.remove(1);
      
      expect(removedProduct).toEqual({ id: 1, name: 'Laptop', price: 1200 });
      expect(service.findAll().length).toBe(initialCount - 1);
      expect(service.findOne(1)).toBeUndefined(); 
    });

    it('debería devolver null si el producto a eliminar no es encontrado', () => {
      const removedProduct = service.remove(999);
      expect(removedProduct).toBeNull();
    });
  });
});

