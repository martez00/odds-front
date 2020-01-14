<template>
  <div id="app">
    <body>
      <div class="wrapper">
        <Sidebar/>
        <div class="main-panel">
          <TopMenu/>
          <div class="content">
            <router-view/>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
  import Sidebar from './components/partials/Sidebar.vue';
  import TopMenu from './components/partials/TopMenu.vue';
      export default {
          name: 'App',
          components: {
              Sidebar,
              TopMenu
          }
      };
</script>

<style lang="scss">
  
</style>
