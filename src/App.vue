<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  background-color: #2c3e50;
  border: 1px solid #2c3e50;
  padding: 15px;
  color: white;
  cursor: pointer;
  transition: background-color 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
button:hover {
  background-color: white;
  color: black;
}

html {
  overflow-y: hidden;
}
body {
  background-color: white !important;
  font-family: "Montserrat", sans-serif !important;
  min-height: 100vh;
}

.mobile-close {
  display: none;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  width: 5px;
  background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  width: 1em;
  background-color: #ddd;
  outline: 1px solid slategrey;
  border-radius: 1rem;
}

.text-small {
  font-size: 0.9rem;
}

.messages-box,
.chat-box {
  height: 95vh;
  overflow-y: scroll;
}

.rounded-lg {
  border-radius: 0.5rem;
}

input::placeholder {
  font-size: 0.9rem;
  color: #999;
}
.button-div {
  display: none !important;
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  z-index: 1001;
}
a {
  cursor: pointer;
}

.list-group-item-light.list-group-item-action.active {
  color: #fff;
  background-color: black !important;
  border-color: black !important;
}

@media (max-width: 991px) {
  .chat-box {
    height: 90vh;
    overflow-y: scroll;
  }
  .mobile-close {
    display: block;
    position: absolute;
    right: 20px;
  }
  .messages-div {
    display: none;
    z-index: 1002;
  }
  .messages-div.active {
    max-width: 100% !important;
    width: 100vw !important;
    flex: 100% !important;
    display: block;
  }
  .chat-div {
    max-width: 100% !important;
  }
  .button-div {
    display: block !important;
  }
  .flash__message{
    position: absolute!important;
    z-index: 10001;
    right: 10px!important;
    top:10px!important;
  }
}
</style>

