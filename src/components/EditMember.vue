<template>
  <div id="edit-member">
    <h3>Edit Member</h3>
    <div class="row">
      <form @submit.prevent="updateMember" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="member_id" required disabled />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="committee" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="department" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey darken-2">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "edit-member",
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
    updateMember() {
      db.collection("members")
        .where("member_id", "==", this.$route.params.member_id)
        .get()
        .then(data => {
          data.forEach(doc => {
            doc.ref.update({
              member_id: this.member_id,
              position: this.position,
              department: this.department,
              name: this.name,
              committee: this.committee
            });
          });
        })
        .then(() => {
          this.$router.push({
            name: "view-member",
            params: { member_id: this.member_id }
          });
        });
    }
  }
};
</script>

<style scoped>
</style>