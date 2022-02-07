import { HeroService } from "../services/HeroService";
import { IHeroObserver } from "../services/IHeroObserver";
import { IHero } from "./IHero";

export class Hero implements IHero {
    name: string;
    coins: number;
    private _stamina: number;
    public get stamina() {
        return this._stamina;
    }
    public set stamina(newStamina) {
        this._stamina = newStamina;
        this.Notify();
    }
    maxStamina: number;

    private subscribers: IHeroObserver[] = [];

    public AttachToHeroUpdating(subscriber: IHeroObserver): void {
        this.subscribers.push(subscriber);
    }

    private Notify() {
        this.subscribers.forEach(subscriber => {
            subscriber.HeroWasUpdated(this);
        });
    }
}