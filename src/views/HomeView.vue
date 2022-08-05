<template>
  <main class="main">
    <div class="container">
      <div class="filters-panel">
        <div class="filters-panel__col">
          <div class="filters-panel filters-panel_inline">
            <div class="input-group input-group_icon input-group_icon-left">
              <!--    *** все картинки должны быть в папке assets ***-->
              <img src="../assets/search.png" alt="icon" class="icon" width="20" height="20">
              <input
                  id="filters-panel__search"
                  type="text"
                  class="form-control__input"
                  placeholder="Поиск"
                  v-model="filter.search"
                  @change="filteredMeetups = getfilteredMeetups()"
              />
            </div>
          </div>
        </div>
        <!--        <div class="filters-panel__col">-->
        <!--          <div class="form-check">-->
        <!--            <div class="form-check__group">-->
        <!--              <input-->
        <!--                  type="radio"-->
        <!--                  class="form-check__input"-->
        <!--                  name="date"-->
        <!--                  checked="checked"-->
        <!--                  value="all"-->
        <!--              />-->
        <!--              <label class="form-check__label">All</label>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->

      </div>
      <div class="meetups-list">
        <a v-for="meetup in filteredMeetups" :href="`/meetups/${meetup.id}`" class="meetups-list__item">
          <div class="meetups-list__col">
            <div class="meetups-list__cover">
              <!--    *** достаем title из json ***-->
              <h5>{{ meetup.title }}</h5>
            </div>
            <div class="meetups-list__col">
              <div class="meetups-list__description">

                <!--    *** v-show ***-->
                <!--    <span v-show="meetup.attending" class="meetups-list__badge meetups-list__success">Участвую</span>-->
                <!--    <span v-show="meetup.organizing" class="meetups-list__badge">Организую</span>-->

                <!--    *** v-if ***-->
                <!--    <span v-if="meetup.attending" class="meetups-list__badge meetups-list__success">Участвую</span>-->
                <!--    <span v-if="meetup.organizing" class="meetups-list__badge">Организую</span>-->

                <!--    *** Вариант if else ***-->
                <span v-if="meetup.attending" class="meetups-list__badge meetups-list__success">Участвую</span>
                <span v-else-if="meetup.organizing" class="meetups-list__badge">Организую</span>
                <span v-else>ELSE</span>

                <ul class="info-list">
                  <li><img class="icon info-list__icon" src="../assets/logo.png" alt="icon"/>
                    {{ meetup.organizer }}
                  </li>
                  <li><img class="icon info-list__icon" src="../assets/logo.png" alt="icon"/>
                    {{ meetup.place }}
                  </li>
                  <li><img class="icon info-list__icon" src="../assets/logo.png" alt="icon"/>
                    <time datetime="2020-02-31">{{ localDate(meetup.date) }}</time>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </main>
</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue'
import meetupsData from "../../api/meetups-data";

export default {
  name: 'HomeView',
  data() {
    return {
      meetups: meetupsData,
      filter: {
        date: 'all',
        participation: 'all',
        search: '',
      },
      filteredMeetups: [],
      // hello: 'world'
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    getfilteredMeetups() {
      const datefilter = (meetup) =>
          this.filter.date === 'all' ||
          (this.filter.date === 'past' && new Date(meetup.date) <= new Date()) ||
          (this.filter.date === 'future' && new Date(meetup.date) > new Date());

      const participationfilter = (meetup) =>
          this.filter.participation === 'all' ||
          (this.filter.participation === 'organizing' && new Date(meetup.participation) <= new Date()) ||
          (this.filter.participation === 'attending' && new Date(meetup.participation) > new Date());

      const searchfilter = (meetup) =>
          [meetup.title, meetup.description, meetup.place, meetup.organizer]
              .join(' ')
              .toLowerCase()
              .includes(this.filter.search.toLowerCase());

      return this.meetups.filter(
          (meetup) =>
              datefilter(meetup) &&
              participationfilter(meetup) &&
              searchfilter(meetup),
      );
    },
    localDate(date) {
      return new Date(date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
  },
  watch: {
    filter: {
      deep: true,
      immediate: true,
      handler() {
        this.filteredMeetups = this.getfilteredMeetups();
      }
    }
    // hello(newValue, oldValue) {
    //   console.log(newValue, oldValue)
    // }
  },
}
</script>

<style lang="scss" scoped>
@import "./src/assets/styles/styles";
</style>
