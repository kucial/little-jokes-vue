<template>
  <svg
    class="ShakeIcon"
    xmlns="http://www.w3.org/2000/svg"
    width="24.003"
    height="24"
    viewBox="0 0 24.003 24"
  >
    <g transform="translate(-51 -627)">
      <g transform="translate(-295.743 -135.101)">
        <path
          class="ShakeIcon__activeHint"
          :class="active ? 'is-active' : ''"
          d="M361.212,783.2a2.563,2.563,0,0,1-.391-.031l-.141-.028-7.2-1.572a2.5,2.5,0,0,1-1.917-2.814l.027-.144,2.592-11.565a2.487,2.487,0,0,1,2.812-1.916l.142.026,7.2,1.572a2.485,2.485,0,0,1,1.914,2.814l-.024.145-2.594,11.562A2.5,2.5,0,0,1,361.212,783.2Z"
        />
        <g>
          <path
            class="ShakeIcon__path"
            :class="active ? 'is-active' : ''"
            d="M361.212,783.2a2.563,2.563,0,0,1-.391-.031l-.141-.028-7.2-1.572a2.5,2.5,0,0,1-1.917-2.814l.027-.144,2.592-11.565a2.487,2.487,0,0,1,2.812-1.916l.142.026,7.2,1.572a2.485,2.485,0,0,1,1.914,2.814l-.024.145-2.594,11.562A2.5,2.5,0,0,1,361.212,783.2Zm-7.935-5.786a.165.165,0,0,0-.161.131l-.3,1.343a1.234,1.234,0,0,0,.815,1.428l.113.03,7.21,1.575a1.257,1.257,0,0,0,.259.026h0a1.224,1.224,0,0,0,1.167-.846l.032-.109.308-1.373a.163.163,0,0,0-.023-.127.16.16,0,0,0-.1-.072S353.288,777.415,353.277,777.415Zm3.331-11.062a1.233,1.233,0,0,0-1.17.845l-.031.114L353.463,776a.168.168,0,0,0,.122.2s9.3,2.006,9.313,2.006a.166.166,0,0,0,.162-.129L365,769.415a1.231,1.231,0,0,0-.813-1.427l-.113-.03-7.214-1.58a1.222,1.222,0,0,0-.256-.026Zm.983,13.921a.584.584,0,1,1,.584-.584h0a.584.584,0,0,1-.584.583Zm-8.033-.919a3.679,3.679,0,0,1-1.384-.553,3.008,3.008,0,0,1-1.387-2.09,3.274,3.274,0,0,1,.665-2.565,3.5,3.5,0,0,1,.726-.732.625.625,0,1,1,.727,1.018,2.364,2.364,0,0,0-.454.467,2.034,2.034,0,0,0-.429,1.6,1.762,1.762,0,0,0,.837,1.247,2.563,2.563,0,0,0,.81.351.651.651,0,0,1,.588.709l0,.039a.625.625,0,0,1-.615.51Zm19.213-2.792a.623.623,0,0,1-.538-.3.631.631,0,0,1,.153-.82,2.523,2.523,0,0,0,.583-.512,2.025,2.025,0,0,0,.516-1.528,1.761,1.761,0,0,0-.787-1.341,2.657,2.657,0,0,0-.739-.376.655.655,0,0,1-.554-.742l.005-.033a.628.628,0,0,1,.61-.483.59.59,0,0,1,.145.018,3.683,3.683,0,0,1,1.269.606,3.008,3.008,0,0,1,1.3,2.245,3.266,3.266,0,0,1-.808,2.446,3.515,3.515,0,0,1-.833.734.616.616,0,0,1-.322.085Z"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'ShakeIcon',
  props: {
    active: {
      type: Boolean,
    },
  },
}
</script>

<style lang="scss">
.ShakeIcon {
  fill: currentColor;
  &__activeHint {
    fill: transparent;
    &.is-active {
      fill: var(--primary-color);
    }
  }
  @media (prefers-color-scheme: dark) {
    &__path.is-active {
      fill: var(--primary-color);
    }
    &__activeHint.is-active {
      fill: #202022;
    }
  }
}
</style>
