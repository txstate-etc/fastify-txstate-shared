import { JSONSchema } from "json-schema-to-typescript";

export const validationMessage = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['error', 'warning', 'success', 'system', 'info'], example: 'error' },
    message: { type: 'string', example: 'must be an integer' },
    path: { type: 'string', example: 'cart.item.0.quantity', description: 'Dot-separated path to the field in the request body that caused the validation error.' }
  },
  required: ['type', 'message'],
  additionalProperties: false
} as const satisfies JSONSchema

export const validatedResponse = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    messages: { type: 'array', items: validationMessage }
  },
  required: ['success', 'messages'],
  additionalProperties: false
} as const satisfies JSONSchema

export const queryWithValidateFlag = {
  type: 'object',
  properties: {
    validate: { type: 'integer', enum: [0, 1] }
  },
  additionalProperties: false
} as const satisfies JSONSchema

const fatal: Record<string, boolean | undefined> = { error: true, system: true }
export function hasFatalErrors (messages: { type: string }[]) {
  return messages.some(m => fatal[m.type])
}
