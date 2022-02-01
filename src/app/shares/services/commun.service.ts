import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunService {

    constructor() {

    }

    parseText(text: string) {
        if (text != null) {
            if (text.length > 130) {
                return text.substring(0, 127) + '...';
            } else {
                for (let index = text.length; index < 130; index++) {
                   text = text + " \u00a0";//\u00a0 permet de mettre un espace
                }
                return text;
            }
        } else {
            text = "";
            for (let index = 0; index < 130; index++) {
                text = text + " \u00a0";//\u00a0 permet de mettre un espace
            }
            return text;
        }
    }

    parseTextWithLength(text: string, taille: number) {
        console.log("text", text);
        
        if (text != null) {
            let tailleText = text.length;
            if (tailleText > taille) {
                return text.substring(0, (taille-3)) + '...';
            } else {
                for (let index = tailleText; index < taille; index++) {
                   text = text + " \u00a0";//\u00a0 permet de mettre un espace
                }
                return text;
            }
        } else {
            text = "";
            for (let index = 0; index < taille; index++) {
                text = text + " \u00a0";//\u00a0 permet de mettre un espace
            }
            return text;
        }
    }

}
