<template>
    <div class="sidebar" data-color="purple" data-background-color="white">
      <div class="logo">
        <router-link class="simple-text logo-normal" to="/">
            Odds explorer
        </router-link>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="nav-item" v-bind:class="{ active: activeKey === 'home'}">
            <router-link class="nav-link" v-on:click.native="setSelectedCategory('home')" to="/">
              <p>Home</p>
            </router-link>
          </li>
          <li class="nav-item nav-serach">
              <div class="input-group no-border">
                <input type="text" value="" class="form-control" v-model="searchQuery" placeholder="Search...">
              </div>
          </li>
          <li v-for="(sportCategory, index) in filteredCategories" :key="index" class="nav-item" v-bind:class="{ active: activeKey == sportCategory.key}">
            <router-link class="nav-link" v-on:click.native="setSelectedCategory(sportCategory.key)" :to="{ name: 'matches', params: {category: sportCategory.key}}">  
              <p>{{ sportCategory.title }} <small><br>{{ sportCategory.group }}</small></p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
const SportsRepository = RepositoryFactory.get('sports');

export default {
    name: "Sidebar",
    data() {
        return {
            sportCategories: [],
            activeKey: 'home',
            searchQuery: ''
        }
    },
    async created() {
        if (this.$route.params.category) {
            this.activeKey = this.$route.params.category;
        }
        await this.getSportCategories();
    },
    methods: {
        setSelectedCategory(key) {
            this.activeKey = key;
        },
        async getSportCategories() {
            const { data } = await SportsRepository.get();
            this.sportCategories = data.data;
        },
    },
    computed: {
        filteredCategories() {
            return this.sportCategories.filter(category => {
                return (category.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 || category.group.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1)
            })
        }
    }
}
</script>

<style scoped>

</style>
    