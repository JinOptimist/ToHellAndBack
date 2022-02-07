import { IHero } from "../models/IHero";
import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Database, get, getDatabase, onValue, ref, remove, set } from "firebase/database";
import { Action } from "rxjs/internal/scheduler/Action";
import { from, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class FirebaseHelper {
    private db: Database;

    constructor() {
        this.db = getDatabase();
    }

    GetHeroAsync(heroName: string): Promise<IHero> {
        //const heroName = 'Conan';
        const refToCollection = ref(this.db, 'heroes/' + heroName);

        //get only once
        var dataPromise = get(refToCollection);
        var heroPromise = new Promise<IHero>((resolve, reject) => {
            dataPromise.then((data) => {
                const hero: IHero = data.val() as IHero;
                resolve(hero);
            }, reject);
        });

        return heroPromise;
    }

    // SubscribeToUpdateHero (onHeroUpdate: (h: IHero) => void){
    //     const heroName = 'Conan';
    //     const refToCollection = ref(this.db, 'heroes/' + heroName);

    //     onValue(refToCollection, 
    //         (data) => {
    //             const hero:IHero = data.val() as IHero;
    //             onHeroUpdate(hero);
    //         });
    // }

    SaveHero(hero: IHero): Promise<void> {
        const refToCollection = ref(this.db, 'heroes/' + hero.name);
        return set(refToCollection, hero);
    }

    KillHero(hero: IHero): void {
        const refToCollection = ref(this.db, 'heroes/' + hero.name);
        remove(refToCollection);
    }
}


// const firebaseConfig = {
//     apiKey: "AIzaSyAfofIX36nawbTwCZdIGOBGq4jqlOvj5M4",
//     authDomain: "tohellandback-9df27.firebaseapp.com",
//     projectId: "tohellandback-9df27",
//     storageBucket: "tohellandback-9df27.appspot.com",
//     messagingSenderId: "683538521009",
//     appId: "1:683538521009:web:b0ee2ee365fb416d38bb90"
// };
// const app = initializeApp(firebaseConfig);