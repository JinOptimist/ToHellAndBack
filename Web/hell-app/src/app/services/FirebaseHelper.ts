import { IHero } from "../models/IHero";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FirebaseHelper {
    private hero: IHero;
    constructor() {
        this.hero = <IHero>{
            name: 'Conan',
            coins: 0,
            stamina: 100
        };
    }

    GetHero = () => this.hero;
}