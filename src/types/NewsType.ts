export type News = {
    "status": string,
    "totalResults": number,
    "articles": Article[];
}

export type Article = {
    "title": string,
    "author": string,
    "source": {
        "id": string,
        "name": string
    },
    "publishedAt": string,
    "url": string
}
    