// src/sanity/schemaTypes/profilDesa.ts
import { defineField, defineType, defineArrayMember } from 'sanity'

export const profilDesa = defineType({
  name: 'profilDesa',
  title: 'Profil Desa (Sejarah & Visi Misi)',
  type: 'document',
  fields: [
    // --- BAGIAN BARU: KEPALA DESA ---
    defineField({
      name: 'namaKepalaDesa',
      title: 'Nama Kepala Desa',
      type: 'string',
    }),
    defineField({
      name: 'fotoKepalaDesa',
      title: 'Foto Kepala Desa',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'sambutan',
      title: 'Kata Sambutan Kepala Desa',
      description: 'Tulis pesan sapaan kepada warga',
      type: 'array',
      of: [defineArrayMember({type: 'block'})]
    }),
    // --------------------------------

    defineField({
      name: 'sejarah',
      title: 'Sejarah Desa',
      description: 'Ceritakan sejarah berdirinya desa di sini',
      type: 'array',
      of: [defineArrayMember({type: 'block'})] 
    }),
    defineField({
      name: 'visi',
      title: 'Visi Desa',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'misi',
      title: 'Misi Desa',
      description: 'Gunakan list (bullet points) untuk misi',
      type: 'array',
      of: [defineArrayMember({type: 'block'})]
    }),
  ],
})