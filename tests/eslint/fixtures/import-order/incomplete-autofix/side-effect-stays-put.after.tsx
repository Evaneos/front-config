// LIMITATION — autofix skips side-effect imports. The warning still fires.
// Reorder by hand, or eslint-disable if order is load-bearing.

import { A } from '../a';

import '../style.css';

import { B } from '../b';
