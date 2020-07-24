<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    document.addEventListener('mousedown', function (event) {
      console.log(event.pageX, event.pageY)
      const body = document.body
      body.style.setProperty('--pageX', event.pageX)
      body.style.setProperty('--pageY', event.pageY)
    })
  }
}
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    height: 100%;
    display: flex;
  }

  body:active::after {
    transform: translate(-50%, -100%);
    opacity: 0.5;
    transition: 0s;
    left: -999px;
  }
  body::after {
    content: 's958024860.github.io';
    position: fixed;
    color: red;
    z-index: 999;
    left: calc(var(--pageX, -999) * 1px);
    top: calc(var(--pageY, -999) * 1px);
    transform: translate(-50%, calc(-100% - 20px));
    opacity: 0;
    transition: transform .5s, opacity .5s;
  }
</style>
