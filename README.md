# graphql-fed-test-app

Graphql federation application

## Prerequisites

- Install router inside router folder `curl -sSL https://router.apollo.dev/download/nix/v1.46.0 | sh`

## Run

- `npm run start:explorer`
  - This will start the router and subgraphs
  - https://studio.apollographql.com/graph/WWW-Articles/variant/current/explorer
  - Sample query - Gateway

  ```graphql
  query getUserDetails($userId: ID!) {
    user(id: $userId) {
      articles {
        id
        title
      }
      createdAt
      email
      id
      name
    }
  }
  ```

  - Variables

  ```json
  {
    "userId": "902bb37b-a002-4f4f-b3f2-97bda6db3de8"
  }
  ```

  - Sample query - Testing `__resolveReference` in `User` subgraph

  ```graphql
  query _entities($representations: [_Any!]!) {
    _entities(representations: $representations) {
      ... on User {
        id
        email
        name {
          firstName
          lastName
        }
        createdAt
      }
    }
  }
  ```

  - Variables

  ```json
  {
    "representations": [
      {
        "__typename": "User",
        "id": "902bb37b-a002-4f4f-b3f2-97bda6db3de8"
      }
    ]
  }
  ```

  - Sample query - Gateway

  ```graphql
  query getArticle($articleId: ID!) {
    article(articleId: $articleId) {
      id
      title
      user {
        id
        email
      }
    }
  }
  ```

  ```graphql
  query Article($articleId: ID!) {
    article(articleId: $articleId) {
      data {
        id
        title
        user {
          email
          id
        }
      }
      error {
        code
        message
      }
    }
  }
  ```

  - Variables

  ```json
  {
    "articleId": "e8bc0cb2-a22d-49dc-857e-fc824ed3710e"
  }
  ```

- `npm run publish:all`
  - This will publish the subgraphs to apollo studio
