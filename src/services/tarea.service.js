import Api from "./api.service";

export default {
  listar: () => {
    return Api().get("/tarea");
  },

  guardar: (datos) => {
    return Api().post("/tarea", datos);
  },

  mostrar: (id) => {
    return Api().get(`/tarea/${id}`);
  },

  modificar: (id, datos) => {
    return Api().put(`/tarea/${id}`, datos);
  },

  eliminar: (id) => {
    return Api().delete(`/tarea/${id}`);
  },
};
