import { IHero } from "../models/IHero";
import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

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

        // const firebaseConfig = {
        //     apiKey: "AIzaSyAfofIX36nawbTwCZdIGOBGq4jqlOvj5M4",
        //     authDomain: "tohellandback-9df27.firebaseapp.com",
        //     projectId: "tohellandback-9df27",
        //     storageBucket: "tohellandback-9df27.appspot.com",
        //     messagingSenderId: "683538521009",
        //     appId: "1:683538521009:web:b0ee2ee365fb416d38bb90"
        // };
        // const app = initializeApp(firebaseConfig);
    }

    GetHero = () => this.hero;

    CreateHero(){
        const db = getDatabase();
        const refToCollection = ref(db, 'heroes/' + this.hero.name);
        set(refToCollection, this.hero);
    }
}