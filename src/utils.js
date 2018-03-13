const curry = fn => (...args) => (
  args.length < fn.length
  ? args.reduce((acc, arg) => acc.bind(null, arg), fn)
  : fn(...args)
);

const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), value);

const reverse = arr => [ ...arr ].reverse();
const split = curry((character, string) => string.split(character));
const join = curry((entry, arr) => arr.join(entry));
const stringReverse = pipe(String, split(''), reverse, join(''));
const filter = curry((fn, arr) => arr.filter(fn));

export {
  curry,
  pipe,
  reverse,
  split,
  join,
  stringReverse,
  filter
};
