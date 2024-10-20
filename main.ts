import fs from 'node:fs'

if (!fs.existsSync(Deno.env.get("LOG_PATH")!)) {
    fs.mkdirSync(Deno.env.get("LOG_PATH")!, { recursive: true })
}

import('./apps/backend/index.ts');
import('./apps/discord/index.ts');