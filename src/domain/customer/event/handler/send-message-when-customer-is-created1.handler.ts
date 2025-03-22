import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreated1Event from "../customer.created1.event";

export default class SendMessageWhenCustomerIsCreatedHandler1 implements EventHandlerInterface<CustomerCreated1Event>{
    handle(event: CustomerCreated1Event): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated")
    }

}