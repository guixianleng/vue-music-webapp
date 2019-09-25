import { loadSearch, loadPlay, loadFavorite } from 'utils/cache'

const state = {
  singerList: {},
  playing: false, // 播放开关
  fullScreen: false, // 播放器是否全屏开关
  playlist: [], // 播放列表
  mode: 0, // 循序模式
  currentIndex: -1, // 当前播放的index
  searchHistory: loadSearch(), // 搜索历史记录
  playHistory: loadPlay(), // 播放历史记录
  favoriteList: loadFavorite() // 我喜欢的歌曲
}

export default state
