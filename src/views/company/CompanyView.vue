<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="8">
          <v-card class="mt-10">
            <v-card-title class="description ml-5">
              <v-col>{{ company.name }}</v-col>
              <v-rating v-if="role === 'ROLE_USER'"
              medium
              v-model="rating"
              background-color="yellow darken-1"
              color="yellow darken-1"
              @input="addRating($event)"
            />
            </v-card-title>
            <v-card-text class="mt-0 pt-0">
          <v-icon small color="yellow darken-1">mdi-star</v-icon>
            {{ company.reviewsRating.toFixed(2) }}
          </v-card-text>
          <v-divider class="ml-4 mr-4"></v-divider>
          <div class="mt-2 ml-4 mr-4" style="text-align: justify">
            {{ company.description }}
          </div>
            <v-card-text>
                Comments
            <v-row class="mt-0 pt-0">
              <v-col
                style="flex: 1;"
                sm="11"
                md="6"
                lg="3"
                v-for="c in company.comments"
                :key="c.id"
              >
                <comment-card v-bind:comment="c" />
              </v-col>
            </v-row>
                Experiences
            <v-row class="mt-0 pt-0">
              <v-col
                style="flex: 1;"
                sm="11"
                md="6"
                lg="3"
                v-for="s in company.selectionProcesses"
                :key="s.id"
              >
                <selection-process-card v-bind:selectionProcess="s" />
              </v-col>
            </v-row>
            <v-row v-if="role === 'ROLE_USER'">
            <v-col>
              <v-card-actions>
                <v-btn color="#FF7766" block outlined @click="openCommentDialog()">
                  Add Comment
                </v-btn>
              </v-card-actions>
              <v-dialog
                v-model="dialogComment"
                width="500">
                <v-card>
                  <v-card-title class="description ml-5">
                    Leave a comment on {{ company.name }}
                  </v-card-title>
                  <v-card-text class="pa-5">
                    <v-form ref="sendForm">
                        <v-textarea
                          v-model="commentContent"
                          label="Add comment..."
                          prepend-icon="mdi-comment-outline"
                          full-width
                          rows="4"
                          single-line
                        ></v-textarea>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="pa-5">
                    <v-btn class="ml-auto" @click="addComment()" outlined color="#FF7766">Send</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col>
              <v-card-actions>
                <v-btn color="#FF7766" block outlined @click="openSelectionProcessDialog()">
                  Share Interview Experience
                </v-btn>
              </v-card-actions>
              <v-dialog
                v-model="dialogSelectionProcess"
                width="500">
                <v-card>
                  <v-card-title class="description ml-5">
                    Share your selection process experience at {{ company.name }}
                  </v-card-title>
                  <v-card-text class="pa-5">
                    <v-form ref="sendFormProcess">
                        <v-textarea
                          v-model="selectionProcessDescription"
                          label="Describe experience..."
                          prepend-icon="mdi-comment-outline"
                          full-width
                          rows="4"
                          single-line
                        ></v-textarea>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="pa-5">
                    <v-btn class="ml-auto" @click="addSelectionProcess()" outlined color="#FF7766">Send</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
import CommentCard from "@/components/company/CommentCard.vue";
import SelectionProcessCard from "@/components/company/SelectionProcessCard.vue";

  const apiURL = "company/";
  const apiURLReview = "company/review";
  const apiURLComment = "company/comment";
  const apiURLSelectionProcess = "company/selection-process";

  export default {
    name: "CompanyView",
    components: {
        CommentCard,
        SelectionProcessCard
    },
    data() {
      return {
        userId: localStorage.getItem("id"),
        role: localStorage.getItem("role"),
        company: {
          id: Number,
          name: String,
          description: String,
          reviewsRating: Number, 
          currentUserReview: Object,
          comments: Array,
          selectionProcesses: Array
        },
        rating: Number,
        dialogComment: false,
        commentContent: "",
        dialogSelectionProcess: false,
        selectionProcessDescription: "",
      }
    },
    mounted: function () {
      this.getCompany();
    },
    methods: {
        getCompany: function () {
        this.axios
          .get(apiURL + this.$route.params.id)
          .then((response) => {
            console.log(response);
            this.company = {
              ...response.data,
            };
            this.show = false;
            this.rating = this.company.currentUserReview ? this.company.currentUserReview.reviewValue : 0;
          })
          .catch((error) => {
            this.$root.snackbar.error(error.response.data.message);
            this.show = false;
          });
        },
        addRating: function (value) {
            console.log(value);
            this.axios({
              url: apiURLReview,
              method: "POST",
              data: this.company.currentUserReview ? { 
                ...this.company.currentUserReview, 
                reviewValue: value 
              } 
              : {
                companyId: this.$route.params.id,
                userId: this.userId,
                reviewValue: value 
              }
            })
          .then((response) => {
            console.log(response);
            this.$root.snackbar.success("Successfully added rating!");
            this.getCompany();
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            this.$root.snackbar.error(error.response.data);
          });
        },
        openCommentDialog() {
            this.dialogComment = true;
        },
        addComment() {
            this.dialogComment = false;
            console.log(this.commentContent)
            this.axios({
              url: apiURLComment,
              method: "POST",
              data: {
                companyId: this.$route.params.id,
                userId: this.userId,
                content: this.commentContent 
              } 
            })
          .then((response) => {
            console.log(response);
            this.$root.snackbar.success("Successfully added comment!");
            this.getCompany();
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            this.$root.snackbar.error(error.response.data);
          });
        },
        openSelectionProcessDialog() {
            this.dialogSelectionProcess = true;
        },
        addSelectionProcess() {
            this.dialogSelectionProcess = false;
            console.log(this.selectionProcessDescription)
            this.axios({
              url: apiURLSelectionProcess,
              method: "POST",
              data: {
                companyId: this.$route.params.id,
                userId: this.userId,
                description: this.selectionProcessDescription 
              } 
            })
          .then((response) => {
            console.log(response);
            this.$root.snackbar.success("Successfully added selection process experience!");
            this.getCompany();
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            this.$root.snackbar.error(error.response.data);
          });
        },
        
    },
  };
  </script>
  
  <style scoped>
  .description {
    font-family: "Baloo2", Helvetica, Arial;
    font-size: 35px;
  }
  </style>