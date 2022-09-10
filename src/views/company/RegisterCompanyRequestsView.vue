<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="8">
          <v-card class="mt-10">
            <v-card-title class="description ml-5" ><v-col>Register Company Requests</v-col></v-card-title>
            <v-row class="ml-9 mr-9">
              <v-progress-linear
                indeterminate
                color="indigo accent-1"
                :active="show"
              ></v-progress-linear>
            </v-row>
            <v-row class="mt-0 pt-0">
              <v-col
                style="flex: 1;"
                sm="11"
                md="6"
                lg="3"
                v-for="r in requests"
                :key="r.id"
              >
                <register-company-request-card v-bind:request="r" />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  const apiURL = "company/registration-requests";
  import RegisterCompanyRequestCard from "@/components/company/RegisterCompanyRequestCard.vue";
  export default {
    name: "RegisterCompanyRequeststView",
    components: {
        RegisterCompanyRequestCard,
    },
    data() {
      return {
        requests: [],
        show: false
      };
    },
    mounted() {
      this.getRequests();
    },
    methods: {
      getRequests() {
        this.show = true;
        this.axios
          .get(apiURL)
          .then((response) => {
            console.log(response)
            this.requests = response.data;
            this.show = false;
          })
          .catch((error) => {
            this.$root.snackbar.error(error.response.data.message);
            this.show = false;
          });
      },
    },
  };
  </script>

<style scoped>
    .description {
      font-family: "Baloo2", Helvetica, Arial;
      font-size: 35px;
    }
    </style>