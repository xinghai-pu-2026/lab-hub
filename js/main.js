/* ============================================================
   电控组资源站 · 页面逻辑（一般不需要改这个文件）
   它读取 data/resources.js 里的内容，自动渲染页面

   页面结构：每个【工作区】独立成一块（标题 + 简介 + 卡片）。
   顶部导航和 chips 用来只看某一个工作区。
   ============================================================ */

(function () {
  'use strict'

  const SITE = window.SITE || {}
  /* 工作区：优先读 WORKSPACES，兼容旧的 CATEGORIES 写法 */
  const AREAS = window.WORKSPACES || window.CATEGORIES || []
  const RES = window.RESOURCES || []

  /* 每个工作区一个配色（按顺序取，超过就循环；加工作区时记得也加一个颜色） */
  const AREA_COLORS = ['#2563eb', '#0ea5e9', '#7c3aed', '#0d9488', '#ea580c', '#0284c7', '#be123c', '#65a30d']

  /* —— 填入站点信息 —— */
  const set = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined && v !== '') el.textContent = v }
  set('site-name', SITE.name)
  set('nav-name', SITE.name)
  set('site-sub', SITE.sub)
  set('site-notice', SITE.notice || null)
  set('footer-text', SITE.footer)
  if (SITE.name) document.title = SITE.name

  /* —— 工作区辅助 —— */
  const areaOf = id => AREAS.find(a => a.id === id)
  const areaIndex = id => { const i = AREAS.findIndex(a => a.id === id); return i < 0 ? 0 : i }
  const colorOf = id => AREA_COLORS[areaIndex(id) % AREA_COLORS.length]
  /* 资源的归属：新字段 area，兼容旧的 cat */
  const areaKeyOf = r => r.area || r.cat || ''

  /* —— 渲染顶部导航工作区链接 —— */
  const navLinks = document.getElementById('nav-links')
  if (navLinks) {
    AREAS.forEach(a => {
      const el = document.createElement('a')
      el.href = '#cards'
      el.textContent = a.icon + ' ' + a.name
      el.addEventListener('click', () => selectCat(a.id, true))
      navLinks.appendChild(el)
    })
  }

  /* —— 渲染工作区 chips —— */
  const chips = document.getElementById('cat-chips')
  const allChip = document.createElement('div')
  allChip.className = 'chip active'
  allChip.textContent = '🏠 全部工作区'
  allChip.dataset.cat = ''
  chips.appendChild(allChip)

  AREAS.forEach(a => {
    const el = document.createElement('div')
    el.className = 'chip'
    el.textContent = a.icon + ' ' + a.name
    el.dataset.cat = a.id
    chips.appendChild(el)
  })

  /* —— 状态 —— */
  let activeCat = ''
  let keyword = ''

  /* —— 筛选逻辑 —— */
  function visible() {
    const k = keyword.trim().toLowerCase()
    return RES.filter(r =>
      (activeCat === '' || areaKeyOf(r) === activeCat) &&
      (k === '' || [r.name, r.desc, r.note, r.version, r.size].filter(Boolean).join(' ').toLowerCase().includes(k))
    )
  }

  /* —— 容器 —— */
  const cardsEl = document.getElementById('cards')
  const emptyEl = document.getElementById('empty')
  const countEl = document.getElementById('res-count')

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]))
  }

  /* —— 造一张资源卡 —— */
  function makeCard(r, area) {
    // —— 钥匙锁：资源块写了 lock 字段 → 显示输入框，输对钥匙(或主密钥)才出现下载 ——
    const locked = r.lock ? escapeHtml(String(r.lock)) : ''
    let actions
    if (!locked) {
      const bs = []
      const dl = r.dl ? ' download' : ''
      if (r.url) bs.push(`<a class="btn btn-primary" href="${escapeHtml(r.url)}" target="_blank" rel="noopener"${dl}>${r.dl ? '⬇ 下载' : '📖 打开'}</a>`)
      if (r.url2) bs.push(`<a class="btn btn-ghost" href="${escapeHtml(r.url2)}" target="_blank" rel="noopener">🔄 镜像</a>`)
      actions = bs.join('') || '<span class="card-desc">（未填写下载链接）</span>'
    } else {
      actions = `
        <input class="key-input" data-lock="${locked}" placeholder="🔑 输入这把锁的钥匙" autocomplete="off" />
        <button class="btn btn-primary key-btn" data-url="${escapeHtml(r.url || '')}" data-url2="${escapeHtml(r.url2 || '')}" data-dl="${r.dl ? '1' : ''}">🔓 解锁</button>
      `
    }

    const meta = [
      r.version ? `<div>${escapeHtml(r.version)}</div>` : '',
      r.size ? `<div>${escapeHtml(r.size)}</div>` : '',
      locked ? `<div style="color:#d97706">🔒 需钥匙</div>` : ''
    ].join('')

    const note = r.note ? `<div class="card-note">💡 ${escapeHtml(r.note)}</div>` : ''

    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <div class="card-top">
        <span class="card-icon">${escapeHtml((area && area.icon) || '📦')}</span>
        <div>
          <div class="card-title">${escapeHtml(r.name)}</div>
        </div>
        <div class="card-meta">${meta}</div>
      </div>
      ${r.desc ? `<p class="card-desc">${escapeHtml(r.desc)}</p>` : ''}
      ${note}
      <div class="card-actions">${actions}</div>
    `
    return card
  }

  /* —— 渲染：每个工作区独立成一块 —— */
  function render() {
    const list = visible()
    const searching = keyword.trim() !== ''
    cardsEl.innerHTML = ''

    const areasToShow = activeCat === '' ? AREAS : AREAS.filter(a => a.id === activeCat)
    let shown = 0
    let blocks = 0

    areasToShow.forEach(area => {
      const items = list.filter(r => areaKeyOf(r) === area.id)
      // 搜索时，没命中的工作区整块隐藏；平时空工作区也留着占位，方便看整体结构
      if (searching && items.length === 0) return
      blocks++
      shown += items.length

      const sec = document.createElement('section')
      sec.className = 'area'
      sec.id = 'area-' + area.id
      sec.style.setProperty('--area-color', colorOf(area.id))

      const head = document.createElement('div')
      head.className = 'area-head'
      head.innerHTML = `
        <span class="area-icon">${escapeHtml(area.icon || '📦')}</span>
        <div class="area-titles">
          <h3 class="area-name">${escapeHtml(area.name)}</h3>
          ${area.desc ? `<p class="area-desc">${escapeHtml(area.desc)}</p>` : ''}
        </div>
        <span class="area-count">${items.length} 个</span>
      `
      sec.appendChild(head)

      const grid = document.createElement('div')
      grid.className = 'cards'
      if (items.length === 0) {
        const ph = document.createElement('div')
        ph.className = 'area-empty'
        ph.textContent = '📭 这个工作区还没放资料，敬请期待'
        grid.appendChild(ph)
      } else {
        items.forEach(r => grid.appendChild(makeCard(r, area)))
      }
      sec.appendChild(grid)
      cardsEl.appendChild(sec)
    })

    if (blocks === 0) {
      emptyEl.classList.remove('hidden')
      countEl.textContent = ''
      return
    }
    emptyEl.classList.add('hidden')
    countEl.textContent = `共 ${shown} 个 · ${blocks} 个工作区`
  }

  /* —— 工作区/搜索交互 —— */
  function selectCat(id, scroll) {
    activeCat = id
    document.querySelectorAll('.chip').forEach(c =>
      c.classList.toggle('active', c.dataset.cat === id))
    render()
    if (scroll) {
      const target = id === '' ? cardsEl : document.getElementById('area-' + id)
      if (target && target.scrollIntoView) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  chips.addEventListener('click', e => {
    const chip = e.target.closest('.chip')
    if (!chip) return
    selectCat(chip.dataset.cat || '')
  })

  const searchBox = document.getElementById('search-box')
  if (searchBox) {
    searchBox.addEventListener('input', () => {
      keyword = searchBox.value
      render()
    })
  }

  /* —— 解锁交互：输对"本卡钥匙"或"主密钥"都放行 —— */
  const MASTER_KEY = (SITE.masterKey || '').trim()
  cardsEl.addEventListener('click', e => {
    const btn = e.target.closest('.key-btn')
    if (!btn) return
    const box = btn.closest('.card-actions').querySelector('.key-input')
    if (!box) return
    const guess = box.value.trim()
    const pass = guess.toLowerCase() === String(box.dataset.lock).toLowerCase() || (MASTER_KEY !== '' && guess === MASTER_KEY)
    if (!pass) {
      box.value = ''
      box.placeholder = '❌ 不对，再找找线索，或找学长'
      box.focus()
      return
    }
    const dl = btn.dataset.dl ? ' download' : ''
    const mk = u => u
      ? `<a class="btn btn-primary" href="${escapeHtml(u)}" target="_blank" rel="noopener"${dl}>${btn.dataset.dl ? '⬇ 下载' : '📖 打开'}</a>`
      : ''
    const mk2 = u => u
      ? `<a class="btn btn-ghost" href="${escapeHtml(u)}" target="_blank" rel="noopener">🔄 镜像</a>`
      : ''
    const left = mk(btn.dataset.url)
    const right = mk2(btn.dataset.url2)
    const inner = (left + right) || '<span class="card-desc">（未填写下载链接）</span>'
    // ⚠️ 先把卡片和动作区抓到手里：下面替换 innerHTML 会把 btn 从文档里摘掉，
    // 之后再调 btn.closest('.card') 只会得到 null（旧代码就是在这里抛错的）。
    const cardEl = btn.closest('.card')
    const actionsEl = btn.closest('.card-actions')
    actionsEl.innerHTML = inner
    // 卡片顶部保留已解锁的小标记
    const metaEl = cardEl && cardEl.querySelector('.card-meta')
    if (metaEl) metaEl.insertAdjacentHTML('beforeend', '<div style="color:#059669">🔓 已解锁</div>')
  })

  /* —— 回车也能解锁（不用点按钮）—— */
  cardsEl.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return
    const inp = e.target.closest('.key-input')
    if (!inp) return
    e.preventDefault()
    inp.closest('.card-actions').querySelector('.key-btn').click()
  })

  /* —— 初始渲染 —— */
  render()
})()
