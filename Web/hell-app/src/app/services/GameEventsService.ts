import { formatDate } from "@angular/common";
import { Inject, Injectable, LOCALE_ID } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class GameEventsService {
    constructor(@Inject(LOCALE_ID) private locale: string){}

    private messages: string[] = [];

    public GetAllEventsMessage() {
        return this.messages;
    }

    public StoreAllEventsMessage(message: string): void {
        const now = new Date();
        const formatedTime = formatDate(now, "mm:ss", this.locale);
        this.messages.push(`${formatedTime} - ${message}`);
    }
}