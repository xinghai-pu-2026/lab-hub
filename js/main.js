/* ============================================================
   学长资源站 · 页面逻辑（一般不需要改这个文件）
   它读取 data/resources.js 里的内容，自动渲染页面
   ============================================================ */

(function () {
  'use strict'

  const SITE = window.SITE || {}
  const CATS = window.CATEGORIES || []
  const RES = window.RESOURCES || []

  /* —— 填入站点信息 —— */
  const set = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined && v !== '') el.textContent = v }
  set('site-name', SITE.name)
  set('nav-name', SITE.name)
  set('site-sub', SITE.sub)
  set('site-notice', SITE.notice || null)
  set('footer-text', SITE.footer)
  if (SITE.name) document.title = SITE.name

  /* —— 分类辅助 —— */
  const catOf = id => CATS.find(c => c.id === id)

  /* —— 渲染顶部导航分类链接 —— */
  const navLinks = document.getElementById('nav-links')
  if (navLinks) {
    CATS.forEach(c => {
      const a = document.createElement('a')
      a.href = '#cards'
      a.textContent = c.icon + ' ' + c.name
      a.addEventListener('click', () => selectCat(c.id))
      navLinks.appendChild(a)
    })
  }

  /* —— 渲染分类 chips —— */
  const chips = document.getElementById('cat-chips')
  const allChip = document.createElement('div')
  allChip.className = 'chip active'
  allChip.textContent = '🏠 全部'
  allChip.dataset.cat = ''
  chips.appendChild(allChip)

  CATS.forEach(c => {
    const el = document.createElement('div')
    el.className = 'chip'
    el.textContent = c.icon + ' ' + c.name
    el.dataset.cat = c.id
    chips.appendChild(el)
  })

  /* —— 状态 —— */
  let activeCat = ''
  let keyword = ''

  /* —— 筛选逻辑 —— */
  function visible() {
    const k = keyword.trim().toLowerCase()
    return RES.filter(r =>
      (activeCat === '' || r.cat === activeCat) &&
      (k === '' || [r.name, r.desc, r.note, r.version, r.size].filter(Boolean).join(' ').toLowerCase().includes(k))
    )
  }

  /* —— 渲染卡片 —— */
  const cardsEl = document.getElementById('cards')
  const emptyEl = document.getElementById('empty')
  const countEl = document.getElementById('res-count')

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]))
  }

  function render() {
    const list = visible()
    cardsEl.innerHTML = ''

    if (list.length === 0) {
      emptyEl.classList.remove('hidden')
      countEl.textContent = ''
      return
    }
    emptyEl.classList.add('hidden')
    countEl.textContent = `共 ${list.length} 个`

    list.forEach(r => {
      const cat = catOf(r.cat)

      const card = document.createElement('div')
      card.className = 'card'
      // 卡片左侧色条按分类染色
      card.style.setProperty('--primary', cat ? 'var(--primary)' : 'var(--primary)')

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

      const catBtn = cat
        ? `<a class="btn-cat" href="#cards" data-jump="${escapeHtml(cat.id)}">${escapeHtml(cat.icon)} ${escapeHtml(cat.name)}</a>`
        : ''

      const note = r.note ? `<div class="card-note">💡 ${escapeHtml(r.note)}</div>` : ''

      card.innerHTML = `
        <div class="card-top">
          <span class="card-icon">${escapeHtml((cat && cat.icon) || '📦')}</span>
          <div>
            <div class="card-title">${escapeHtml(r.name)}</div>
            ${catBtn}
          </div>
          <div class="card-meta">${meta}</div>
        </div>
        <p class="card-desc">${escapeHtml(r.desc || '')}</p>
        ${note}
        <div class="card-actions">${actions}</div>
      `
      cardsEl.appendChild(card)
    })

    // 卡片内的分类小标签点击 → 切换筛选
    cardsEl.querySelectorAll('[data-jump]').forEach(el => {
      el.addEventListener('click', () => selectCat(el.dataset.jump))
    })
  }

  /* —— 分类/搜索交互 —— */
  function selectCat(id) {
    activeCat = id
    document.querySelectorAll('.chip').forEach(c =>
      c.classList.toggle('active', c.dataset.cat === id))
    render()
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
    btn.closest('.card-actions').innerHTML = inner
    // 卡片顶部保留已解锁的小标记
    btn.closest('.card').querySelector('.card-meta').insertAdjacentHTML('beforeend', '<div style="color:#059669">🔓 已解锁</div>')
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
