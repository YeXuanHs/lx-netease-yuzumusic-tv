import { overwriteUserApis } from '@/core/userApi'
import { log } from '@/core/userApi'

const ONLINE_SOURCES = [
  {
    id: 'online_ikun',
    name: 'ikun音源[在线]',
    description: '在线音源 - ikun',
    version: 'online',
    author: 'ikunshare',
    url: 'https://api.ikunshare.com/script',
  },
  {
    id: 'online_fish',
    name: 'fish_music[在线]',
    description: '在线音源 - fish',
    version: 'online',
    author: '大鱼吃小鱼',
    url: 'https://m-api.ceseet.me/script',
  },
  {
    id: 'online_yehua',
    name: '野花音源[在线]',
    description: '在线音源 - 野花',
    version: 'online',
    author: 'pdone',
    url: 'https://ghproxy.net/https://raw.githubusercontent.com/pdone/lx-music-source/main/flower/latest.js',
  },
  {
    id: 'online_yecao',
    name: '野草音源[在线]',
    description: '在线音源 - 野草',
    version: 'online',
    author: '未知',
    url: 'https://tt.tenmeng.com/moonue/js/yecao202412.js',
  },
  {
    id: 'online_huibq',
    name: 'Huibq音源[在线]',
    description: '在线音源 - Huibq',
    version: 'online',
    author: 'Huibq',
    url: 'https://fastly.jsdelivr.net/gh/Huibq/keep-alive/render_api.js',
  },
  {
    id: 'online_xinghai',
    name: '星海音乐源[在线]',
    description: '在线音源 - 星海',
    version: 'online',
    author: '万去了了',
    url: 'https://zrcdy.dpdns.org/xinghai-music-source.js',
  },
  {
    id: 'online_xinlan',
    name: '新澜音源[在线]',
    description: '在线音源 - 新澜',
    version: 'online',
    author: '时迁酱',
    url: 'https://source.shiqianjiang.cn/script/lx',
  },
  {
    id: 'online_ciallo',
    name: 'Ciallo音源[在线]',
    description: '在线音源 - Ciallo',
    version: 'online',
    author: '竹佀＆玥然OvO',
    url: 'https://raw.githubusercontent.com/TZB679/USEFUL-LX-MUSIC-SOURCES/refs/heads/main/Ciallo%20v0721.js',
  },
  {
    id: 'online_lerd',
    name: '聚合API接口[在线]',
    description: '在线音源 - 聚合API',
    version: 'online',
    author: 'lerd',
    url: 'https://api.music.lerd.dpdns.org/script.js',
  },
  {
    id: 'online_yibai',
    name: 'yibai音源[在线]',
    description: '在线音源 - yibai',
    version: 'online',
    author: 'yibai',
    url: 'https://raw.githubusercontent.com/TZB679/USEFUL-LX-MUSIC-SOURCES/refs/heads/main/yibai%E9%85%B7%E6%88%91%E6%B5%81%E5%BC%8F(%E4%BB%85v6%E7%BD%91%E7%BB%9C%E5%8F%AF%E7%94%A8)%20v114514.js',
  },
  {
    id: 'online_luoyue',
    name: '落月音源[在线]',
    description: '在线音源 - 落月',
    version: 'online',
    author: '高音质',
    url: 'https://raw.githubusercontent.com/TZB679/USEFUL-LX-MUSIC-SOURCES/refs/heads/main/%E8%90%BD%E6%9C%88%20v1.0.3.js',
  },
  {
    id: 'online_nianxin',
    name: '念心音源[在线]',
    description: '在线音源 - 念心',
    version: 'online',
    author: '念心小站',
    url: 'https://raw.githubusercontent.com/TZB679/USEFUL-LX-MUSIC-SOURCES/refs/heads/main/%E5%BF%B5%E5%BF%83%E9%9F%B3%E6%BA%90%20v1.0.0.js',
  },
  {
    id: 'online_lingchuan',
    name: '聆川音源[在线]',
    description: '在线音源 - 聆川',
    version: 'online',
    author: '西瓜',
    url: 'https://music.xiagua.top/free.js',
  },
  {
    id: 'online_official',
    name: 'LX公众号音源[在线]',
    description: '在线音源 - LX公众号',
    version: 'online',
    author: '洛雪科技',
    url: 'https://88.lxmusic.xn--fiqs8s/script?key=lxmusic',
  },
  {
    id: 'online_liuyin',
    name: '六音音源[在线]',
    description: '在线音源 - 六音',
    version: 'online',
    author: '六音',
    url: 'https://ghproxy.net/https://raw.githubusercontent.com/pdone/lx-music-source/main/sixyin/latest.js',
  },
  {
    id: 'online_changqing',
    name: '长青SVIP音源[在线]',
    description: '在线音源 - 长青SVIP',
    version: 'online',
    author: 'SVIP',
    url: 'https://ghproxy.net/https://raw.githubusercontent.com/TZB679/USEFUL-LX-MUSIC-SOURCES/refs/heads/main/(new)%E9%95%BF%E9%9D%92SVIP%E9%9F%B3%E6%BA%90%20v1.1.0(%E9%87%8D%E5%8F%91%E7%9A%84%E4%BF%AE%E5%A4%8D%E7%89%88).js',
  },
  {
    id: 'online_shouji',
    name: '收集の聚合接口[在线]',
    description: '在线音源 - 收集の聚合接口',
    version: 'online',
    author: 'QZ',
    url: 'https://ghproxy.net/https://raw.githubusercontent.com/TZB679/USEFUL-LX-MUSIC-SOURCES/refs/heads/main/%E6%94%B6%E9%9B%86%E3%81%AE%E8%81%9A%E5%90%88%E6%8E%A5%E5%8F%A3(LX%E7%89%88)%20v1.0.0-beta.js',
  },
  {
    id: 'online_yuningxi',
    name: 'lx-玉宁熙[在线]',
    description: '在线音源 - lx-玉宁熙',
    version: 'online',
    author: 'ynx',
    url: 'https://gitee.com/Myn_1/Mao_Yuna/raw/MYN_update/lx-music/lx-玉宁熙.js',
  },
]

const BUILTIN_SOURCES = [
  {
    id: 'builtin_ikun_v22',
    name: 'ikun音源[公益版] v22',
    description: 'QQ群970586864',
    version: 'v22',
    author: 'ikunshare',
    scriptPath: 'builtin_sources/ikun_source_v22.js',
  },
  {
    id: 'builtin_xinlan_v4',
    name: '新澜音源(公益版) v4.0.0',
    description: '支持所有平台320k音质',
    version: 'v4.0.0',
    author: '时迁酱',
    scriptPath: 'builtin_sources/xinlan_source_v4.js',
  },
  {
    id: 'builtin_ciallo_v0721',
    name: 'Ciallo～(∠・ω< )⌒☆ v0721',
    description: '仅支持网易，理论支持全音质',
    version: 'v0721',
    author: '竹佀＆玥然OvO',
    scriptPath: 'builtin_sources/ciallo_source_v0721.js',
  },
  {
    id: 'builtin_fish_v101',
    name: 'fish_music v1.0.1',
    description: '交流群组:https://t.me/yus_share',
    version: 'v1.0.1',
    author: '大鱼吃小鱼',
    scriptPath: 'builtin_sources/fish_source_v101.js',
  },
  {
    id: 'builtin_xinghai_v227',
    name: '星海音乐源 v2.2.7',
    description: '基于GD Studio API和TuneHub API的双引擎聚合音乐播放源',
    version: 'v2.2.7',
    author: '万去了了',
    scriptPath: 'builtin_sources/xinghai_source_v227.js',
  },
  {
    id: 'builtin_yibai_kw_v114514',
    name: 'yibai酷我流式(v4) v114514',
    description: '仅支持酷我全音质，建议下载出来播放',
    version: 'v114514',
    author: 'yibai',
    scriptPath: 'builtin_sources/yibai_kw_v114514.js',
  },
  {
    id: 'builtin_xingkong_v11',
    name: '星空源 v1.1',
    description: '只是一个星空测试音乐源哦',
    version: 'v1.1',
    author: 'ljw 和 星空api',
    scriptPath: 'builtin_sources/xingkong_source_v11.js',
  },
  {
    id: 'builtin_juhe_api_v3',
    name: '聚合API接口 (CF) v3',
    description: '聚合API接口',
    version: 'v3',
    author: 't.me/JHMS_Channel',
    scriptPath: 'builtin_sources/juhe_api_v3.js',
  },
  {
    id: 'builtin_yehua_v1',
    name: '野花🌷 v1',
    description: '野花音源',
    version: 'v1',
    author: '未知',
    scriptPath: 'builtin_sources/yehua_source_v1.js',
  },
  {
    id: 'builtin_yecao_v1',
    name: '野草🌾 v1',
    description: '野草音源',
    version: 'v1',
    author: '未知',
    scriptPath: 'builtin_sources/yecao_source_v1.js',
  },
  {
    id: 'builtin_changqing_svip_v111',
    name: '长青SVIP音源 v1.1.1',
    description: '音源更新，关注微信公众号: 科技长青',
    version: 'v1.1.1',
    author: 'SVIP',
    scriptPath: 'builtin_sources/changqing_svip_v111.js',
  },
  {
    id: 'builtin_lx_official_v4',
    name: '[独家音源] v4',
    description: '音源更新，关注微信公众号：洛雪科技',
    version: 'v4',
    author: '洛雪科技',
    scriptPath: 'builtin_sources/lx_official_v4.js',
  },
  {
    id: 'builtin_luoxue_v2',
    name: '洛雪音乐源 1.0.0 v2-fix',
    description: '支持QQ音乐、酷狗音乐、酷我音乐、网易云音乐、咪咕音乐五大平台',
    version: 'v2-fix',
    author: 'Sereinf',
    scriptPath: 'builtin_sources/luoxue_source_v2.js',
  },
  {
    id: 'builtin_huibq_v120_3',
    name: 'Huibq源 v1.2.0-3',
    description: 'Github搜索"洛雪音乐音源"，禁止批量下载！',
    version: 'v1.2.0-3',
    author: 'Huibq',
    scriptPath: 'builtin_sources/huibq_v120_3.js',
  },
  {
    id: 'builtin_shouji_juhe_v100beta',
    name: '收集の聚合接口(LX版) v1.0.0-beta',
    description: '聚合接口-来源于网络 整理:QZ',
    version: 'v1.0.0-beta',
    author: 'QZ',
    scriptPath: 'builtin_sources/shouji_juhe_v100beta.js',
  },
  {
    id: 'builtin_mygo_v1',
    name: 'MyGO音源 v1',
    description: '接口来自简云，支持Q音，最高Hires，交流群1078955749',
    version: 'v1',
    author: '玥然OvO',
    scriptPath: 'builtin_sources/mygo_source_v1.js',
  },
  {
    id: 'builtin_nianxin_v100',
    name: '念心音源 v1.0.0',
    description: '音源更新，关注微信公众号: 念心小站',
    version: 'v1.0.0',
    author: '念心小站',
    scriptPath: 'builtin_sources/nianxin_source_v100.js',
  },
  {
    id: 'builtin_yiyin_v1',
    name: '忆音音源 v1',
    description: '支持Q音网易320k',
    version: 'v1',
    author: '竹佀＆玥然OvO',
    scriptPath: 'builtin_sources/yiyin_source_v1.js',
  },
  {
    id: 'builtin_suyin_v1',
    name: '溯音音源 v1',
    description: '集成QQ、网易、酷我、咪咕音乐平台，QQ群1078955749',
    version: 'v1',
    author: '竹佀',
    scriptPath: 'builtin_sources/suyin_source_v1.js',
  },
  {
    id: 'builtin_huanyin_v3',
    name: '幻音音源 v3',
    description: '支持QQ、酷我、网易、咪咕音乐平台',
    version: 'v3',
    author: '竹佀',
    scriptPath: 'builtin_sources/huanyin_source_v3.js',
  },
  {
    id: 'builtin_tingyin_v2',
    name: '听音音源 v2',
    description: '支持除酷狗以外的所有平台',
    version: 'v2',
    author: '竹佀',
    scriptPath: 'builtin_sources/tingyin_source_v2.js',
  },
  {
    id: 'builtin_wenyin_v21',
    name: '闻音音源 v2.1',
    description: '仅网易 提高了匹配正确性',
    version: 'v2.1',
    author: '竹佀',
    scriptPath: 'builtin_sources/wenyin_source_v21.js',
  },
  {
    id: 'builtin_luoyue_v103',
    name: '落雪 v1.0.3',
    description: '交流群组:https://t.me/yus_share',
    version: 'v1.0.3',
    author: '高音质',
    scriptPath: 'builtin_sources/luoyue_source_v103.js',
  },
  {
    id: 'builtin_xiyuan_v1',
    name: '惜缘 v1',
    description: '支持QQ、酷我、网易、咪咕音乐平台',
    version: 'v1',
    author: '竹佀',
    scriptPath: 'builtin_sources/xiyuan_source_v1.js',
  },
  {
    id: 'builtin_juhe_api_v200',
    name: '聚合API接口 (by lerd) v2.0.0',
    description: '理论可听全平台无损',
    version: 'v2.0.0',
    author: 'lerd',
    scriptPath: 'builtin_sources/juhe_api_v200.js',
  },
  {
    id: 'builtin_lingchuan_v13',
    name: '聆川音源(公益版) v13',
    description: '支持所有平台320k音质',
    version: 'v13',
    author: 'guoyue2010',
    scriptPath: 'builtin_sources/lingchuan_v13.js',
  },
  {
    id: 'builtin_liuyin_v121',
    name: '六音音源 v1.2.1',
    description: '如失效请前往 www.sixyin.com 下载最新版本',
    version: 'v1.2.1',
    author: '六音',
    scriptPath: 'builtin_sources/liuyin_v121.js',
  },
  {
    id: 'builtin_lx_yuningxi_v110',
    name: 'lx-玉宁熙 v1.1.0',
    description: 'qq/wy/kw/mg音源 交流群822317725',
    version: 'v1.1.0',
    author: 'ynx(2363768762)',
    scriptPath: 'builtin_sources/lx_yuningxi_v110.js',
  },
  {
    id: 'builtin_huaban_v200beta5',
    name: '花瓣源（原netease，电脑版亲测有用) v2.0.0.beta5',
    description: '主页：https://github.com/TZB679/USEFUL-LX-MUSIC-SOURCES',
    version: 'v2.0.0.beta5',
    author: 'TZB679',
    scriptPath: 'builtin_sources/huaban_source_v200beta5.js',
  },
]

export const loadBuiltinSources = async () => {
  try {
    const { readFile } = require('@/utils/nativeModules/fs')
    const scripts: Record<string, string> = {}
    const list: LX.UserApi.UserApiInfo[] = []

    for (const source of BUILTIN_SOURCES) {
      try {
        const scriptContent = await readFile(source.scriptPath)
        scripts[source.id] = scriptContent
        list.push({
          id: source.id,
          name: source.name,
          description: source.description,
          version: source.version,
          author: source.author,
          allowShowUpdateAlert: true,
        })
        log.info(`Loaded builtin source: ${source.name}`)
      } catch (error: any) {
        log.error(`Failed to load builtin source ${source.name}:`, error.message)
      }
    }

    if (list.length > 0) {
      await overwriteUserApis({ list, scripts })
      log.info(`Loaded ${list.length} builtin sources successfully`)
    }

    return list.length
  } catch (error: any) {
    log.error('Failed to load builtin sources:', error.message)
    return 0
  }
}

export const loadOnlineSources = async () => {
  try {
    const { request } = require('@/utils/request')
    const { overwriteUserApis } = require('@/core/userApi')
    const scripts: Record<string, string> = {}
    const list: LX.UserApi.UserApiInfo[] = []
    let loadedCount = 0

    for (const source of ONLINE_SOURCES) {
      try {
        const response = await request(source.url, { method: 'GET' })
        if (response.body) {
          scripts[source.id] = response.body
          list.push({
            id: source.id,
            name: source.name,
            description: source.description,
            version: source.version,
            author: source.author,
            allowShowUpdateAlert: true,
          })
          loadedCount++
          log.info(`Loaded online source: ${source.name}`)
        }
      } catch (error: any) {
        log.error(`Failed to load online source ${source.name}:`, error.message)
      }
    }

    if (list.length > 0) {
      await overwriteUserApis({ list, scripts })
      log.info(`Loaded ${loadedCount} online sources successfully`)
    }

    return loadedCount
  } catch (error: any) {
    log.error('Failed to load online sources:', error.message)
    return 0
  }
}

export const getBuiltinSourceIds = () => {
  return BUILTIN_SOURCES.map(s => s.id)
}

export default loadBuiltinSources
