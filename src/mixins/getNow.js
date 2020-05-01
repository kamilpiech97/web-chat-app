export default {
    methods: {
        getNow: function () {
            const today = new Date();
            const date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
            const time =
                today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date + " " + time;
            this.timestamp = dateTime;
            return dateTime;
        },
    }
}