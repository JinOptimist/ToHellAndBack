import { IHero } from "../models/IHero";
import { Injectable } from '@angular/core';
import { Action } from "rxjs/internal/scheduler/Action";
import { filter, from, map, Observable } from "rxjs";

import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class FirebaseHelper {
    constructor(private firestore: Firestore) { }



    GetHeroAsync(heroName: string): Promise<IHero> {
        // const refToCollection = ref(this.db, 'heroes/' + heroName);
        // return get(refToCollection).then(x => x.val() as IHero);
        return {} as Promise<IHero>;
    }

    SaveHero(hero: IHero): Promise<void> {
        const collectionHeroes = collection(this.firestore, 'heroes');
        
        // const refToCollection = ref(this.db, 'heroes/' + hero.name);
        // return set(refToCollection, hero);
        return {} as Promise<void>;
    }

    KillHero(heroName: string): void {
        // const refToCollection = ref(this.db, 'heroes/' + heroName);
        // remove(refToCollection);
    }

    getAllHeroes(): Observable<IHero[]> {
        const collectionHeroes = collection(this.firestore, 'heroes');
        const data = collectionData(collectionHeroes);
        //const a = data.pipe(map(x => x.map(z => z.val())))
        const answer = data as Observable<IHero[]>;
        return answer;
    }

    // GetAllHeroes(): Promise<IHero[]> {
    //     const refToCollection = ref(this.db, 'heroes');
    //     return get(refToCollection)
    //         .then(data => {
    //             const heroesAsObject = data.val();
    //             return Object.keys(heroesAsObject)
    //                 .map(name => heroesAsObject[name]) as IHero[];
    //         });
    // }
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