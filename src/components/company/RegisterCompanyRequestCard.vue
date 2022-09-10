<template>
      <v-card elevation="8" class="mx-auto my-12" max-width="374" >
        <v-card-title
          >{{ request.name }}<v-spacer /></v-card-title>
        <v-card-subtitle
          >by @{{ request.username }}<v-spacer /></v-card-subtitle>
        <v-card-text
          >{{ request.description }}<v-spacer /></v-card-text>
  
        <v-card-actions>
          <v-btn color="#FF7766" block outlined @click="approve()">
            Approve Request
          </v-btn>
        </v-card-actions>
      </v-card>
  </template>
  
  <script>
  const apiURL = "company/approve-request/";
  export default {
    name: "RegisterCompanyRequestCard",
    props: {
      request: Object,
    },
    data() {
      return {
        show: false,
      };
    },
    methods: {
      approve() {
        //this.$router.push({name: "CompanyDetailsView", params: {id: this.company.id}});
        this.show = true;
        this.axios
          .get(apiURL + this.request.id)
          .then((response) => {
            console.log(response)
            this.requests = response.data;
            this.show = false;
            this.$root.snackbar.success("Successfully approved request!");
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
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.6;
    position: absolute;
    width: 100%;
  }
  </style>