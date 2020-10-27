/**
* create - Função que cria uma duvida sobre a plataforma na base de dados.
*
* @function create
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const create = (parent, args, { FAQQuestions }) => FAQQuestions.create(args.FAQQuestion)
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

export default {
  create,
};
