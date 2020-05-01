export default {
  methods: {
    updateStatus(status) {
      db.collection("users")
        .doc(this.$store.state.user.id)
        .update({
          status: status
        })
    },
  }
}