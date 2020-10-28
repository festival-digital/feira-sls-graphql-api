/**
* create - Função que cria uma mostra relacionada a atividade
*
* @function create
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const create = async (parent, args, { shows, activities }) => {
  let show;
  console.log('aquiiii');
  try {
    show = await shows.create(args.show);
  } catch (err) {
    throw err;
  }

  try {
    await activities.findOneAndUpdate(
      { _id: show.activity },
      { $pull: { shows: show._id } },
      { new: true },
    );
  } catch (err) {
    throw err;
  }

  return show;
};

export default {
  create,
};
