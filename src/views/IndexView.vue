<template>
    <div class="container mt-5">
        <Loader v-if="isLoading" />
        <input 
            type="text" 
            class="form-control form-control-sm mb-2"
            placeholder="search pokemon"
            @keyup="searchdata"/>

        <div class="row">
            <div class="col-md-3" v-for="item in pokemons" :key="item.id">
                <div class="card rounded shadow mb-5 border-0">
                    <div class="text-center">
                        <img :src="item.sprites" class="card-img-top" alt="image" style="width: 150px">
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <a href="#" class="btn btn-primary me-2">Add to favorite</a>
                        <router-link :to="{name: 'detail', params:{id: item.id}}" class="btn btn-primary">Detail</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Loader from "@/components/LoaderComponent.vue"
import { onMounted, ref } from 'vue'

export default {

    components :{
        Loader
    },
    setup() {
        let pokemons  = ref([])
        let isLoading = ref(true)
        onMounted(() => {
            getData()
        })

        const getData = (keyword = "") => {
            isLoading.value = true;
            axios.get('http://localhost:8000/api/pokemon?keyword='+keyword)
            .then(response => {
                pokemons.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            }).finally(() => {
                isLoading.value = false;
            });
        }

        const searchdata = (evt) => {
            let keyword = evt.target.value
            setTimeout(() => getData(keyword), 2000);
        }

        return {
            pokemons,
            isLoading,
            getData,
            searchdata
        }

    }

}
</script>