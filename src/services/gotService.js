import { Fragment } from "react";

export default class GotService {
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResources(url){
        url = `${this._apiBase}${url}`;
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Could not fetch ${url}, status code ${response.status}`);
        }

        return await response.json();
    }

    async getAllCharacters(){
        const response = await this.getResources('/characters/?page=5');
        return response.map(this._transformCharacter);
    }

    async getCharacter(id){
        const response = await this.getResources(`/characters/${id}`);
        return this._transformCharacter(response);
    }

    _transformCharacter(char){
        moderateChar(char);
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
          }
    }
}

function moderateChar(char) {
    for(let key  in char){
        if(char[key] == null || char[key] == ''){
            char[key] = "it's on the knees of the gods";
        }
    }
    return char;
}