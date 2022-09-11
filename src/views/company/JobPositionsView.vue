<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="8">
          <v-card class="mt-10">
            <v-card-title class="description ml-5" ><v-col>Job Positions</v-col></v-card-title>
            <v-row class="ml-9 mr-9">
              <v-progress-linear
                indeterminate
                color="indigo accent-1"
                :active="show"
              ></v-progress-linear>
            </v-row>
            <v-card-text>
            <v-row class="mt-0 pt-0">
              <v-col
                style="flex: 1;"
                sm="11"
                md="6"
                lg="3"
                v-for="j in jobPositions"
                :key="j.id"
              >
                <job-position-card v-bind:jobPosition="j" />
              </v-col>
            </v-row>
          </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  const apiURL = "job-position";
  import JobPositionCard from "@/components/company/JobPositionCard.vue";
  export default {
    name: "JobPositionsView",
    components: {
        JobPositionCard,
    },
    data() {
      return {
        jobPositions: [],
        show: false
      };
    },
    mounted() {
      this.getJobPositions();
    },
    methods: {
        getJobPositions() {
        this.show = true;
        this.axios
          .get(apiURL)
          .then((response) => {
            console.log(response)
            this.jobPositions = response.data;
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