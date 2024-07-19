import type { Schema, TransformedOperation } from '@scalar/oas-utils'
import { computed } from 'vue'

/**
 * This hook is used to generate the responses for the request from the parameters in the swagger file
 */
export function useResponses(operation: TransformedOperation) {
  const r = computed(() => {
    if (!operation.information) return []

    const { responses } = operation.information

    const res: {
      name: string
      description: string
      schema?: Schema
    }[] = []

    if (responses) {
      Object.keys(responses).forEach((statusCode: string) => {
        if (
          !responses[statusCode]?.['content']?.['application/json']?.['schema']
        ) {
          console.log('response', statusCode, responses[statusCode])
        }
        res.push({
          name: statusCode,
          description: responses[statusCode].description,
          schema:
            responses[statusCode]?.['content']?.['application/json']?.[
              'schema'
            ],
        })
      })
    }

    return res
  })

  return { responses: r }
}
