import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IHero } from "../../models/IHero";
import { FirebaseHelper } from "../FirebaseHelper";
import { IHeroObserver } from "./IHeroObserver";

@Injectable({
    providedIn: 'root'
})

export class HeroService implements IHeroObserver {
    private hero: IHero | undefined;

    constructor(
        private firebaseHelper: FirebaseHelper,
        private router: Router) { }

    public CreateHero(hero: IHero): Promise<void> {
        return this.firebaseHelper
            .SaveHero(hero)
            .then(() => {
                if (!!hero) {
                    this.hero = hero;
                }
            });
    }

    public LoadHero(heroName: string): Promise<IHero | undefined> {
        return this.firebaseHelper
            .GetHeroAsync(heroName)
            .then(hero => {
                if (!hero) {
                    return undefined;
                }

                this.hero = hero;
                return hero;
            });
    }

    public GetCurrentHero = (): IHero => this.hero as IHero;

    public SaveCurrentHero(): void {
        if (!this.hero) {
            throw new Error("We try to save hero before we read it");
        }

        this.firebaseHelper.SaveHero(this.hero);
    }

    public HeroWasUpdated(hero: IHero): void {
        //check for death
        if (hero.stamina <= 0) {
            this.firebaseHelper.KillHero(hero.name);
            this.hero = undefined;
            this.router.navigateByUrl('/dead');
        }
    }
}