/* ============================================================
   电控组资源站 · 内容都在这个文件里改！
   ============================================================
   你以后想加/删/改任何内容，只需要编辑这个文件，然后：
   1) 保存文件
   2) 浏览器里刷新页面（F5）就能看到变化

   不需要懂编程，跟着下面的"示例"照葫芦画瓢即可。
   ============================================================ */

/* ---------- 站点信息（改这里换名字/标语/公告）---------- */
window.SITE = {
  name: '电控组资源站',                                // 网站大标题
  sub: '按工作区整理的电控学习资料与工具',              // 副标题
  notice: '🆕 带「组内资料」标记的资源存在私有仓库：需登录 GitHub 并被邀请后才能下载',  // 公告条，不需要就留 ''
  footer: '开启属于你的征途',                          // 页脚文字

  /* 🔑 主密钥（万能钥匙，能开所有锁）
     想给某条资源上锁时才会用到（见下面资源里的 lock 字段）。
     输对主密钥可以跳过任何一把锁。⚠️ 页面是纯前端的，懂技术的能看代码破解，
     所以别用锁保护隐私/贵重东西。 */
  masterKey: 'labmaster2026'
};

/* ---------- 工作区（想加工作区/改名字就改这里）----------
   本站按【做什么】分工作区，页面上每个工作区独立成一块。

   id    : 工作区代号（英文，别重复，加资源时要用）
   name  : 工作区显示名
   icon  : 图标（emoji 或文字）
   desc  : 一句话简介（显示在工作区标题下面，不需要就留 ''）
---------------------------------------------------- */
window.WORKSPACES = [
  { id: 'lang',   name: '编程语言',       icon: '💻', desc: 'C / C++ / Python 等语言本身的语法、练习与进阶' },
  { id: 'mcu',    name: '单片机',         icon: '🔧', desc: 'STM32 / MSPM0、Keil、CubeMX、例程与烧录调试' },
  { id: 'pcb',    name: 'PCB',            icon: '🧩', desc: '原理图、元件封装、布局布线与打样制板' },
  { id: 'vision', name: '视觉',           icon: '👁️', desc: 'OpenMV / K210 / OpenCV 图像处理与识别' },
  { id: 'tools',  name: '开发环境与工具',  icon: '🧰', desc: '编译器、IDE、Git、串口与各种调试工具' },
  { id: 'apps',   name: '小工具软件',      icon: '📦', desc: '下载器、传文件、截图、解压、系统优化等日常软件' },
  { id: 'algo',   name: '算法与仿真',      icon: '📐', desc: 'MATLAB / Simulink、刷题平台、控制算法与仿真' }
];

/* 兼容旧写法：老代码里如果引用 window.CATEGORIES 也能正常工作，不用管这行 */
window.CATEGORIES = window.WORKSPACES;

/* ============================================================
   资源列表 —— 一条资源 = 一行 { ... }

   想加一个资源：复制一行改成你的内容即可。

   字段说明：
     name    : 资源名字（必填）
     area    : 属于哪个工作区（lang / mcu / pcb / vision / tools / algo）
               （写 cat 也一样能用，cat 是旧名字）
     size    : 大小（可选，网盘/网页链接不用写）
     desc    : 说明（可选；不写卡片就只有名字和下载按钮，最简洁）
     url     : 链接（必填；站内文件写 'files/xxx.exe' 这种相对路径）
     url2    : 备用/镜像链接（可选）
     dl      : true=点按钮直接保存文件（安装包用）；不写=打开网页
     note    : 提示条（可选，黄色）
     lock    : ⭐ 加了这行 = 上锁！要输对钥匙（或主密钥）才能下载

   ⚠️ 逗号别漏：每条资源之间要有英文逗号 ,
   ⚠️ 文字用英文引号 '...' 包起来；里面不能再出现英文引号
   ============================================================ */
window.RESOURCES = [

  /* ========== 开发环境与工具 ========== */
  { name: 'VS Code',                    area: 'tools', size: '约 240 MB', url: 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user', url2: 'https://code.visualstudio.com/download', dl: true },
  { name: 'MinGW-w64 编译器',            area: 'tools', size: '约 100 MB', url: 'https://winlibs.com/', url2: 'https://www.msys2.org/' },
  { name: 'VS Code C 语言配置包',        area: 'tools', size: '4 KB', url: 'files/vscode-c-config.zip', dl: true },
  { name: 'Dev-C++ 6.5 安装包',          area: 'tools', size: '36 MB', url: 'files/DevCpp65.exe', dl: true },
  { name: 'DevC++ 6.5 下载与安装教程',    area: 'tools', url: 'https://www1.kkjs.net/qa3q' },
  { name: 'MinGW-w64 官方文件下载',      area: 'tools', url: 'https://sourceforge.net/projects/mingw-w64/files/' },
  { name: 'Node.js 下载',               area: 'tools', url: 'https://nodejs.org/zh-cn/download' },
  { name: 'Docker Desktop',             area: 'tools', url: 'https://www.docker.com/products/docker-desktop/' },
  { name: 'MobaXterm 下载',             area: 'tools', url: 'https://mobaxterm.mobatek.net/download-home-edition.html' },
  { name: 'Git 简明指南',                area: 'tools', url: 'https://www.runoob.com/manual/git-guide/' },
  { name: 'GitLab 图形化使用教程',        area: 'tools', url: 'https://blog.csdn.net/AntKengElephant/article/details/82628374' },
  { name: 'GitLab 保姆级使用教程',        area: 'tools', url: 'https://blog.csdn.net/qq_59961910/article/details/138707491' },
  { name: 'Gitee 码云',                 area: 'tools', url: 'https://gitee.com/' },
  { name: 'GitCode 开源社区',            area: 'tools', url: 'https://gitcode.com/' },
  { name: 'HelloGitHub 开源月刊',        area: 'tools', url: 'https://hellogithub.com/' },
  { name: 'CSDN 开发者社区',             area: 'tools', url: 'https://www.csdn.net/' },
  { name: 'VOFA+ 上位机下载',            area: 'tools', url: 'https://www.vofa.plus/downloads/' },
  { name: 'VOFA+ 串口助手教程',          area: 'tools', url: 'https://blog.csdn.net/m0_73769182/article/details/155966839' },
  { name: '淘晶驰串口屏资料中心',         area: 'tools', url: 'http://wiki2.tjc1688.com/' },
  { name: '半导小芯 · 芯片查询',          area: 'tools', url: 'https://www.semiee.com/' },
  { name: 'DeepSeek 官网',              area: 'tools', url: 'https://www.deepseek.com/' },
  { name: 'DeepSeek 开放平台',           area: 'tools', url: 'https://platform.deepseek.com/usage' },
  { name: 'Expert 电子实验室 · 学习路线',  area: 'tools', url: 'https://www.cnblogs.com/expertlab/articles/19359076' },

  /* ========== 小工具软件 ========== */
  { name: 'Gopeed 下载器',              area: 'apps', url: 'https://gopeed.com/' },
  { name: 'Motrix 下载器',              area: 'apps', url: 'https://motrix.app/' },
  { name: 'LocalSend 局域网传文件',      area: 'apps', url: 'https://localsend.org/' },
  { name: 'ShareX 截图录屏',            area: 'apps', url: 'https://getsharex.com/' },
  { name: '7-Zip 解压',                area: 'apps', url: 'https://www.7-zip.org/' },
  { name: 'WizTree 磁盘占用分析',        area: 'apps', url: 'https://diskanalyzer.com/' },
  { name: 'Dism++ 系统优化',            area: 'apps', url: 'https://chuyu.me/zh-Hans/', url2: 'https://github.com/Chuyu-Team/Dism-Multi-language' },
  { name: 'FastCopy 快速复制',          area: 'apps', url: 'https://fastcopy.jp/' },
  { name: 'KeePassXC 密码管理',         area: 'apps', url: 'https://keepassxc.org/' },
  { name: 'Anki 记忆卡片',              area: 'apps', url: 'https://apps.ankiweb.net/' },
  { name: 'Subtitle Edit 字幕编辑',      area: 'apps', url: 'https://www.nikse.dk/subtitleedit' },
  { name: 'Notesnook 加密笔记',         area: 'apps', url: 'https://notesnook.com/' },
  { name: 'BleachBit 垃圾清理',         area: 'apps', url: 'https://www.bleachbit.org/' },
  { name: 'OCRmyPDF PDF 文字识别',      area: 'apps', url: 'https://ocrmypdf.readthedocs.io/', url2: 'https://github.com/ocrmypdf/OCRmyPDF' },
  { name: 'Rufus U 盘启动盘',           area: 'apps', url: 'https://rufus.ie/en/' },
  { name: 'Ventoy 多系统启动盘',         area: 'apps', url: 'https://www.ventoy.net/cn/' },
  { name: 'PanDown 网盘下载',           area: 'apps', url: 'https://www.pandown.org/pd/PanDown.php' },
  { name: '油小猴 网盘直链助手',         area: 'apps', url: 'https://www.youxiaohou.com/install.html' },

  /* ========== 单片机 ========== */
  { name: '意法半导体 ST 官网',           area: 'mcu', url: 'https://www.st.com.cn/content/st_com/zh.html' },
  { name: 'STM32CubeIDE',              area: 'mcu', url: 'https://www.st.com.cn/zh/development-tools/stm32cubeide.html' },
  { name: '正点原子 STM32 HAL 库教程',    area: 'mcu', url: 'http://www.openedv.com/docs/book-videos/zdyzshipin/1stm32/newhal.html' },
  { name: '正点原子在线文档',             area: 'mcu', url: 'https://wiki.alientek.com/docs/category/%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97-13' },
  { name: '立创开发板技术文档中心',        area: 'mcu', url: 'https://wiki.lckfb.com/zh-hans/' },
  { name: '立创 · 地猛星 MSPM0G3507',    area: 'mcu', url: 'https://wiki.lckfb.com/zh-hans/dmx/' },
  { name: '地猛星入门手册',               area: 'mcu', url: 'https://wiki.lckfb.com/zh-hans/dmx/beginner/install.html' },
  { name: '地猛星开源硬件工程',            area: 'mcu', url: 'https://oshwhub.com/li-chuang-kai-fa-ban/li-chuang-di-meng-xing-mspm0g3507-kai-fa-ban' },
  { name: '地猛星电赛模块资料',            area: 'mcu', url: 'https://lceda001.feishu.cn/wiki/BE0UwfyegiAmkYkKNLecaNKDnVh' },
  { name: '野火电子论坛',                 area: 'mcu', url: 'https://www.firebbs.cn/' },
  { name: '野火小智 STM32F103C8 HAL 资料', area: 'mcu', url: 'https://pan.baidu.com/s/1c4LhY8O2tHJFXxkjNlvTSQ?pwd=7qs9' },
  { name: 'STC89C52RC 数据手册',         area: 'mcu', url: 'https://www.stcmicro.com/datasheet/STC89C51RC-cn.pdf' },
  { name: 'Keil C51 9.61 下载',          area: 'mcu', url: 'https://www.keil.com/demo/eval/c51.htm#/DOWNLOAD' },
  { name: 'OpenOCD 使用与 TCL 脚本',      area: 'mcu', url: 'https://blog.csdn.net/huayidw/article/details/147915401' },
  { name: '张大头 Emm_V4.2 闭环驱动说明', area: 'mcu', url: 'https://blog.csdn.net/zhangdatou666/article/details/128320222' },
  { name: '张大头 Emm_V5.0 闭环驱动说明', area: 'mcu', url: 'https://blog.csdn.net/zhangdatou666/article/details/132644047' },
  { name: 'ZDT 步进电机资料合集',         area: 'mcu', url: 'https://blog.csdn.net/ql_sd/article/details/148564984' },
  { name: 'ZDT_XS 步进电机资料',          area: 'mcu', url: 'https://pan.baidu.com/s/1HTdlBwxrJ7cd-00j0t3cBQ?pwd=k74a' },
  { name: 'ZDT CAN 通讯教程（视频）',      area: 'mcu', url: 'https://www.bilibili.com/video/BV1WEN86gEpa' },
  { name: '2026 电赛培训网',              area: 'mcu', url: 'https://www.nuedc-training.com.cn/index/publicity/topic2026' },

  /* ========== PCB ========== */
  { name: '嘉立创 EDA 专业版用户指南',     area: 'pcb', url: 'https://prodocs.lceda.cn/cn/' },
  { name: '立创开发板 · 硬件设计说明',      area: 'pcb', url: 'https://wiki.lckfb.com/zh-hans/tjx-tms320f28p550/hardware/' },

  /* ========== 视觉 ========== */
  { name: 'CanMV K210 文档',            area: 'vision', url: 'https://www.kendryte.com/canmv/main/canmv/index.html' },
  { name: 'YDLIDAR X3 Pro 激光雷达',     area: 'vision', url: 'https://www.yahboom.com/study/YDLIDAR-X3' },
  { name: '八路灰度巡线模块',             area: 'vision', url: 'https://www.yahboom.com/study_module/8-GS' },
  { name: '8 路灰度巡线动态阈值方案',      area: 'vision', url: 'https://blog.csdn.net/2301_78814366/article/details/150100225' },
  { name: 'OpenCV 项目实战全套（组内资料）', area: 'vision', size: '574 MB',
    desc: '29 章课件与实战源码：DNN、目标追踪、人脸关键点、疲劳检测、停车位定位、文档扫描 OCR',
    note: '组内资料：需在浏览器里登录 GitHub 且拥有 lab-hub-files 权限，否则返回 404',
    url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/opencv-work-v1/opencv_work.zip',
    dl: true },

  /* ========== 算法与仿真 ========== */
  { name: '洛谷',                       area: 'algo', url: 'https://www.luogu.com.cn/' },
  { name: '洛谷题目列表',                 area: 'algo', url: 'https://www.luogu.com.cn/problem/list' },
  { name: 'PTA 程序设计实验平台',          area: 'algo', url: 'https://pintia.cn/problem-sets/dashboard' },
  { name: '蓝桥杯大赛官网',               area: 'algo', url: 'https://dasai.lanqiao.cn/pages/v7/dasai/competition/individual_competition.html' },
  { name: '头歌实践教学平台',             area: 'algo', url: 'https://www.educoder.net/' },
  { name: '深入浅出 PyTorch（Datawhale）', area: 'algo', url: 'https://datawhalechina.github.io/thorough-pytorch/' },
  { name: 'pyecharts 图表库',            area: 'algo', url: 'https://pyecharts.org/#/zh-cn/' },

  /* ========== 编程语言 ========== */
  { name: '菜鸟教程',                    area: 'lang', url: 'https://www.runoob.com/' },
  { name: 'C 语言教程 · 菜鸟教程',        area: 'lang', url: 'https://www.runoob.com/cprogramming/c-tutorial.html' },
  { name: 'Python3 教程 · 菜鸟教程',      area: 'lang', url: 'https://www.runoob.com/python3/python3-intro.html' },
  { name: '翁恺 C 语言 PTA 习题集',       area: 'lang', url: 'https://blog.csdn.net/qq_46085472/article/details/136437641' },
  { name: '学吧导航',                    area: 'lang', url: 'https://www.xue8nav.com/' },

  /* ========== 2026-11 资料包（lab-hub-files 私有仓库直链）========== */
  { name: 'STM32F103ZE-M 开发板资料包（2022）', area: 'mcu', size: '302 MB', desc: 'F103ZE-M 开发板全套资料：原理图、例程、数据手册、USB 串口 ISP 下载工具', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/stm32f103ze-board-materials-2022.zip', dl: true },
  { name: 'F103Z E-M 板标准库例程（2022）', area: 'mcu', size: '186 MB', desc: 'STM32 标准外设库 StdPeriph 全套例程，配合 F103ZE-M 开发板使用', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/stm32f103ze-stdlib-examples-2022.rar', dl: true },
  { name: '正点原子 HAL 库标准例程（参考）', area: 'mcu', size: '77 MB', desc: '正点原子 STM32 HAL 库标准例程，供对照参考，非本板专用', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/stm32-hal-examples-zhengdian.zip', dl: true },
  { name: 'STM32 中文数据手册合集', area: 'mcu', size: '12 MB', desc: 'STM32 系列中文参考手册与数据手册打包', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/stm32-datasheet-cn.rar', dl: true },
  { name: 'STM32F103ZE-M 板原理图（2022）', area: 'mcu', size: '9 MB', desc: '开发板完整原理图 PDF，查引脚定义和外设接线用', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/stm32f103ze-schematic-2022.pdf', dl: true },
  { name: 'STM32F103ZE 中文数据手册 V5', area: 'mcu', size: '2.8 MB', desc: 'F103ZE 芯片中文数据手册，寄存器与外设参数', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/stm32f103ze-datasheet-cn-v5.pdf', dl: true },
  { name: 'STM32F103C8T6 例程', area: 'mcu', size: '780 KB', desc: 'C8T6 最小系统板例程', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/c8t6-examples.zip', dl: true },
  { name: '电赛历年题目分享', area: 'mcu', size: '16 MB', desc: '全国大学生电子设计竞赛历年赛题，.doc/.pdf 共 86 份', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/diansai-past-exams.zip', dl: true },
  { name: 'Keil ARM Compiler 5.06', area: 'tools', size: '81 MB', desc: 'Keil MDK 的 ARMCC 5.06 编译器，老工程编译报错时安装。商业软件，仅组内自用勿外传', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/keil-armcompiler-506.zip', dl: true },
  { name: 'CH340 串口驱动', area: 'tools', size: '135 KB', desc: 'CH340 USB 转串口芯片驱动，插上开发板不识别串口时先装这个', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/ch340-driver.zip', dl: true },
  { name: 'ESP32-CAM Arduino 支持包', area: 'tools', size: '7 KB', desc: 'ESP32-CAM 在 Arduino IDE 中的开发板配置', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/esp32cam-arduino.zip', dl: true },
  { name: 'K230 资料大全', area: 'vision', size: '294 MB', desc: 'CanMV K230 开发资料合集：例程、文档、工具', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/k230-resources.zip', dl: true },
  { name: 'K230 程序升级版（PC 录制回放 + 钢珠识别）', area: 'vision', size: '97 MB', desc: '含 K230_PC 录制回放程序、无线图传加钢珠识别 STA 脚本及 kmodel 模型', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/k230-firmware-upgrade.zip', dl: true },
  { name: 'OpenCV 图像基本操作 Notebook', area: 'vision', size: '7.3 MB', desc: '图像处理练习：色彩空间、Canny、Sobel、金字塔、轮廓检测，含示例图片', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/opencv-basics-notebooks.zip', dl: true },
  { name: '人工智能课程大纲 V12.0', area: 'vision', size: '30 MB', desc: '人工智能课程详情与大纲 PDF', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/ai-course-outline-v12.pdf', dl: true },
  { name: '蓝桥杯 Keil C51 环境包', area: 'algo', size: '88 MB', desc: '蓝桥杯单片机组用的 Keil C51 环境与配套文件', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/lanqiao-keilc51.zip', dl: true },
  { name: '蓝桥杯资料包', area: 'algo', size: '2.3 MB', desc: '蓝桥杯赛前资料', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/materials-2026-11/lanqiao-mydoc.zip', dl: true },

  /* ========== 2026-11 单片机大资料包（mcu-pack-2026-11）========== */
  { name: '张大头 ZDT-XS 步进电机 · 例程 STM32F407', area: 'mcu', size: '1.29 GB', desc: 'ZDT_XS 第二代闭环步进电机资料第一部分：STM32F407 全套例程，141 个文件', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/mcu-pack-2026-11/zdt-xs-part1-stm32f407.zip', dl: true },
  { name: '张大头 ZDT-XS 步进电机 · 文档与工具', area: 'mcu', size: '1.38 GB', desc: '第二部分：说明书、上位机、3D 装配模型、固件更新教程、Arduino/树莓派/Modbus 例程', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/mcu-pack-2026-11/zdt-xs-part2-rest.zip', dl: true },
  { name: '张大头步进电机 · 配套程序与其余例程', area: 'mcu', size: '1.69 GB', desc: '2-配套程序、F103 例程压缩包、MSPM0G3507 例程、说明书、上位机、3D 模型等补充资料', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/mcu-pack-2026-11/zdt-aux-and-examples.zip', dl: true },
  { name: 'MSPM0G3507 开发工具（含 MDK539）', area: 'mcu', size: '1.60 GB', desc: '立创地猛星 MSPM0G3507 开发工具合集：Keil MDK 5.39 安装包、串口烧录工具等', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/mcu-pack-2026-11/mspm0g3507-dev-tools.zip', dl: true },
  { name: '立创地猛星 MSPM0G3507 开发板资料', area: 'mcu', size: '688 MB', desc: '开发板例程、文档与 SDK，已去除重复的 MDK539 安装包', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/mcu-pack-2026-11/lc-dmx-board-materials.zip', dl: true },
  { name: 'MSPM0 TI 环境配置', area: 'mcu', size: '357 MB', desc: 'TI CCS 与 SysConfig 环境配置相关文件', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/mcu-pack-2026-11/mspm0-ti-env-setup.zip', dl: true },
  { name: 'WHEELTEC C07A 核心板（MSPM0G3507）附送资料', area: 'mcu', size: '51.8 MB', desc: 'WHEELTEC C07A 核心板配套资料', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/mcu-pack-2026-11/wheeltec-c07a-mspm0.zip', dl: true },
  { name: 'MSPM0G3507 其他补充资料', area: 'mcu', size: '4.3 MB', desc: '3507 相关补充文档', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/mcu-pack-2026-11/mspm0-3507-misc.zip', dl: true },
  { name: 'J-Link 调试器驱动', area: 'tools', size: '81 MB', desc: 'SEGGER J-Link 驱动与配套工具', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/mcu-pack-2026-11/jlink-driver.zip', dl: true },
  { name: 'JY61P 三维姿态传感器资料', area: 'tools', size: '0.4 MB', desc: 'JY61P IMU 姿态模块使用资料', note: '组内资料，需登录 GitHub 且有权限', url: 'https://github.com/xinghai-pu-2026/lab-hub-files/releases/download/mcu-pack-2026-11/jy61p-imu.zip', dl: true },

  /* ===== 想加自己的资源，照上面任何一行复制改写即可 ===== */
];
