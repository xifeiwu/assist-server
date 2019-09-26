import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // router.all('*', controller.home.index);

  router.get('/api/test/connection', controller.test.connection);
  router.get('/api/test/info', controller.test.info);
  router.all('/api/test/echo', controller.test.echo);
  router.all('/api/test/proxy', controller.test.proxy);
  router.all('/api/test/error', controller.test.error);

  router.post('/api/paas/terminal/get-token', controller.paas.token4Terminal);
  router.post('/api/cas/service-validate', controller.paas.casIndentify);
  router.post('/api/paas/cas-identify', controller.paas.casIndentify);
};
