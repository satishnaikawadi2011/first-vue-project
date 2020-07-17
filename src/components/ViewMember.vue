<template>
  <div id="view-member">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{name}}</h4>
      </li>
      <li class="collection-item">Member ID : {{member_id}}</li>
      <li class="collection-item">Committee : {{committee}}</li>
      <li class="collection-item">Department : {{department}}</li>
      <li class="collection-item">Position : {{position}}</li>
    </ul>
    <router-link to="/" class="btn grey darken-1">Back</router-link>
    <button @click="deleteMember" class="btn red">Delete</button>
    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{name:'edit-member',params:{member_id:member_id}}"
        class="btn-floating btn-large grey darken-3"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "view-member",
  data() {
    return {
      member_id: null,
      position: null,
      department: null,
      name: null,
      committee: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("members")
      .where("member_id", "==", to.params.member_id)
      .get()
      .then(data => {
        data.forEach(doc => {
          next(vm => {
            (vm.member_id = doc.data().member_id),
              (vm.department = doc.data().department),
              (vm.name = doc.data().name),
              (vm.position = doc.data().position),
              (vm.committee = doc.data().committee);
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("members")
        .where("member_id", "==", this.$route.params.member_id)
        .get()
        .then(data => {
          data.forEach(doc => {
            (this.member_id = doc.data().member_id),
              (this.name = doc.data().name),
              (this.department = doc.data().department),
              (this.position = doc.data().position),
              (this.committee = doc.data().committee);
          });
        });
    },
    deleteMember() {
      if (confirm("Are you sure ?")) {
        db.collection("members")
          .where("member_id", "==", this.$route.params.member_id)
          .get()
          .then(data => {
            data.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>

<style scoped>
</style>