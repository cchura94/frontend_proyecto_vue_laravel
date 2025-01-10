<template>
  <div class="card">
    
    <Toast />

    <Button label="Nuevo Usuario" @click="visible = true" />

    <Dialog
      v-model:visible="visible"
      modal
      header="Datos de Usuario"
      :style="{ width: '30rem' }"
    >
    {{ usuario }}
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Ingrese datos del Usuario.</span
      >
      <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Nombre Completo</label>
            <InputText id="username" class="flex-auto" autocomplete="off" v-model="usuario.name" />
            <Message v-if="errors.name" severity="error" size="small" variant="simple">{{ errors.name }}</Message>
        </div>
    
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Correo Electronico</label>
        <InputText id="email" class="flex-auto" autocomplete="off" v-model="usuario.email"/>
        <Message v-if="errors.email" severity="error" size="small" variant="simple">{{ errors.email }}</Message>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="pass" class="font-semibold w-24">Contraseña</label>
        <InputText type="password" id="pass" class="flex-auto" autocomplete="off" v-model="usuario.password" />
        <Message v-if="errors.password" severity="error" size="small" variant="simple">{{ errors.password }}</Message>
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button type="button" label="Guardar" @click="funGuardar()"></Button>
      </div>
    </Dialog>

    <DataTable :value="usuarios" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Nombre"></Column>
      <Column field="email" header="CORREO ELECTRONICO"></Column>
      <Column field="action" header="ACCION"></Column>
    </DataTable>

    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>CORREO</th>
          <th>ACCION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usuarios" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <pre>{{ usuarios }}</pre>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import usuarioService from "@/services/usuario.service.js";

import { useToast } from "primevue/usetoast";
const toast = useToast();
import Swal from "sweetalert2"

const usuarios = ref([]);
const visible = ref(false);
const usuario = ref({name:"", email: "", password: ""});
const errors = ref({})

onMounted(() => {
  getListaUsuarios();
});

async function getListaUsuarios() {
  const respuesta = await usuarioService.listar();
  usuarios.value = respuesta.data;
}

async function funGuardar(){
    try {
        const respuesta = await usuarioService.guardar(usuario.value);
        visible.value = false;
        usuario.value = {name:"", email: "", password: ""};
        
        Swal.fire({
            title: "Usuario Registrado!",
            text: "continuar!",
            icon: "success"
        });
    
        toast.add({ severity: 'success', summary: 'Usuario Registrado', detail: 'EL Usuario se ha registrado correctamente en la Base de datos', life: 3000 });
        
        getListaUsuarios();
        
    } catch (error) {
        // alert("ERRRRROOOOR")
        console.log(error.response?.data?.errors);
        errors.value = error.response?.data?.errors
    }
}
</script>
