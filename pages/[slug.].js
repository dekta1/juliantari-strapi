import { GET_ALL_SLUGS } from '@/graphql/query'
import React from 'react'
import { ApolloClient,InMemoryCache } from '@apollo/client'
    const client = new ApolloClient ({
        uri:"http://127.0.0.1:1337/graphql",
        cache: new InMemoryCache()
        
        })

export default function post({post}) {
  return (
    <div>
        <h1>{post.Title}</h1>
        <p>{post.Content}</p>
    </div>
  )
}

export async function getStaticPaths() {
    const { data } = await client.query({query:GET_ALL_SLUGS});
    const paths = data.blogPosts.data.map((post) => {
        return { params: {Slug: post.attributes.Slug}}
    });


    return{
        paths,
        fallback: false
    }

}

export async function getStaticProps({ params }) {
    const { data } = await client.query({
        query: GET_INDIVIDUAL_POST,
        variables: {urlSlug: params.Slug}
    });

    const attrs = data.blogPosts.data[0].attributes;
    
    return {
        props: {
            post: {
                Title: attrs.Title,
                Content: attrs.Content
            }
        }
    }

}

// return{
//     props: {
//         posts: data.blogPosts.data
//     }
// }