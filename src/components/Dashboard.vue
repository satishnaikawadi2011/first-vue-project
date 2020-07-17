<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Committee Members</h4>
      </li>
      <li v-bind:key="member.id" v-for="member in members" class="collection-item">
        <div class="chip" id="dept">{{member.department}}</div>
        {{member.member_id}} : {{member.name}}
        <router-link
          v-bind:to="{name:'view-member',params:{member_id:member.member_id}}"
          class="secondary-content"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large grey darken-3">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      members: []
    };
  },
  created() {
    db.collection("members")
      .get()
      .then(data => {
        data.forEach(doc => {
          const memberData = {
            id: doc.id,
            member_id: doc.data().member_id,
            name: doc.data().name,
            committee: doc.data().committee,
            department: doc.data().department,
            position: doc.data().position
          };
          this.members.push(memberData);
        });
      });
  }
};
</script>

<style scoped>
#dept {
  text-transform: capitalize;
}
</style>