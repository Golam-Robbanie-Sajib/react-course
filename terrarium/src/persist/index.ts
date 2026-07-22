/**
 * Persistence boundary (architecture doc §"Persistence").
 *
 * The real implementation — IndexedDB via `idb`, debounced autosave, versioned
 * double-buffered writes, and the versioned seed/export binary format — is an M2
 * deliverable ("build & keep a scene overnight"). It is intentionally NOT wired
 * up in M1 so the Golden-30s work stays focused on feel.
 *
 * This module exists only to hold the seam so M2 code has a home and imports
 * don't move later. Adding the `idb` dependency (already named in the arch doc)
 * happens at the start of M2.
 */

export interface SaveStore {
  save(id: string, world: Readonly<Uint8Array>): Promise<void>;
  load(id: string): Promise<Uint8Array | null>;
}

/** No-op store used until M2 replaces it with the IndexedDB implementation. */
export class NullSaveStore implements SaveStore {
  async save(): Promise<void> {
    /* M2 */
  }
  async load(): Promise<Uint8Array | null> {
    return null;
  }
}
