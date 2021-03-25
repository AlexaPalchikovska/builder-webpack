require('src/index.scss');
require('src/index.pug');

function requireAll (r) { r.keys().forEach(r); }
requireAll( require.context('src/components/', true, /\.pug$/) );