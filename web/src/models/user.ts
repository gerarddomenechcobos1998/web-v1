
class User {
    // define Props with interface
    email: string;
    token: string;
    type: string;
    status: string;
    
    constructor(email: string, token: string, type: string, status: string) {
        this.email = email;
        this.token = token;
        this.type = type;
        this.status = status;
    }
    // Creates new User object
    load(data: any): User {
        return new User(data.email, data.token, data.type, data.status);
    }
    // Creates an object given the data
    toObject(): any {
        return { email: this.email, type: this.type, status: this.status };
    }
    // Check if it is empty user
    isEmpty(): boolean {
        return this.email == undefined;
    }
}
export default User;