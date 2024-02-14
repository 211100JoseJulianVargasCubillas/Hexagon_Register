export class Status {
    public activationToken: string;
    public verifiedAt; 

    constructor(activationToken: string, verifiedAt:Date) {
        this.activationToken = activationToken;
        this.verifiedAt = verifiedAt;
        
    }
}
