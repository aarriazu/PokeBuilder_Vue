export class User {
    id: number;
    username: string;
    password: string;
    profilePic: string;
    email: string;
    createdAt: Date;
    lastLogin: Date;

    constructor(id: number, username: string, password: string, email: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.profilePic = "";
        this.createdAt = new Date();
        this.lastLogin = new Date();
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
        return this.lastLogin;
    }
    set setUpdatedAt(updatedAt: Date) { 
        this.lastLogin = updatedAt;
    }

    get getProfilePic(): string {
        return this.profilePic;
    }
    
    set setProfilePic(profilePic: string) {
        this.profilePic = profilePic;
    }
}