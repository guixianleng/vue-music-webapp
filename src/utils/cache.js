import Cookies from 'js-cookie'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

// 插入
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 0)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 删除
function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 保存搜索记录
export function saveSearch (query) {
  let searches = Cookies.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  Cookies.set(SEARCH_KEY, searches)
  return searches
}

// 获取搜索记录
export function loadSearch () {
  return Cookies.get(SEARCH_KEY, [])
}

// 删除搜索内容
export function deleteSearch (query) {
  let searches = Cookies.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  Cookies.set(SEARCH_KEY, searches)
  return searches
}

// 清空搜索记录
export function clearSearch () {
  Cookies.remove(SEARCH_KEY)
  return []
}

// 设置播放列表
export function savePlay (song) {
  let songs = Cookies.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  Cookies.set(PLAY_KEY, songs)
  return songs
}

// 获取播放列表
export function loadPlay () {
  return Cookies.get(PLAY_KEY, [])
}

// 收藏歌曲
export function saveFavorite (song) {
  let songs = Cookies.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  Cookies.set(FAVORITE_KEY, songs)
  return songs
}

// 删除收藏歌曲
export function deleteFavorite (song) {
  let songs = Cookies.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  Cookies.set(FAVORITE_KEY, songs)
  return songs
}

// 获取收藏歌曲列表
export function loadFavorite () {
  return Cookies.get(FAVORITE_KEY, [])
}
