class ResponseHelper {
  constructor(res) {
    this.res = res;
  }

  fieldsError(error, extras = null) {
    this.res.status(400)
      .json({
        error,
        extras,
      });
  }

  created(createdItem = null) {
    this.res.status(201)
      .json(createdItem);
  }

  updated(message = 'Resource Updated', updatedItem = null) {
    this.res.status(200)
      .json({
        status: 'Updated',
        message,
        updated: updatedItem,
      });
  }

  deleted(deletedItem = null) {
    this.res.status(200)
      .json(deletedItem || {});
  }

  notAuthorized(message = 'This endpoint requires a valid auhtorization token.') {
    this.res.status(403)
      .json({
        status: 'Not Authorized.',
        error: [{
          message,
        }],
      });
  }

  notFound(message = 'path not found') {
    this.res.status(404)
      .json({
        status: 'Not found',
        message,
        error: [
          { message },
        ],
      });
  }

  success(data = null) {
    this.res.status(200)
      .json(data || {});
  }
}
module.exports = (res) => {
  const responseHelper = new ResponseHelper(res);
  return responseHelper;
};
