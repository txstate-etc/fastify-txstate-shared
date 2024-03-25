import { compile } from 'json-schema-to-typescript'
import fs from 'node:fs/promises'
import path from 'node:path'
import { interactionEvent } from './interaction-event'
import { validatedResponse, validationMessage } from './validation'

async function convert (schema: any, interfaceName: string) {
  const types = await compile(schema, interfaceName, { bannerComment: '', strictIndexSignatures: true, unknownAny: false, style: { bracketSpacing: true, printWidth: 120, semi: false, singleQuote: true, tabWidth: 2, trailingComma: 'none', useTabs: false } })
  await fs.writeFile(path.resolve(__dirname, interfaceName + '.d.ts'), types)
  await fs.appendFile(path.resolve(__dirname, 'index.d.ts'), "\nexport * from './" + interfaceName + "';")
}

async function main () {
  await convert(interactionEvent, 'InteractionEvent')
  await convert(validationMessage, 'ValidationMessage')
  await convert(validatedResponse, 'ValidatedResponse')
}

main().catch((e) => { console.error(e); process.exit(1) })
