import { IHero } from "../../models/IHero";

export interface IHeroObserver {
    HeroWasUpdated(hero: IHero): void;
}