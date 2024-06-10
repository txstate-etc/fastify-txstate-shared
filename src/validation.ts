import { JSONSchema } from "json-schema-to-typescript";

export const validationMessage = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['error', 'warning', 'success', 'system', 'info'], example: 'error' },
    message: { type: 'string', example: 'must be an integer' },
    path: { type: 'string', example: 'cart.item.0.quantity', description: 'Dot-separated path to the field in the request body that caused the validation error.' },
    extra: { type: 'object' }
  },
  required: ['type', 'message'],
  additionalProperties: false
} as const satisfies JSONSchema

export const userLookupValidationMessage = {
  ...validationMessage,
  properties: {
    ...validationMessage.properties,
    extra: {
      type: 'object',
      properties: {
        login: { type: 'string', example: 'user01' },
        fullname: { type: 'string', example: 'John Smith' },
        title: { type: 'string', example: 'Software Developer II' },
        org: { type: 'string', example: 'Mobile/Web Systems' }
      },
      required: ['login', 'fullname']
    }
  }
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
