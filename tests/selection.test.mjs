import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
const require = createRequire(import.meta.url);
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const Module = require('node:module');
const project = fileURLToPath(new URL('../', import.meta.url));
const localRequire = Module.createRequire(path.join(project, 'package.json'));
const ts = localRequire('typescript');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<div id="root"></div>', { url: 'https://capo.test/fr/' });
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = dom.window.localStorage;
global.IS_REACT_ACT_ENVIRONMENT = true;
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(project, request.slice(2));
  return resolve.call(this, request, parent, ...rest);
};
const originalTsLoader = require.extensions['.ts'];
require.extensions['.ts'] = (module, filename) => {
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }
  }).outputText;
  module._compile(output, filename);
};
const React = localRequire('react');
const { createRoot } = localRequire('react-dom/client');
const { useSelection } = localRequire('./hooks/use-selection.ts');
let selection;
function Harness() {
  const state = useSelection();
  React.useEffect(() => { selection = state; }, [state]);
  return null;
}
const first = { id: 'cheese', name: 'Cheese', category: 'burgers' };
const second = { id: 'viking', name: 'Viking', category: 'burgers' };
const methods = Object.fromEntries(['getItem','setItem'].map(key => [key, dom.window.Storage.prototype[key]]));

test('le panier reste utilisable sans stockage et restaure une sélection sauvegardée', async () => {
  for (const key of Object.keys(methods)) dom.window.Storage.prototype[key] = () => { throw Error('blocked'); };
  let root = createRoot(document.getElementById('root'));
  await React.act(() => root.render(React.createElement(Harness)));
  await React.act(() => { selection.add(first); selection.add(second); });
  assert.deepEqual(selection.selection.map(x => x.id), ['cheese', 'viking']);
  const uid = selection.selection[0].uid;
  await React.act(() => selection.remove(uid));
  assert.deepEqual(selection.selection.map(x => x.id), ['viking']);
  await React.act(() => selection.add(second));
  assert.equal(new Set(selection.selection.map(x => x.uid)).size, 2);
  await React.act(() => selection.clear());
  assert.equal(selection.selection.length, 0);
  await React.act(() => root.unmount());
  for (const [key,value] of Object.entries(methods)) dom.window.Storage.prototype[key] = value;
  const stored = [{ ...first, uid: 'saved', addedAt: 123, composition: {} }];
  localStorage.setItem('capo-pizza-selection', JSON.stringify(stored));
  root = createRoot(document.getElementById('root'));
  await React.act(() => root.render(React.createElement(Harness)));
  assert.equal(selection.ready, true);
  assert.equal(selection.selection[0].uid, 'saved');
  assert.equal(JSON.parse(localStorage.getItem('capo-pizza-selection'))[0].uid, 'saved');
  await React.act(() => selection.add(second));
  assert.equal(JSON.parse(localStorage.getItem('capo-pizza-selection')).length, 2);
  await React.act(() => root.unmount());
  Module._resolveFilename = resolve;
  if (originalTsLoader) require.extensions['.ts'] = originalTsLoader;
  else delete require.extensions['.ts'];
  dom.window.close();
});
