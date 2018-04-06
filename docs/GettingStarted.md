To install React Coroutine in your project, use [NPM][1] or [Yarn][2]. The lib
is available as [`react-coroutine`][3]:

    # using npm
    npm install --save react-coroutine

    # or using yarn
    yarn add react-coroutine

The library has React defined as a [peer dependency][4]. This means, you need
to install React separately. React Coroutine follows [semantic versioning][5]
so no breaking changes should be expected between minor or patch releases.

Whenever you want to define React component using generator, async generator,
or async function, you need to import the factory function that is used in the
same way as you use other [higher-order components][6]. No options or specific
arguments required, just a coroutine that defines the workflow and outputs JSX.

    // UserProfilePage.js
    import React from 'react';
    import Coroutine from 'react-coroutine';

    export default Coroutine.create(UserProfilePage);

    async function UserProfilePage({ userId }) {
      let userInfo = await retrieveUserInfo(userId);
      let { default: UserProfile } = await import('./UserProfile');
      return <UserProfile data={userInfo} />;
    }

Once defined, the component can be used in the same way as stateless components
are used. For example, the use of component above as a root of a route
definition (using [React Router][7]).

    // App.js
    import React from 'react';
    import { BrowserRouter, Route } from 'react-router-dom';
    import UserProfilePage from './UserProfilePage';

    export default function App() {
      return (
        <BrowserRouter>
          <Route path="/users/:userId">
            {match => <UserProfilePage userId={match.params.userId} />}
          </Route>
        </BrowserRouter>
      );
    }

 [1]: https://www.npmjs.com/
 [2]: https://yarnpkg.com/
 [3]: https://www.npmjs.com/package/react-coroutine
 [4]: https://nodejs.org/en/blog/npm/peer-dependencies/
 [5]: https://semver.org/
 [6]: https://reactjs.org/docs/higher-order-components.html
 [7]: https://reacttraining.com/react-router/
