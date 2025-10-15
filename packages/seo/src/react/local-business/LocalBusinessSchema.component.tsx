import type { LocalBusiness, WithContext } from 'schema-dts'

import { buildLocalBusinessJsonLd } from '../../schemas/local-business.schema'
import type { LocalBusinessSchemaProps } from '../../types/schema'
import { JsonLd } from '../JsonLd.component'

export function LocalBusinessSchema(props: LocalBusinessSchemaProps) {
    const data: WithContext<LocalBusiness> = buildLocalBusinessJsonLd(props)
    return <JsonLd data={data} />
}
