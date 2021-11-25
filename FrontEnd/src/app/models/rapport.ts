export class Reclamation {
    constructor(
        public id: string,
        public type: string,
        public description: string,
        public status: string,
        public date_creation: Date,
        public userid: number,
        public user : string){}
}