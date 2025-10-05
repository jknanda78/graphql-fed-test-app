import chalk from "chalk";

const userResolver = (parent: any, args: any, context: any, info: any) => {
    console.log(chalk.bgYellow("articles-subgraph::Article:user::resolver:::"), parent);
    return {
      id: parent.userId,
      email: parent.email,
      createdAt: parent.createdAt,
      name: parent.name,
    };
};

export default userResolver;
