import type { Thing, WithContext } from 'schema-dts'

import { SCHEMA_ORG_CONTEXT } from '../config'

export function withContext<T extends Thing>(value: T): WithContext<T> {
    // Use literal to satisfy schema-dts WithContext requirement
    const base = { '@context': 'https://schema.org' as const }
    const merged = Object.assign({}, base, value as object)
    return merged as WithContext<T>
}
