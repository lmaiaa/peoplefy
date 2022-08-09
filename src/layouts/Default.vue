<template>
    <div class="h-full">
        <Disclosure as="nav" class="bg-indigo-900" v-slot="{ open }">
            <div class="mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img class="h-8 w-8"
                                src="https://irp.cdn-website.com/1653ec29/site_favicon_16_1652453297489.ico"
                                alt="Workflow" />
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <span v-for="item in navigation" :key="item.name" @click="redirectAndSetCurrent(item)"
                                    :class="[item.current ? 'bg-indigo-900 text-white' : 'text-indigo-300 hover:bg-indigo-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
                                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <DisclosureButton
                            class="bg-indigo-800 inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white">
                            <span class="sr-only">Open main menu</span>
                            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <DisclosureButton v-for="item in navigation" :key="item.name" as="span"
                        @click="redirectAndSetCurrent(item)"
                        :class="[item.current ? 'bg-indigo-900 text-white' : 'text-indigo-300 hover:bg-indigo-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
                        :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
                </div>
            </DisclosurePanel>
        </Disclosure>
        <main>
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {  MenuIcon, XIcon } from '@heroicons/vue/outline'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigation = ref([
    { name: 'List Of All Characters', route: '/list/all', current: false },
    { name: 'List Of All Living Characters', route: '/list/alive', current: false },
    { name: 'List Of All Human Characters', route: '/list/human', current: false },
])

function redirectAndSetCurrent(item: { name: string, route: string, current: boolean }) {
    router.push(item.route)
    navigation.value.forEach(nav => {
        if (nav.route === item.route) return nav.current = true
        return nav.current = false

    })
}
onMounted(() => {
    const currentRoute = navigation.value.filter(nav => nav.route === router.currentRoute.value.path)[0]
    currentRoute ? currentRoute.current = true : navigation.value[0].current = true
})
</script>
<style lang="scss" scoped>
span {
    cursor: pointer;
}

</style>
