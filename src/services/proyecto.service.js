import Api from "./api.service";

export default {
  listar: (page=1, limit=10, buscar='') => {
    return Api().get(`/proyecto?page=${page}&limit=${limit}&buscar=${buscar}`);
  },

  guardar: (datos) => {
    return Api().post("/proyecto", datos);
  },

  mostrar: (id) => {
    return Api().get(`/proyecto/${id}`);
  },

  modificar: (id, datos) => {
    return Api().put(`/proyecto/${id}`, datos);
  },

  eliminar: (id) => {
    return Api().delete(`/proyecto/${id}`);
  },
};