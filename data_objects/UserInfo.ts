export class UserInfo {
    private _username: string;
    private _password: string;
    private _pid: string;

    constructor(username: string, password: string, pid: string){
        this._username = username;
        this._password = password;
        this._pid = pid;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    } 

    get pid(): string {
        return this._pid;
    }

    set pid(value: string) {
        this._pid = value;
    } 

}