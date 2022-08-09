import { StatusEnum } from '../types/enums';
import { Character, CharacterFilters } from '../types/interfaces/character.interface';
import { HTTPResponse } from '../types/interfaces/http-response.interface';
import api from '../utils/api.instance';

const baseCharactersUrl = '/character';

export function listChacters(page = 1, filters?: Partial<CharacterFilters>) {
    return api.get<never, HTTPResponse<Character[]>>(`${baseCharactersUrl}?page=${page}${filters ? Object.entries(filters).map(([key, value]) => `&${key}=${value}`).join('') : ''}`)
}