<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstname">Fistname</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        v-model.trim="firstName"
      />
    </div>
    <div class="form-control">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        v-model.trim="lastName"
      />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        name="description"
        v-model.trim="description"
      />
    </div>
    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" name="rate" v-model.number="rate" />
    </div>

    <div class="form-control">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          name="areas"
          value="frontend"
          v-model="areas"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          name="areas"
          value="backend"
          v-model="areas"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          name="areas"
          value="career"
          v-model="areas"
        />
        <label for="career">Career Advisory</label>
      </div>
    </div>

    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      rate: null,
      areas: [],
    };
  },
  methods: {
    submitForm(e) {
      const formData = new FormData(e.target);

      const data = {};
      for (const [key, value] of formData.entries()) {
        if (data[key]) {
          data[key] = [].concat(data[key], value);
        } else {
          data[key] = value;
        }
      }

      console.log(data);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
