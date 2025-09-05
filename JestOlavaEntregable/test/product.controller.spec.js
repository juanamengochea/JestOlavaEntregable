'use strict';
import * as productController from '../src/controllers/product.controller.js';
import * as productService from '../src/services/product.service.js';
jest.mock('../src/services/product.service.js');

describe('Product Controller Unit Tests', () => {
  
    let mockRequest;
  let mockResponse;

  beforeEach(() => {
   mockRequest = {};
    mockResponse = {
      status: jest.fn(() => mockResponse), 
      json: jest.fn(), 
    };
  });

  it('should return all products with status 200', () => {
    const mockProducts = [{ id: 1, name: 'Test Product' }];
    productService.getAllProducts.mockReturnValue(mockProducts);
     productController.getProducts(mockRequest, mockResponse);

    
    expect(mockResponse.status).toHaveBeenCalledWith(200);
   
    expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
  });

  it('should return a product by ID with status 200', () => {
    const mockProduct = { id: 1, name: 'Laptop' };
    mockRequest.params = { id: '1' }; 
    productService.getProductById.mockReturnValue(mockProduct);

    productController.getProductById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should return 404 if product is not found', () => {
    mockRequest.params = { id: '99' };
    
    productService.getProductById.mockImplementation(() => {
      throw new Error('Product not found');
    });

    productController.getProductById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Product not found' });
  });

  it('should create a new product and return 201', () => {
    const newProductData = { name: 'Keyboard', price: 75 };
    const createdProduct = { id: 3, ...newProductData };
    mockRequest.body = newProductData;
    productService.createProduct.mockReturnValue(createdProduct);

    productController.createProduct(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(createdProduct);
  });
});