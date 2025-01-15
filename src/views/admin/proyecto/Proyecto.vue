<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nuevo Proyecto" icon="pi pi-plus" class="mr-2" @click="abrirDialogNuevoProyecto" />
                    <Button label="Eliminar" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedProyectos || !selectedProyectos.length" />
                </template>

                <template #end>
                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" customUpload chooseLabel="Importar" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" />
                    <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                v-model:selection="selectedProyectos"
                :value="proyectos"
                dataKey="id"
                lazy
                :paginator="true"
                :totalRecords="totalRecords"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[2, 5, 10]"
                currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} proyectos"
                @page="onPage($event)"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Gestión Proyectos</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="buscar" placeholder="Buscar..." @keyup.enter="getProyectos()"/>
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="ID" sortable style="min-width: 2rem"></Column>
                <Column field="nombre" header="Proyecto" sortable style="min-width: 16rem"></Column>
                <!--
                <Column header="Image">
                    <template #body="slotProps">
                        <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                -->
                
                <Column field="fecha_inicio" header="Fecha INICIO" sortable style="min-width: 5rem"></Column>
                <Column field="fecha_fin" header="Fecha FIN" sortable style="min-width: 5rem"></Column>

                
                <Column field="estado" header="ESTADO" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.estado" :severity="getStatusLabel(slotProps.data.estado)" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import proyectoService from "./../../../services/proyecto.service"


const selectedProyectos = ref([]);
const dt = ref();
const proyectos = ref([])
const totalRecords = ref()
const lazyParams = ref({})
const buscar = ref("")


onMounted(() => {
    getProyectos()

    lazyParams.value = {
        first: 0,
        rows: 10,
        sortField: null,
        sortOrder: null
    }
})

const getProyectos = async () => {
    const { data } = await proyectoService.listar(lazyParams.value.page+1, lazyParams.value.rows, buscar.value)

    proyectos.value = data.data;
    totalRecords.value = data.total
}

const onPage = async (event) => {
    console.log(event)
    lazyParams.value = event
    getProyectos()
}


const abrirDialogNuevoProyecto = () => {

}

const confirmDeleteSelected = () => {

}

const exportCSV = () => {
    dt.value.exportCSV();
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'activo':
            return 'success';

        case 'completado':
            return 'warn';

        case 'cancelado':
            return 'danger';

        default:
            return null;
    }
};

</script>