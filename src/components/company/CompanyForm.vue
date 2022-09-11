<template>
    <v-container fill-height align="center" justify="center">
      <v-row class="ml-3 mr-3">
        <v-progress-linear
          indeterminate
          color="teal"
          :active="show"
        ></v-progress-linear>
      </v-row>
      <v-form v-if="!show" v-model="valid" ref="form" style="flex: 1">
        <v-row class="ml-5 mr-5 mt-5">
          <v-col class="pr-5">
            <v-text-field
              v-model="company.name"
              :rules="[rules.required]"
              label="Name"
              prepend-icon="mdi-account"
              type="text"
              class="description"
              :readonly="!editing"
            />
          </v-col>
        </v-row>
        <v-row class="ml-5 mr-5 mt-5">
          <v-col class="pr-5">
            <v-textarea
                v-model="company.description"
                :rules="[rules.required, rules.counter]"
                label="Description"
                prepend-icon="mdi-format-align-justify"
                full-width
                rows="4"
                single-line
                :readonly="!editing"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row v-if="editable && !editing" class="ml-5 mr-5">
          <v-col>
            <v-btn
              color="#FF7766"
              @click="startEditing()"
              block
              class="description"
              style="font-size: 15px"
              :loading="loading"
              ><b>Edit details</b></v-btn
            >
          </v-col>
        </v-row>
        <v-row v-if="editable && editing" class="ml-5 mr-5">
          <v-col>
            <v-btn
              color="success"
              @click="saveChanges()"
              block
              class="description"
              style="font-size: 15px"
              :loading="loading"
              ><b>Save changes</b></v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              color="error"
              @click="discardChanges()"
              block
              class="description"
              style="font-size: 15px"
              :loading="loading"
              ><b>Discard changes</b></v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script>
  
  const apiURLGet = "company/by-agent/";
  const apiURLPut = "company";
  
  export default {
    name: "CompanyForm",
    props: {
      userId: Number,
      editable: Boolean
    },
    data() {
      return {
        company: {
          name: String,
          description: String,
        },
        userSnaphsot: {},
        menu: false,
        valid: true,
        editing: false,
        loading: false, //button
        show: true, //spinner
        rules: {
            required: (value) => !!value || "Field is required.",
            counter: (value) =>
              (value && value.length <= 225) ||
              "Description is too long.",
            },
      };
    },
    mounted: function () {
      this.getCompany();
    },
    methods: {
        getCompany: function () {
        this.axios
          .get(apiURLGet + this.userId)
          .then((response) => {
            console.log(response);
            this.company = {
              ...response.data,
            };
            this.show = false;
          })
          .catch((error) => {
            this.$root.snackbar.error(error.response.data.message);
            this.show = false;
          });
      },
      startEditing: function () {
        this.userSnapshot = Object.assign({}, this.company);
        this.editing = true;
      },
      saveChanges: function () {
        this.loading = true;
        let changedCompany = Object.assign({}, this.company);
        changedCompany = {
          ...changedCompany,
        };
        this.axios({
          url: apiURLPut,
          data: changedCompany,
          method: "PUT",
        })
          .then((response) => {
            console.log(response);
            this.editing = false;
            this.loading = false;
            this.$root.snackbar.success("Successfully updated account");
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            this.$root.snackbar.error(error.response.data);
          });
      },
      discardChanges: function () {
        this.company = Object.assign({}, this.userSnapshot);
        this.userSnapshot = {};
        this.editing = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .description {
    font-family: "Baloo2", Helvetica, Arial;
    font-size: 18px;
  }
  
  .main-screen {
    background: rgb(251, 136, 136);
    background: radial-gradient(
      circle,
      rgb(251, 228, 136) 0%,
      rgb(255, 102, 110) 93%
    );
  }
  </style>
  