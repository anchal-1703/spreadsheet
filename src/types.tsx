// src/types.ts
export interface ColumnConfig {
    key: string
    label: string
    type?: 'text' | 'url' | 'date' | 'tag' | 'currency'
    options?: string[]
  }
  