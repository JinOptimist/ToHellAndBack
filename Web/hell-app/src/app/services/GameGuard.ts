import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { HeroRepository } from "./repositories/HeroRepository";

@Injectable({
    providedIn: 'root'
 })

 export class GameGuard implements CanActivate {
    
    constructor(private heroRepository:HeroRepository){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            //TODO
            return true;
    }
 }