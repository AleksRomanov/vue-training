<template>
  <main class="main">
    <div class="container">
      <div class="meetups-list">
        <a v-for="meetup in meetups" href="/meetups/1" class="meetups-list__item">
          <div class="meetups-list__col">
            <div class="meetups-list__cover">
              <h5>{{ meetup.title }}</h5>
            </div>
            <div class="meetups-list__col">
              <div class="meetups-list__description">
                <span v-show="meetup.attending" class="meetups-list__badge meetups-list__success">Участвую</span>
                <span v-show="meetup.organizing" class="meetups-list__badge">Организую</span>
                <ul class="info-list">
                  <li><img class="icon info-list__icon" src="../assets/logo.png" alt="icon"/>
                    {{ meetup.organizer }}
                  </li>
                  <li><img class="icon info-list__icon" src="../assets/logo.png" alt="icon"/>
                    {{ meetup.place }}
                  </li>
                  <li><img class="icon info-list__icon" src="../assets/logo.png" alt="icon"/>
                  <time datetime="2020-02-31">{{meetup.date}}</time>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </a>
      </div>

      <!--      <div class="filters-panel">-->
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
      <!--      </div>-->
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import meetupsData from "../../api/meetups-data";

export default {
  name: 'HomeView',
  data() {
    return {
      meetups: meetupsData
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/styles/styles";
</style>
