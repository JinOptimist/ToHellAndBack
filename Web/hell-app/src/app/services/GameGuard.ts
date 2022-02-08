import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { HeroService } from "./maze/HeroService";

@Injectable({
    providedIn: 'root'
 })

 export class GameGuard implements CanActivate {
    
    constructor(private heroService:HeroService){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            return !!this.heroService.GetCurrentHero();
    }
 }