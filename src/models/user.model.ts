import { novo } from '@deps';

// User Model TS Interface
interface IUserModel {
    _id: string;
    name: string;

    email: string;
    password: string;

    createdAt: string;
    updatedAt: string;
}

// Create the Model instance with the interface
const UserModel = novo.model<IUserModel>("users");

// Then we export it!
export default UserModel;