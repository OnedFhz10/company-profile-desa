// src/sanity/schemaTypes/potensi.ts
import { defineField, defineType } from 'sanity'

export const potensi = defineType({
  name: 'potensi',
  title: 'Potensi Desa',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Nama Potensi',
      type: 'string',
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Wisata Alam', value: 'Wisata' },
          { title: 'Produk UMKM', value: 'UMKM' },
          { title: 'Pertanian & Perkebunan', value: 'Pertanian' },
        ],
      },
    }),
    defineField({
      name: 'gambar',
      title: 'Foto Potensi',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'deskripsi',
      title: 'Deskripsi Singkat',
      type: 'text', // Teks biasa (bukan rich text) agar simpel
    }),
  ],
})