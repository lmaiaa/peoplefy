<template>
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-6 gap-6 py-6 ">
            <h2 class="text-2xl col-span-2 font-extrabold tracking-tight  text-white self-center">{{ props.title }}</h2>
            <div class="col-span-2 sm:col-span-2">
                <label for="name" class="block text-sm font-medium  text-white">Search by name</label>
                <input id="name" type="text"
                    @input="_event => searchStatus=SearchStatusExtendsEnum.ALL"
                    class="mt-1 bg-indigo-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-idigo-500 rounded-md"
                    v-model="searchName">
            </div>
            <div class="col-span-2 sm:col-span-2">
                <label for="status" class="block text-sm font-medium  text-white">Status</label>
                <select id="status" name="status" autocomplete="status-name" v-model="searchStatus"
                    @input="_event => searchName = ''"
                    class=" bg-indigo-900 mt-1 block w-full py-2 px-3  border border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>{{SearchStatusExtendsEnum.ALL}}</option>
                    <option v-for="option in StatusEnum ">{{ option }}</option>

                </select>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <div v-for="character in listOfCharactersPaged" :key="character.id" class="card bg-indigo-900">
                <div
                    class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img :src="character.image" :alt="character.name"
                        class="w-full h-full object-center object-cover group-hover:opacity-75" />
                </div>
                <h1 class="mt-4 text-2xl font-extrabold tracking-tight text-white">
                    {{ character.name }}
                </h1>
                <p class="mt-1 text-lg font-medium  text-white">
                    Specie: {{ character.species }}
                </p>
                <p class="mt-1 text-lg font-medium text-white">
                    Status: {{ character.status }}
                </p>
            </div>
        </div>
        <Pagination v-bind="props.paginationInfos" @previous-page="$emit('previousPage')"
            @next-page="$emit('nextPage')" />
    </div>
</template>

<script lang="ts" setup>
import { computed, PropType, watch } from 'vue';

import { Character } from '../types/interfaces/character.interface';
import { PaginationCharactersStore } from '../types/interfaces/character.interface';
import { PagesTypesEnum, StatusEnum,SearchStatusExtendsEnum } from '../types/enums'

import Pagination from '../components/Pagination.vue'
import { useCharactersStore } from '../stores/characters';
import { storeToRefs } from 'pinia';


const props = defineProps({
    listOfCharacters: { type: Array as PropType<Character[]>, required: true },
    title: String,
    paginationInfos: { type: Object as PropType<PaginationCharactersStore>, required: true },
    pageType: { type: String as PropType<PagesTypesEnum>, required: true },
})


const characterStore = useCharactersStore();
const { getCharactersByName, getCharactersByStatus } = characterStore;
const { searchName, searchStatus } = storeToRefs(characterStore)

const listOfCharactersPaged = computed(() => props.listOfCharacters.slice((props.paginationInfos.page - 1) * props.paginationInfos.itemsPerPage, props.paginationInfos.page * props.paginationInfos.itemsPerPage))

function wrapperSearchByName() {
    getCharactersByName(1, props.pageType, searchName.value)
}
function wrapperSearchByStatus() {
    getCharactersByStatus(1, props.pageType, searchStatus.value)
}
watch(searchName, () => wrapperSearchByName())
watch(searchStatus, () => wrapperSearchByStatus())

</script>

<style>
</style>