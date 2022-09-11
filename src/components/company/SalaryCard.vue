<template>
    <v-card elevation="4" class="mx-auto my-2" max-width="100" min-height="40" min-width="50">
      <i>{{ getSeniority(salary.senioriyLevel) }}</i>
      <v-divider class="ml-4 mr-4"></v-divider>
      <div class="mt-2 ml-4 mr-4" style="text-align: justify">
      {{ salary.salaryValue }}€
      </div>
    </v-card>
</template>

<script>
export default {
  name: "SalaryCard",
  props: {
    salary: Object,
  },
  data() {
    return {};
  },
  methods: {
    getSeniority: function (type) {
      switch (type) {
        case 0:
          return "JUNIOR";
        case 1:
          return "MEDIOR";
        case 2:
          return "SENIOR";
      }
    },
  }
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