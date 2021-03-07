<template>
    <div>
        <label>
          <input
            :type="type"
            id="scales"
            :name="name"
            :checked="checked"
            @change="change"
          >
          {{title}}
        </label>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      default: 'checkbox',
    },
    name: {
      type: String,
      default: 'scales',
    },
  },
  methods: {
    change($event) {
      this.$emit('change', {
        tribe: this.title.toLowerCase(),
        status: $event.target.checked,
      });
    },
  },
};
</script>

<style>

</style>
