export class Document{
public id: string;

public name: string;

public url: string;

public children: any[];




    constructor (id: string, name: string, url: string, children: any[]){
        this.id = id;
        this.name = name;
        this.url = url;
        this.children = children ;
    }
}