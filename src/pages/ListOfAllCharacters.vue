<template>
  <div class="list-characters">
    <ListOfCharacters v-if="allCharacters && paginationAllCharacters" 
    :page-type="PagesTypesEnum.ALL_CHARACTERS"
    :listOfCharacters="allCharacters" 
    :title="'List Of All Characters'" 
    :paginationInfos="paginationAllCharacters"  
    @previous-page="previousPage(PagesTypesEnum.ALL_CHARACTERS)"
    @next-page="nextPage(PagesTypesEnum.ALL_CHARACTERS)"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import ListOfCharacters from '../components/ListOfCharacters.vue';
import {useCharactersStore} from'../stores/characters'
import { PagesTypesEnum } from '../types/enums'

const characterStore = useCharactersStore()
const {allCharacters, paginationAllCharacters} = storeToRefs(characterStore)
const {getAllCharacters, nextPage, previousPage} = characterStore
onMounted(getAllCharacters)
</script>

<style>

</style>