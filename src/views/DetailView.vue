<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card rounded shadow mb-5 border-0">
                    <div class="text-center">
                        <img :src="pokemons.sprites" class="card-img-top" alt="image" style="width:250px">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ pokemons.name }}</h5>
                        <p>Abilities : </p>
                        <p class="ms-4 my-0" v-for="item in pokemons.abilities" :key="item.id">
                           - {{ item.ability.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {

    setup() {
        let pokemons  = reactive({
            'id': '',
            'name':'',
            'sprites':'',
            'abilities': []
        })

        const route = useRoute()
        onMounted(() => {
            getData()
        })

        const getData = () => {
            axios.get(`http://localhost:8000/api/pokemon/${route.params.id}`)
            .then(response => {
                pokemons.id   = response.data.data.id
                pokemons.name = response.data.data.name
                pokemons.sprites = response.data.data.sprites
                pokemons.abilities = response.data.data.abilities
                console.log(response.data.data)
            }).catch(error => {
                console.log(error.response.data)
            }).finally(() => {
                console.log(pokemons)
            })
        }

        return {
            pokemons,
            getData,
        }

    }

}
</script>