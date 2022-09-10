<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="8">
          <v-card class="mt-10">
            <v-card-title class="description ml-5">
              <v-col>Approved company registration request</v-col>
            </v-card-title>
            <v-card-text>
              <v-row v-if="request.id != null">
                <approved-request-form v-bind:requestId="request.id"/>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  const apiURL = "company/approved-request/";
  import ApprovedRequestForm from "@/components/company/ApprovedRequestForm.vue";
  export default {
    name: "ApprovedRegisterCompanyRequestsView",
    components: {
        ApprovedRequestForm,
    },
    data() {
      return {
        request: {
            id: Number
        },
        userId: localStorage.getItem("id")
      };
    },
    mounted() {
      this.getRequest();
    },
    methods: {
      getRequest() {
        this.axios
          .get(apiURL + this.userId)
          .then((response) => {
            console.log(response)
            this.request = response.data;
          })
          .catch((error) => {
            this.$root.snackbar.error(error.response.data.message);
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