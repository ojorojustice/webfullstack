export class Document{
public id: string;

public name: string;

public url: string;

public children: Document[];


    constructor (id: string, name: string, url: string, children: Document[]){
        this.id = id;
        this.name = name;
        this.url = url;
        this.children = children ;
    }
}