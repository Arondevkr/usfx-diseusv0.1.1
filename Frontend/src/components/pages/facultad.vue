<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import http from "@/plugins/axios";
import { Modal } from "bootstrap";
import type { Facultad } from "@/types/facultad";
import type { routeLocationKey } from "vue-router";
let modal: Modal;
const modalnuevo = ref<HTMLElement | null>(null);
let Modalprincipal: Modal;
var modelSeleccionado = ref("");

//funciones que se llaman al iniciar la pagina
onMounted(() => {
  modalUtil();
  getListar();
});

//funcion que llama al modal
const modalRef = ref<HTMLElement | null>(null);
function modalUtil() {
  Modalprincipal = modalnuevo.value
    ? new Modal(modalnuevo.value)
    : Modalprincipal;

  (document.getElementById("btnModal") as HTMLElement).addEventListener(
    "click",
    () => {
      modelSeleccionado.value = "nuevo";
      nombre.value = "";
      idAreaVocacional.value = "";
      totalEstudiantes.value = "";
      Modalprincipal.show();
    }
  );
}

//endpoint de la pagina
const props = defineProps<{
  ENDPOINT_API: string;
}>();
const ENDPOINT = props.ENDPOINT_API;

// paginacion y llamada de datos
const listar = ref<Facultad[]>([]);

const pagina = ref(1);
const limite = 10;
const totalpag = ref();
const total = ref();
const busqueda = ref("");
const carrerasList = ref();

//funcion acceso a dom para modificacion de variable paginacion
watch(pagina, function () {
  modalUtil();
  getListar();
});

async function getListar() {
  await http
    .get(
      `${ENDPOINT}?limite=${limite}&pagina=${pagina.value}&busqueda=${busqueda.value}`
    )
    .then((response) => {
      listar.value = response.data.data;
      totalpag.value = response.data.totalpag;
      total.value = response.data.totalreg;
      carrerasList.value = response.data.carrerasList;
    });
  console.log(listar.value);
}

// async function getListar() {
//   await http
//     // .get(
//     //   `carrera`
//     // )
//     .get(
//       `${ENDPOINT}?limite=${limite}&pagina=${pagina.value}&busqueda=${busqueda.value}`
//     )
//     .then((response) => {
//       listar.value = response.data.data;
//       totalpag.value = response.data.totalpag;
//       total.value = response.data.totalreg;
//       carrerasList.value = response.data.carrerasList;
//     });
//   console.log(listar.value);
// }

const nombre = ref("");
const idAreaVocacional = ref("");
const totalEstudiantes = ref("");
// nacimiento.value ="2023-09-06T04:00:00.000Z";
var id: number;

async function llamarModificar(idn: number) {
  modelSeleccionado.value = "editar";
  id = idn;

  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    nombre.value = response.data.nombre;
    idAreaVocacional.value = response.data.idAreaVocacional;
    totalEstudiantes.value = response.data.totalEstudiantes;
  });
  await Modalprincipal.show();
  console.log("nombre", nombre.value);
  console.log("idAreaVocacional ", idAreaVocacional.value);
  console.log("totalEstudiantes ", totalEstudiantes.value);
}

async function guardarModificado() {
  console.log("id sabe", id);
  await http.patch(`${ENDPOINT}/${id}`, {
    nombre: nombre.value,
    idAreaVocacional: idAreaVocacional.value,
    totalEstudiantes: totalEstudiantes.value,
  });
  console.log(nombre.value);
  await Modalprincipal.hide();
  await getListar();
}

async function crearNuevo() {
  console.log("nombre", nombre.value);
  console.log("idAreaVocacional", idAreaVocacional.value);
  console.log("totalEstudiantes", totalEstudiantes.value);
  // console.log("nacimiento", nacimiento.value);
  Modalprincipal.hide;
  await http
    .post(ENDPOINT, {
      nombre: nombre.value,
      idAreaVocacional: idAreaVocacional.value,
      totalEstudiantes: totalEstudiantes.value,
    })
    .catch((error) => {
      console.log(error);
    });
    await getListar();
}

async function eliminar(id: number) {
  console.log("eliminar id:", id);

  var r = confirm("¿Está seguro que se desea eliminar la Facultad?");
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getListar());
  }
}
</script>
<template>
  <div id="body-pd" class="container-fluid main-pd div-pad">
    <div class="row">
      <div class="col-xl-12 col-sm-12 col-12 mb-3">
        <div class="card shadow-sm border-0">
          <div class="card-header">
            <div class="row flex-between-end">
              <div class="col-auto align-self-center">
                <h5 class="mb-0" data-anchor="data-anchor" id="search-example">
                  Tabla ejemplo Facultad<a
                    class="anchorjs-link"
                    aria-label="Anchor"
                    data-anchorjs-icon="#"
                    href="#search-example"
                    style="padding-left: 0.375em"
                  ></a>
                </h5>
              </div>
            </div>
          </div>
          <div class="card-header">
            <div id="example_wrapper" class="dataTables_wrapper dt-bootstrap5">
              <div class="row">
                <div class="col-2">
                  <div class="" id="example_length">
                    <select class="form-select form-select-sm">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div>
                    <button  class="btn btn-outline-secondary btn-sm" id="btnModal"  >
                      <i class="bi bi-plus-circle-fill"></i>
                    </button>

                    <button class="btn btn-outline-secondary btn-sm">
                      <i class="bi bi-building-down"></i>
                    </button>
                    <button class="btn btn-outline-secondary btn-sm">
                      <i class="bi bi-printer-fill"></i>
                    </button>
                  </div>
                </div>
                <div class="col-4">
                  <div>
                    <input
                      type="search"
                      class="form-control form-control-sm"
                      v-model="busqueda"
                      v-on:input="getListar"
                      placeholder="Buscar.."
                    />
                  </div>
                </div>
              </div>
              <div class="row dt-row">
                <div class="col-sm-12 table-responsive">
                  <table class="table table-sm table-hover table-auto">
                    <thead>
                      <tr class="table-secondary">
                        <th scope="col">No</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">id AreaVocacional</th>
                        <th scope="col">total Estudiantes</th>
                        <th scope="col">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in listar.values()">
                        <td>{{ item.id }}</td>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.idAreaVocacional }}</td>
                        <td>{{ item.totalEstudiantes }}</td>
                        <!-- <td>{{ item.relcolegio.nombre }}</td> -->
                        <td>
                          <div
                            class="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              class="btn btn btn-outline-primary btn-sm"
                              @click="llamarModificar(item.id)"
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn btn-outline-danger btn-sm"
                              @click="eliminar(item.id)"
                            >
                              <i class="bi bi-trash3-fill"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="row">
                  <div class="col-sm-12 col-md-5">
                    <div class="dataTables_info">
                      Pagina {{ pagina }} de {{ totalpag }} - total registros
                      {{ total }}
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-7">
                    <nav>
                      <ul class="pagination pagination-sm">
                        <div
                          v-bind:class="{ disabled: pagina === 1 }"
                          class="page-item"
                        >
                          <button
                            id="pag_ant"
                            title="Pagina anterior "
                            class="page-item page-link"
                            @click="pagina--"
                          >
                            Anterior
                          </button>
                        </div>
                        <div v-for="itempage in totalpag">
                          <li
                            v-bind:class="{ active: pagina === itempage }"
                            class="page-item"
                            aria-current="page"
                            v-if="
                              itempage > pagina - 3 && itempage < pagina + 3
                            "
                            @click="pagina = itempage"
                          >
                            <a class="page-link" href="#"> {{ itempage }}</a>
                          </li>
                        </div>
                        <div
                          v-bind:class="{ disabled: pagina === totalpag }"
                          class="page-item btn-sm"
                        >
                          <button
                            id="pag_ant"
                            title="Pagina anterior "
                            class="page-item page-link"
                            @click="pagina++"
                          >
                            Siguiente
                          </button>
                        </div>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal nuevo -->
  <div
    class="modal fade"
    id="modalNuevo"
    tabindex="-1"
    aria-hidden="true"
    ref="modalnuevo"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">nuevo</h5>
        </div>
        <div class="modal-body">
          <form class="row g-1" @submit.prevent="crearNuevo">
            <div class="col-md-12">
              <label>Nombre de Facultad</label>
              <input
              type="text"
              class="form-control"
              v-model="nombre"
              required
              />
              <label>id AreaVocacional</label>
              <input
              type="number"
              class="form-control"
              v-model="idAreaVocacional"
              required
              />
              <label>Total Estudiantes</label>
              <input
                type="number"
                class="form-control"
                v-model="totalEstudiantes"
                required
              />
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                data-bs-dismiss="modal"
                type="button"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="btn btn-success"
                data-bs-dismiss="modal"
                v-if="modelSeleccionado == 'nuevo'"   
                          
                >Crear
              </button>
              <button
                type="button"
                class="btn btn-success"
                v-if="modelSeleccionado == 'editar'"
                @click.prevent="guardarModificado()"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
