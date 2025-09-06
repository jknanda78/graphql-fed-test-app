import { connection } from "@tools/connection";
import { ArticleTable, Message } from "@articles-subgraph/types";

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
const getArticleById = async (id: string): Promise<ArticleTable|Message> => {
    const article = await getArticlesTable().where("userId", id);

    if (article) {
        return article;
    }

    return {msg: "Article not found", error: true, code: "ARTICLE_NOT_FOUND"};
};

export default getArticleById;
