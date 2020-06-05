// @flow
import type { ResponseType } from 'axios'

export const CONTENT_TYPE = {
  JSON: 'application/json',
  MULTIPART: 'multipart/form-data'
}
export type ContentType = $Values<typeof CONTENT_TYPE>

export const METHODS = {
  GET: 'get',
  PUT: 'put',
  POST: 'post',
  DELETE: 'delete'
}
export type Methods = $Values<typeof METHODS>

export const RESPONSE_TYPE: { [key: string]: ResponseType } = {
  ARRAY: 'arraybuffer',
  BLOB: 'blob',
  DOCUMENT: 'document',
  JSON: 'json',
  TEXT: 'text',
  STREAM: 'stream'
}
