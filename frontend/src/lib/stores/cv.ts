import { writable, get } from 'svelte/store';
import { cvApi, connectSSE, type CvData } from '$lib/api';

export const cvData = writable<CvData | null>(null);
export const isAdmin = writable<boolean>(false);
export const editingField = writable<{ path: string; value: string } | null>(null);

export async function loadCv(): Promise<void> {
  try {
    const data = await cvApi.getCv();
    cvData.set(data);
  } catch (error) {
    console.error('Failed to load CV data:', error);
  }
}

export async function updateCv(data: CvData): Promise<void> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    const updated = await cvApi.updateCv(data, token);
    cvData.set(updated);
  } catch (error) {
    console.error('Failed to update CV data:', error);
    throw error;
  }
}

export function updateField(path: string, value: string): void {
  const current = get(cvData);
  if (!current) return;

  const updated = JSON.parse(JSON.stringify(current)) as CvData;
  const keys = path.split('.');
  let target: Record<string, unknown> = updated as unknown as Record<string, unknown>;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const indexMatch = key.match(/^(\w+)\[(\d+)\]$/);
    if (indexMatch) {
      const arr = target[indexMatch[1]] as Record<string, unknown>[];
      target = arr[parseInt(indexMatch[2])] as Record<string, unknown>;
    } else {
      target = target[key] as Record<string, unknown>;
    }
  }

  const lastKey = keys[keys.length - 1];
  const lastIndexMatch = lastKey.match(/^(\w+)\[(\d+)\]$/);
  if (lastIndexMatch) {
    const arr = target[lastIndexMatch[1]] as string[];
    arr[parseInt(lastIndexMatch[2])] = value;
  } else {
    target[lastKey] = value;
  }

  cvData.set(updated);
  updateCv(updated).catch((err) => {
    console.error('Save failed, reverting:', err);
    cvData.set(current);
  });
}

export function initSSE(): EventSource {
  return connectSSE((data: CvData) => {
    cvData.set(data);
  });
}
