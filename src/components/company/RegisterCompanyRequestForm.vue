<template>
    <v-container fill-height align="center" justify="center">
      <v-form v-model="valid" ref="form" style="flex: 1">
        <v-row class="ml-5 mr-5 mt-5">
          <v-col class="pr-5">
            <v-text-field
              v-model="request.name"
              :rules="[rules.required]"
              label="Name"
              prepend-icon="mdi-account"
              type="text"
              class="description"
            />
          </v-col>
        </v-row>
        <v-row class="ml-5 mr-5 mt-5">
          <v-col class="pr-5">
            <v-textarea
                v-model="request.description"
                :rules="[rules.required, rules.counter]"
                label="Description"
                prepend-icon="mdi-format-align-justify"
                full-width
                rows="4"
                single-line
            ></v-textarea>
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
              ><b>Send Request</b></v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script>
  
  const apiURL = "company/request-registration";
  
  export default {
    name: "RegisterCompanyRequestForm",
    props: {
      userId: Number
    },
    data() {
      return {
        request: {
          name: "",
          description: "",
        },
        userSnaphsot: {},
        valid: true,
        loading: false, //button
        rules: {
        required: (value) => !!value || "Field is required.",
        counter: (value) =>
          (value && value.length <= 225) ||
          "Description is too long.",
      },
      };
    },
    methods: {
      add: function () {
        this.loading = true;
        this.$refs.form.validate();
        if (!this.valid) {
            this.loading = false;
            return;
        }
        console.log(this.userId)
        this.axios({
          url: apiURL,
          method: "POST",
          data: {
            ...this.request,
            userId: this.userId
          }
        })
          .then((response) => {
            console.log(response);
            this.loading = false;
            this.$root.snackbar.success("Successfully created request!");
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
  