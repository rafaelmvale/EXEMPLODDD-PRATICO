import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find.customer.dto";

export default class FindCustomerUseCase {
    private customerRepositoryu: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepositoryu = customerRepository;
    }

    async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
        const customer = await this.customerRepositoryu.find(input.id);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                city: customer.Address.city,
                zip: customer.Address.zip,
            }
        }
    }
}