import uuid from 'uuid/v1';

export namespace Data {

    export class Item {
        public id: string;
        public date: Date;
        constructor(public title: string, public description: string) {
            this.title = title;
            this.id = uuid();
            this.description = description;
            this.date = new Date();
        }
    }

    export class List {
        public id: string;
        constructor(public title: string, public items: Item[] = []) {
            this.title = title;
            this.id = uuid();
            this.items = items;
        }
    }

}