let wasmModule: any = null;

async function getWasmModule() {
  if (wasmModule) return wasmModule;
  const wasm = await import("../../../../tauri-shared-wasm/pkg");
  wasm.default();
  wasmModule = wasm;
  return wasmModule;
}

export async function sortQuick<T>(items: T[]): Promise<T[]> {
  const wasm = await getWasmModule();
  const json = JSON.stringify(items);
  const result = wasm.sort_quick(json);
  return JSON.parse(result);
}

export async function sortMerge<T>(items: T[]): Promise<T[]> {
  const wasm = await getWasmModule();
  const json = JSON.stringify(items);
  const result = wasm.sort_merge(json);
  return JSON.parse(result);
}

export async function sortBubble<T>(items: T[]): Promise<T[]> {
  const wasm = await getWasmModule();
  const json = JSON.stringify(items);
  const result = wasm.sort_bubble(json);
  return JSON.parse(result);
}

export async function sortInsertion<T>(items: T[]): Promise<T[]> {
  const wasm = await getWasmModule();
  const json = JSON.stringify(items);
  const result = wasm.sort_insertion(json);
  return JSON.parse(result);
}
