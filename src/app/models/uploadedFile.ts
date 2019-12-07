export class uploadedFile{
    constructor(
        public id: number,
        public idIssue: number,
        public name: string,
        public contentType: File
    ){}
}