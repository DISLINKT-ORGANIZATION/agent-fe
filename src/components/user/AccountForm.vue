<template>
  <v-container fill-height align="center" justify="center">
    <v-row class="ml-3 mr-3">
      <v-progress-linear
        indeterminate
        color="teal"
        :active="show"
      ></v-progress-linear>
    </v-row>
    <v-form v-if="!show" v-model="valid" ref="form" style="flex: 1">
      <v-row class="ml-5 mr-5 mt-5">
        <v-col class="pr-5">
          <v-text-field
            v-model="user.username"
            :rules="[rules.required]"
            label="Username"
            prepend-icon="mdi-account"
            type="text"
            class="description"
            :readonly="!editing"
          />
        </v-col>
        <v-col class="pr-5">
          <v-text-field
            v-model="user.email"
            :rules="[rules.email, rules.required]"
            label="Email"
            prepend-icon="mdi-email"
            type="text"
            class="description"
            :readonly="!editing"
          />
        </v-col>
      </v-row>
      <v-row v-if="editable && !editing" class="ml-5 mr-5">
        <v-col>
          <v-btn
            color="#FF7766"
            @click="startEditing()"
            block
            class="description"
            style="font-size: 15px"
            :loading="loading"
            ><b>Edit details</b></v-btn
          >
        </v-col>
      </v-row>
      <v-row v-if="editable && editing" class="ml-5 mr-5">
        <v-col>
          <v-btn
            color="success"
            @click="saveChanges()"
            block
            class="description"
            style="font-size: 15px"
            :loading="loading"
            ><b>Save changes</b></v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            color="error"
            @click="discardChanges()"
            block
            class="description"
            style="font-size: 15px"
            :loading="loading"
            ><b>Discard changes</b></v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>

const apiURLGet = "authentication/users/";
const apiURLPut = "authentication/users/update-person";

export default {
  name: "AccountForm",
  props: {
    userId: Number,
    editable: Boolean
  },
  data() {
    return {
      user: {
        username: String,
        email: String,
      },
      userSnaphsot: {},
      menu: false,
      valid: true,
      editing: false,
      loading: false, //button
      show: true, //spinner
      rules: {
        required: (value) => !!value || "Field is required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  mounted: function () {
    this.getProfile();
  },
  methods: {
    getProfile: function () {
      this.axios
        .get(apiURLGet + this.userId)
        .then((response) => {
          console.log(response);
          this.user = {
            ...response.data,
          };
          this.show = false;
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data.message);
          this.show = false;
        });
    },
    startEditing: function () {
      this.userSnapshot = Object.assign({}, this.user);
      this.editing = true;
    },
    saveChanges: function () {
      this.loading = true;
      let changedUser = Object.assign({}, this.user);
      changedUser = {
        ...changedUser,
      };
      this.axios({
        url: apiURLPut,
        data: changedUser,
        method: "PUT",
      })
        .then((response) => {
          console.log(response);
          let token = response.data.token;
          if (token) {
            localStorage.setItem("token", token);
            this.axios.defaults.headers['Authorization'] = `Bearer ${token}` ;
          }
          this.editing = false;
          this.loading = false;
          this.$root.snackbar.success("Successfully updated account");
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.$root.snackbar.error(error.response.data);
        });
    },
    discardChanges: function () {
      this.user = Object.assign({}, this.userSnapshot);
      this.userSnapshot = {};
      this.editing = false;
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
