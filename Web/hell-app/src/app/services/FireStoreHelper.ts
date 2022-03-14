import { IHero } from "../models/IHero";
import { Injectable } from '@angular/core';
import { filter, from, map, Observable } from "rxjs";
import { deleteDoc, updateDoc, doc, collectionData, Firestore, onSnapshot, DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { collection, setDoc } from '@angular/fire/firestore';
import { IHeroV2 } from "../models/IHeroV2";

@Injectable({
    providedIn: 'root'
})

export class FireStoreHelper {
    private heroCollection: CollectionReference<IHeroV2>;

    constructor(private firestore: Firestore) {
        this.heroCollection = collection(this.firestore, '/heroes') as CollectionReference<IHero>;
    }

    CreateHero(hero: IHero): void {
        console.log('Start creating hero + ' + hero);
        const heroV2: any = { ...hero };
        delete heroV2.maze;

        setDoc(this.getHeroDoc(hero.name), heroV2);
    }

    SaveHero(hero: IHeroV2): void {
        updateDoc(this.getHeroDoc(hero.name), hero);
    }

    KillHero(heroName: string): void {
        deleteDoc(this.getHeroDoc(heroName));
    }

    getAllHeroes(): Observable<IHeroV2[]> {
        const data = collectionData<IHeroV2>(this.heroCollection);
        return data;
    }

    private getHeroDoc(heroName: string): DocumentReference<IHeroV2> {
        return doc<IHeroV2>(this.heroCollection, heroName);
    }
}