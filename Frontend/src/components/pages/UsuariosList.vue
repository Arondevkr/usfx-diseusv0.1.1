<script setup lang="ts">
import type { Usuario } from "@/types/usuario";
import { onMounted, ref, watch } from "vue";
import http from "@/plugins/axios";
import { Modal } from "bootstrap";

const modalRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  ENDPOINT_API: string;
}>();
const ENDPOINT = props.ENDPOINT_API;

// paginacion y llamada de datos
const listar = ref<Usuario[]>([]);

const pagina = ref(1);
const limite = 10;
const totalpag = ref();
const total = ref();
const busqueda = ref("");

// const imgpruev = ref();
async function getListar() {
  // console.log("imgref:",inputprueba);

  await http
    .get(
      `${ENDPOINT}?limite=${limite}&pagina=${pagina.value}&busqueda=${busqueda.value}`
    )
    .then((response) => {
      listar.value = response.data.data;
      totalpag.value = response.data.totalpag;
      total.value = response.data.totalreg;
    });

  // for que recorre cada array recibiendo, designando id al cual se lleva el archivo, y montando la imagen
  for (let i = 0; i < listar.value.length; i++) {
    // llamada nobre de archivo imagen desde servidor
    const srvimg = listar.value[i].avatar;
    const response = await http.get(`${ENDPOINT}/imagen/${srvimg}`, {
      responseType: "arraybuffer",
    });
    // conversion de dato resibido a base64
    const imageData = response.data;
    const imageBytes = new Uint8Array(imageData);
    const imageString = imageBytes.reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    const imageBase64 = btoa(imageString);
    // designando el id segun valor [i] fel for
    const imageElement = document.getElementById(
      "imagen-" + listar.value[i].id
    ) as HTMLImageElement;
    // enviando la imagen al id previo para la visualizacion de la data en base64
    imageElement.src = "data:image/jpeg;base64," + imageBase64;
  }
}

function modalUtil() {
  if (modalRef.value) {
    modal = new Modal(modalRef.value);
  }
  var fileInput = document.getElementById("imagein") as HTMLInputElement;
  var imgEdit = document.getElementById("imgModalEdit") as HTMLImageElement;

  fileInput.addEventListener("change", () => {
    const file = (fileInput?.files ?? [])[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      imgEdit.src = reader.result as string;
    });
    reader.readAsDataURL(file);
  });

  //funciones lectura onput file,  img modal nuevo
  var fileInputnew = document.getElementById("imageinNew") as HTMLInputElement;
  var imgEnew = document.getElementById("imgModalNew") as HTMLImageElement;

  fileInputnew.addEventListener("change", () => {
    const file = (fileInputnew?.files ?? [])[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      imgEnew.src = reader.result as string;
    });
    reader.readAsDataURL(file);
  });
}

let modal: Modal;
onMounted(() => {
  modalUtil();
  getListar();
});
function lanzarModalNuevo() {
  modal.show();
}

const usuario = ref("");
const clave = ref("");
const nombres = ref("");
const apellidos = ref("");
const rol = ref("");
const avatar = ref("");
var id: number;

async function crearNuevo() {
  modal.hide();
  var fileInput = document.getElementById("imageinNew") as HTMLInputElement;

  const rol11 = document.querySelector(
    'input[name="rolusernew"]:checked'
  ) as HTMLInputElement;
  const selectedValue = rol11.value;
  rol.value = selectedValue;

  if (fileInput?.files?.length) {
    const firstFile = (fileInput?.files ?? [])[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", firstFile);
    console.log("bodyy:", bodyFormData);
    var config = { headers: { "Content-Type": "multipart/form-data" } };
    await http
      .post(`${ENDPOINT}/imagen`, bodyFormData, config)
      .then((response) => {
        avatar.value = response.data;
      });
  }

  await http
    .post(ENDPOINT, {
      usuario: usuario.value,
      clave: clave.value,
      nombres: nombres.value,
      apellidos: apellidos.value,
      rol: rol.value,
      avatar: avatar.value,
    })
    .catch((error) => {
      console.log(error);
    });

  // console.log("usuario :", usuario.value);
  // console.log("clave :", clave.value);
  // console.log("nombres :", nombres.value);
  // console.log("apellidos :", apellidos.value);
  // console.log("rol :", rol.value);
  // console.log("avatar :", avatar.value);

  // usuario.value = "";
  // clave.value = "";
  // nombres.value = "";
  // apellidos.value = "";
  // rol.value = "";
  // avatar.value = "";
  return getListar();
}

async function llamarModificar(ide: number, imge: string) {
  id = ide;
  avatar.value = imge;

  // llamada nobre de archivo imagen desde servidor
  const response = await http.get(`${ENDPOINT}/IMAGEN/${imge}`, {
    responseType: "arraybuffer",
  });
  // conversion de dato resibido a base64
  const imageData = response.data;
  const imageBytes = new Uint8Array(imageData);
  const imageString = imageBytes.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  const imageBase64 = btoa(imageString);
  const imageElement = document.getElementById(
    "imgModalEdit"
  ) as HTMLImageElement;

  // enviando la imagen al id previo para la visualizacion de la data en base64
  imageElement.src = "data:image/jpeg;base64," + imageBase64;

  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    (usuario.value = response.data.usuario),
      (clave.value = response.data.clave),
      (nombres.value = response.data.nombres);
    apellidos.value = response.data.apellidos;
    rol.value = response.data.rol;
  });
  if (rol.value == "1") {
    var rols = document.getElementById("rolrad2") as HTMLInputElement;
    rols.checked = true;
  }
  if (rol.value == "0") {
    var rols1 = document.getElementById("rolrad1") as HTMLInputElement;
    rols1.checked = true;
  }

  // console.log(rols.value);
}

async function guardarModificado() {
  console.log("idd", id);
  const rol11 = document.querySelector(
    'input[name="roluseredit"]:checked'
  ) as HTMLInputElement;
  const selectedValue = rol11.value;
  rol.value = selectedValue;
  // // 1 enviar nuevo archivo
  var fileInput = document.getElementById("imagein") as HTMLInputElement;

  if (fileInput?.files?.length) {
    console.log("image a eliminar", avatar.value);
    await http.delete(`${ENDPOINT}/imagen/${avatar.value}`);
    const firstFile = (fileInput?.files ?? [])[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", firstFile);
    var config = { headers: { "Content-Type": "multipart/form-data" } };
    await http
      .post(`${ENDPOINT}/imagen`, bodyFormData, config)
      .then((response) => {
        avatar.value = response.data;
      });
  }

  await http.patch(`${ENDPOINT}/${id}`, {
    usuario: usuario.value,
    clave: clave.value,
    nombres: nombres.value,
    apellidos: apellidos.value,
    rol: rol.value,
    avatar: avatar.value,
  });
  // vaciado de variables

  console.log("usuario:", usuario.value);
  console.log("clave:", clave.value);
  console.log("nombres:", nombres.value);
  console.log("apellidos:", apellidos.value);
  console.log("rol:", rol.value);
  console.log("avatar:", avatar.value);

  // usuario.value = "";
  // clave.value = "";
  // nombres.value = "";
  // apellidos.value = "";
  // rol.value = "";
  // avatar.value = "";
  return getListar();
}

async function eliminar(id: number, avatar: string) {
  console.log("eliminar id:", id);
  console.log("avatar:", avatar);
  var r = confirm("¿Está seguro que se desea eliminar el Intérprete?");
  if (r == true) {
    await http.delete(`${ENDPOINT}/imagen/${avatar}`);
    await http.delete(`${ENDPOINT}/${id}`).then(() => getListar());
  }
}
</script>
<template>
  <!-- main  -->
  <div id="right-panel" class="right-panel">
    <div class="col-xl-12 card border-left-primary shadow h-100 py-2 divl">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <strong class="card-title">series</strong>
            </div>
            <div class="card-body">
              <div
                id="bootstrap-data-table_wrapper"
                class="dataTables_wrapper container-fluid dt-bootstrap no-footer"
              >
                <div class="row">
                  <div class="col-sm-12 col-md-12">
                    <div
                      id="bootstrap-data-table_filter"
                      class="dataTables_filter"
                    >
                      <label
                        ><input
                          type="search"
                          class="form-control form-control-sm"
                          placeholder="Buscar:"
                          v-model="busqueda"
                          v-on:input="getListar"
                      /></label>
                      <label
                        ><button
                          type="button"
                          class="form-control form-control-sm"
                          title="Agregar nuevo"
                          @click="lanzarModalNuevo"
                        >
                          <i class="bi bi-plus-circle"></i>
                          Nuevo
                        </button>
                      </label>
                      <!-- <label
                          ><button
                            type="button"
                            class="form-control form-control-sm"
                            aria-controls="bootstrap-data-table"
                            title="Exportar archivo excel"
                            @click="exportExcel"
                          >
                            <i class="bi bi-file-earmark-spreadsheet"
                              >Exportar</i
                            >
                          </button>
                        </label> -->
                      <!-- <label
                          ><button
                            type="button"
                            class="form-control form-control-sm"
                            aria-controls="bootstrap-data-table"
                            title="imprimir pagina"
                            @click="printPage"
                          >
                            <i class="bi bi-printer">Imprimir</i>
                          </button>
                        </label> -->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <table
                      id="table-listar"
                      class="table table-sm table-striped table-bordered dataTable no-footer fadeIn"
                      role="grid"
                      aria-describedby="bootstrap-data-table_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            class="sorting_asc"
                            tabindex="0"
                            aria-controls="bootstrap-data-table"
                            rowspan="1"
                            colspan="1"
                            style="width: 50px"
                            aria-sort="ascending"
                            aria-label="Name: activate to sort column descending"
                          >
                            Nº
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="bootstrap-data-table"
                            rowspan="1"
                            colspan="1"
                            style="width: 80px"
                            aria-label="Position: activate to sort column ascending"
                          >
                            Imagen
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="bootstrap-data-table"
                            rowspan="1"
                            colspan="1"
                            style="width: 140px"
                            aria-label="Position: activate to sort column ascending"
                          >
                            Usuario
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="bootstrap-data-table"
                            rowspan="1"
                            colspan="1"
                            style="width: 140px"
                            aria-label="Position: activate to sort column ascending"
                          >
                            Nombre(s)
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="bootstrap-data-table"
                            rowspan="1"
                            colspan="1"
                            style="width: 140px"
                            aria-label="Position: activate to sort column ascending"
                          >
                            Apellido(s)
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="bootstrap-data-table"
                            rowspan="1"
                            colspan="1"
                            style="width: 70px"
                            aria-label="Office: activate to sort column ascending"
                          >
                            Rol
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="bootstrap-data-table"
                            rowspan="1"
                            colspan="1"
                            style="width: 80px"
                            aria-label="Salary: activate to sort column ascending"
                          >
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          role="row"
                          class="odd"
                          v-for="(item, index) in listar.values()"
                          :key="item.id"
                        >
                          <th v-if="pagina > 1" scope="row">
                            {{ index + 1 + (pagina - 1) * 10 }}
                          </th>
                          <th v-if="pagina < 2" scope="row">
                            {{ index + 1 }}
                          </th>
                          <td>
                            <img
                              class="rounded"
                              src=""
                              :id="'imagen-' + item.id"
                              style="height: 34px"
                            />
                          </td>
                          <td>{{ item.usuario }}</td>
                          <td>{{ item.nombres }}</td>
                          <td>{{ item.apellidos }}</td>
                          <td>
                            <div
                              style="width: 52px"
                              v-if="item.rol == '1'"
                              class="bg-primary text-white text-center rounded"
                            >
                              Admin
                            </div>
                            <div
                              v-if="item.rol == '0'"
                              style="width: 52px"
                              class="bg-danger text-white text-center rounded"
                            >
                              Usuario
                            </div>
                          </td>
                          <!-- <td>{{ item.avatar }}</td> -->
                          <td>
                            <i
                              @click="llamarModificar(item.id, item.avatar)"
                              class="btn btn-outline-dark btn-sm bi bi-pencil"
                              data-bs-toggle="modal"
                              data-bs-target="#modalEdit"
                            ></i
                            >&nbsp;
                            <i
                              @click="eliminar(item.id, item.avatar)"
                              class="btn btn-outline-dark btn-sm bi-trash3"
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- paginacion -->
                    <div class="row">
                      <div class="col-sm-12 col-md-5">
                        <div class="dataTables_info">
                          Pagina {{ pagina }} de {{ totalpag }} - total
                          registros
                          {{ total }}
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-7">
                        <nav>
                          <ul class="pagination">
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
                                <a class="page-link" href="#">
                                  {{ itempage }}</a
                                >
                              </li>
                            </div>
                            <div
                              v-bind:class="{ disabled: pagina === totalpag }"
                              class="page-item"
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
                    <!-- fin paginacion -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  <!-- modal edit -->
  <div
    class="modal fade"
    id="modalEdit"
    aria-labelledby="modalEdit"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalEdit">Editar Usuario</h5>
        </div>
        <div class="modal-body">
          <form class="row g-1" @submit.prevent="guardarModificado">
            <div class="col-md-12" style="text-align: center">
              <img
                id="imgModalEdit"
                src="@/assets/images/avatar.png"
                style="height: 100px"
              />
            </div>
            <div class="col-md-12" style="text-align: center">
              <input type="file" accept="image/*" id="imagein" />
            </div>
            <div class="col-md-12">
              <label>Usuario</label>
              <input type="text" class="form-control" v-model="usuario" />
            </div>
            <div class="col-md-12">
              <label>Contraseña</label>
              <input type="text" class="form-control" v-model="clave" />
            </div>
            <div class="col-md-12">
              <label>Nombre(s)</label>
              <input type="text" class="form-control" v-model="nombres" />
            </div>
            <div class="col-md-12">
              <label>Apellido(s)</label>
              <input type="text" class="form-control" v-model="apellidos" />
            </div>
            <div class="col-12">
              <label>Rol</label>
              <div class="form-radio">
                <label>Usuario </label>
                <input
                  name="roluseredit"
                  value="0"
                  id="rolrad1"
                  type="radio"
                  checked
                />&nbsp;
                <label> Administrador </label>
                <input
                  name="roluseredit"
                  vmodel="rol1"
                  value="1"
                  id="rolrad2"
                  type="radio"
                />
              </div>
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
                class="btn btn-primary"
                data-bs-dismiss="modal"
                type="button"
                @click="guardarModificado()"
              >
                Actualizar
              </button>
            </div>
          </form>
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
    ref="modalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">nuevo</h5>
        </div>
        <div class="modal-body">
          <form class="row g-1" @submit.prevent="crearNuevo">
            <div class="col-md-12" style="text-align: center">
              <img
                ref="imgModalnew"
                id="imgModalNew"
                src="@/assets/images/avatar.png"
                style="height: 100px"
              />
              <input type="file" accept="image/*" id="imageinNew" required />
            </div>
            <div class="col-md-12">
              <label>Usuario</label>
              <input
                type="text"
                class="form-control"
                v-model="usuario"
                required
              />
            </div>
            <div class="col-md-12">
              <label>Contraseña</label>
              <input
                type="text"
                class="form-control"
                v-model="clave"
                required
              />
            </div>
            <div class="col-md-12">
              <label>Nombre(s)</label>
              <input
                type="text"
                class="form-control"
                v-model="nombres"
                required
              />
            </div>
            <div class="col-md-12">
              <label>Apellido(s)</label>
              <input
                type="text"
                class="form-control"
                v-model="apellidos"
                required
              />
            </div>
            <div class="col-12">
              <label>Rol</label>
              <div class="form-radio">
                <label>Usuario </label>
                <input name="rolusernew" value="0" type="radio" checked />&nbsp;
                <label> Administrador </label>
                <input name="rolusernew" value="1" type="radio" />
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                data-bs-dismiss="modal"
                type="button"
              >
                Cancelar
              </button>
              <button class="btn btn-success" type="submit">Crear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
