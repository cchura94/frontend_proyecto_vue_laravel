<template>
    <h1>Mi Perfil</h1>
    <div v-if="perfil.name">
        <h3>NOMBRE: {{ perfil.name }}</h3>
        <h3>CORREO: {{ perfil.email }}</h3>
        <h3>CONTRASEÑA: {{ perfil.password }}</h3>
        <button @click="obtenerDatos()">Obtener Datos</button>
        {{ perfil }}
        <br>
        <button @click="funSalir()">SALIR (LOGOUT)</button>
    </div>
    <div v-else>
        <h1>Cargando...</h1>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import authService from '../../../services/auth.service';
import { useRouter } from "vue-router"

const perfil = ref({})

const router = useRouter()

onMounted(() => {
    getPerfil()

    
})

const getPerfil = async () => {
    const {data} = await authService.profile();
    perfil.value = data;
}

function obtenerDatos(){
    console.log(perfil.value.name)
    console.log(perfil.value.email)
} 

const funSalir = async function (){
    await authService.logout();
    localStorage.removeItem("access_token");

    router.push({name: "Login"});

}

</script>