<template>
  <div class="q-pa-md">
    <div style="margin: 2em">
      <q-input standout v-model="search" placeholder="Titulo o ID" :dense="dense" />
    </div>
    
    <q-table
      :rows="state.rows"
      :columns="columns"
      title="Lista de peliculas"
      :rows-per-page-options="[5, 10, 0]"
      row-key="name"
      wrap-cells
      separator="cell"
      :filter="search"
    >
    <template v-slot:top>
        <div class="text-h5">Lista de peliculas</div>
        <q-space/>
        <q-btn label="Guardar cambios" @click="guardarCambios" />
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
            <q-popup-edit v-model.number="props.row.id" v-slot="scope">
              <q-input
                type="number"
                v-model.number="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="nombre" :props="props">
            <div v-html="props.row.nombre"></div>
            <q-popup-edit buttons v-model="props.row.nombre" v-slot="scope">
              <q-editor
                v-model="scope.value"
                min-height="5rem"
                autofocus
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>

          <q-td key="descripcion" :props="props">
            {{ props.row.descripcion }}
            <q-popup-edit
              buttons
              v-model="props.row.descripcion"
              v-slot="scope"
            >
              <q-editor
                v-model="scope.value"
                min-height="5rem"
                autofocus
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>

          <q-td key="valoracion" :props="props">
            <div class="text-pre-wrap">{{ props.row.valoracion }}</div>
            <q-popup-edit buttons v-model.number="props.row.valoracion" v-slot="scope">
              <q-input
                type="number"
                v-model.number="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="imagenFondo" :props="props">
            <div class="text-pre-wrap">{{ props.row.imagenFondo }}</div>
            <q-popup-edit buttons v-model="props.row.imagenFondo" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="linkVideostation" :props="props">
            <div class="text-pre-wrap">{{ props.row.linkVideostation }}</div>
            <q-popup-edit buttons v-model="props.row.linkVideostation" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="logo" :props="props">
            <div class="text-pre-wrap">{{ props.row.logo }}</div>
            <q-popup-edit buttons v-model="props.row.logo" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="poster" :props="props">
            <div class="text-pre-wrap">{{ props.row.poster }}</div>
            <q-popup-edit buttons v-model="props.row.poster" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="categorias" :props="props">
            <div class="text-pre-wrap">{{ props.row.categorias }}</div>
            <q-popup-edit buttons v-model="props.row.categorias" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
      
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, watch } from "vue";
import getPeliculas from "src/firebase/ObtenerPeliculas";
import EditarDatos from "src/firebase/EditarPeliculas"

const columns = [
  { name: "id", align: "left", label: "ID", field: "id", sortable: true },
  {
    name: "nombre",
    style: "min-width: 15em; width: 20em",
    align: "left",
    label: "Nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "descripcion",
    style: "min-width: 45em; width: 60em",
    align: "left",
    label: "Descripción",
    field: "descripcion",
  },
  {
    name: "valoracion",
    align: "left",
    label: "Valoración",
    field: "valoracion",
    sortable: true,
  },
  {
    name: "imagenFondo",
    align: "left",
    label: "URL Imagen Fondo",
    field: "imagenFondo",
  },
  {
    name: "linkVideostation",
    align: "left",
    label: "URL Videostation",
    field: "linkVideostation",
  },
  {
    name: "logo",
    align: "left",
    label: "URL Logo",
    field: "logo",
  },
  {
    name: "poster",
    align: "left",
    label: "URL Poster",
    field: "poster",
  },
  {
    name: "categorias",
    align: "left",
    style: "min-width: 45em; width: 60em",
    label: "Categorias",
    field: "categorias",
  },
];

export default defineComponent({
  name: "EditarPeli",
  setup() {
    const state = reactive({
      rows: [],
    });

    const search = ref("");

    getPeliculas.then((pelis) => {
      state.rows = pelis;
    });



    return {
      state,
      columns,
      search,
      dense: ref(false),
      guardarCambios() {
        console.dir(state.rows)
        EditarDatos(state.rows)
      },
    };
  },
});
</script>
