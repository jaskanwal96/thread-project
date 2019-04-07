export class LoginResponse {
    public statusCode: number;
    public message: string;
    public data: loginData;
}

class loginData {
    public _id: string;
    public user_email: string;
    public user_password: string;
    public access_token: string;
}