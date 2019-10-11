const repository = require('repository/TeamRepository');

const TeamController = {
  list(request, response, next) {
    const query = {};

    if (request.query.name) {
      query.name = new RegExp(request.query.name, 'i');
    }
    Promise.all([
      repository.listAsync(query),
      repository.countAsync(query),
    ]).then((data) => {
      response.json({
        items: data[0],
        total: data[1],
      });
    })
      .catch((err) => { next(err); })
      .catch(next);
  },
  getById(request, response, next) {
    const { id } = request.params;
    repository.byId(id, (err, data) => {
      response.json(data);
    });
  },
  create(request, response, next) {
    repository.createAsync(request.body)
    // Caso tivesse mais insert dependente em ordem
    // .then(data => {

    // })
      .then((data) => {
        response.status(201).json(data);
      });
  },
  async update(request, response, next) {
    const { id } = request.params;

    try {
      const data = await repository.updateAsync(id, request.body);
      delete data.lastOp;
      response.json(data);
    } catch (e) {
      next(e);
    }
  },
  delete(request, response, next) {
    const { id } = request.params;

    repository.deleteAsync(id)
      .then((data) => response.sendStatus(204))
      .catch(next);
  },
};

module.exports = TeamController;
