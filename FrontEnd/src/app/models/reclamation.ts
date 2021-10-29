export class Reclamation {
    constructor(
        public id: number,
        public type: string,
        public description: string,
        public status: string,
        public date_creation: Date){}
}