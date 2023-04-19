<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import http from "@/plugins/axios";
import { Modal } from "bootstrap";
import type { Estudiante } from "@/types/estudiante";
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
      rude.value = "";
      carnet.value = "";
      nacimiento.value = "";
      Modalprincipal.show();
      colegio.value = "";
    }
  );
}

//endpoint de la pagina
const props = defineProps<{
  ENDPOINT_API: string;
}>();
const ENDPOINT = props.ENDPOINT_API;

// paginacion y llamada de datos
const listar = ref<Estudiante[]>([]);

const pagina = ref(1);
const limite = 10;
const totalpag = ref();
const total = ref();
const busqueda = ref("");
const colegiosList = ref();

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
      colegiosList.value = response.data.colegiosList;
    });
  console.log(listar.value);
}

const nombre = ref("");
const rude = ref("");
const carnet = ref("");

const nacimiento = ref("");
const colegio = ref("");
// nacimiento.value ="2023-09-06T04:00:00.000Z";
var id: number;

async function llamarModificar(idn: number) {
  modelSeleccionado.value = "editar";
  id = idn;

  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    nombre.value = response.data.nombre;
    rude.value = response.data.rude;
    carnet.value = response.data.carnet;
    nacimiento.value = new Date(response.data.fechaNacimiento)
      .toISOString()
      .slice(0, 10);
    colegio.value = response.data.idColegio;
  });
  Modalprincipal.show();
  console.log("nombre", colegio.value);
  // console.log("nombre", nombre.value);
  // console.log("rude", rude.value);
  // console.log("carnet", carnet.value);
  // console.log("nacimiento", nacimiento.value);
}

async function guardarModificado() {
  console.log("id sabe", id);
  await http.patch(`${ENDPOINT}/${id}`, {
    nombre: nombre.value,
    rude: rude.value,
    carnet: carnet.value,
    fechaNacimiento: nacimiento.value,
    idColegio: colegio.value,
  });
  console.log(colegio.value);
  getListar();
  Modalprincipal.hide();
}

async function crearNuevo() {
  // console.log("nombre", nombre.value);
  // console.log("rude", rude.value);
  // console.log("carnet", carnet.value);
  // console.log("nacimiento", nacimiento.value);
  Modalprincipal.hide;
  await http
    .post(ENDPOINT, {
      nombre: nombre.value,
      rude: rude.value,
      carnet: carnet.value,
      fechaNacimiento: nacimiento.value,
    })
    .catch((error) => {
      console.log(error);
    });
}

async function eliminar(id: number) {
  console.log("eliminar id:", id);

  var r = confirm("¿Está seguro que se desea eliminar el Intérprete?");
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
                  Tabla ejemplo<a
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
                    <button
                      class="btn btn-outline-secondary btn-sm"
                      id="btnModal"
                    >
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
                        <th scope="col">Rude</th>
                        <th scope="col">Carnet</th>
                        <th scope="col">Nacimiento</th>
                        <th scope="col">IdCol</th>
                        <th scope="col">IdCarrera</th>
                        <th scope="col">idarea sel</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in listar.values()">
                        <td>{{ item.numero }}</td>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.rude }}</td>
                        <td>{{ item.carnet }}</td>
                        <td>
                          {{
                            new Date(item.fechaNacimiento).toLocaleDateString()
                          }}
                        </td>
                        <!-- <td>{{ item.relcolegio.nombre }}</td> -->
                        <td>{{ item.relcolegio ? item.relcolegio.nombre : '' }}</td>
                        <td>{{ item.idCarreraSeleccionada }}</td>
                        <td>{{ item.idAreaSeleccionada }}</td>
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
              <label>Nombre y apellido</label>
              <input
                type="text"
                class="form-control"
                v-model="nombre"
                required
              />
            </div>
            <div class="col-md-12">
              <label>Rude</label>
              <input
                type="number"
                class="form-control"
                v-model="rude"
                required
              />
            </div>
            <div class="col-md-12">
              <label>Cedula identidad</label>
              <input
                type="number"
                class="form-control"
                v-model="carnet"
                required
              />
            </div>
            <div class="col-md-12">
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                class="form-control"
                v-model="nacimiento"
                required
              />
            </div>
            <div class="form-floating">
              <select
                v-model="colegio"
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option value="" disabled>seleccione</option>
                <template v-for="option in colegiosList">
                  <option :value="option.id">{{ option.nombre }}</option>
                </template>
              </select>
              <label for="floatingSelect">Club</label>
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
                v-if="modelSeleccionado == 'nuevo'"
              >
                Crear
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
