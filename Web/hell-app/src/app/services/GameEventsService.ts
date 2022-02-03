import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class GameEventsService {
    private messages: string[] = [];

    public GetAllEventsMessage() {
        return this.messages;
    }

    public StoreAllEventsMessage(message: string): void {
        this.messages.push(message);
    }
}