<template>
  <div class="BottomNav">
    <div class="BottomNav__itemWrap">
      <router-link to="/shake" v-slot="{ href, navigate, isActive }">
        <a
          :href="href"
          @click="navigate"
          class="BottomNav__item"
          :class="{ 'is-active': isActive }"
        >
          <ShakeIcon class="BottomNav__icon" :active="isActive"></ShakeIcon>
          <span class="BottomNav__label" :class="{ 'is-active': isActive }"
            >摇一摇</span
          >
        </a>
      </router-link>
    </div>
    <div class="BottomNav__itemWrap">
      <router-link to="/home" v-slot="{ href, navigate, isActive }">
        <a
          :href="href"
          @click="navigate"
          class="BottomNav__item"
          :class="{ 'is-active': isActive }"
        >
          <HomeIcon :active="isActive" class="BottomNav__icon"></HomeIcon>
          <span class="BottomNav__label" :class="{ 'is-active': isActive }"
            >首页</span
          >
        </a>
      </router-link>
    </div>
    <div class="BottomNav__itemWrap">
      <router-link to="/my" v-slot="{ href, navigate, isActive }">
        <a
          :href="href"
          @click="navigate"
          class="BottomNav__item"
          :class="{ 'is-active': isActive }"
        >
          <MyIcon :active="isActive" class="BottomNav__icon"></MyIcon>
          <span class="BottomNav__label" :class="{ 'is-active': isActive }"
            >我的</span
          >
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
import ShakeIcon from './ShakeIcon'
import HomeIcon from './HomeIcon'
import MyIcon from './MyIcon'

export default {
  name: 'BottomNav',
  components: {
    ShakeIcon,
    HomeIcon,
    MyIcon,
  },
}
</script>

<style lang="scss">
.BottomNav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: var(--bottom-nav-height);
  display: flex;
  background-color: #fafafa;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 -0.5px rgba(0, 0, 0, 0.16);
  &__itemWrap {
    flex-basis: 100%;
  }

  &__item {
    flex-shrink: 0;
    text-decoration: none;
    color: inherit;
    line-height: 0;
    display: block;
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__icon {
    display: block;
    width: 24px;
    height: 24px;
    margin-bottom: 3px;
  }
  &__label {
    font-size: 10px;
    line-height: 1;
  }

  @media (display-mode: standalone) {
    padding-bottom: var(--safe-area-inset-bottom);
    height: calc(var(--bottom-nav-height) + var(--safe-area-inset-bottom));
  }

  @media (prefers-color-scheme: dark) {
    background-color: #3e3f46;
    &__item {
      color: #e0e0e0;
    }
    &__label.is-active {
      color: var(--primary-color);
    }
  }
}
</style>
