<template>
    <v-hover v-slot:default="{ hover }">
      <v-card elevation="8" class="mx-auto my-12" max-width="500" min-width="200" >
        <v-img width="100%" height="200" src="@/assets/company.png">
          <v-expand-transition>
            <div
              v-if="hover"
              class="
                d-flex
                transition-fast-in-fast-out
                black
                darken-3
                v-card--reveal
                display-1
                white--text
              "
              style="height: 100%"
            >
              {{ company.name }}
            </div>
          </v-expand-transition>
        </v-img>
        <v-card-title class="mb-0 pb-0"
          >{{ company.name }}</v-card-title
        >
        <v-card-text class="mt-0 pt-0">
          <v-icon small color="yellow darken-1">mdi-star</v-icon>
          {{ company.reviewsRating.toFixed(2) }}
        </v-card-text>
        <v-divider class="ml-4 mr-4"></v-divider>
        <div class="mt-2 ml-4 mr-4" style="text-align: justify">
        {{ company.description }}
        </div>
        <v-card-actions>
          <v-btn color="#FF7766" block outlined @click="goToCompany()">
            Explore Company
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </template>
  
  <script>
  export default {
    name: "CompanyCard",
    props: {
      company: Object,
    },
    data() {
      return {};
    },
    methods: {
      goToCompany() {
        this.$router.push({name: "CompanyView", params: {id: this.company.id}});
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