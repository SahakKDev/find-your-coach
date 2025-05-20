export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://find-your-coach-79760-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(response.message || 'Failed to send request.');
    }

    newRequest.id = data.name;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://find-your-coach-79760-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch requests.');
    }

    const requests = [];

    for (const key in data) {
      const request = {
        id: key,
        coachId,
        ...data[key],
      };

      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
};
