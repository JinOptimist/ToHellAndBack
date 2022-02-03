import { IHero } from "../models/IHero";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class firebaseHelper {
    private hero: IHero;
    constructor() {
        this.hero = <IHero>{
            name: 'Conan',
            coins: 1,
            stamina: 100
        };
    }

    GetHero = () => this.hero;
}