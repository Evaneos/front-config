// A plain testing-library violation: the promise returned by a `findBy*`
// query is neither awaited nor returned (rule
// `testing-library/await-async-queries`, error level in the `flat/react`
// preset). Used by testing-library.test.mjs, which lints this same source
// under several file paths to prove where the preset applies.

import { screen } from '@testing-library/react';

it('greets', () => {
    screen.findByText('hello');
});
