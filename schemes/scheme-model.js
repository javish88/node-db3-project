const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(ids => {
      const [id] = ids;

      return findById(id);
    });
}

function findSteps(schemeId) {
  /*
    select steps.id
    , steps.instructions
    , steps.stepNumber
    , steps.schemeId
    from steps
    join schemes
        on steps.schemeId = schemes.id
    */
  return db("steps as s")
    .select("s.id", "schemes.scheme_name", "s.step_number", "s.instructions")
    .join("schemes", "s.scheme_id", "schemes.id")
    .where("scheme_id", schemeId);
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findById(id) : null));
}

function remove(id) {
  return db("schemes")
    .where("id", id)
    .del();
}
