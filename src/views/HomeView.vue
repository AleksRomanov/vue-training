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

            <div class="input-group__checkbox">
              <input
                  type="radio"
                  class="form-check__input"
                  name="date"
                  v-model="filter.date"
                  value="all"
              />
              <label class="form-check__label">Все</label>
              <input
                  type="radio"
                  class="form-check__input"
                  name="date"
                  v-model="filter.date"
                  value="past"
              />
              <label class="form-check__label">Прошедшие</label>
              <input
                  type="radio"
                  class="form-check__input"
                  name="date"
                  v-model="filter.date"
                  value="future"
              />
              <label class="form-check__label">Будущие</label>
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
      <div class="meetups-page-tabs">
        <button @click="view = 'list'" class="meetups-page-tabs__tab meetups-page-tabs__tab_active" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.00251 14.9297L0 1.07422H6.14651L8.00251 4.27503L9.84583 1.07422H16L8.00251 14.9297Z" fill="black"/>
          </svg>
        </button>
        <button @click="view = 'calendar'" class="meetups-page-tabs__tab" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.00251 14.9297L0 1.07422H6.14651L8.00251 4.27503L9.84583 1.07422H16L8.00251 14.9297Z" fill="red"/>
          </svg>
        </button>
      </div>
      <div v-if="view === 'list'" class="meetups-list">
        <a v-for="meetup in filteredMeetups" :href="`/meetups/${meetup.id}`" class="meetups-list__item">
          <div class="meetups-list__col">
            <div class="meetups-list__cover" :style="meetup.coverStyle">
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
                    <time datetime="1972-02-31">{{ meetup.localDate }}</time>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div v-else-if="view === 'calendar'" class="meetups-calendar">КАЛЕНДАРЬ!!!</div>
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
      rawMeetups: meetupsData,
      filter: {
        date: 'all',
        participation: 'all',
        search: '',
      },
      filteredMeetups: [],
      view: 'list',
      // hello: 'world'
    }
  },
  components: {
    HelloWorld
  },
  computed: {
    meetups() {
      return this.rawMeetups.map((meetup) => ({
        ...meetup,
        cover: meetup.imageId ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}` : undefined,
        coverStyle: meetup.imageId ? {'--bg-url': `url('https://course-vue.javascript.ru/api/images/${meetup.imageId}')`} : undefined,
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      }))
    }
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
