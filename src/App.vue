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
</style>
