import Product from "./product";



describe('Product unit test', () => {
   
    it('should throw error when id is empty', () => {
        expect(() => {
            const product = new Product('', 'Product 1', 100);
        }).toThrow('Id is required');
    }) 
    
    it('should throw error when name is empty', () => {
        expect(() => {
            const product = new Product('123', '', 100);
        }).toThrow('Name is required');
    })
    it('should throw error when price is less than zero', () => {
        expect(() => {
            const product = new Product('123', 'Product 1', -100);
        }).toThrow('Price must be greater than zero');
    })

    it('should change name', () => {
        
        const product = new Product('123', 'Product 1', 100);
        product.changeName('Product 2');
        expect(product.name).toBe('Product 2');
    })

    it('should change price', () => {
        
        const product = new Product('123', 'Product 1', 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });
}); 