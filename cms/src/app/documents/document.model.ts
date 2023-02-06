export class Document{
    public id: string;

public name: string;

public children: any[];

public url: string;




    constructor (id:string, name:string,children:any[], url:string){
        this.id = id;
        this.name = name;
        this.children = children ;
        this.url = url;
    }
}