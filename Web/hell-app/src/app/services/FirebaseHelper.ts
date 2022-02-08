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
        return get(refToCollection).then(x => x.val() as IHero);;
    }

    SaveHero(hero: IHero): Promise<void> {
        const refToCollection = ref(this.db, 'heroes/' + hero.name);
        const heroToSave = <IHero>{
            coins: hero.coins,
            name: hero.name,
            stamina: hero.stamina,
            maxStamina: hero.maxStamina,
            maze: hero.maze
        };
        // const heroToSave:IHero = {...hero};
        return set(refToCollection, heroToSave);
    }

    KillHero(heroName: string): void {
        const refToCollection = ref(this.db, 'heroes/' + heroName);
        remove(refToCollection);
    }

    GetAllHeroes(): Promise<IHero[]> {
        const refToCollection = ref(this.db, 'heroes');
        return get(refToCollection)
            .then(data => {
                const heroesAsObject = data.val();
                return Object.keys(heroesAsObject)
                    .map(name => heroesAsObject[name]) as IHero[];
            });
    }
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

// const firebaseConfig = {
//     apiKey: "AIzaSyAfofIX36nawbTwCZdIGOBGq4jqlOvj5M4",
//     authDomain: "tohellandback-9df27.firebaseapp.com",
//     projectId: "tohellandback-9df27",
//     storageBucket: "tohellandback-9df27.appspot.com",
//     messagingSenderId: "683538521009",
//     appId: "1:683538521009:web:b0ee2ee365fb416d38bb90"
// };
// const app = initializeApp(firebaseConfig);