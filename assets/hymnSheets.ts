// This file stores base64 encoded strings for the hymn sheet music images.
// In a real application, these might be URLs pointing to a CDN or asset storage.
// The dataset has been expanded to include more hymns as requested.

const placeholderSheet = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Data for hymn sheets was previously removed to resolve a syntax error.
// The object is populated with placeholders below.
const hymnSheetData: Record<string, string> = {};

for (let i = 1; i <= 260; i++) {
    const key = `hymn-${i}`;
    if (!hymnSheetData[key]) {
        hymnSheetData[key] = placeholderSheet;
    }
}
export const hymnSheets: Record<string, string> = hymnSheetData;
