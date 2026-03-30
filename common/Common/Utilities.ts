export class Utilities {
    public static getRandomEmail(): string {
        const randomStr = Utilities.getRandomString(6)
        return 'user' + randomStr + '@sharklasers.com';
    }

    public static getRandomString(length: number): string {
        const characters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    public static getEmailName(email: string): string {
        return email.split('@')[0];
    }
}