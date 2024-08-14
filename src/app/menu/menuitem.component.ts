import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './menu.component';
import { MenuService } from './menu.service';

@Component({
    selector: '[app-menuitem]',
    templateUrl: './menuitem.component.html',
    providers:[MenuService]
})
export class AppMenuItemComponent {
    @Input() item: MenuItem;

    @Input() root: boolean = true;

    constructor(private router: Router,private menuService:MenuService) {}

    ngOnInit(): void {
        //console.log(JSON.stringify(this.menuService.currentuser))
    }

    CheckUserPrivilege(privilege:number[]){
        if (privilege.length==0) 
            return true
        else if (privilege.includes(this.menuService.currentuser.profilRecId))
            return true
        else
            return false
    }

    isActiveRootMenuItem(menuitem: MenuItem): boolean {
        const url = this.router.url.split('#')[0];
        return menuitem.children && 
        !menuitem.children.some((item) => item.routerLink === `${url}` 
        || (item.children && item.children.some((it) => it.routerLink === `${url}`)));
    }
}
