import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { BaseRepository } from "./BaseRepository";
import { IHero } from 'src/app/models/IHero';

@Injectable({
    providedIn: 'root'
})

export class HeroRepository extends BaseRepository<IHero> {
    constructor(firestore: Firestore) {
        super(firestore);
    }

    protected GetModelKey = (model: IHero): string => model.name;

    protected GetPath = (): string => '/heroes';
}