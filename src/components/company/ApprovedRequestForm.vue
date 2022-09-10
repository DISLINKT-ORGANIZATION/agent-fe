<template>
    <v-container fill-height align="center" justify="center">
      <v-form v-model="valid" ref="form" style="flex: 1">
        <v-row class="ml-5 mr-5 mt-5">
            <v-col>
              <v-text-field
                id="custom-css-input"
                v-model="info.password"
                :rules="[rules.required, rules.counter]"
                label="Password"
                prepend-icon="mdi-lock"
                style="font-size: 18px"
                class="description"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
        </v-row>
        <v-row class="ml-5 mr-5 mt-5">
            <v-col>
              <v-text-field
                v-model="confirmPassword"
                :rules="[rules.passwordMatch, rules.required]"
                label="Confirm Password"
                prepend-icon="mdi-lock"
                style="font-size: 18px"
                class="description"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                @click:append="showConfirmPassword = !showConfirmPassword"
              />
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
              ><b>Register Company</b></v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script>
  
  const apiURL = "company/register-company";
  
  export default {
    name: "ApprovedRequestForm",
    props: {
      requestId: Number
    },
    data() {
      return {
        info: {
          password: "",
        },
        userSnaphsot: {},
        valid: true,
        loading: false, //button
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
        rules: {
        required: (value) => !!value || "Field is required.",
        passwordMatch: () =>
          this.info.password == this.confirmPassword || "Passwords must match.",
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
        if (this.info.password != this.confirmPassword) {
          this.loading = false;
          return;
        }
        this.axios({
          url: apiURL,
          method: "POST",
          data: {
            ...this.info,
            requestId: this.requestId
          }
        })
          .then((response) => {
            console.log(response);
            this.loading = false;
            this.$root.snackbar.success("Successfully registered company!");
            this.$refs.form.reset();
            localStorage.clear();
            this.$router.push({ name: "LoginView" });
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
  