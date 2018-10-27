const createError = require('http-errors');

import * as Express from 'express';
import router from './api';

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.use('/api', router);

// catch 404 and forward to error handler
app.use(function (next: any) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
