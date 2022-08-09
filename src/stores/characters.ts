import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { listChacters } from '../services/character.services';
import { PagesTypesEnum, StatusEnum, SearchStatusExtendsEnum } from '../types/enums';
import { Character } from '../types/interfaces/character.interface';
import { PaginationCharactersStore } from '../types/interfaces/character.interface';
import { HTTPResponse } from '../types/interfaces/http-response.interface';



export const useCharactersStore = defineStore('characters', () => {
    const paginationAllCharacters = ref<PaginationCharactersStore>()
    const allCharacters = ref<Character[]>()
    const paginationAllHumanCharacters = ref<PaginationCharactersStore>()
    const allHumanCharacters = ref<Character[]>()
    const paginationAllLivingCharactersReponse = ref<PaginationCharactersStore>()
    const allLivingCharacters = ref<Character[]>()
    const searchName = ref('')
    const searchStatus = ref<SearchStatusExtendsEnum | StatusEnum>(SearchStatusExtendsEnum.ALL)
    const ITEMS_PER_PAGE = 10;


    function logicalSetStateWhenFetchCharacters(page: number,
        characterReponse: HTTPResponse<Character[]>,
        characters: Ref<Character[] | undefined>,
        paginationCharacters: Ref<PaginationCharactersStore | undefined>) {
        if (characterReponse.info && characterReponse.results) {
            if (page === 1) {
                paginationCharacters.value = {
                    ...characterReponse.info,
                    itemsPerPage: ITEMS_PER_PAGE,
                    page: 1,
                    pages: ((characterReponse.results.length / ITEMS_PER_PAGE) * characterReponse.info?.pages)
                }
                characters.value = characterReponse.results
            } else {
                if (characters.value) {
                    characters.value = [...characters.value, ...characterReponse.results]
                }
            }
        }
    }

    async function getAllCharacters(page = 1) {
        const allCharactersResponse = await listChacters(page)
        logicalSetStateWhenFetchCharacters(page, allCharactersResponse, allCharacters, paginationAllCharacters)
    }

    async function getHumanCharacters(page = 1) {
        const allHumanCharactersReponse = await listChacters(page, { species: 'Human' })
        logicalSetStateWhenFetchCharacters(page, allHumanCharactersReponse, allHumanCharacters, paginationAllHumanCharacters)

    }

    async function getAliveCharacters(page = 1) {
        const allLivingCharactersReponse = await listChacters(page, { status: StatusEnum.ALIVE })
        logicalSetStateWhenFetchCharacters(page, allLivingCharactersReponse, allLivingCharacters, paginationAllLivingCharactersReponse)
    }

    async function getCharactersByName(page = 1, type: PagesTypesEnum, name: string) {

        if (type === PagesTypesEnum.ALL_CHARACTERS) {
            const charactersReponse = await listChacters(page, { name })
            logicalSetStateWhenFetchCharacters(page, charactersReponse, allCharacters, paginationAllCharacters)
        }
        else if (type === PagesTypesEnum.HUMAN_CHARACTERS) {
            const charactersReponse = await listChacters(page, { name, species: 'Human' })
            logicalSetStateWhenFetchCharacters(page, charactersReponse, allHumanCharacters, paginationAllHumanCharacters)
        }
        else {
            const charactersReponse = await listChacters(page, { name, status: StatusEnum.ALIVE })
            logicalSetStateWhenFetchCharacters(page, charactersReponse, allLivingCharacters, paginationAllLivingCharactersReponse)
        }


    }

    async function getCharactersByStatus(page = 1, type: PagesTypesEnum, status: SearchStatusExtendsEnum | StatusEnum) {
        if (status !== SearchStatusExtendsEnum.ALL && status) {
            if (type === PagesTypesEnum.ALL_CHARACTERS) {
                const charactersReponse = await listChacters(page, { status })
                logicalSetStateWhenFetchCharacters(page, charactersReponse, allCharacters, paginationAllCharacters)
            }
            else if (type === PagesTypesEnum.HUMAN_CHARACTERS) {
                const charactersReponse = await listChacters(page, { status, species: 'Human' })
                logicalSetStateWhenFetchCharacters(page, charactersReponse, allHumanCharacters, paginationAllHumanCharacters)
            }
            else {
                const charactersReponse = await listChacters(page, { status: StatusEnum.ALIVE })
                logicalSetStateWhenFetchCharacters(page, charactersReponse, allLivingCharacters, paginationAllLivingCharactersReponse)
            }
        }


    }

    async function logicalNextPage(
        paginationInfo: Ref<PaginationCharactersStore | undefined>,
        characters: Ref<Character[] | undefined>,
        getCharacters: Function,
        type: PagesTypesEnum
    ) {
        if (paginationInfo.value) {
            paginationInfo.value.page++
            if (paginationInfo.value.page - 1 < paginationInfo.value.pages
                && characters.value
                && (paginationInfo.value.page * ITEMS_PER_PAGE) > characters.value.length) {
                searchName.value ? await getCharacters(((paginationInfo.value.page - 1) / 2) + 1, type, searchName.value) : await getCharacters(((paginationInfo.value.page - 1) / 2) + 1)
            }
        }
    }

    function nextPage(type: PagesTypesEnum) {
        if (type === PagesTypesEnum.ALL_CHARACTERS) {
            return logicalNextPage(paginationAllCharacters, allCharacters, searchName.value ? getCharactersByName : getAllCharacters, type)
        } else if (type === PagesTypesEnum.HUMAN_CHARACTERS) {
            return logicalNextPage(paginationAllHumanCharacters, allHumanCharacters, searchName.value ? getCharactersByName : getHumanCharacters, type)
        }
        return logicalNextPage(paginationAllLivingCharactersReponse, allLivingCharacters, searchName.value ? getCharactersByName : getAliveCharacters, type)
    }

    function previousPage(type: PagesTypesEnum) {
        if (type === 'allCharacters') {
            if (paginationAllCharacters.value && paginationAllCharacters.value.page > 1) {
                paginationAllCharacters.value.page--
            }
        }
        else if (type === 'humanCharacters') {
            if (paginationAllHumanCharacters.value && paginationAllHumanCharacters.value.page > 1) {
                paginationAllHumanCharacters.value.page--
            }
        }
        else if (type === 'aliveCharacters') {
            if (paginationAllLivingCharactersReponse.value && paginationAllLivingCharactersReponse.value.page > 1) {
                paginationAllLivingCharactersReponse.value.page--
            }
        }
    }

    return {
        allCharacters,
        allHumanCharacters,
        allLivingCharacters,
        paginationAllCharacters,
        paginationAllHumanCharacters,
        paginationAllLivingCharactersReponse,
        searchName,
        searchStatus,
        getAllCharacters,
        getHumanCharacters,
        getAliveCharacters,
        nextPage,
        previousPage,
        getCharactersByName,
        getCharactersByStatus

    }

})
