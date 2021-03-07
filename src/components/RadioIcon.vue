<template>
    <label :for="iconName">
        <div class="mrgen__radio-icon">
          <img :alt="iconName" width="25" :src="image">
          <input
            type="radio"
            :id="iconName"
            :name="radioName"
            :checked="checked"
            @click="change"
          >
        </div>
    </label>
</template>

<script>
export default {
  data() {
    return {
      selectedIcon: 0,
    };
  },
  props: {
    iconName: {
      type: String,
      required: true,
    },
    radioName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    change($event) {
      this.$emit('change', $event.target.id);
    },
  },
};
</script>

<style>

.mrgen__radio-icon {
  display: inline-flex;
  flex-direction: column;
}

</style>
