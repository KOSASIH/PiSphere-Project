// tests/dapps.test.js
import { fetchDApps, createDApp } from '../api/dapps';

test('fetchDApps returns an array', async () => {
    const dapps = await fetchDApps();
    expect(Array.isArray(dapps)).toBe(true);
});

test('createDApp returns the created DApp', async () => {
    const newDApp = { name: 'Test DApp', description: 'A test DApp', template: 'template1' };
    const createdDApp = await createDApp(newDApp);
    expect(createdDApp.name).toBe(newDApp.name);
});
