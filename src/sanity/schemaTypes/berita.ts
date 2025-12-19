// src/sanity/schemaTypes/berita.ts
import { defineField, defineType } from 'sanity'

export const berita = defineType({
  name: 'berita',
  title: 'Berita Desa',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul Berita',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'judul',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'gambarUtama',
      title: 'Gambar Utama',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tanggalTerbit',
      title: 'Tanggal Terbit',
      type: 'datetime',
    }),
    defineField({
      name: 'konten',
      title: 'Isi Berita',
      type: 'array', 
      of: [
        { type: 'block' } // Kita pakai format object biasa, ini standar Sanity yang paling aman
      ],
    }),
  ],
})