import Customer from "../../customer/entity/customer";
import CustomerAddressChangedEvent from "../../customer/event/customer-change-address-event";
import CustomerCreated1Event from "../../customer/event/customer.created1.event";
import CustomerCreated2Event from "../../customer/event/customer.created2.event";
import SendMessageWhenCustomerIsChangedAddressHandler from "../../customer/event/handler/send-message-when-customer-is-changed-address.handler";
import SendMessageWhenCustomerIsCreatedHandler1 from "../../customer/event/handler/send-message-when-customer-is-created1.handler";
import SendMessageWhenCustomerIsCreatedHandler2 from "../../customer/event/handler/send-message-when-customer-is-created2.handler";
import SendEmailwhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";


describe('Domain events testes', () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailwhenProductIsCreatedHandler();
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailwhenProductIsCreatedHandler();
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailwhenProductIsCreatedHandler();
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailwhenProductIsCreatedHandler();
        const eventHandler1 = new SendMessageWhenCustomerIsCreatedHandler1();
        const eventHandler2 = new SendMessageWhenCustomerIsCreatedHandler2();
        const eventHandler3 = new SendMessageWhenCustomerIsChangedAddressHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreated1Event", eventHandler1);
        eventDispatcher.register("CustomerCreated2Event", eventHandler2);
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler3);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreated1Event"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreated2Event"][0]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler3);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        });
       
        const Customer1CreatedEvent = new CustomerCreated1Event({
            id: "1",
            name: "Customer 1"
        });
        const Customer2CreatedEvent = new CustomerCreated2Event({
            id: "2",
            name: "Customer 2"
        });

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "1",
            name: "Customer 1",
            address: {
                street: "Street 123",
                number: 11,
                zip: "1234",
                city: "City 12"
            }
        })
        
        eventDispatcher.notify(productCreatedEvent);
        eventDispatcher.notify(Customer1CreatedEvent);
        eventDispatcher.notify(Customer2CreatedEvent);
        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
        expect(spyEventHandler3).toHaveBeenCalled();
        
    });

    it("should register an event handler when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendMessageWhenCustomerIsCreatedHandler1();
        
        eventDispatcher.register("Customer1CreatedEvent", eventHandler1);
        
        expect(eventDispatcher.getEventHandlers["Customer1CreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["Customer1CreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["Customer1CreatedEvent"][0]).toMatchObject(eventHandler1);

        const eventHandler2 = new SendMessageWhenCustomerIsCreatedHandler1();
        
        eventDispatcher.register("Customer2CreatedEvent", eventHandler2);
        
        expect(eventDispatcher.getEventHandlers["Customer2CreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["Customer2CreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["Customer2CreatedEvent"][0]).toMatchObject(eventHandler2);

        
    });

    it("should unregister an event handler when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendMessageWhenCustomerIsCreatedHandler1();
        
        eventDispatcher.register("Customer1CreatedEvent", eventHandler1);

        expect(eventDispatcher.getEventHandlers["Customer1CreatedEvent"][0]).toMatchObject(eventHandler1);

        eventDispatcher.unregister("Customer1CreatedEvent", eventHandler1);
        
        expect(eventDispatcher.getEventHandlers["Customer1CreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["Customer1CreatedEvent"].length).toBe(0);

        const eventHandler2 = new SendMessageWhenCustomerIsCreatedHandler2();
        
        eventDispatcher.register("Customer2CreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["Customer2CreatedEvent"][0]).toMatchObject(eventHandler2);

        eventDispatcher.unregister("Customer2CreatedEvent", eventHandler2);
        
        expect(eventDispatcher.getEventHandlers["Customer2CreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["Customer2CreatedEvent"].length).toBe(0);
    })
    it("should register an event handler when address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessageWhenCustomerIsChangedAddressHandler();
        
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);
        
    });

    it("should unregister an event handler when address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessageWhenCustomerIsChangedAddressHandler();
        
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(0);
        
    });

});   