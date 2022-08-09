import { GenderEnum, StatusEnum } from '../enums'
import { CharacterLocation } from './character-location.interface'
import { ResourceBase } from './common.interface'
import { InfoPagination } from './http-response.interface'

export interface Character extends ResourceBase {
  status: StatusEnum
  species: string
  type: string
  gender: GenderEnum
  origin: CharacterLocation
  location: CharacterLocation
  image: string
  episode: string[]
}

export interface PaginationCharactersStore extends InfoPagination {
  itemsPerPage: number;
  page: 1
}

export interface CharacterFilters {
  status: StatusEnum;
  species: string;
  name: string;
  gender: GenderEnum
  type: string
}