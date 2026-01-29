'use server'


import config from '@payload-config'
import { handleServerFunctions as originalHandleServerFunctions } from '@payloadcms/next/layouts'

export async function handleServerFunctions(args: any) {
  return originalHandleServerFunctions({
    ...args,
    config,
  })
}
