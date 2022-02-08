import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Hero } from "../../models/Hero";
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
                    this.hero = this.CreateHeroByInterface(hero);
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

                const heroWithSubscribtion: Hero = this.CreateHeroByInterface(hero);
                this.hero = heroWithSubscribtion;
                return heroWithSubscribtion;
            });
    }

    public GetCurrentHero = (): IHero => this.hero as IHero;

    public SaveCurrentHero(): void {
        if (!this.hero) {
            throw new Error("We try to save hero before we read it");
        }

        this.firebaseHelper.SaveHero(this.hero);
    }

    private CreateHeroByInterface(ihero: IHero): Hero {
        const heroWithSubscribtion: Hero = new Hero();
        heroWithSubscribtion.name = ihero.name;
        heroWithSubscribtion.stamina = ihero.stamina;
        heroWithSubscribtion.maxStamina = ihero.maxStamina;
        heroWithSubscribtion.coins = ihero.coins;
        heroWithSubscribtion.maze = ihero.maze;

        heroWithSubscribtion.AttachToHeroUpdating(this);
        return heroWithSubscribtion;
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