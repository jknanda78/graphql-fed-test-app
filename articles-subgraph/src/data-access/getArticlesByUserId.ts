import { connection } from "@tools/connection";
import { AccountType, ArticleTable, Message, User, UserWithArticles } from "@articles-subgraph/types";

/**
 * Returns the articles table from the database connection.
 * @returns The articles table.
 */
const getArticlesTable = () => connection.table<ArticleTable>("article");

/**
 * Fetches an article by its ID.
 * @param id - The ID of the article to fetch.
 * @returns A promise that resolves to the article object or undefined if not found.
 */
const getArticlesByUserId = async (user: User): Promise<UserWithArticles|Message> => {
    const articles = await getArticlesTable().select().where("userId", user.id);

    if (articles.length) {
        return {
            accountType: AccountType.AUTHOR,
            articles: articles.map(a => ({id: a.articleId, title: a.title})),
        };
    }
    return {accountType: user.accountType, articles: []};
};

export default getArticlesByUserId;
