import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class HeaderService {
  
    private headerTitleSubject        = new Subject<string>();
    private headerTitleLeftSubject    = new Subject<string>();
    private headerTitleCenterSubject  = new Subject<string>();

    private headerActionButtonsSubject        = new Subject<boolean>();
    private headerActionButtonsDoneSubject    = new Subject<boolean>();

    private headerActionButtonDoneClickedSubject    = new Subject<boolean>();
    private headerActionButtonCloseClickedSubject    = new Subject<boolean>();

    private headerIconSubject          = new Subject<string>();    
    private headerMenuButtonSubject    = new Subject<boolean>();
    
    private showLoginMenuOptionSubject    = new Subject<boolean>();
    private hideLoginMenuOptionSubject    = new Subject<boolean>();

    private darkThemeSubject = new Subject<boolean>();
    private _darkTheme        = false;
    
    constructor() { }

    setDarkTheme( useDarkTheme: boolean ):void {

        this.darkThemeSubject.next( useDarkTheme );
        this._darkTheme = useDarkTheme;

    }

    get darkTheme():boolean {

        return this._darkTheme;

    }

    onSetDarkTheme():Subject<boolean> {

        return this.darkThemeSubject;

    }

    headerActionButtonCloseClicked( show: boolean ){

        this.headerActionButtonCloseClickedSubject.next( show );

    }

    onHeaderActionButtonCloseClicked(){

       return this.headerActionButtonCloseClickedSubject;

    }

    headerActionButtonDoneClicked( show: boolean ){

        this.headerActionButtonDoneClickedSubject.next( show );

    }

    onHeaderActionButtonDoneClicked(){

       return this.headerActionButtonDoneClickedSubject;

    }

    showHeaderActionButtons( show: boolean ){

        this.headerActionButtonsSubject.next( show );

    }

    onShowHeaderActionButtons(){

       return this.headerActionButtonsSubject;

    }
    
    showHeaderActionButtonsDone( show: boolean ){

        this.headerActionButtonsDoneSubject.next( show );

    }

    onShowHeaderActionButtonsDone(){

       return this.headerActionButtonsDoneSubject;

    }
    
    setTitleLeft(title: string) {
    
        this.headerTitleLeftSubject.next( title );
    
    }

    onSetTitleLeft() {
        
            return this.headerTitleLeftSubject;
            
    }

    setTitleCenter(title: string) {
    
        this.headerTitleCenterSubject.next( title );
    
    }
    
    onSetTitleCenter() {
    
        return this.headerTitleCenterSubject;
        
    }
        
    setIcon(icon: string) {
    
        this.headerIconSubject.next(icon);
    
    }
    
    onSetIcon() {
    
        return this.headerIconSubject;
    
    }
    
    showMenuButton() {
    
        this.headerMenuButtonSubject.next( false );
    
    }
    
    onShowMenuButton() {
    
        return this.headerMenuButtonSubject;
    
    }
    
    hideMenuButton() {
    
        this.headerMenuButtonSubject.next( true );
    
    }
    
    onHideMenuButton() {
    
        return this.headerMenuButtonSubject;
    
    }
    
    hideMenuButtonAdminArea() {
        
    }
    
    onHideMenuButtonAdminArea() {
    
    }
    
    showLoginMenuOption() {
    
        this.showLoginMenuOptionSubject.next( true );
    
    }
    
    onShowLoginMenuOption() {
    
        return this.showLoginMenuOptionSubject;
        
    }
    
    hideLoginMenuOption() {
    
        this.hideLoginMenuOptionSubject.next( true );
    
    }
    
    onHideLoginMenuOption() {
        
        return this.hideLoginMenuOptionSubject;
    
    }
    
}