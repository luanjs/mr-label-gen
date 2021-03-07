<template>
  <div
    v-if="isMrPage"
    class="mrgen"
  >
    <div class="mrgen__options">
      <div class="mrgen__options-config">
        <div class="mrgen__options-icons">
          <RadioIcon
            v-for="icon in radioIcons"
            :checked="activeIcon === icon.iconName"
            :key="icon.iconName"
            :iconName="icon.iconName"
            :radioName="icon.radioName"
            @change="iconHandler"
            :image="icon.url"
          />
        </div>

        <div class="mrgen__check-names">
          <CheckNames
            :checked="activeTribes.intelligence"
            @change="tribeHandler($event)"
            title="Intelligence"
          />
          <CheckNames
            :checked="activeTribes.responding"
            @change="tribeHandler($event)"
            title="Responding"
          />
        </div>

        <div class="mrgen__radio-names">
          <CheckNames
            :checked="isFrontMR"
            type="radio"
            name="chapter"
            @change="chapterHandler($event)"
            title="Front"
          />
          <CheckNames
            :checked="!isFrontMR"
            type="radio"
            name="chapter"
            @change="chapterHandler($event)"
            title="Back"
          />
        </div>
      </div>

      <div class="mrgen__options-copy">
        <button
          :class="animateClass"
          @click="makeSnippet"
        >
          <template v-if="!isCopying">
            Copiar
          </template>
        </button>
      </div>
    </div>

    <PreviewBox
      v-if="!isCopying"
      :mrTitle="mrTitle"
      :icon="activeIcon"
      :url="activeUrl"
      :chapter="chapter"
      :tribes="activeTribes"
    />
    <div
      v-else
      class="mrgen__copied"
    >
      Copiado para a área de transferência!
    </div>
  </div>
  <div v-else class="mrgen__no-mr-page">
    <span>
      Essa não é uma página de MR.
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RadioIcon from './RadioIcon.vue';
import PreviewBox from './PreviewBox.vue';
import CheckNames from './CheckNames.vue';
import store from '../store/index';

export default {
  name: 'Main',
  store,
  components: {
    RadioIcon,
    PreviewBox,
    CheckNames,
  },
  data() {
    return {
      isCopying: false,
    };
  },
  mounted() {
    browser.runtime.sendMessage({});
    this.$store.dispatch('loadStorage');
  },
  created() {
    this.$store.dispatch('requestData');
  },
  computed: {
    ...mapState(['activeIcon', 'activeTribes', 'mrTitle', 'radioIcons', 'isMrPage', 'activeUrl', 'isFrontMR']),
    defaultText() {
      return 'Gerador de texto de MR';
    },
    chapter() {
      return this.isFrontMR ? '@front-end' : '@back-end';
    },
    textToCopy() {
      const respondingFlag = this.activeTribes.responding ? '@tribo-responding' : '';
      const intelligenceFlag = this.activeTribes.intelligence ? '@tribo-intelligence' : '';
      const flags = `${respondingFlag} ${intelligenceFlag}`;

      const iconHandler = {
        thumbsup: ':thumbsupparrot:',
        kayran: ':aprovado-kayran:',
        madruga: ':seu-madruga:',
        rocket: ':rocket:',
        master: ':partywiz:',
      };

      const title = this.mrTitle.replaceAll('\n', '');
      return `${this.chapter} ${flags}\n${title} ${iconHandler[this.activeIcon]}\n${this.activeUrl}`;
    },
    animateClass() {
      return this.isCopying ? 'mrgen__copy animate-btn' : 'mrgen__copy';
    },
  },
  methods: {
    makeSnippet() {
      this.isCopying = true;
      this.$store.dispatch('saveStorage');
      setTimeout(() => { this.isCopying = false; }, 1100);
      this.copyTextToClipboard(this.textToCopy);
    },
    iconHandler(activeIcon) {
      this.$store.commit('SET_ACTIVE_ICON', { activeIcon });
    },
    tribeHandler(tribeStatus) {
      this.$store.commit('SET_ACTIVE_TRIBE', tribeStatus);
    },
    chapterHandler(chapterStatus) {
      this.$store.commit('SET_IS_FRONT_MR', { isFrontMR: chapterStatus.tribe === 'front' });
    },
    copyTextToClipboard(text) {
      const copyFrom = document.createElement('textarea');
      copyFrom.textContent = text;
      document.body.appendChild(copyFrom);
      copyFrom.select();
      document.execCommand('copy');
      copyFrom.blur();
      document.body.removeChild(copyFrom);
    },
  },
};
</script>

<style lang="scss">
html {
  background-image: url('../assets/fundo.jpg');
  border: 1px solid black;
}

.mrgen__no-mr-page {
  font-size: 20px;
  width: 275px;
}

.mrgen {
  width: 500px;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 35px;

  .mrgen__options {
    display: flex;
    width: 100%;
    height: 95px;
    justify-content: space-around;
    margin-bottom: 10px;

    .mrgen__options-config{
      flex-direction: column;

      .mrgen__options-icons {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-bottom: 15px;
      }
    }

    .mrgen__options-copy{
      justify-content: center;
    }
  }

  p {
    font-size: 20px;
  }

  .mrgen__check-names, .mrgen__radio-names {
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;
  }

  .mrgen__copy {
    width: 100px;
    height: 100px;
    border: none;
    border-radius: 50px;
    background-color: #212121;
    color: white;
    transition: 0.1s;
    transform: translateY(-18%);
  }

  .mrgen__copied {
    background-color: #222529;
    height: 90px;
    width: 470px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding: 15px;
    border-radius: 20px;
    line-height: 17px;
  }

  .mrgen__copy:hover {
    cursor: pointer;
    transform: translateY(-18%) scale(1.1);
  }
  .mrgen__copy:active {
    border: none;
    outline: none;
  }

  @keyframes animation {
    0% {
      background-color: none;
      transform: translateY(-18%) rotate3d(1, 1, 1, 0deg);;
    }
    50% {
      background-image: url('../assets/kayran.png');
      background-position: center;
      background-color: transparent;
      background-size: contain;
      background-repeat: no-repeat;
      transform: translateY(-18%) rotate3d(1, 1, 1, 360deg);;
    }
    100% {
      background-color: #212121;
      transform: translateY(-18%) rotate3d(1, 1, 1, 0deg);;
    }
  }

  .animate-btn {
    animation-name: animation;
    animation-duration: 1.1s;
  }
}

</style>
