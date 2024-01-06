function paginateResults({ model, where, order, page, limit }) {
  const offset = (page - 1) * limit;
  return model
    .findAndCountAll({
      where,
      order,
      limit,
      offset,
    })
    .then((data) => {
      const totalCount = data.count;
      const results = data.rows;
      return { offset, totalCount, results };
    });
}

module.exports = { paginateResults };
