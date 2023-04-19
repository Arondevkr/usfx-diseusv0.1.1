<script setup lang="ts">
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

const chartRef = ref<HTMLCanvasElement | null>(null);
const chartRef2 = ref<HTMLCanvasElement | null>(null);
const chartRef3 = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const myChart = new Chart(chartRef.value!, {
    type: "pie",
    data: {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          data: [12, 19, 3, 34, 10, 33, 45, 20, 60, 45, 45, 16],
          borderWidth: 3,
        },
      ],
    },

    options: {
      plugins: {
        title: {
          display: true,
          text: "titulo",
          color: "#0D6EFD",
          font: {
            size: 16,
          },
        },
        legend: {
          display: false,
        },
      },
    },
  });

  const myChart2 = new Chart(chartRef2.value!, {
    // type: "pie",
    type: "bar",

    data: {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          data: [12, 19, 3, 34, 10, 33, 45, 20, 60, 45, 45, 16],
          borderWidth: 3,
        },
      ],
    },

    options: {
      plugins: {
        title: {
          display: true,
          text: "titulo",
          color: "#0D6EFD",
          font: {
            size: 16,
          },
        },
        legend: {
          display: false,
        },
      },
    },
  });

  const myChart3 = new Chart(chartRef3.value!, {
    // type: "pie",
    type: "polarArea",

    data: {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          data: [12, 19, 3, 34, 10, 33, 45, 20, 60, 45, 45, 16],
          borderWidth: 3,
        },
      ],
    },

    options: {
      plugins: {
        title: {
          display: true,
          text: "titulo",
          color: "#0D6EFD",
          font: {
            size: 16,
          },
        },
        legend: {
          display: false,
        },
      },
    },
  });
});

const personas = [
  { id: 1, nombre: "Juan", apellido: "Pérez", ciudad: "Buenos Aires" },
  { id: 2, nombre: "María", apellido: "González", ciudad: "Madrid" },
  { id: 3, nombre: "Pedro", apellido: "García", ciudad: "Barcelona" },
  { id: 4, nombre: "Ana", apellido: "López", ciudad: "Ciudad de México" },
  { id: 5, nombre: "Pedro", apellido: "García", ciudad: "Barcelona" },
  { id: 6, nombre: "Ana", apellido: "López", ciudad: "Ciudad de México" },
  { id: 7, nombre: "Pedro", apellido: "García", ciudad: "Barcelona" },
  { id: 8, nombre: "Ana", apellido: "López", ciudad: "Ciudad de México" },
  { id: 9, nombre: "Pedro", apellido: "García", ciudad: "Barcelona" },
  { id: 10, nombre: "Ana", apellido: "López", ciudad: "Ciudad de México" },
];
</script>

<template>
  <div id="body-pd" class="container-fluid main-pd div-pad">
    <!-- cards -->
    <div class="row">
      <div class="col-xl-3 col-sm-6 col-12 mb-3">
        <div class="card shadow-sm border-0">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="media-body text-left col mr1">
                  <h3 class="success text-primary">156</h3>
                  <span>New Clients</span>
                </div>
                <div class="col-auto">
                  <i
                    class="bi bi-person-badge text-primary"
                    style="font-size: 3rem"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-sm-6 col-12 mb-3">
        <div class="card shadow-sm border-0">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="media-body text-left col mr1">
                  <h3 class="success text-primary">156</h3>
                  <span>New Clients</span>
                </div>
                <div class="col-auto">
                  <i
                    class="bi bi-person-badge text-primary"
                    style="font-size: 3rem"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-sm-6 col-12 mb-3">
        <div class="card shadow-sm border-0">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="media-body text-left col mr1">
                  <h3 class="warning text-primary">64.89 %</h3>
                  <span>Conversion Rate</span>
                </div>
                <div class="col-auto">
                  <i
                    class="bi bi-person-badge text-primary"
                    style="font-size: 3rem"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 col-12">
        <div class="card shadow-sm border-0">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="media-body text-left col mr1">
                  <h3 class="primary text-primary">423</h3>
                  <span>Support Tickets</span>
                </div>
                <div class="col-auto">
                  <i
                    class="bi bi-person-badge text-primary"
                    style="font-size: 3rem"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- charts -->
    <div class="row">
      <div class="col-xl-3 col-sm-3 col-3 mb-3">
        <div class="card">
          <!-- <div class="card-header">Club's</div> -->
          <div class="">
            <canvas ref="chartRef"></canvas>
          </div>
        </div>
      </div>

      <div class="col-xl-6 col-sm-6 col-6 mb-3">
        <div class="card">
          <!-- <div class="card-header">Club's estado</div> -->
          <div class="">
            <canvas ref="chartRef2"></canvas>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-sm-3 col-3 mb-3">
        <div class="card">
          <!-- <div class="card-header">Club's</div> -->
          <div class="">
            <canvas ref="chartRef3"></canvas>
          </div>
        </div>
      </div>
    </div>
    <!-- pregunta -->
    <div class="row">
      <div class="col-xl-12 col-sm-12 col-12 mb-3">
        <div class="card shadow-sm border-0">
          <div class="card-content">
            <div class="card-body">
              <div class="media-body text-left col mr1">
                <h4>¿pregunta?</h4>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input border-dark"
                    type="radio"
                    name="rad1"
                    id="idrad1"
                    value="1"
                  />
                  <label class="form-check-label">1</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input border-dark"
                    type="radio"
                    name="rad1"
                    id="idrad2"
                    value="2"
                  />
                  <label class="form-check-label">2</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input border-dark"
                    type="radio"
                    name="rad1"
                    id="idrad2"
                    value="3"
                  />
                  <label class="form-check-label">3</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- dataTables -->
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
                    <button class="btn btn-outline-secondary btn-sm">
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
                        <th scope="col">nombre</th>
                        <th scope="col">apellido</th>
                        <th scope="col">ciudad</th>
                        <th scope="col">acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in personas">
                        <td>{{ item.id }}</td>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.apellido }}</td>
                        <td>{{ item.ciudad }}</td>
                        <td>
                          <div
                            class="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              class="btn btn btn-outline-primary btn-sm"
                            >
                              <i class="bi bi-eye"></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn btn-outline-primary btn-sm"
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn btn-outline-danger btn-sm"
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
                    <div
                      class="dataTables_info"
                      id="example_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing 1 to 10 of 57 entries
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-7">
                    <div
                      class="dataTables_paginate paging_simple_numbers"
                      id="example_paginate"
                    >
                      <ul class="pagination">
                        <li
                          class="paginate_button page-item previous disabled"
                          id="example_previous"
                        >
                          <a
                            aria-controls="example"
                            aria-disabled="true"
                            aria-role="link"
                            data-dt-idx="previous"
                            tabindex="0"
                            class="page-link"
                            >Previous</a
                          >
                        </li>
                        <li class="paginate_button page-item active">
                          <a
                            href="#"
                            aria-controls="example"
                            aria-role="link"
                            aria-current="page"
                            data-dt-idx="0"
                            tabindex="0"
                            class="page-link"
                            >1</a
                          >
                        </li>
                        <li class="paginate_button page-item">
                          <a
                            href="#"
                            aria-controls="example"
                            aria-role="link"
                            data-dt-idx="1"
                            tabindex="0"
                            class="page-link"
                            >2</a
                          >
                        </li>
                        <li class="paginate_button page-item">
                          <a
                            href="#"
                            aria-controls="example"
                            aria-role="link"
                            data-dt-idx="2"
                            tabindex="0"
                            class="page-link"
                            >3</a
                          >
                        </li>
                        <li class="paginate_button page-item">
                          <a
                            href="#"
                            aria-controls="example"
                            aria-role="link"
                            data-dt-idx="3"
                            tabindex="0"
                            class="page-link"
                            >4</a
                          >
                        </li>
                        <li class="paginate_button page-item">
                          <a
                            href="#"
                            aria-controls="example"
                            aria-role="link"
                            data-dt-idx="4"
                            tabindex="0"
                            class="page-link"
                            >5</a
                          >
                        </li>
                        <li class="paginate_button page-item">
                          <a
                            href="#"
                            aria-controls="example"
                            aria-role="link"
                            data-dt-idx="5"
                            tabindex="0"
                            class="page-link"
                            >6</a
                          >
                        </li>
                        <li
                          class="paginate_button page-item next"
                          id="example_next"
                        >
                          <a
                            href="#"
                            aria-controls="example"
                            aria-role="link"
                            data-dt-idx="next"
                            tabindex="0"
                            class="page-link"
                            >Next</a
                          >
                        </li>
                      </ul>
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
</template>
