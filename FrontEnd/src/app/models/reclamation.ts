export class Reclamation {
    constructor(
        public id: string,
        public type: string,
        public description: string,
        public status: string,
        public date_creation: Date,
        public user_id:number,
        public user : string){}
}