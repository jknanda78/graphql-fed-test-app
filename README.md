# graphql-fed-test-app
Graphql federation application

## Prerequisites
- Install router inside router folder `curl -sSL https://router.apollo.dev/download/nix/v1.46.0 | sh`

## Run
- `npm run start:explorer`
    - This will start the router and subgraphs
    - https://studio.apollographql.com/graph/WWW-Articles/variant/current/explorer
    - Sample query
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
- `npm run publish:all`
    - This will publish the subgraphs to apollo studio