const fetch = require('isomorphic-unfetch');

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' }
    };
    const res = await fetch('http://testsite.local/wp-json/wp/v2/posts');
    const data = await res.json();
    const posts = data.map(entry => entry);

    posts.forEach(post => {
      paths[`/posts/${post.id}`] = { page: '/posts/[slug]', query: { slug: post.id } };
    });

    return paths;
  }
};