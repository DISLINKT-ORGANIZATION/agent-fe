<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="8">
          <v-card class="mt-10">
            <v-card-title class="description ml-5" ><v-col>Welcome to Agent Application!</v-col></v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle class="description--subtitle ml-5">
            <v-icon>mdi-star-outline</v-icon> Explore IT Companies
            </v-card-subtitle>
            <v-card-subtitle class="description--subtitle ml-5">
            <v-icon>mdi-star-outline</v-icon> Explore Job Positions
            </v-card-subtitle>
            <v-card-subtitle class="description--subtitle ml-5">
            <v-icon>mdi-star-outline</v-icon> Share your Experience
            </v-card-subtitle>            
            <v-row align="center" justify="center">
            <v-img max-width="300" height="100%" src="@/assets/black-cat.gif"> </v-img>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "LandingView",
    components: {
    },
    data() {
      return {
      };
    },
    
  };
  </script>

<style scoped>
    .description {
      font-family: "Baloo2", Helvetica, Arial;
      font-size: 35px;
    }
    .description--subtitle {
      font-family: "Baloo2", Helvetica, Arial;
      font-size: 16px;
    }
    </style>