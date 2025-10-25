export type ArticleTable = {
  userId: string;
  emailId: string;
  articleId: string;
  title: string;
};

export type ReviewTable = {
  reviewId: string;
  articleId: string;
  rating: number;
  comments: string;
};

export type Message = {
  msg: string;
  error: boolean;
  code: string;
};

export type Article = {
  id: string;
  title: string;
  user: User;
  reviews: Review[];
};

export type User = {
  id: string;
  email: string;
  name?: string;
  createdAt?: string;
};

export type UserWithArticles = {
  articles: Article[];
};

export type Review = {
  id: string;
  rating: number;
  comments: string;
};
