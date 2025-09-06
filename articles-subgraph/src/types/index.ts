export type ArticleTable = {
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
}

export type User = {
    id: string;
    email: string;
    name: string;
    createdAt: string;
};
