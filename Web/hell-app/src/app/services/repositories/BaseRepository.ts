import { filter, from, map, Observable } from "rxjs";
import { deleteDoc, updateDoc, doc, collectionData, Firestore, onSnapshot, DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { collection, setDoc, UpdateData } from '@angular/fire/firestore';
import { getDoc, DocumentSnapshot } from "firebase/firestore";

export abstract class BaseRepository<T> {
    private modelCollection: CollectionReference<T>;

    constructor(private firestore: Firestore) {
        this.modelCollection = collection(this.firestore, this.GetPath()) as CollectionReference<T>;
    }

    protected abstract GetModelKey(model: T): string;

    protected abstract GetPath(): string;

    Get(key: string): Promise<T> {
        const documentReference = doc<T>(this.modelCollection, key);
        return getDoc<T>(documentReference)
            .then(x=> x.data() as T) ;
    }

    Create(model: T): void {
        setDoc(this.GetModelDoc(model), model);
    }

    Update(model: T): void {
        const updateDataModel = model as UpdateData<T>;
        updateDoc(this.GetModelDoc(model), updateDataModel);
    }

    Delete(model: T): void {
        deleteDoc(this.GetModelDoc(model));
    }

    GetAll(): Observable<T[]> {
        return collectionData<T>(this.modelCollection);
    }

    private GetModelDoc(model: T): DocumentReference<T> {
        const key = this.GetModelKey(model);
        return doc<T>(this.modelCollection, key);
    }
}