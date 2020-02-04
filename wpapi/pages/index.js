import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';


const Home = (props) => (
  <div>
      <h1>Wordpress Posts</h1>
      {props.posts.map(post => (
        <li key={post.id}>
          <Link href="/posts/[id]" as={`/posts/${post.id}`}>
            <a dangerouslySetInnerHTML={{
                __html: post.title.rendered
            }}></a>
          </Link>
        </li>
      ))}
  </div>
)

export default Home

Home.getInitialProps = async function() {
    const res = await fetch('http://testsite.local/wp-json/wp/v2/posts');
    const data = await res.json();
  
    return {
      posts: data.map(entry => entry)
    };
}
