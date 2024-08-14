import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { Subscription } from 'rxjs';
import { default as MenuData } from '../../assets/data/menu.json';
import { MenuService } from './menu.service';
//import { AppConfig } from '../../domain/appconfig';
//import { AppConfigService } from '../../service/appconfigservice';
import { CommonModule } from '@angular/common';
export interface MenuItem {
    name?: string;
    icon?: string;
    privilege?:number[];
    children?: MenuItem[];
    routerLink?: string;
    href?: string;
}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    providers:[MenuService]
})
export class AppMenuComponent {
    @Input() active: boolean;

    menu!: MenuItem[];

    //config!: AppConfig;

    subscription!: Subscription;

    constructor(private menuService: MenuService, 
        private el: ElementRef, private router: Router) {
        //this.menu = MenuData.data;
       
        //this.config = this.configService.config;
        //this.subscription = this.configService.configUpdate$.subscribe((config) => (this.config = config));
    }

    ngOnInit() {
        this.menuService.readMenu().subscribe({
            next: (rst:any) => {  
              this.menu= rst.data
              //console.log("uuu"+this.menu)
          },
          error:(error)=>{
            //console.log(JSON.stringify("erroe" + error))
            //this.errorbackend=true
            this.menu=[]
          }})
      
        setTimeout(() => {
            this.scrollToActiveItem();
        }, 1);
    }

    scrollToActiveItem() {
        let activeItem = DomHandler.findSingle(this.el.nativeElement, '.router-link-active');
        if (activeItem && !this.isInViewport(activeItem)) {
            activeItem.scrollIntoView({ block: 'center' });
        }
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && 
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) 
        && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
