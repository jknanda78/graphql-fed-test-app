import { connection } from '@tools/connection';
import { ArticleTable, Article, ReviewTable, Review, Message } from '@articles-subgraph/types';
import { GraphQLError } from 'graphql';

/**
 * Returns the articles table from the database connection.
 * @returns The articles table.
 */
const getArticlesTable = () => connection.table<ArticleTable>('article');
const getReviewsTable = () => connection.table<ReviewTable>('review');

/**
 * Fetches an article by its ID.
 * @param id - The ID of the article to fetch.
 * @returns A promise that resolves to the article object or undefined if not found.
 */
const getArticleById = async (id: string): Promise<Article | Message> => {
  const article = await getArticlesTable().select().where('articleId', id).first();
  console.log({article});
  if (article) {
    const reviewsByArticleId = await getReviewsTable().select().where('articleId', id);
    return {
      id: article.articleId,
      title: article.title,
      user: {
        id: article.userId,
        email: article.emailId,
      },
      reviews: reviewsByArticleId?.map(r => ({
        id: r.reviewId,
        rating: r.rating,
        comments: r.comments,
      })) || [],
    };
  }

  throw new GraphQLError('Article not found', {
    extensions: {
      code: 'ARTICLE_NOT_FOUND',
    },
  });
};

export default getArticleById;
