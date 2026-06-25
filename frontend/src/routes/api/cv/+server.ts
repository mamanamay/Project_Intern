import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

// Using a fallback path that works in both dev and prod (Render)
const dataPath = path.resolve('src/lib/data.json');

export async function GET() {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return json(JSON.parse(data));
  } catch (err) {
    console.error('API Error (GET /api/cv):', err);
    return json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function PATCH({ request }) {
  try {
    const body = await request.json();
    fs.writeFileSync(dataPath, JSON.stringify(body, null, 2));
    return json(body);
  } catch (err) {
    console.error('API Error (PATCH /api/cv):', err);
    return json({ error: 'Failed to save data' }, { status: 500 });
  }
}
