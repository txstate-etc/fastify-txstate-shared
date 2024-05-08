export type SchemaObject = OpenAPIV3_1.SchemaObject

export namespace OpenAPIV3_1 {
  export interface ExternalDocumentationObject {
    description?: string
    url: string
  }

  export type NonArraySchemaObjectType =
    | 'null'
    | 'boolean'
    | 'object'
    | 'number'
    | 'string'
    | 'integer'

  export type ArraySchemaObjectType = 'array'

  export type SchemaObject =
    | ArraySchemaObject
    | NonArraySchemaObject
    | MixedSchemaObject

  export interface ArraySchemaObject extends BaseSchemaObject {
    type: ArraySchemaObjectType
    items: ReferenceObject | SchemaObject
  }

  export interface NonArraySchemaObject extends BaseSchemaObject {
    type?: NonArraySchemaObjectType
  }

  export interface MixedSchemaObject extends BaseSchemaObject {
    type?: (ArraySchemaObjectType | NonArraySchemaObjectType)[]
    items?: ReferenceObject | SchemaObject
  }

  export interface BaseSchemaObject {
    title?: string
    description?: string
    format?: string
    default?: any
    multipleOf?: number
    maximum?: number
    minimum?: number
    maxLength?: number
    minLength?: number
    pattern?: string
    maxItems?: number
    minItems?: number
    uniqueItems?: boolean
    maxProperties?: number
    minProperties?: number
    required?: string[]
    enum?: any[]

    readOnly?: boolean
    writeOnly?: boolean
    example?: any
    deprecated?: boolean
    errorMessage?: string | {
      /** default message */
      _?: string | Record<string, string>
      required?: string | Record<string, string>
      dependentRequired?: string
      dependencies?: string | Record<string, string>
      maxProperties?: string
      minProperties?: string
      type?: string
      enum?: string
      minimum?: string
      exclusiveMinimum?: string
      maximum?: string
      exclusiveMaximum?: string
      multipleOf?: string
      minLength?: string
      maxLength?: string
      pattern?: string
      const?: string
      minItems?: string
      maxItems?: string
      uniqueItems?: string
      minContains?: string
      maxContains?: string

      format?: string
      formatMaximum?: string
      formatMinimum?: string
      formatExclusiveMaximum?: string
      formatExclusiveMinimum?: string
      [keys: string]: string | Record<string, string> | undefined
    }

    // examples?: BaseSchemaObject['example'][] // won't work with swagger-ui yet
    exclusiveMinimum?: boolean | number
    exclusiveMaximum?: boolean | number
    contentMediaType?: string
    $id?: string // for references to target
    $schema?: string
    additionalProperties?: boolean | ReferenceObject | SchemaObject
    properties?: {
      [name: string]: ReferenceObject | SchemaObject
    }
    allOf?: (ReferenceObject | SchemaObject)[]
    oneOf?: (ReferenceObject | SchemaObject)[]
    anyOf?: (ReferenceObject | SchemaObject)[]
    not?: ReferenceObject | SchemaObject
    discriminator?: DiscriminatorObject
    externalDocs?: ExternalDocumentationObject
    xml?: XMLObject
    const?: any
  }

  export interface DiscriminatorObject {
    propertyName: string
    mapping?: { [value: string]: string }
  }

  export interface XMLObject {
    name?: string
    namespace?: string
    prefix?: string
    attribute?: boolean
    wrapped?: boolean
  }

  export interface ReferenceObject {
    $ref: string
    summary?: string
    description?: string
  }
}
