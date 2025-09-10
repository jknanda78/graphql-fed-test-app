import { connection } from "@tools/connection";
import { ArticleTable, Article, Message } from "@articles-subgraph/types";

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
const getArticlesByUserId = async (id: string): Promise<Article[]|Message> => {
    const articles = await getArticlesTable().select().where("userId", id);

    if (articles.length) {
        return articles.map(a => ({id: a.articleId, title: a.title, userId: a.userId}));
    }
    return [];
};

export default getArticlesByUserId;
