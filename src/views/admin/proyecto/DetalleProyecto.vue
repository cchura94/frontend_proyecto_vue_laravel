<template>
    <div class="w-full mx-auto p-6 bg-white rounded-lg shadow-lg mb-8">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Detalle Proyecto</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
                <p class="font-medium text-gray-600">Nombre del Proyecto</p>
                <p class="text-lg font-semibold text-gray-800">{{ proyecto.nombre }}</p>
            </div>
            <div>
                <p class="font-medium text-gray-600">Descripción</p>
                <p class="text-lg text-gray-700">{{ proyecto.descripcion }}</p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
                <p class="font-medium text-gray-600">Fecha Inicio</p>
                <p class="text-lg font-semibold text-gray-800">{{ proyecto.fecha_inicio }}</p>
            </div>
            <div>
                <p class="font-medium text-gray-600">Fecha Fin</p>
                <p class="text-lg text-gray-700">{{ proyecto.fecha_fin }}</p>
            </div>
        </div>
        <div class="mb-6">
            <div class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: 65%;"></div>
                </div>
                <span class="ml-4 text-lg font-semibold text-gray-800">10.00%</span>
            </div>
        </div>

    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="p-6 bg-white rounded-lg shadow-lg">
                <p class="font-medium text-gray-600">Tareas</p>

                <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nueva Tarea" icon="pi pi-plus" class="mr-2" @click="tareaDialog=true" />
                </template>

                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

                <DataTable :value="tareas" size="small">
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="fecha_inicio" header="F. Inicio"></Column>
                    <Column field="fecha_fin" header="F. Fin"></Column>
                    <Column field="estado" header="Estado"></Column>
                    <Column field="prioridad" header="Prioridad"></Column>
                    <Column field="porcentaje_avance" header="%"></Column>
                </DataTable>
            </div>
            <div class="p-6 bg-white rounded-lg shadow-lg">
                <p class="font-medium text-gray-600">Equipo</p>
                <p class="text-lg text-gray-700">{{ proyecto.descripcion }}</p>
            </div>
        </div>
    <div class="w-full mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Detalle Proyecto</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
                <p class="font-medium text-gray-600">Nombre del Proyecto</p>
                <p class="text-lg font-semibold text-gray-800">{{ proyecto.nombre }}</p>
            </div>
            <div>
                <p class="font-medium text-gray-600">Descripción</p>
                <p class="text-lg text-gray-700">{{ proyecto.descripcion }}</p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
                <p class="font-medium text-gray-600">Fecha Inicio</p>
                <p class="text-lg font-semibold text-gray-800">{{ proyecto.fecha_inicio }}</p>
            </div>
            <div>
                <p class="font-medium text-gray-600">Fecha Fin</p>
                <p class="text-lg text-gray-700">{{ proyecto.fecha_fin }}</p>
            </div>
        </div>
        <div class="mb-6">
            <div class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%;"></div>
                </div>
                <span class="ml-4 text-lg font-semibold text-gray-800">10.00%</span>
            </div>
        </div>
        

   <!--
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
                <p class="font-medium text-gray-600">Tareas</p>
                <p class="text-lg font-semibold text-gray-800">proyecto.No hay Tareas asignadas</p>

            </div>
            <div>
                <p class="font-medium text-gray-600">Tareas</p>
                <p class="text-lg font-semibold text-gray-800">proyecto.No hay Tareas asignadas</p>

            </div>
        </div>
    -->
        <pre>{{ proyecto }}</pre>

        <Dialog v-model:visible="tareaDialog" :style="{ width: '450px' }" header="Nueva tarea" :modal="true">

            <div class="flex flex-col gap-6">
                <div>
                    <label for="name" class="block font-bold mb-3">Nombre</label>
                    <InputText id="name" v-model.trim="tarea.nombre" required="true" autofocus :invalid="submitted && !tarea.nombre" fluid />
                    <small v-if="submitted && !tarea.nombre" class="text-red-500">Nombre de tarea es Obligatorio.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Descripción</label>
                    <Textarea id="description" v-model="tarea.descripcion" required="true" rows="3" cols="20" fluid />
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="description" class="block font-bold mb-3">Fecha INICIO</label>
                        <DatePicker v-model="tarea.fecha_inicio" fluid />
                    </div>
    
                    <div class="col-span-6">
                        <label for="description" class="block font-bold mb-3">Fecha FIN</label>
                        <DatePicker v-model="tarea.fecha_fin" fluid />
                    </div>

                </div>
                

                <!--

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Price</label>
                        <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Quantity</label>
                        <InputNumber id="quantity" v-model="product.quantity" integeronly fluid />
                    </div>
                </div>
                -->
            </div>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Guardar" icon="pi pi-check" @click="guardarTarea()" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import proyectoService from '../../../services/proyecto.service';
import tareaService from '../../../services/tarea.service';

const proyecto = ref({});
const tareas = ref([]);
const route = useRoute()
const tarea = ref({});
const tareaDialog = ref(false);

onMounted(() => {
    getProyecto()
})

const getProyecto = async () => {
    const id = route.params.id;
    const {data} = await proyectoService.mostrar(id)
    proyecto.value = data;
    tareas.value = data.tareas
}

const guardarTarea = async () => {
    tarea.value.proyecto_id = route.params.id;
    tarea.value.estado = "pendiente";
    tarea.value.prioridad = "baja";

    const {data} = await tareaService.guardar(tarea.value);
    tareaDialog.value = false 
    getProyecto();
}
</script>