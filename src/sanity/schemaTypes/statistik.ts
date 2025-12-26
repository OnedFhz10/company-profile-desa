// src/sanity/schemaTypes/statistik.ts
import { defineField, defineType, defineArrayMember } from 'sanity'

export const statistik = defineType({
  name: 'statistik',
  title: 'Data Statistik Desa',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul Data',
      type: 'string',
      initialValue: 'Data Kependudukan Tahun 2024',
    }),
    
    // --- RINGKASAN UTAMA ---
    defineField({
      name: 'totalPenduduk',
      title: 'Total Penduduk (Jiwa)',
      type: 'number',
    }),
    defineField({
      name: 'jumlahKK',
      title: 'Jumlah Kepala Keluarga (KK)',
      type: 'number',
    }),

    // --- JENIS KELAMIN ---
    defineField({
      name: 'lakiLaki',
      title: 'Jumlah Laki-laki',
      type: 'number',
    }),
    defineField({
      name: 'perempuan',
      title: 'Jumlah Perempuan',
      type: 'number',
    }),

    // --- DATA DINAMIS (Pekerjaan / Pendidikan) ---
    defineField({
      name: 'demografi',
      title: 'Demografi Lainnya (Pekerjaan/Pendidikan)',
      description: 'Masukkan data kategori penduduk (Misal: Petani, PNS, Belum Sekolah, Tamat SD)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Kategori (Misal: Petani)' },
            { name: 'jumlah', type: 'number', title: 'Jumlah Orangnya' }
          ]
        })
      ]
    }),
  ],
})