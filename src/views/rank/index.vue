<template>
  <div class="rank">
    <Scroll>
      <ul>
        <li @click="handleRankDetail(item)" class="item" v-for="item in topList" :key="item.id">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl"/>
          </div>
          <ul class="song-list">
            <li class="song" v-for="(song, index) in item.songList" :key="song.id">
              <span>{{index + 1}}.</span>
              <span>{{song.songname}} - {{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from 'baseUI/Scroll'
import { getTopList } from 'api/rank'
import { ERR_OK } from 'api/config'

export default {
  name: 'Rank',
  components: {
    Scroll
  },
  data () {
    return {
      topList: []
    }
  },
  created () {
    this._getTopList()
  },
  methods: {
    handleRankDetail (item) {
      this.$router.push({ path: `/rank/${item.id}` })
    },
    _getTopList () {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/variable';
@import '~assets/style/mixin';
.rank {
  position: fixed;
  width: 100%;
  top: 87px;
  bottom: 0;
  background-color: #fff;
  .item {
    display: flex;
    margin: 0 20px;
    padding-top: 20px;
    height: 100px;
    &:last-child {
      padding-bottom: 20px
    }
    .icon {
      flex: 0 0 100px;
      width: 100px;
      height: 100px;
      img {
        border-radius: 3px;
      }
    }
    .song-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 20px;
      height: 100px;
      overflow: hidden;
      color: @text-color;
      font-size: @fs-medium;
      border-radius: 0 4px 4px 0;
      .song {
        .ellipsis();
        line-height: 26px;
        span {
          &:first-child {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
