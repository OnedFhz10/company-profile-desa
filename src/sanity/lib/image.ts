// src/sanity/lib/image.ts
import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client' // Pastikan file client.ts ada di folder yang sama

const builder = createImageUrlBuilder(client)

export const urlFor = (source: any) => {
  return builder.image(source)
}