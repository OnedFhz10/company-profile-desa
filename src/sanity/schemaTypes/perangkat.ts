// src/sanity/schemaTypes/perangkat.ts
import { defineField, defineType } from 'sanity'

export const perangkat = defineType({
  name: 'perangkat',
  title: 'Perangkat Desa',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Lengkap',
      type: 'string',
    }),
    defineField({
      name: 'jabatan',
      title: 'Jabatan',
      type: 'string',
    }),
    defineField({
      name: 'foto',
      title: 'Foto Profil',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})