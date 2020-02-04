import * as React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

export default function PostTemplate(props) {
    return (
        <div>
            <Link href="/"><a>&lt; Home</a></Link>
            <h1 dangerouslySetInnerHTML={{
                __html: props.post.title.rendered
            }}></h1>
            <div
            dangerouslySetInnerHTML={{
                __html: props.post.content.rendered
            }}></div>
        </div>
    )
}

PostTemplate.getInitialProps = async function(ctx) {
    const { slug } = ctx.query
    const res = await fetch(`http://testsite.local/wp-json/wp/v2/posts/${slug}`);
    const post = await res.json();
    return {
      post
    };
}