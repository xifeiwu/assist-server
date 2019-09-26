import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/test.test.ts', () => {
    it('should GET /api/test/connection', async () => {
        console.log(app.config);
        const result = await app.httpRequest().get('/api/test/connection').expect(200);
        assert(result.text === 'hi, egg');
    });
});
