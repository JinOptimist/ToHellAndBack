import { formatDate } from "@angular/common";
import { Inject, Injectable, LOCALE_ID } from "@angular/core";
import { IHero } from "../models/IHero";

@Injectable({
    providedIn: 'root'
})

export class GameEventsService {
    constructor(@Inject(LOCALE_ID) private locale: string) { }

    private messages: string[] = [];

    public GetAllEventsMessage() {
        return this.messages;
    }

    public addHeroPhrase(hero: IHero, phrase: string): void {
        this.messages.push(`${hero.name}: ${phrase}`);
    }

    public addSystemMessage(message: string): void {
        const now = new Date();
        const formatedTime = formatDate(now, "mm:ss", this.locale);
        this.messages.push(`sys: ${formatedTime} - ${message}`);
    }
}