<template>
    <div class="sidebar" data-color="purple" data-background-color="white">
      <div class="logo">
        <router-link class="simple-text logo-normal" to="/">
            Odds explorer
        </router-link>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">
              <p>Home</p>
            </router-link>
          </li>
          <li v-for="(sportCategory, index) in sportCategories" :key="index" class="nav-item">
            <a class="nav-link" href="./dashboard.html">
              <p>{{ sportCategory.title }} <small><br>{{ sportCategory.group }}</small></p>
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    import {RepositoryFactory} from '@/repositories/RepositoryFactory';
    const StatisticRepository = RepositoryFactory.get('sports');

    export default {
        name: "Sidebar",
        data() {
            return {
                sportCategories: [],
                activeKey: 'home'
            }
        },
        async created() {
            await this.getSportCategories();
        },
        methods: {
           async getSportCategories() {
                const {data} = await StatisticRepository.get();
                this.sportCategories = data.data;
                /* eslint-disable no-console */
                console.log(this.sportCategories);
                /* eslint-enable no-console */
            },
        }
    }
</script>

<style scoped>

</style>
    