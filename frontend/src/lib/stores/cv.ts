import { writable, get } from 'svelte/store';
import { cvApi, connectSSE, type CvData, type CvCustomBlock, type CvCustomBlockItem } from '$lib/api';

export const cvData = writable<CvData | null>(null);
export const isAdmin = writable<boolean>(false);
export const editingField = writable<{ path: string; value: string } | null>(null);

export async function loadCv(): Promise<void> {
  try {
    const data = await cvApi.getCv();
    // Ensure customBlocks exists for backward compatibility
    if (!data.customBlocks) {
      data.customBlocks = [];
    }
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

// ========== Add/Remove items in existing arrays ==========

export function addItem(arrayPath: string, newItem: Record<string, unknown>): void {
  const current = get(cvData);
  if (!current) return;

  const updated = JSON.parse(JSON.stringify(current)) as CvData;
  const arr = (updated as unknown as Record<string, unknown>)[arrayPath] as unknown[];
  if (Array.isArray(arr)) {
    arr.push(newItem);
    cvData.set(updated);
    updateCv(updated).catch((err) => {
      console.error('Add item failed, reverting:', err);
      cvData.set(current);
    });
  }
}

export function removeItem(arrayPath: string, index: number): void {
  const current = get(cvData);
  if (!current) return;

  const updated = JSON.parse(JSON.stringify(current)) as CvData;
  const arr = (updated as unknown as Record<string, unknown>)[arrayPath] as unknown[];
  if (Array.isArray(arr) && index >= 0 && index < arr.length) {
    arr.splice(index, 1);
    cvData.set(updated);
    updateCv(updated).catch((err) => {
      console.error('Remove item failed, reverting:', err);
      cvData.set(current);
    });
  }
}

// ========== Custom Blocks CRUD ==========

export function addCustomBlock(title: string, emoji: string): void {
  const current = get(cvData);
  if (!current) return;

  const updated = JSON.parse(JSON.stringify(current)) as CvData;
  if (!updated.customBlocks) updated.customBlocks = [];

  const newBlock: CvCustomBlock = {
    id: 'block-' + Date.now().toString(36),
    title,
    emoji,
    items: []
  };
  updated.customBlocks.push(newBlock);
  cvData.set(updated);
  updateCv(updated).catch((err) => {
    console.error('Add block failed, reverting:', err);
    cvData.set(current);
  });
}

export function removeCustomBlock(blockIndex: number): void {
  const current = get(cvData);
  if (!current) return;

  const updated = JSON.parse(JSON.stringify(current)) as CvData;
  if (updated.customBlocks && blockIndex >= 0 && blockIndex < updated.customBlocks.length) {
    updated.customBlocks.splice(blockIndex, 1);
    cvData.set(updated);
    updateCv(updated).catch((err) => {
      console.error('Remove block failed, reverting:', err);
      cvData.set(current);
    });
  }
}

export function addCustomBlockItem(blockIndex: number): void {
  const current = get(cvData);
  if (!current) return;

  const updated = JSON.parse(JSON.stringify(current)) as CvData;
  if (updated.customBlocks && updated.customBlocks[blockIndex]) {
    const newItem: CvCustomBlockItem = {
      title: 'หัวข้อใหม่',
      period: '',
      description: 'รายละเอียด...'
    };
    updated.customBlocks[blockIndex].items.push(newItem);
    cvData.set(updated);
    updateCv(updated).catch((err) => {
      console.error('Add block item failed, reverting:', err);
      cvData.set(current);
    });
  }
}

export function removeCustomBlockItem(blockIndex: number, itemIndex: number): void {
  const current = get(cvData);
  if (!current) return;

  const updated = JSON.parse(JSON.stringify(current)) as CvData;
  if (updated.customBlocks && updated.customBlocks[blockIndex]) {
    const items = updated.customBlocks[blockIndex].items;
    if (itemIndex >= 0 && itemIndex < items.length) {
      items.splice(itemIndex, 1);
      cvData.set(updated);
      updateCv(updated).catch((err) => {
        console.error('Remove block item failed, reverting:', err);
        cvData.set(current);
      });
    }
  }
}

export function initSSE(): EventSource {
  return connectSSE((data: CvData) => {
    cvData.set(data);
  });
}
