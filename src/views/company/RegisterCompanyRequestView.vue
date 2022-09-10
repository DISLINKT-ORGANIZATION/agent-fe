<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="8">
          <v-card class="mt-10">
            <v-card-title class="description ml-5">
              <v-col>Request to Register a Company</v-col>
            </v-card-title>
            <v-card-text>
              <v-row>
                <register-company-request-form v-bind:userId="userId"/>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import RegisterCompanyRequestForm from "@/components/company/RegisterCompanyRequestForm.vue";
  export default {
    name: "RegisterCompanyRequestView",
    components: {
        RegisterCompanyRequestForm,
    },
    data() {
      return {
        userId: localStorage.getItem("id"),
      }
    }
  };
  </script>
  
  <style scoped>
  .description {
    font-family: "Baloo2", Helvetica, Arial;
    font-size: 35px;
  }
  </style>