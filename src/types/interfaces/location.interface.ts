import { Character } from './character.interface'
import { ResourceBase } from './common.interface'

export interface Location extends ResourceBase {
    type: string
    dimension: string
    residents: Character[]
}