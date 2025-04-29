<template>
  <CoachFilter @change-filter="setFilters" />
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button v-if="!isCoach" link to="/register"
          >Register as Coach</base-button
        >
      </div>

      <ul v-if="hasCoaches">
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
    >
  </section>
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
  methods: {
    setFilters(filters) {
      this.activeFilters = filters;
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
