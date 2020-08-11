export default class GotService {
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResources = async (url) => {
        url = `${this._apiBase}${url}`;
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Could not fetch ${url}, status code ${response.status}`);
        }

        return await response.json();
    }

    getAllCharacters = async () => {
        const response = await this.getResources('/characters/?page=5');
        return response.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const response = await this.getResources(`/characters/${id}`);
        return this._transformCharacter(response);
    }

    getBook = async (id) => {
        const response = await this.getResources(`/books/${id}`);
        return this._transformBook(response);
    }

    getBooks = async () => {
        const response = await this.getResources(`/books/`);
        return response.map(this._transformBook);
    }

    getHouse = async (id) => {
        const response = await this.getResources(`/houses/${id}`);
        return this._transformHouse(response);
    }

    getHouses = async () => {
        const response = await this.getResources(`/houses/`);
        return response.map(this._transformHouse);
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        moderateData(char);
        return {
            id: this._extractId(char),
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
          }
    }

    _transformBook = (book) => {
        moderateData(book);
        return {
            id: this._extractId(book),
            name: book.name,
            authors: book.authors,
            publisher: book.publisher,
            numberOfPages: book.numberOfPages,
            released: book.released,
        }
    }

    _transformHouse = (house) => {
        moderateData(house);
        return {
            id: this._extractId(house),
            name: house.name,
            titles: house.titles,
            region: house.region,
            seats: house.seats,
        }
    }
}

function moderateData(char) {
    for(let key  in char){
        if(char[key] == null || char[key] == ''){
            char[key] = "it's on the knees of the gods";
        }
    }
    return char;
}