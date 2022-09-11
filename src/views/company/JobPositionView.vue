<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="8">
          <v-card class="mt-10">
            <v-card-title class="description ml-5">
              <v-col>{{ jobPosition.title }}</v-col>
            </v-card-title>
            <v-card-text class="mt-0 pt-0">
          </v-card-text>
          <v-divider class="ml-4 mr-4"></v-divider>
          <v-card-text>Required Skills</v-card-text>
          <v-list>
          <v-list-item v-for="sk in jobPosition.skills" :key="sk.id">
          <v-list-item-avatar>
            <v-img :src="getPicture(sk.type)"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="sk.name" class="text"></v-list-item-title>
          </v-list-item-content>
          </v-list-item>
          </v-list>

            <v-card-text>
                Salaries
            <v-row class="mt-0 pt-0">
              <v-col
                style="flex: 1;"
                sm="11"
                md="6"
                lg="3"
                v-for="s in jobPosition.salaries"
                :key="s.id"
              >
                <salary-card v-bind:salary="s" />
              </v-col>
            </v-row>
            
            <v-row v-if="role === 'ROLE_USER'">
              <v-card-actions>
                <v-btn color="#FF7766" block outlined @click="openSalaryDialog()">
                  Add Salary
                </v-btn>
              </v-card-actions>
              <v-dialog
                v-model="dialogSalary"
                width="500">
                <v-card>
                  <v-card-title class="description ml-5">
                    Share your salary
                  </v-card-title>
                  <v-card-text class="pa-5">
                    <v-form ref="sendForm">
                        <v-text-field
                          v-model="salaryValue"
                          label="Add Salary"
                          prepend-icon="mdi-currency-eur"
                          type="text"
                        />
                        <v-select
                          v-model="seniorityLevel"
                          :items="seniorities"
                          label="Seniority Level"
                          item-value="id"
                          item-name="text"
                          prepend-icon="mdi-star-outline"
                          @change="selectValue"
                        ></v-select>                       
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="pa-5">
                    <v-btn class="ml-auto" @click="addSalary()" outlined color="#FF7766">Send</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>            
            </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
import SalaryCard from "@/components/company/SalaryCard.vue";

  const apiURL = "job-position/";
  const apiURLSalary = "job-position/salary";

  export default {
    name: "JobPositionView",
    components: {
        SalaryCard,
    },
    data() {
      return {
        userId: localStorage.getItem("id"),
        role: localStorage.getItem("role"),
        jobPosition: {
          id: Number,
          title: String,
          comments: Array,
          selectionProcesses: Array
        },
        dialogSalary: false,
        salaryValue: "",
        seniorityLevel: 0,
        seniorities: [
        { id: 1, text: "Junior" },
        { id: 2, text: "Medior" },
        { id: 3, text: "Senior" },
      ],
      }
    },
    mounted: function () {
      this.getJobPosition();
    },
    methods: {
        getJobPosition: function () {
        this.axios
          .get(apiURL + this.$route.params.id)
          .then((response) => {
            console.log(response);
            this.jobPosition = {
              ...response.data,
            };
            this.show = false;
          })
          .catch((error) => {
            this.$root.snackbar.error(error.response.data.message);
            this.show = false;
          });
        },
        selectValue(e) {
          this.seniorityLevel = e;
        },
        openSalaryDialog() {
            this.dialogSalary = true;
        },
        addSalary() {
            this.dialogSalary = false;
            console.log(this.seniorityLevel)
            this.axios({
              url: apiURLSalary,
              method: "POST",
              data: {
                jobPositionId: this.$route.params.id,
                userId: this.userId,
                salaryValue: this.salaryValue,
                senioriyLevel: this.seniorityLevel - 1
              } 
            })
          .then((response) => {
            console.log(response);
            this.$root.snackbar.success("Successfully added salary!");
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            this.$root.snackbar.error(error.response.data);
          });
        },
        getPicture: function (type) {
        switch (type) {
        case 0:
          return require("@/assets/icon-small-prog-lang.png");
        case 1:
          return require("@/assets/icon-small-technology.png");
        case 2:
          return require("@/assets/icon-small-knowledge.png");
        case 3:
          return require("@/assets/icon-small-language.png");
        case 4:
          return require("@/assets/icon-small-soft-skill.png");
      }
    },
        
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