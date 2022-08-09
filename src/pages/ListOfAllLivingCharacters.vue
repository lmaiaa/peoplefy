<template>
  <div class="list-characters">
    <ListOfCharacters 
    v-if="allLivingCharacters && paginationAllLivingCharactersReponse" 
    :page-type="PagesTypesEnum.ALIVE_CHARACTERS"
    :listOfCharacters="allLivingCharacters" 
    :paginationInfos="paginationAllLivingCharactersReponse"  
    @previous-page="previousPage(PagesTypesEnum.ALIVE_CHARACTERS)"
    @next-page="nextPage(PagesTypesEnum.ALIVE_CHARACTERS)" 
    :title="'List Of All ALive Characters'" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import ListOfCharacters from '../components/ListOfCharacters.vue';
import {useCharactersStore} from'../stores/characters'
import { PagesTypesEnum } from '../types/enums'

const characterStore = useCharactersStore()
const {allLivingCharacters, paginationAllLivingCharactersReponse} = storeToRefs(characterStore)
const {getAliveCharacters, previousPage, nextPage} = characterStore
onMounted(getAliveCharacters)
</script>