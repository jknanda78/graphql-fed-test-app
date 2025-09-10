import { connection } from "@tools/connection";
import { ArticleTable, Article, Message } from "@articles-subgraph/types";
import { GraphQLError } from "graphql";

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
const getArticleById = async (id: string): Promise<Article|Message> => {
    const article = await getArticlesTable().select().where("articleId", id).first();

    if (article) {
        return {
          id: article.articleId, 
          title: article.title,
          userId: article.userId,
        };
    }

    throw new GraphQLError("Article not found", {
      extensions: {
        code: 'ARTICLE_NOT_FOUND',
      },
    });
};

export default getArticleById;
