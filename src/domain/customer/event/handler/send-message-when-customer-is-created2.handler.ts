import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreated2Event from "../customer.created2.event";

export default class SendMessageWhenCustomerIsCreatedHandler2 implements EventHandlerInterface<CustomerCreated2Event>{
    handle(event: CustomerCreated2Event): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated")
    }

}