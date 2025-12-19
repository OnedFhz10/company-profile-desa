// src/sanity/schemaTypes/layanan.ts
// 1. Tambahkan import 'defineArrayMember'
import { defineField, defineType, defineArrayMember } from 'sanity'

export const layanan = defineType({
  name: 'layanan',
  title: 'Layanan Publik',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Nama Layanan',
      type: 'string',
      description: 'Contoh: Pembuatan KTP Baru, Surat Pengantar Nikah',
    }),
    defineField({
      name: 'deskripsi',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'syarat',
      title: 'Persyaratan Dokumen',
      type: 'array',
      // 2. Gunakan defineArrayMember di dalam array
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      description: 'Tuliskan daftar berkas yang harus dibawa warga',
    }),
    defineField({
      name: 'fileFormulir',
      title: 'File Formulir (Opsional)',
      type: 'file',
      description: 'Upload file PDF/Word jika ada formulir yang bisa didownload warga',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
  ],
})