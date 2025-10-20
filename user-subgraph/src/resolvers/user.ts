import getUserById from "@user-subgraph/datasource/getUserById";

/**
 * Resolver for fetching a single article by its ID.
 *
 * @param {any} parent - The parent resolver result.
 * @param {any} args - The arguments passed to the resolver.
 * @param {any} context - The context shared across all resolvers.
 * @param {any} info - Information about the execution state of the query.
 * @returns {Promise<{}>} - The article data.
 */
const userResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any
): Promise<any> => {
  console.log("user-subgraph:: userResolver:::", args);
  try {
    const user = await getUserById(args.id);
    return {
      error: null,
      data: user,
    };
  } catch (error: any) {
    return {
      error: {
        message: error.message,
        code: error.extensions?.code,
      },
      data: null,
    };
  }
};

export default userResolver;
