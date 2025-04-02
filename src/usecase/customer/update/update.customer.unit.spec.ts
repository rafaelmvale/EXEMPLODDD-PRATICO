import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe",
new Address(
    "Street",
    123,
    "12345678",
    "City"));
const input = {
    id: customer.id,
    name: "John Update",
    address: {
        street: "Street Update",
        number: 456,
        zip: "87654321",
        city: "City Update",
    },
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    }
}
describe("Unit test for customer update use case", () => {
    it("should update a customer", async () => {
      const customerRepository = MockRepository();
      const usecase = new UpdateCustomerUseCase(customerRepository);
      const output = await usecase.execute(input);
      expect(output).toEqual(input);
    });
   
});