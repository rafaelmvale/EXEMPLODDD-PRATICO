import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";


let customer = new Customer('123', 'John Doe');
const address = new Address('123 Main St', 2, 'I12345-344', 'Sao paulo');


customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'Product 1', 10, 'p1', 1);
const item2 = new OrderItem('2', 'Product 2', 2, 'p2', 20);

const order = new Order('1', '123', [item1, item2]);


