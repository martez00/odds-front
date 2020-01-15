<template>
    <transition>
        <div class="modal-mask"> 
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            <b>{{ match.teams[0] }} – {{ match.teams[1] }}</b>
                            <button type="button" style="float:right" class="close" data-dismiss="modal" @click="close">&times;</button>
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class="text-primary">
                                        <th></th>
                                        <th>
                                            {{ match.teams[0] }}
                                        </th>
                                        <th v-if="match.noDraw == false">
                                            DRAW
                                        </th>
                                        <th>
                                            {{ match.teams[1] }}
                                        </th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(site, index) in match.sites" :key="index">
                                            <td>
                                                {{ site.site_nice }}
                                            </td>
                                            <td>
                                                {{ site.odds.h2h[0] }}
                                            </td>
                                            <td v-if="match.noDraw == false">
                                                {{ site.odds.h2h[2] }}
                                            </td>
                                            <td>
                                                {{ site.odds.h2h[1] }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "AllOdds",
    props: ["match"],
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>

</style>