export interface IUser {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    status: 'pending' | 'accepted' | 'rejected';
    role: 'admin' | 'user';
}
