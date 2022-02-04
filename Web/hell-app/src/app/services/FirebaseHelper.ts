import { IHero } from "../models/IHero";
import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Database, get, getDatabase, onValue, ref, set } from "firebase/database";

@Injectable({
    providedIn: 'root'
})

export class FirebaseHelper {
    private hero!: IHero;
    private db: Database;

    constructor() {
        this.db = getDatabase();
        const heroName = 'Conan';
        const refToCollection = ref(this.db, 'heroes/' + heroName);
        
        this.hero = <IHero>{
            name: 'Conan',
            coins: 0,
            stamina: 100
        };
        
        //Read once
        get(refToCollection).then(snapShot => {
            this.hero = snapShot.val();
        });
        
        //read and update onLive
        // onValue(refToCollection, (snapshot) => {
        //     const data = snapshot.val();
        // });


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

    GetHeroAsync () {
        const heroName = 'Conan';
        const refToCollection = ref(this.db, 'heroes/' + heroName);
        return get(refToCollection);
    };

    CreateHero() {
        const refToCollection = ref(this.db, 'heroes/' + this.hero.name);
        set(refToCollection, this.hero);
    }
}