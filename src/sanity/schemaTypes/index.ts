// src/sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import { berita } from './berita'
import { perangkat } from './perangkat'
import { potensi } from './potensi'
import { layanan } from './layanan'
import { apbdes } from './apbdes'
import { profilDesa } from './profilDesa'
import { identitas } from './identitas'
import { lembaga } from './lembaga'
import { statistik } from './statistik'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [berita, perangkat, potensi, layanan, apbdes, profilDesa, identitas, lembaga, statistik],
}