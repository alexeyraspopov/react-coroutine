## react-coroutine v1.0.3

 * Use `jsnext:main` instead of `pkg.module` because of Webpack 2 issue
 * Use `shallowequal` instead of React's internal tool

## react-coroutine v1.0.2

 * Fix compatibility issue with polyfilled Promises

## react-coroutine v1.0.1

 * Fix the usage of `contextTypes` for async functions

## react-coroutine v1.0.0

 * Use Rollup to build smaller bundle
 * Provide `pkg.module` property for bundling original sources
 * Prevent calls of `setState()` for unmounted components

## react-coroutine v0.6.1

 * Fix `.npmignore` due to lost modules after previous release

## react-coroutine v0.6.0

 * Provide `Coroutine.render` component to render async functions without wrapping them
 * Add an ability to provide custom component for the initial (empty) state
 * Drop outdated promises if coroutine was updated before they are resolved
 * Use `null` as default initial body and allow returning it from coroutines

## react-coroutine v0.5.1

 * Fix `return` statement usage in async generators

## react-coroutine v0.5.0

 * Use a better approach to check if component is mounted

## react-coroutine v0.4.1

 * Fixed weird publish issue

## react-coroutine v0.4.0

 * Drop outdated body before fetching new one

## react-coroutine v0.3.2

 * Fixed incorrect props comparison
 * Fixed re-render logic when new props are received

## react-coroutine v0.3.1

 * Cancel async iterator when a component was unmounted or received new props

## react-coroutine v0.3.0

 * Removed `invariant` dependency
 * Call `getVariables()` with `props` and `context` passed in
 * Allowed the usage of async generators as components

## react-coroutine v0.2.0

 * Set correct and transpiled main file
 * Reduced amount of files on package install

## react-coroutine v0.1.0

Initial public version.
