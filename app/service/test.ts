import { Service } from 'egg';

export default class TestService extends Service {
    sayHi(content: string) {
        return `hi, ${content}`;
    }
}