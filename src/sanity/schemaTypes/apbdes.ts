// src/sanity/schemaTypes/apbdes.ts
import { defineField, defineType, defineArrayMember } from 'sanity'

export const apbdes = defineType({
  name: 'apbdes',
  title: 'Transparansi Anggaran (APBDes)',
  type: 'document',
  fields: [
    defineField({
      name: 'tahun',
      title: 'Tahun Anggaran',
      type: 'string',
      description: 'Contoh: 2024',
    }),
    
    // Kelompok Pendapatan
    defineField({
      name: 'pendapatan',
      title: 'Rincian Pendapatan',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'uraian', type: 'string', title: 'Uraian' },
            { name: 'jumlah', type: 'number', title: 'Jumlah (Rp)' }
          ]
        })
      ],
      description: 'Masukkan sumber-sumber pendapatan desa',
    }),

    // Kelompok Belanja
    defineField({
      name: 'belanja',
      title: 'Rincian Belanja',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'uraian', type: 'string', title: 'Uraian' },
            { name: 'jumlah', type: 'number', title: 'Jumlah (Rp)' }
          ]
        })
      ],
      description: 'Masukkan pos-pos pengeluaran desa',
    }),
  ],
  preview: {
    select: {
      title: 'tahun',
    },
    prepare(selection) {
      return {
        title: `APBDes Tahun ${selection.title}`,
      }
    }
  }
})