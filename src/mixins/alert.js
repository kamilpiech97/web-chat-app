export default {
    methods: {
        alert(info, type) {
            this.flash(info, type, {
                timeout: 3000,
            });
        }
    }
}