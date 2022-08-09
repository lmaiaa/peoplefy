<template>
  <div class="list-characters">
    <ListOfCharacters 
    v-if="allHumanCharacters && paginationAllHumanCharacters" 
    :page-type="PagesTypesEnum.HUMAN_CHARACTERS"
    :listOfCharacters="allHumanCharacters" 
    :title="'List Of All Human Characters'"
    :paginationInfos="paginationAllHumanCharacters"  
    @previous-page="previousPage(PagesTypesEnum.HUMAN_CHARACTERS)"
    @next-page="nextPage(PagesTypesEnum.HUMAN_CHARACTERS)"
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
const {allHumanCharacters, paginationAllHumanCharacters} = storeToRefs(characterStore)
const {getHumanCharacters,nextPage, previousPage} = characterStore
onMounted(getHumanCharacters)
</script>