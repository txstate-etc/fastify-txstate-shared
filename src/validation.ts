import { JSONSchema } from "json-schema-to-typescript";

export const validationMessage = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['error', 'warning', 'success', 'system'], example: 'error' },
    message: { type: 'string', example: 'must be an integer' },
    path: { type: 'string', example: 'cart.item.0.quantity', description: 'Dot-separated path to the field in the request body that caused the validation error.' }
  },
  required: ['type', 'message'],
  additionalProperties: false
} as const satisfies JSONSchema

export const validatedResponse = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    messages: { type: 'array', items: validationMessage }
  },
  required: ['success', 'messages'],
  additionalProperties: false
} as const satisfies JSONSchema