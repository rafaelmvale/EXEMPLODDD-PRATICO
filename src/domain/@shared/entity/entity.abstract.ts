import Notification from "../notification/notification";

export default abstract class Entity {
    protected _id: string;
    public Notification: Notification;

    constructor() {
        this.Notification = new Notification();
    }
    
  get id(): string {
    return this._id;
  }
}