/*!
 * @name 落雪
 * @description 交流群组:https://t.me/yus_share
 * @version 1.0.3
 * @author 高音质
 * @repository https://github.com/lxmusics/lx-music-api-server
 */

const DEV_ENABLE = false
const UPDATE_ENABLE = true
const API_URL = "https://m-api.ceseet.me"
const API_KEY = ``
const MUSIC_QUALITY = JSON.parse('{"tx":["128k", "320k", "flac24bit", "hires", "atmos", "master"],"wy":["128k", "320k", "flac24bit", "hires", "atmos", "master"]}')
const MUSIC_SOURCE = Object.keys(MUSIC_QUALITY)
MUSIC_SOURCE.push('local')

const { EVENT_NAMES, request, on, send, utils, env, version } = globalThis.lx

const SCRIPT_MD5 = '5fe365644241ca1b6a0f7ae4e333cf52'

const httpFetch = (url, options = { method: 'GET' }) => {
  return new Promise((resolve, reject) => {
    console.log('--- start --- ' + url)
    request(url, options, (err, resp) => {
      if (err) return reject(err)
      console.log('API Response: ', resp)
      resolve(resp)
    })
  })
}

const handleBase64Encode = (data) => {
  var data = utils.buffer.from(data, 'utf-8')
  return utils.buffer.bufToString(data, 'base64')
}

const handleGetMusicUrl = async (source, musicInfo, quality) => {
  if (source == 'local') {
    if (!musicInfo.songmid.startsWith('server_')) throw new Error('upsupported local file')
    const songId = musicInfo.songmid
    const requestBody = {
      p: songId.replace('server_', ''),
    }
    var t = 'c'
    var b = handleBase64Encode(JSON.stringify(requestBody)).replace(/\+/g, '-').replace(/\//g, '_')
    const targetUrl = `${API_URL}/local/${t}?q=${b}`
    const request = await httpFetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`,
        'X-Request-Key': API_KEY,
      },
      follow_max: 5,
    })
    const { body } = request
    if (body.code == 0 && body.data && body.data.file) {
      var t = 'u'
      var b = handleBase64Encode(JSON.stringify(requestBody)).replace(/\+/g, '-').replace(/\//g, '_')
      return `${API_URL}/local/${t}?q=${b}`
    }
    throw new Error('404 Not Found')
  }

  const songId = musicInfo.hash ?? musicInfo.songmid

  const request = await httpFetch(`http://220.167.101.253:6001/api/musics/url/${source}/${songId}/${quality}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`,
      'X-Request-Key': API_KEY,
    },
    follow_max: 5,
  })
  const { body } = request

  if (!body || isNaN(Number(body.code))) throw new Error('unknow error')
  if (env != 'mobile') console.groupEnd()
  switch (body.code) {
    case 0:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) success, URL: ${body.data}`)
      return body.data
    case 1:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed: ip被封禁`)
      throw new Error('block ip')
    case 2:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed, ${body.msg}`)
      throw new Error('get music url failed')
    case 4:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed, 远程服务器错误`)
      throw new Error('internal server error')
    case 5:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed, 请求过于频繁，请休息一下吧`)
      throw new Error('too many requests')
    case 6:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed, 请求参数错误`)
      throw new Error('param error')
    default:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed, ${body.msg ? body.msg : 'unknow error'}`)
      throw new Error(body.msg ?? 'unknow error')
  }
}

const handleGetMusicPic = async (source, musicInfo) => {
  switch (source) {
    case 'local':
      if (!musicInfo.songmid.startsWith('server_')) throw new Error('upsupported local file')
      const songId = musicInfo.songmid
      const requestBody = {
        p: songId.replace('server_', ''),
      }
      var t = 'c'
      var b = handleBase64Encode(JSON.stringify(requestBody)).replace(/\+/g, '-').replace(/\//g, '_')
      const targetUrl = `${API_URL}/local/${t}?q=${b}`
      const request = await httpFetch(targetUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`
        },
        follow_max: 5,
      })
      const { body } = request
      if (body.code === 0 && body.data.cover) {
        var t = 'p'
        var b = handleBase64Encode(JSON.stringify(requestBody)).replace(/\+/g, '-').replace(/\//g, '_')
        return `${API_URL}/local/${t}?q=${b}`
      }
      throw new Error('get music pic failed')
    default:
      throw new Error('action(pic) does not support source(' + source + ')')
  }
}

const handleGetMusicLyric = async (source, musicInfo) => {
  switch (source) {
    case 'local':
      if (!musicInfo.songmid.startsWith('server_')) throw new Error('upsupported local file')
      const songId = musicInfo.songmid
      const requestBody = {
        p: songId.replace('server_', ''),
      }
      var t = 'c'
      var b = handleBase64Encode(JSON.stringify(requestBody)).replace(/\+/g, '-').replace(/\//g, '_')
      const targetUrl = `${API_URL}/local/${t}?q=${b}`
      const request = await httpFetch(targetUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`
        },
        follow_max: 5,
      })
      const { body } = request
      if (body.code === 0 && body.data.lyric) {
        var t = 'l'
        var b = handleBase64Encode(JSON.stringify(requestBody)).replace(/\+/g, '-').replace(/\//g, '_')
        const request2 = await httpFetch(`${API_URL}/local/${t}?q=${b}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`
          },
          follow_max: 5,
        })
        if (request2.body.code === 0) {
          return {
            lyric: request2.body.data ?? "",
            tlyric: "",
            rlyric: "",
            lxlyric: ""
          }
        }
        throw new Error('get music lyric failed')
      }
      throw new Error('get music lyric failed')
    default:
      throw new Error('action(lyric) does not support source(' + source + ')')
  }
}

const checkUpdate = async () => {
  const request = await httpFetch(`${API_URL}/script?key=${API_KEY}&checkUpdate=${SCRIPT_MD5}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`
    },
  })
  const { body } = request

  if (!body || body.code !== 0) console.log('checkUpdate failed')
  else {
    console.log('checkUpdate success')
    if (body.data != null) {
      globalThis.lx.send(lx.EVENT_NAMES.updateAlert, { log: body.data.updateMsg, updateUrl: body.data.updateUrl })
    }
  }
}

const musicSources = {}
MUSIC_SOURCE.forEach(item => {
  musicSources[item] = {
    name: item,
    type: 'music',
    actions: (item == 'local') ? ['musicUrl', 'pic', 'lyric'] : ['musicUrl'],
    qualitys: (item == 'local') ? [] : MUSIC_QUALITY[item],
  }
})

on(EVENT_NAMES.request, ({ action, source, info }) => {
  switch (action) {
    case 'musicUrl':
      if (env != 'mobile') {
        console.group(`Handle Action(musicUrl)`)
        console.log('source', source)
        console.log('quality', info.type)
        console.log('musicInfo', info.musicInfo)
      } else {
        console.log(`Handle Action(musicUrl)`)
        console.log('source', source)
        console.log('quality', info.type)
        console.log('musicInfo', info.musicInfo)
      }
      return handleGetMusicUrl(source, info.musicInfo, info.type)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err))
    case 'pic':
      return handleGetMusicPic(source, info.musicInfo)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err))
    case 'lyric':
      return handleGetMusicLyric(source, info.musicInfo)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err))
    default:
      console.error(`action(${action}) not support`)
      return Promise.reject('action not support')
  }
})

if (UPDATE_ENABLE) checkUpdate()
send(EVENT_NAMES.inited, { status: true, openDevTools: DEV_ENABLE, sources: musicSources })
