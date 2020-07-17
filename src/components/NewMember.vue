<template>
  <div id="new-member">
    <h3>New Member</h3>
    <div class="row">
      <form @submit.prevent="saveMember" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="member_id" required />
            <label>Member ID</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="committee" required />
            <label>Committee</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="department" required />
            <label>Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
            <label>Position</label>
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
  name: "new-member",
  data() {
    return {
      member_id: null,
      name: null,
      position: null,
      department: null,
      committee: null
    };
  },
  methods: {
    saveMember() {
      db.collection("members")
        .add({
          member_id: this.member_id,
          name: this.name,
          position: this.position,
          department: this.department,
          committee: this.committee
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
</style>