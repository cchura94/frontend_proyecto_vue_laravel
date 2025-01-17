<template>
    <h1>Detalle Proyecto</h1>
    <pre>{{ proyecto }}</pre>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import proyectoService from '../../../services/proyecto.service';

const proyecto = ref({});
const route = useRoute()

onMounted(() => {
    getProyecto()
})

const getProyecto = async () => {
    const id = route.params.id;
    const {data} = await proyectoService.mostrar(id)
    proyecto.value = data;
}
</script>