export namespace Data {

    export class Item {
        constructor(public title: string, public description: string, public date?: Date) {
            this.title = title;
            this.description = description;
            this.date = date || new Date();
        }
    }

    export class List {
        constructor(public title: string, public items: Item[] = []) {
            this.title = title;
            this.items = items;
        }
    }

}