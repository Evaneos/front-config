# Incomplete autofix

`import/order` warns on these side-effect import patterns but the fixer doesn't resolve them — by design: side-effect execution order can be load-bearing (e.g. `reset.css` before `theme.css`, polyfill before consumer code). Reordering automatically could silently break the build. Bindings are sorted normally; see `../css-with-binding-gets-sorted.*`.

| Fixture                          | Unfixed surface                                  |
|----------------------------------|--------------------------------------------------|
| `side-effect-stays-put`          | side-effect sandwiched between parent imports    |
| `side-effect-group-not-sorted`   | a group of side-effects not alphabetized         |

When the rule fires in a consumer project: check by hand whether order matters. If it doesn't, reorder to satisfy the rule. If it does, suppress with an explanatory disable comment:

```ts
// eslint-disable-next-line import/order -- reset must load before theme
import 'theme.css';
```
