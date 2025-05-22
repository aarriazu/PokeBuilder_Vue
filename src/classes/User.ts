export class User {
    id: number;
    username: string;
    password: string;
    profilePicture: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, username: string, password: string, email: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.profilePicture = "";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    get getId(): number {
        return this.id;
    }
    
    get getUsername(): string {
        return this.username;
    }
    set setUsername(username: string) {
        this.username = username;
    }
    
    get getPassword(): string {
        return this.password;
    }

    set setPassword(password: string) {
        this.password = password;
    }
    
    get getEmail(): string {
        return this.email;
    }
    
    get getCreatedAt(): Date {
        return this.createdAt;
    }
    
    get getUpdatedAt(): Date {
        return this.updatedAt;
    }
    set setUpdatedAt(updatedAt: Date) { 
        this.updatedAt = updatedAt;
    }

    get getProfilePicture(): string {
        return this.profilePicture;
    }
    
    set setProfilePicture(profilePicture: string) {
        this.profilePicture = profilePicture;
    }
}