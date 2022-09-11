<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex shrink>
        <v-img
          src="@/assets/cat.gif"
          style="width: 170px; height: 120px"
        ></v-img>
      </v-flex>
    </v-layout>
    <v-list>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title
            class="description d-flex justify-center"
            style="font-size: 25px"
          >
            @{{ user.username }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
        class="description"
      >
        <router-link :to="{ name: 'LandingView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Home</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-divider></v-divider>
        <router-link :to="{ name: 'AccountView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-box-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Account</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-divider></v-divider>
        <router-link :to="{ name: 'JobPositionsView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-briefcase-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Job Positions</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :to="{ name: 'CompaniesView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Companies</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-divider></v-divider>
        <router-link v-if="role === 'ROLE_AGENT'" :to="{ name: 'CompanyInfoView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >My Company</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-if="role === 'ROLE_ADMINISTRATOR'" :to="{ name: 'RegisterCompanyRequestsView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Requests</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-if="role === 'ROLE_USER'" :to="{ name: 'RegisterCompanyRequestView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Register Company</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-if="role === 'ROLE_USER'" :to="{ name: 'ApprovedRegisterCompanyRequestsView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-check-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Approved Request</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    selectedItem: null,
    role: localStorage.getItem('role') 
  }),
  props: {
    user: Object,
  },
};
</script>

<style scoped>
img {
  height: 50%;
  width: 100%;
}
.description {
  font-family: "Baloo2", Helvetica, Arial;
}
</style>
