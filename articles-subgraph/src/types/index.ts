export type ArticleTable = {
    userId: string;
    articleId: string;
    title: string;
}

export type Message = {
    msg: string;
    error: boolean;
    code: string;
};

export type Article = {
    id: string;
    title: string;
    userId: string;
}

export type User = {
    id: string;
    email: string;
    name: string;
    createdAt: string;
};

export type UserWithArticles = {
    articles: Article[];
};
