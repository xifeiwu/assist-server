import { app, mock, assert } from 'egg-mock/bootstrap';

describe('test/app/controller/test.test.ts', () => {
    it('should GET /api/test/connection', async () => {
        const result = await app.httpRequest().get('/api/test/connection').expect(200);
        assert(result.text === 'hi, egg');
    });
});
