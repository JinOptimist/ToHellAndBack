import { IHero } from "../models/IHero";
import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Database, get, getDatabase, onValue, ref, set } from "firebase/database";
import { Action } from "rxjs/internal/scheduler/Action";

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
        
        //get only once
        var dataPromise = get(refToCollection);

        //var dataPromise = onValue(refToCollection);
        var heroPromise = new Promise<IHero>((resolve, reject) => {
            dataPromise.then((data) => {
                const hero:IHero = data.val() as IHero;
                resolve(hero);
            }, reject);
          });
        return heroPromise;
    }

    SubscribeToUpdateHero (onHeroUpdate: (h: IHero) => void){
        const heroName = 'Conan';
        const refToCollection = ref(this.db, 'heroes/' + heroName);
        
        onValue(refToCollection, 
            (data) => {
                const hero:IHero = data.val() as IHero;
                onHeroUpdate(hero);
            });
    }

    SaveHero() {
        const refToCollection = ref(this.db, 'heroes/' + this.hero.name);
        set(refToCollection, this.hero);
    }
}