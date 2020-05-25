export default {
    methods: {
        scrollToBottom() {
            document.querySelector('.chat-box').scrollTop = document.querySelector('.chat-box').scrollHeight;
        }
    }
}