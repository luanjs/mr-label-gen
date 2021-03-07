<template>
    <div class="mrgen__preview-box">
        <div class="mrgen__preview-box-img">
            <img alt="iconName" width="40" :src="require('../assets/avatar.png')">
        </div>
        <div class="mrgen__preview-box-text">
            <span class="mrgen__preview-box-name">Você</span>

            <div class="mrgen__preview-box-tag">
                <span class="mrgen__tag-front">{{chapter}}</span>
                <span
                  v-if="tribes.intelligence"
                  class="mrgen__tag-tribe"
                >
                  @tribo-intelligence
                </span>
                <span
                  class="mrgen__tag-tribe"
                  v-if="tribes.responding"
                >
                  @tribo-responding
                </span>
            </div>
            <div class="mrgen__preview-box-title">
                <span>{{ mrTitle }}</span>
                <img
                  alt="iconName"
                  width="20"
                  :src="require(`../assets/${icon}.${getIconExtension}`)"
                >
            </div>
            <span class="mrgen__preview-box-link">{{ url }}</span>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    tribes: {
      type: Object,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    mrTitle: {
      type: String,
      required: true,
    },
    chapter: {
      type: String,
      required: true,
    },
  },
  computed: {
    getIconExtension() {
      return ['thumbsup', 'master'].includes(this.icon) ? 'gif' : 'png';
    },
  },
};
</script>

<style scoped lang="scss">
.mrgen__preview-box {
    user-select: none;
    display: flex;
    background-color: #222529;
    height: 90px;
    width: 470px;
    color: white;
    font-size: 13px;
    padding: 15px;
    border-radius: 20px;
    line-height: 17px;

    img {
      margin-left: 5px;
    }
    .mrgen__preview-box-img {
      margin-right: 5px;
    }

    .mrgen__preview-box-title {
      height: 20px;
      display: flex;
      align-items: center;

      span {
        max-width: 387px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .mrgen__preview-box-text {
        display: flex;
        flex-direction: column;

        .mrgen__preview-box-name {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 3px;
        }

        .mrgen__preview-box-link {
            color: #1d91c3;
        }

        .mrgen__preview-box-tag {
            width: fit-content;

            span {
              margin: 0 5px 0 0;
            }

            .mrgen__tag-front {
              background-color: rgba(232,145,45,.4);
              color: rgba(var(--sk_secondary_highlight,242,199,68),1);
            }

            .mrgen__tag-tribe {
              background: rgba(var(--sk_highlight_accent,29,155,209),.1);
              color: #1d91c3;
            }
        }
    }
}
</style>
