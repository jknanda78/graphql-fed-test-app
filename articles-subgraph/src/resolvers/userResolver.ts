import chalk from 'chalk';
const mapper = (user: any) => {
  console.log(chalk.bgBlue('articles-subgraph::Article:user::mapper:::'), user);
  return user.email;
};

const userResolver = (parent: any, args: any, context: any, info: any) => {
  console.log(chalk.bgYellow('articles-subgraph::Article:user::resolver:::'), parent);
  return {
    __typename: 'User',
    id: parent.userId,
    email: parent.emailId,
  };
};

export default userResolver;
