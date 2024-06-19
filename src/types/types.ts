export interface IUser {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    status: 'pending' | 'accepted' | 'rejected';
    role: 'admin' | 'user';
}

export enum EStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

export enum ERole {
    ADMIN = 'admin',
    USER = 'user',
}