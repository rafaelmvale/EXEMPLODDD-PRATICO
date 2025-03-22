import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-change-address-event";

export default class SendMessageWhenCustomerIsChangedAddressHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        const { id, name, address } = event.eventData;
        
        const { street, number, zip, city } = address;

        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${street}, ${number}, ${zip}, ${city}`)
    }
    
}