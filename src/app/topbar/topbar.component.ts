import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
//import docsearch from '@docsearch/js';
import { Subscription } from 'rxjs';
//import Versions from '../data/versions.json';
import { AppConfig } from '../domain/appconfig';
import { AppConfigService } from '../service/appconfigservice';


import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'
import { MenuItem } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    animations: [
        trigger('overlayMenuAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('.12s cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1, transform: '*' }))]),
            transition(':leave', [animate('.1s linear', style({ opacity: 0 }))])
        ])
    ],
    providers:[TranslatePipe]
})
export class TopBarComponent implements OnInit, OnDestroy {
    @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

    @ViewChild('topbarMenu') topbarMenu: ElementRef;

    @ViewChild('containerElement') containerElement: ElementRef;

    activeMenuIndex: number;

    outsideClickListener: any;

    config: AppConfig;

    subscription: Subscription;

    //versions: any[] = Versions;

    scrollListener: any;
    items: MenuItem[];

    currentuser:User=new User()

    constructor(private translatePipe: TranslatePipe,private router: Router, private configService: AppConfigService,private tokenService:TokenStorageService) {
        this.currentuser=this.tokenService.getUser();
         this.items = [
            {
                label: this.translatePipe.transform('Déconnecter'),
                icon: 'pi pi-power-off',
                command: () => {
                    this.disconnect();
                }
            }
        ];

    }

    disconnect() {
        this.tokenService.signOut();
        this.router.navigate(["/"]);
    }

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe((config) => (this.config = config));

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.activeMenuIndex = null;
            }
        });

        this.bindScrollListener();
        // this.initDocSearch();
    }

    /*initDocSearch() {
        docsearch({
            appId: 'XG1L2MUWT9',
            apiKey: '6057fe1af77fee4e7e41907b0b3ec79d',
            indexName: 'primeng',
            container: '#docsearch'
        });
    }*/

    bindScrollListener() {
        if (!this.scrollListener) {
            this.scrollListener = () => {
                if (window.scrollY > 0) {
                    this.containerElement.nativeElement.classList.add('layout-topbar-sticky');
                } else {
                    this.containerElement.nativeElement.classList.remove('layout-topbar-sticky');
                }
            };
        }

        window.addEventListener('scroll', this.scrollListener);
    }

    onMenuButtonClick(event: Event) {
        this.menuButtonClick.emit();
        event.preventDefault();
    }

    onConfigButtonClick(event: Event) {
        console.log("jkhkj")
        this.configService.toggleConfig();
        event.preventDefault();
    }

    changeTheme(event: Event, theme: string, dark: boolean) {
        this.configService.updateConfig({ ...this.config, ...{ theme, dark } });
        this.activeMenuIndex = null;
        event.preventDefault();
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = (event) => {
                if (this.isOutsideTopbarMenuClicked(event)) {
                    this.activeMenuIndex = null;
                }
            };

            document.addEventListener('click', this.outsideClickListener);
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }

    unbindScrollListener() {
        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener);
            this.scrollListener = null;
        }
    }

    toggleMenu(event: Event, index: number) {
        this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
        event.preventDefault();
    }

    isOutsideTopbarMenuClicked(event): boolean {
        return !(this.topbarMenu.nativeElement.isSameNode(event.target) || this.topbarMenu.nativeElement.contains(event.target));
    }

    onOverlayMenuEnter(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.bindOutsideClickListener();
                break;

            case 'void':
                this.unbindOutsideClickListener();
                break;
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.unbindScrollListener();
    }
}
