<template>
    <v-hover v-slot:default="{ hover }">
      <v-card elevation="8" class="mx-auto my-12" max-width="500" min-width="150" >
        <v-img width="100%" height="200" src="@/assets/jobposition.jpg">
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
              {{ jobPosition.title }}
            </div>
          </v-expand-transition>
        </v-img>
        <v-card-subtitle class="mb-0 pb-0"
          >{{ jobPosition.title }}</v-card-subtitle
        >
        <v-card-actions>
          <v-btn color="#FF7766" block outlined @click="goToJobPosition()">
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </template>
  
  <script>
  export default {
    name: "JobPositionCard",
    props: {
        jobPosition: Object,
    },
    data() {
      return {};
    },
    methods: {
      goToJobPosition() {
        this.$router.push({name: "JobPositionView", params: {id: this.jobPosition.id}});
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