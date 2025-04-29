export default {
  registerCoach(context, data) {
    const coachData = {
      id: Math.random().toString(),
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    context.commit('ragisterCoach', coachData);
  },
};
