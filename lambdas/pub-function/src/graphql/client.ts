import {ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.URL!,
    cache: new InMemoryCache(),
});