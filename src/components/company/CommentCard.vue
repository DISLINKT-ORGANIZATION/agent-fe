<template>
      <v-card elevation="4" class="mx-auto my-2" max-width="374" min-height="200" min-width="150">
        <i>@{{ comment.username }}</i>
        <v-divider class="ml-4 mr-4"></v-divider>
        <div class="mt-2 ml-4 mr-4" style="text-align: justify">
        {{ comment.content }}
        </div>
      </v-card>
  </template>
  
  <script>
  export default {
    name: "CommentCard",
    props: {
      comment: Object,
    },
    data() {
      return {};
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