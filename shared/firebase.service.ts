import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import * as firebase from "firebase";

@Injectable()
export class FirebaseService {

    private fbUrl = 'https://scenario-bf22a.firebaseio.com/';

    private itemsRef: AngularFireList<any>;

    messaging = firebase.messaging();
    currentMessage = new BehaviorSubject(null)
    
    constructor( 
        private firebaseApp: FirebaseApp, 
        private db: AngularFireDatabase, 
        private http: Http,
        private angularFireAuth: AngularFireAuth
     ) {}
    
    getScenarios(): Observable<any> {
    
        return this.db.list('/').valueChanges()
            .map( response => response );
    
    }
    
    getScenario( scenarioId ): Observable<any> {
    
        return this.http.get('https://scenario-bf22a.firebaseio.com/' + scenarioId + '.json')
            .map( responce => responce.json() );
        
    }

    addFrame( frame: any, scenarioKey: number, sceneKey: number ): any {

        let framesRef = this.db.list('/Laura/scenes/scene1/frames');
        return framesRef.push( frame );

    }
    
    public getActivities(): Observable<any> {
    
        return this.http.get('https://api.github.com/users/jlooper/events').map( res => res.json() );
    
    }    
    
    initCloudMessages(): void {

       // let messaging = fb.messaging();

       this.messaging.requestPermission().then( () => {
           console.log( 'request enabled' );
           let token = this.messaging.getToken();
           console.log( token );
           return token;
       }).catch( ( err ) => {console.log( err );}  );

/*         this.messaging.requestPermission().then( function(){
        
            console.log( 'request enabled' );

            return this.messaging.getToken()
        
        })
        .then( token => {
            console.log( token );
            this.updateToken( token );
        })
        .catch(function( err ){
        
            console.log( 'request permission error', err  );
        
        }); */
        
    }

    receiveMessage() {

        this.messaging.onMessage((payload) => {
         console.log("Message received. ", payload);
         this.currentMessage.next(payload)
       });

     }

    updateToken(token) {

        console.log( 'Update Token' );

        this.angularFireAuth.authState.take(1).subscribe(user => {
          if (!user) return;
          const data = { [user.uid]: token }
          this.db.object('fcmTokens/').update(data)
        })
      }
    
}
