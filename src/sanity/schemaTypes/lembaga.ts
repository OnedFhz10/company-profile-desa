// src/sanity/schemaTypes/lembaga.ts
import { defineField, defineType } from 'sanity'

export const lembaga = defineType({
  name: 'lembaga',
  title: 'Lembaga Desa (BPD/LPM/PKK)',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Lembaga',
      type: 'string',
      description: 'Contoh: BPD, LPM, PKK, Karang Taruna',
    }),
    defineField({
      name: 'singkatan',
      title: 'Singkatan / Kategori',
      type: 'string',
      description: 'Contoh: Badan Permusyawaratan Desa',
    }),
    defineField({
      name: 'ketua',
      title: 'Nama Ketua',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Lembaga',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'deskripsi',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
    }),
  ],
})