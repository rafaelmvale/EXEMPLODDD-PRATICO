import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer('123', 'John Doe');
const address = new Address('123 Main St', 2, 'I12345-344', 'Sao paulo');


customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'Product 1', 10, 'p1', 1);
const item2 = new OrderItem('2', 'Product 2', 2, 'p2', 20);

const order = new Order('1', '123', [item1, item2]);


