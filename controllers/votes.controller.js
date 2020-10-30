/**
* vote - Função que cria uma avaliaçao de um show
*
* @function vote
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const vote = async (parent, args, { shows, votes }) => {
  let votePromise;

  try {
    votePromise = await votes.create(args.vote);
  } catch (err) {
    throw err;
  }

  votePromise = await votePromise
    .populate('show')
    .populate('user')
    .execPopulate();

  try {
    await shows.findOneAndUpdate(
      { _id: votePromise.show._id },
      { $push: { votes: votePromise._id } },
      { new: true },
    );
  } catch (err) {
    throw err;
  }

  return votePromise;
};

/**
* create - Função que cria uma mostra relacionada a atividade
*
* @function create
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const unvote = async (parent, args, { shows, votes }) => {
  let votePromise;

  try {
    votePromise = await votes.findOneAndDelete({ _id: args.vote_id });
  } catch (err) {
    throw err;
  }

  try {
    await shows.findOneAndUpdate(
      { _id: vote.show },
      { $pull: { votes: args.vote_id } },
      { new: true },
    );
  } catch (err) {
    throw err;
  }

  return votePromise;
};

export default {
  vote,
  unvote,
};
