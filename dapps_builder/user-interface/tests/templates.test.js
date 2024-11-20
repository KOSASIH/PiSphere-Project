// tests/templates.test.js
import { fetchTemplates } from '../api/templates';

test('fetchTemplates returns an array', async () => {
    const templates = await fetchTemplates();
    expect(Array.isArray(templates)).toBe(true);
});
