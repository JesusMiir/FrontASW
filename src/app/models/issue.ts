export class Issue{
    constructor(
        public id: number,
        public idUserCreator: number,
        public idUserAsignee: number,
        public title: string,
        public description: string,
        public status: string,
        public type: string,
        public priority: string,
        public votes: number,
        public creationDate: Date,
        public updateDate: Date
    ){}
}