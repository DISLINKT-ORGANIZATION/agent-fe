<template>
    <v-container fill-height align="center" justify="center">
      <v-form v-model="valid" ref="form" style="flex: 1">
        <v-row class="ml-5 mr-5 mt-5">
          <v-col class="pr-5">
            <v-text-field
              v-model="offer.title"
              :rules="[rules.required]"
              label="Title"
              prepend-icon="mdi-account"
              type="text"
              class="description"
            />
          </v-col>
        </v-row>
        <v-row class="ml-5 mr-5 mt-5">
          <v-col class="pr-5">
            <v-textarea
                v-model="offer.description"
                :rules="[rules.required]"
                label="Description"
                prepend-icon="mdi-format-align-justify"
                full-width
                rows="4"
                single-line
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row class="ml-5 mr-5 mt-5">
          <v-col class="pr-5">
            <v-select
                          v-model="seniorityLevel"
                          :items="seniorities"
                          label="Seniority Level"
                          item-value="id"
                          item-name="text"
                          prepend-icon="mdi-star-outline"
                          @change="selectValueSeniority"
                        ></v-select>
          </v-col>
        </v-row>
        <v-row class="ml-5 mr-5 mt-5">
          <v-col class="pr-5">
            <v-select
                          v-model="jobPositionId"
                          :items="jobPositions"
                          label="Job Position"
                          item-value="id"
                          item-text="title"
                          prepend-icon="mdi-briefcase-outline"
                          @change="selectValueJobPositionId"
                        ></v-select>
          </v-col>
        </v-row>
        <v-row class="ml-5 mr-5">
          <v-col>
            <v-btn
              color="#FF7766"
              @click="add()"
              block
              class="description"
              style="font-size: 15px"
              :loading="loading"
              ><b>Create</b></v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script>
  
  const apiURLGet = "job-position";
  const apiURLPost = "job-position/create-job-offer";
  
  export default {
    name: "JobOfferForm",
    props: {
      userId: Number
    },
    data() {
      return {
        offer: {
          title: "",
          description: "",
          jobPositionId: 0,
          userId: this.userId,
          seniorityLevel: 0
        },
        valid: true,
        loading: false, //button
        jobPositions: [],
        seniorityLevel: 0,
        jobPositionId: 0,
        seniorities: [
        { id: 1, text: "Junior" },
        { id: 2, text: "Medior" },
        { id: 3, text: "Senior" },
        ],
        rules: {
        required: (value) => !!value || "Field is required.",
      },
      };
    },
    mounted: function () {
      this.getJobPositions();
    },
    methods: {
        getJobPositions: function () {
        this.axios
          .get(apiURLGet)
          .then((response) => {
            console.log(response);
            this.jobPositions = response.data;
            console.log(this.jobPositions[2].title)
          })
          .catch((error) => {
            this.$root.snackbar.error(error.response.data.message);
          });
        },
      selectValueSeniority(e) {
          this.seniorityLevel = e;
        },
      selectValueJobPositionId(e) {
          this.jobPositionId = e;
        },
      add: function () {
        this.loading = true;
        this.$refs.form.validate();
        if (!this.valid) {
            this.loading = false;
            return;
        }
        console.log(this.userId)
        this.axios({
          url: apiURLPost,
          method: "POST",
          data: {
            ...this.offer,
            userId: this.userId,
            senioriyLevel: this.seniorityLevel - 1,
            jobPositionId: this.jobPositionId
          }
        })
          .then((response) => {
            console.log(response);
            this.loading = false;
            this.$root.snackbar.success("Successfully created job offer!");
            this.$refs.form.reset();
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            this.$root.snackbar.error(error.response.data);
            this.$refs.form.reset();
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .description {
    font-family: "Baloo2", Helvetica, Arial;
    font-size: 18px;
  }
  
  .main-screen {
    background: rgb(251, 136, 136);
    background: radial-gradient(
      circle,
      rgb(251, 228, 136) 0%,
      rgb(255, 102, 110) 93%
    );
  }
  </style>
  