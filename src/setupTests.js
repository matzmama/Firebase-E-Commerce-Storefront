global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);

import '@testing-library/jest-dom';