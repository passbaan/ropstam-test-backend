const authRoutes = require('../modules/auth/auth.routes');
const carsRoutes = require('../modules/cars/cars.routes');
const categoriesRoutes = require('../modules/categories/categories.routes');
const { authorize } = require('../middlewares/validateJwt');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  // Require authorization for all calls from below this line
  app.use(authorize);
  app.use('/cars', carsRoutes);
  app.use('/categories', categoriesRoutes);
};
