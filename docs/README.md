React Coroutine is a small library which leverages the power of modern JavaScript to provide seamless way in creating stateful components with different purposes.

This library just use a coroutine as a React component. No API to learn and keep up to date, no additional workflows or blackboxes to worry about.

## Install

Use [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) to install the library from NPM [registry](https://www.npmjs.com/package/react-coroutine).

    npm install react-coroutine

## Usage

    import React from 'react';
    import Coroutine from 'react-coroutine';
    import Posts from 'PostAPI';
    import PostList from 'PostList.react';

    async function PostListCo() {
      try {
        const posts = await Posts.retrieve();
        return <PostList posts={posts} />;
      } catch (error) {
        return <p>Unable to fetch posts.</p>;
      }
    }

    export default Coroutine.create(PostListCo);

## Requirements

If your project uses tools like [Babel](babeljs.io/) for code compilation, make sure your configuration supports `async`/`await` syntax (for async functions or generators). Plugins like [transform-async-to-generator](https://babeljs.io/docs/plugins/transform-async-to-generator/) and [transform-async-generator-functions](https://babeljs.io/docs/plugins/transform-async-generator-functions/) can help you with it and they might be already a part of presets your configuration uses.

## License

React Coroutine licensed under [the MIT](https://github.com/alexeyraspopov/react-coroutine/blob/master/LICENSE).

The MIT License places almost no restrictions on what you can do with this lib. You are free to use it in commercial projects as long as the copyright is left intact.

## Credits

Amazing [awsm.css](https://igoradamenko.github.io/awsm.css) built by [Igor Adamenko](https://igoradamenko.com/) was used for making the website.

Code examples use [FiraCode](https://github.com/tonsky/FiraCode) font family.
