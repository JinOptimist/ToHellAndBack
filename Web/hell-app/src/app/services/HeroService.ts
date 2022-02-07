import { Injectable } from "@angular/core";
import { get, ref } from "firebase/database";
import { IHero } from "../models/IHero";
import { FirebaseHelper } from "./FirebaseHelper";

@Injectable({
    providedIn: 'root'
})

export class HeroService {
    private hero!: IHero;

    constructor(private firebaseHelper: FirebaseHelper) { }

    public LoadHero(heroName: string) {
        return this.firebaseHelper
            .GetHeroAsync(heroName)
            .then(h => this.hero = h);
    }

    public GetCurrentHero = () => this.hero;

    public SaveCurrentHero(): void {
        if (!this.hero) {
            throw new Error("We try to save hero before we read it");
        }

        this.firebaseHelper.SaveHero(this.hero);
    }

    public CreateHero(hero: IHero): Promise<void> {
        return this.firebaseHelper.SaveHero(hero).then(() => {
            this.hero = hero;
        });
    }
}