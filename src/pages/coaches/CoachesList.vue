<template>
  <div>
    <base-dialog :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <CoachFilter @change-filter="setFilters" />
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !isLoading" link to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner />
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          >
            {{ coach.firstName }}
          </CoachItem>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import CoachItem from '@/components/coaches/CoachItem.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    ...mapGetters('coaches', {
      hasCoaches: 'hasCoaches',
      isCoach: 'isCoach',
    }),
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter((coach) => {
        for (let [filter, isActive] of Object.entries(this.activeFilters)) {
          if (isActive && coach.areas.includes(filter)) {
            return true;
          }
        }

        return false;
      });
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(filters) {
      this.activeFilters = filters;
    },
    async loadCoaches(refresh = false) {
      this.error = null;
      this.isLoading = true;

      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
