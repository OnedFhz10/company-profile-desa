// src/sanity/schemaTypes/identitas.ts
import { defineField, defineType } from 'sanity'

export const identitas = defineType({
  name: 'identitas',
  title: 'Identitas Desa (Logo & Nama)',
  type: 'document',
  fields: [
    defineField({
      name: 'namaDesa',
      title: 'Nama Desa',
      type: 'string',
      description: 'Contoh: Desa Maju Jaya',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Desa',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload logo desa (format PNG transparan lebih bagus)',
    }),
    defineField({
      name: 'alamatKantor',
      title: 'Alamat Kantor Desa',
      type: 'string',
      description: 'Akan muncul di Footer (Opsional)',
    }),
  ],
})