/**
 * Parses assets/lucide.svg and generates:
 *   src/lib/lucide-data.ts  — icon SVG content strings + IconName type + resolveIconName()
 *
 * Run: node scripts/generate-lucide-data.mjs
 *
 * Mirrors the pika-v2 lucide-static approach but adapted for React Native (SvgXml).
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// ---------------------------------------------------------------------------
// Alias mappings (kept in sync with pika-v2)
// ---------------------------------------------------------------------------

const ICON_ALIAS_MAPPING = {
  'align-center': 'text-align-center',
  'align-justify': 'text-align-justify',
  'align-left': 'text-align-start',
  'align-right': 'text-align-end',
  'indent-decrease': 'list-indent-decrease',
  'indent-increase': 'list-indent-increase',
  'wrap-text': 'text-wrap',
  'letter-text': 'text-initial',
  'text': 'text-initial',
  'grab': 'hand-grab',
  'flip-horizontal': 'mirror-rectangular',
  'flip-vertical': 'mirror-round',
  'file-audio': 'file-headphone',
  'file-audio-2': 'file-headphone',
  'file-badge-2': 'file-badge',
  'file-check-2': 'file-check-corner',
  'file-code-2': 'file-code-corner',
  'file-json': 'file-braces',
  'file-json-2': 'file-braces-corner',
  'file-key-2': 'file-key',
  'file-lock-2': 'file-lock',
  'file-minus-2': 'file-minus-corner',
  'file-plus-2': 'file-plus-corner',
  'file-search-2': 'file-search-corner',
  'file-type-2': 'file-type-corner',
  'file-volume-2': 'file-volume',
  'file-warning': 'file-exclamation-point',
  'file-x-2': 'file-x-corner',
  'fingerprint': 'fingerprint-pattern',
  'rail-symbol': 'road',
  'chrome': 'globe',
  'codepen': 'code',
  'codesandbox': 'code',
  'dribbble': 'globe',
  'facebook': 'globe',
  'figma': 'pen-tool',
  'framer': 'pen-tool',
  'github': 'code',
  'gitlab': 'code',
  'instagram': 'camera',
  'linkedin': 'briefcase',
  'pocket': 'bookmark',
  'slack': 'message-square',
  'trello': 'layout-dashboard',
  'twitch': 'tv',
  'twitter': 'globe',
  'youtube': 'play-circle',
}

// ---------------------------------------------------------------------------
// Parse sprite
// ---------------------------------------------------------------------------

const spriteContent = readFileSync(join(root, 'assets/lucide.svg'), 'utf-8')

const icons = {}
const symbolRegex = /<symbol id="([^"]+)">([\s\S]*?)<\/symbol>/g
let match
while ((match = symbolRegex.exec(spriteContent)) !== null) {
  const [, id, content] = match
  // Trim whitespace from inner content
  icons[id] = content.trim()
}

const iconCount = Object.keys(icons).length
if (iconCount === 0) throw new Error('No icons found in sprite — check assets/lucide.svg')

// ---------------------------------------------------------------------------
// Build icon name union (real names + aliases)
// ---------------------------------------------------------------------------

const allNames = [...Object.keys(icons), ...Object.keys(ICON_ALIAS_MAPPING)]
  .sort()
  .filter((v, i, a) => a.indexOf(v) === i)

const iconNameUnion = allNames.map((n) => `  | '${n}'`).join('\n')

const aliasEntries = Object.entries(ICON_ALIAS_MAPPING)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([k, v]) => `  '${k}': '${v}',`)
  .join('\n')

// ---------------------------------------------------------------------------
// Build icon data record (chunked so formatters don't struggle)
// ---------------------------------------------------------------------------

const dataEntries = Object.entries(icons)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([id, content]) => {
    const escaped = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${')
    return `  '${id}': \`${escaped}\`,`
  })
  .join('\n')

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------

mkdirSync(join(root, 'src/lib'), { recursive: true })

const output = `\
/**
 * Lucide icon SVG content — generated from assets/lucide.svg
 *
 * @generated Run \`npm run generate:icons\` to regenerate.
 * Source: lucide-static sprite (${iconCount} icons)
 */

// ---------------------------------------------------------------------------
// Alias mapping (mirrors pika-v2)
// ---------------------------------------------------------------------------

export const ICON_ALIAS_MAPPING: Record<string, string> = {
${aliasEntries}
};

/**
 * Resolves an alias to its canonical icon name.
 * Returns the original name unchanged if it is not an alias.
 */
export function resolveIconName(nameOrAlias: string): string {
  return ICON_ALIAS_MAPPING[nameOrAlias] ?? nameOrAlias;
}

// ---------------------------------------------------------------------------
// Icon name type
// ---------------------------------------------------------------------------

export type IconName =
${iconNameUnion};

// ---------------------------------------------------------------------------
// SVG content record
// ---------------------------------------------------------------------------

export const lucideIcons: Record<string, string> = {
${dataEntries}
};
`

writeFileSync(join(root, 'src/lib/lucide-data.ts'), output, 'utf-8')
console.log(`✔ Generated src/lib/lucide-data.ts — ${iconCount} icons, ${Object.keys(ICON_ALIAS_MAPPING).length} aliases`)
