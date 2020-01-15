<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header card-header-primary">
                    <h4 class="card-title ">Odds table by selected sport category</h4>
                    <p class="card-category">
                        <input type="text" value="" class="form-control" v-model="searchQuery" placeholder="Search...">
                    </p>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <tbody>
                                <tr v-for="(match, index) in filteredMatches" :key="index">
                                    <td align="center">
                                        <small>
                                        {{ match.commence_time | moment("YYYY-MM-DD") }}<br>
                                        {{ match.commence_time | moment("H:mm A") }}
                                        </small>
                                    </td>
                                    <td align="center">
                                        {{ match.teams[0] }} <br><b>{{ match.maxHomeOdd }}</b> <br><small>({{ match.maxHomeOddSite }})</small>
                                    </td>
                                    <td align="center" v-if="match.noDraw == false">
                                        DRAW <br><b>{{ match.maxDrawOdd }}</b> <br><small>({{ match.maxDrawOddSite }})</small>
                                    </td>
                                    <td align="center">
                                        {{ match.teams[1] }} <br><b>{{ match.maxAwayOdd }}</b> <br><small>({{ match.maxAwayOddSite }})</small>
                                    </td>
                                    <td align="right">
                                        <button class='btn btn-sm btn-primary' @click="showMatchAllOddsModal(match)">More odds</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <AllOddsModal :match="selectedMatch" v-if="showModal" @close="closeMatchAllOddsModal"/>
    </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import AllOddsModal from '@/components/modals/AllOdds';
const OddsRepository = RepositoryFactory.get('odds');

export default {
    name: 'Matches',
    props: ['category'],
    watch: {
        category: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            async handler() {
                this.matchesByCategory = [];
                await this.getMatches();
            }
        }
    },
    components: {
        AllOddsModal
    },
    async mounted() {
        await this.getMatches();
    },
    data() {
        return {
            matchesByCategory: [],
            searchQuery: '',
            selectedMatch: null,
            showModal: false,
        }
    },
    methods: {
        async getMatches() {
            let tmpMatches;
            const { data } = await OddsRepository.get('&sport=' + this.category + '&region=eu');
            tmpMatches = data.data;
            this.formatMatches(tmpMatches);
        },
        formatMatches(matches) {
            matches.forEach((match) => {
                match.maxHomeOdd = 0, match.maxDrawOdd = 0, match.maxAwayOdd = 0;
                match.sites.forEach((site) => {
                    match.noDraw = site.odds.h2h.length == 2 ? true : false;
                    if (match.noDraw == false) {
                        if (match.maxHomeOdd == 0 || match.maxHomeOdd < site.odds.h2h[0]) {
                            match.maxHomeOdd = site.odds.h2h[0];
                            match.maxHomeOddSite = site.site_nice;
                        }
                        if (match.maxDrawOdd == 0 || match.maxDrawOdd < site.odds.h2h[2]) {
                            match.maxDrawOdd = site.odds.h2h[1];
                            match.maxDrawOddSite = site.site_nice;
                        }
                        if (match.maxAwayOdd == 0 || match.maxAwayOdd < site.odds.h2h[1]) {
                            match.maxAwayOdd = site.odds.h2h[2];
                            match.maxAwayOddSite = site.site_nice;
                        }
                    } else {
                        if (match.maxHomeOdd == 0 || match.maxHomeOdd < site.odds.h2h[0]) {
                            match.maxHomeOdd = site.odds.h2h[0];
                            match.maxHomeOddSite = site.site_nice;
                        }
                        if (match.maxAwayOdd == 0 || match.maxAwayOdd < site.odds.h2h[1]) {
                            match.maxAwayOdd = site.odds.h2h[1];
                            match.maxAwayOddSite = site.site_nice;
                        }
                    }
                });
                if (match.maxHomeOdd != 0 && match.maxAwayOdd != 0 && !this.matchesByCategory.includes(match)) {
                    this.matchesByCategory.push(match);
                }
            });
        },
        timestampToDate(timestamp) {
            var date = new Date();
            date.setSeconds(timestamp);
            var formattedDate = date.toUTCString();
            return formattedDate;
        },
        closeMatchAllOddsModal() {
            this.selectedMatch = null;
            this.showModal = false;
        },
        showMatchAllOddsModal(match) {
            this.selectedMatch = match;
            this.showModal = true;
        },
    },
    computed: {
        filteredMatches() {
            return this.matchesByCategory.filter(match => {
                return (match.teams[0].toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 || match.teams[1].toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1)
            })
        }
    }
}
</script>

<style lang="scss">

</style>
