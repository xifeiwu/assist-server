import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/api/test/connection', controller.test.connection);
  router.all('/api/test/echo', controller.test.echo);
  router.all('/api/test/proxy', controller.test.proxy);
  router.all('/api/test/error', controller.test.error);
};
