export class Comment{
    constructor(
        public id: number,
        public idUser: number,
        public idIssue: number,
        public text: string
    ){}
}