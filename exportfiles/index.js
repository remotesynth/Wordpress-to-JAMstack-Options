const fetch = require('isomorphic-unfetch');
const TurndownService = require('turndown');
const yaml = require('js-yaml');
const fs = require('fs');
const turndownService = new TurndownService();


fetch('http://testsite.local/wp-json/wp/v2/posts')
    .then( r => r.json() )
    .then( posts => {
        posts.forEach(post => {
            let frontmatter = {
                title: turndownService.turndown(post.title.rendered),
                date: post.date,
                slug: post.slug
            }
            let postContents = '---\n' + yaml.safeDump(frontmatter);
            postContents += '---\n' + turndownService.turndown(post.content.rendered);
            fs.writeFileSync(`posts/${post.slug}.md`, postContents, 'utf8');
        })
    });