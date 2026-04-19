import { compile } from 'json-schema-to-typescript'
import fs from 'node:fs/promises'
import path from 'node:path'
import { interactionEvent } from './lib/interaction-event.js'
import { queryWithValidateFlag, validatedResponse, validationMessage } from './lib/validation.js'

const libDir = path.resolve(import.meta.dirname, 'lib')
const esmDir = path.resolve(import.meta.dirname, 'lib-esm')

async function convert (schema: any, interfaceName: string) {
  const types = await compile(schema, interfaceName, { bannerComment: '', strictIndexSignatures: true, unknownAny: false, style: { bracketSpacing: true, printWidth: 120, semi: false, singleQuote: true, tabWidth: 2, trailingComma: 'none', useTabs: false } })
  await fs.writeFile(path.resolve(libDir, interfaceName + '.d.ts'), types)
  await fs.writeFile(path.resolve(esmDir, interfaceName + '.d.ts'), types)
  await fs.appendFile(path.resolve(libDir, 'index.d.ts'), "\nexport * from './" + interfaceName + "';")
  await fs.appendFile(path.resolve(esmDir, 'index.d.ts'), "\nexport * from './" + interfaceName + ".js';")
}

async function main () {
  await convert(interactionEvent, 'InteractionEvent')
  await convert(validationMessage, 'ValidationMessage')
  await convert(validatedResponse, 'ValidatedResponse')
  await convert(queryWithValidateFlag, 'QueryWithValidateFlag')
}

main().catch((e) => { console.error(e); process.exit(1) })
