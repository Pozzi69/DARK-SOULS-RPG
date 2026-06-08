// ── COSTANTI ──────────────────────────────────────────────────────────────────
const SPRITES={warrior:'images/guerriero.png',mage:'images/mago.png',rogue:'images/ladro.png',paladin:'images/paladino.png' ,
  viverna: {width:'340px', height:'340px', top:'120px', right:'80px'},
};
const DEFAULT_ARENA='images/arena1.png';
const ZONE_ARENAS={
  undead_burg:'images/arena_undead_burg.png',
  depths:'images/arena_depths.png',
  darkroot:'images/arena_darkroot.png',
  blighttown:'images/arena_blighttown.png',
  artorias_grave:'images/arena_artorias_grave.png',
  sens:'images/arena_sens.png',
  anor_londo:'images/arena_anor_londo.png',
  lost_izalith:'images/arena_lost_izalith.png',
  tomb_giants:'images/arena_tomb_giants.png',
  new_londo:'images/arena_new_londo.png',
  dukes_archives:'images/arena_dukes_archives.png',
  kiln:'images/arena_kiln.png'
};
const AVAILABLE_ENEMY_SPRITES=new Set([
  'arbusto','balderknight','boar','cavalierenero','cavaliere_nero_alabarda',
  'cavaliere_argento_alabarda','cavaliere_argento_arco','cavaliere_argento_spada_scudo',
  'cerbottaniere_velenoso','channeler','demone_titanite','demonecapra',
  'demonetoro','gargoyle','gatto_gigante','gigante_campana','gigante_campana_bomba',
  'golem_cristallo','golem_cristallo_giallo','golem_ferro',
  'golem_pietra_antico','grande_uomo_fungo','guardiano_dipinto','macellaio_pazzo',
  'mago_serpente','ogre_inf_macigno','ogre_inf_mazza','omino_fungo',
  'ornstein','quelag','ragno_fuoco','rana_mortale','rana_rossa',
  'ratto','ratto_gigante','sanguisuga','scheletro','scheletro_bestia',
  'scheletro_gigante','scheletro_ruota','seath','slime','smough',
  'undeadaxe','undeaddog','undead','undeadspear','uomo_serpente',
  'vivernanemico','zanzara_gigante',
  'cane_fuoco','culo_drago',
  'giant_blacksmith','gwyndolin','lautrec','solaire_event','solaire_pazzo','incontrosolaire2','ceaseless_discharge',
  'scarica_infinita','mangiatore_caos','demone_centipede','demone_infuocato',
  'drago_famelico','sif','nito','culla_caos','hydra_darkroot','farfalla_luna',
  'farfalla_luna_archivi','sentinella_reale','imp',
  'balder_arco','balder_stocco','balder_spada','protettore_mago',
  'protettore_ladro','protettore_cavaliere','parassita_muri',
  'cavaliere_nero_grande_ascia','girandola','non_morto_cristallizzato',
  'conchiglia_mangiauomini','guerriero','ladro','mago',
  'kirk','blighttown_parasite','sigillo_destro','sigillo_sinistro','gwyn','gael','manus'
]);
const ENEMY_SPRITE_ALIASES={
  armoredboar:'boar',
  armoredboar_archive:'boar',
  channeler_archive:'channeler',
  dark_knight:'cavalierenero',
  demone_capra_lost:'demonecapra',
  demone_toro_lost:'demonetoro',
  gargoyle_anor:'gargoyle',
  golem_cristallo_archive:'golem_cristallo',
  golem_cristallo_dorato:'golem_cristallo_giallo',
  solaire_event:'solaire_pazzo',
  ceaseless_discharge:'scarica_infinita',
  farfalla_luna_archivi:'farfalla_luna',
  protettore_cavaliere:'guerriero',
  protettore_ladro:'ladro',
  protettore_mago:'mago'
};
// top/right = coordinate assolute dentro l'arena (non offset relativi)
const BOSS_POS  ={width:'260px',height:'260px',top:'205px',right:'155px'};
const ELITE_POS ={width:'200px',height:'200px',top:'180px',right:'155px'};
const NORMAL_POS={width:'155px',height:'155px',top:'225px',right:'155px'};
const PLAYER_POS={width:'250px',height:'250px',top:'-20px',left:'-40px'};
const PATCHES_POS={width:'200px',height:'200px',bottom:'0px',left:'calc(50% - 70px)'};
const ANDRE_POS=  {width:'200px',height:'200px',bottom:'0px',left:'calc(50% - 70px)'};
// ── POSIZIONI SLOT NEMICI (multi-nemico) — editabili liberamente ──────────────
const MULTI_ENEMY_SLOT_1={width:'120px',height:'160px',top:'205px',right:'30px'};   // Slot 1 — più a destra
const MULTI_ENEMY_SLOT_2={width:'110px',height:'160px',top:'205px',right:'155px'};  // Slot 2 — centro-destra
const MULTI_ENEMY_SLOT_3={width:'100px',height:'160px',top:'205px',right:'280px'};  // Slot 3 — più a sinistra
// LG_SLOT: leader al centro, gregari ai lati (Channeler, Demone Capra)
const LG_SLOT_RIGHT ={width:'105px',height:'140px',top:'205px',right:'10px'};
const LG_SLOT_CENTER={width:'190px',height:'200px',top:'205px',right:'115px'};
const LG_SLOT_LEFT  ={width:'105px',height:'140px',top:'205px',right:'320px'};
const ANOR_LONDO_MULTI_SLOT_1={width:'160px',height:'210px',top:'155px',right:'10px'};
const ANOR_LONDO_MULTI_SLOT_2={width:'150px',height:'205px',top:'160px',right:'155px'};
const ANOR_LONDO_MULTI_SLOT_3={width:'140px',height:'200px',top:'165px',right:'305px'};
const ORNSTEIN_SMOUGH_SLOT_ORNSTEIN={width:'190px',height:'240px',top:'125px',right:'220px'};
const ORNSTEIN_SMOUGH_SLOT_SMOUGH  ={width:'220px',height:'250px',top:'115px',right:'35px'};
const ORNSTEIN_SMOUGH_PHASE2_SLOT  ={width:'285px',height:'360px',top:'5px',right:'115px'};
const GWYN_PHASE2_SLOT={width:'390px',height:'390px',top:'-25px',right:'80px'};
const GWYN_TRIO_SLOT_NAMELESS={width:'185px',height:'265px',top:'105px',right:'385px'};
const GWYN_TRIO_SLOT_GWYN={width:'165px',height:'235px',top:'135px',right:'185px'};
const GWYN_TRIO_SLOT_GWYNDOLIN={width:'160px',height:'230px',top:'140px',right:'0px'};
const SOUL_CINDER_SLOT={width:'390px',height:'410px',top:'30px',right:'80px'};
const GAEL_SLOT={width:'300px',height:'330px',top:'80px',right:'105px'};
const MANUS_SLOT={width:'420px',height:'430px',top:'20px',right:'70px'};

// ── OVERRIDE DIMENSIONI/POSIZIONE PER SPRITE SPECIFICI ───────────────────────
// Ogni voce usa l'id del nemico come chiave.
// I campi width/height controllano la dimensione; top/right la posizione nell'arena.
// Se una voce manca, viene usato BOSS_POS / ELITE_POS / NORMAL_POS come sempre.
const SPRITE_OVERRIDES={
  // NPC / eventi
  patches:    {width:'200px', height:'200px', bottom:'0px',   left:'calc(50% - 70px)'},
  andre:      {width:'200px', height:'200px', bottom:'0px',   left:'calc(50% - 70px)'},
  bonfire:    {width:'200px', height:'200px', bottom:'0px',   left:'calc(50% - 70px)'},
  // Nemici speciali
  viverna:    {width:'340px', height:'340px', top:'120px',    right:'80px'},
  // Normali — aggiungi qui id specifici se vuoi dimensioni diverse dalla classe
  // es: hollow: {width:'170px', height:'170px', top:'205px', right:'155px'},
  // Elite — stessa logica
  // es: dark_knight: {width:'230px', height:'230px', top:'185px', right:'140px'},
  // Boss — stessa logica
  // es: sif: {width:'290px', height:'290px', top:'180px', right:'130px'},
};
  // Slot 3 — più a sinistra
const RARITY_DATA={
  1:{name:'Comune',   color:'#aaaaaa',glow:'rgba(170,170,170,0.25)'},
  2:{name:'Raro',     color:'#4da6ff',glow:'rgba(77,166,255,0.30)'},
  3:{name:'Epico',    color:'#c060ff',glow:'rgba(192,96,255,0.35)'},
  4:{name:'Leggendario',color:'#ffd700',glow:'rgba(255,215,0,0.40)'},
  5:{name:'Mitico',color:'#ff4dd2',glow:'rgba(255,77,210,0.45)'}
};
// Pesi rarità dinamici: scalano con Arcano del giocatore
// Più arcano = meno comuni, più epiche/leggendarie
function getRarityWeights(arcane){
  const mod=arcane/2;
  const w1=Math.max(10,50-(mod/5)*4);
  const w2=Math.max(20,35-(mod/5));
  const w3=12.5+mod/2;
  const w4=2.5+mod/2;
  const w5=0.35+mod/16;
  return [{r:1,w:w1},{r:2,w:w2},{r:3,w:w3},{r:4,w:w4},{r:5,w:w5}];
}
function getStatusChance(basePct,arcane){
  return basePct*(arcane/4);
}
function applyFreeze(target){
  const roll=Math.random();
  const duration=roll<0.50?1:roll<0.80?2:3;
  target.statusEffects.freeze=duration;
  addLog(`${target.name} è congelato per ${duration} turni!`,'system');
}
function triggerBleed(target){
  const dmg=Math.round(target.maxHp*0.15);
  target.hp=Math.max(0,target.hp-dmg);
  target.statusEffects.bleed=0;
  addLog(`${target.name} SANGUINAMENTO ESPLOSIVO: ${dmg} danni!`,'crit');
}
function addBleed(target,baseValue,arcane){
  const amount=baseValue+(arcane*0.25);
  target.statusEffects.bleed=Math.min(100,(target.statusEffects.bleed||0)+amount);
  if(target.statusEffects.bleed>=100){triggerBleed(target);}
}
function triggerPlague(target){
  target.hp=0;
  target.statusEffects.plague=0;
  addLog(`${target.name} MORBO MORTALE: morte istantanea!`,'crit');
}
function addPlague(target,baseValue){
  target.statusEffects.plague=Math.min(100,(target.statusEffects.plague||0)+baseValue);
  if(target.statusEffects.plague>=100){triggerPlague(target);}
}
const COIN_DROP={
  normal:[{min:20,max:44},{min:40,max:76},{min:64,max:110}],
  elite: [{min:56,max:90},{min:90,max:140},{min:130,max:190}],
  boss:  [{min:110,max:170},{min:170,max:250},{min:240,max:340}]
};
const SHOP_PRICES={move:40,potion:35,item:50};

// ── UTILITY ───────────────────────────────────────────────────────────────────
const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const choice=a=>a[Math.floor(Math.random()*a.length)];
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
function shuffle(a){let r=[...a];for(let i=r.length-1;i>0;i--){const j=rand(0,i);[r[i],r[j]]=[r[j],r[i]];}return r;}
function rollRarity(){const rw=getRarityWeights(G.player?.arcane||10);let n=0;const tot=rw.reduce((s,x)=>s+x.w,0);let r2=Math.random()*tot;for(const{r,w}of rw){r2-=w;if(r2<=0)return r;}return 1;}
const rarityBadge=m=>{const r=RARITY_DATA[m.rarity||1];return`<span style="font-size:9px;padding:1px 6px;border-radius:3px;border:1px solid ${r.color};color:${r.color};background:rgba(0,0,0,0.4)">${r.name}</span>`;};
const rarityBorder=m=>{const r=RARITY_DATA[m.rarity||1];return`border-color:${r.color};box-shadow:0 0 6px ${r.glow}`;};
// Barra stamina colorata: verde>gialla>rossa in base alla percentuale
function staminaBar(cur,max){
  const pct=max>0?Math.round(cur/max*100):0;
  const col=pct>60?'#60d060':pct>30?'#f0c040':'#ff6040';
  return`<div style="display:flex;align-items:center;gap:5px">
    <span style="font-size:9px;color:#aaa;min-width:24px">ST</span>
    <div style="flex:1;height:6px;background:#1a2a1a;border-radius:3px;overflow:hidden">
      <div style="width:${pct}%;height:100%;background:${col};border-radius:3px;transition:width .3s"></div>
    </div>
    <span style="font-size:9px;color:${col};min-width:32px;text-align:right">${cur}/${max}</span>
  </div>`;
}

function hpPct(unit){return Math.max(0,(unit.hp||0)/(unit.maxHp||1)*100);}
function hpTone(unit){const pct=hpPct(unit);return pct>50?'':pct>25?'low':'crit';}
function hpBarHTML(unit,{labelClass='arena-hp-label',barClass='arena-hp-bar',fillClass='arena-hp-fill',transition='.5s'}={}){
  const pct=hpPct(unit);
  return `<div class="${labelClass}"><span>HP</span><span>${unit.hp}/${unit.maxHp}</span></div>
    <div class="${barClass}"><div class="${fillClass} ${hpTone(unit)}" style="width:${pct}%;transition:width ${transition}"></div></div>`;
}
function unitBadgesHTML(unit,{center=false}={}){
  const badges=buildBadges(unit);
  return badges?`<div class="arena-badges${center?' centered':''}">${badges}</div>`:'';
}
function unitTitle(unit){return `${unit.name}${unit.isBoss?' 👑':unit.isElite?' ⚠':''}`;}
function battleHUDHTML(unit,{showAccumulation=false,showStats=false,showStamina=false}={}){
  return `<div class="arena-hud-name" style="color:${unit.color||'#e0e0e0'}">${unitTitle(unit)}</div>
    ${showAccumulation?buildAccumulationBars(unit):''}
    ${hpBarHTML(unit)}
    ${showStats?`<div class="hud-stats">STR ${unit.strength||10} INT ${unit.intelligence||10} VIG ${unit.vigor||10}</div>`:''}
    ${showStamina?`<div class="hud-stamina">${staminaBar(unit.stamina,unit.maxStamina)}</div>`:''}
    ${unitBadgesHTML(unit)}`;
}
function spriteImageHTML(id,src,cls,{width,height},style=''){
  return `<span id="${id}" class="${cls}" data-sprite-frame style="display:block;position:relative;width:${width};height:${height};overflow:visible;${style}">
    <img src="${src}" class="sprite-img" data-normalize-sprite="1" style="position:absolute;left:50%;bottom:0;width:auto;height:100%;max-width:none;object-fit:contain;object-position:center bottom;transform:translateX(-50%);pointer-events:none">
  </span>`;
}
const SPRITE_BOUNDS_CACHE={};
function getVisibleSpriteBounds(img){
  const key=img.currentSrc||img.src;
  if(SPRITE_BOUNDS_CACHE[key])return SPRITE_BOUNDS_CACHE[key];
  const nw=img.naturalWidth,nh=img.naturalHeight;
  if(!nw||!nh)return null;
  const maxSide=360;
  const sc=Math.min(1,maxSide/Math.max(nw,nh));
  const cw=Math.max(1,Math.round(nw*sc)),ch=Math.max(1,Math.round(nh*sc));
  const canvas=document.createElement('canvas');
  canvas.width=cw;canvas.height=ch;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  ctx.drawImage(img,0,0,cw,ch);
  const data=ctx.getImageData(0,0,cw,ch).data;
  let minX=cw,minY=ch,maxX=-1,maxY=-1;
  for(let y=0;y<ch;y++){
    for(let x=0;x<cw;x++){
      if(data[(y*cw+x)*4+3]>12){
        if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;
      }
    }
  }
  const bounds=maxX<0?{nw,nh,x:0,y:0,w:nw,h:nh}:{nw,nh,x:minX/sc,y:minY/sc,w:(maxX-minX+1)/sc,h:(maxY-minY+1)/sc};
  SPRITE_BOUNDS_CACHE[key]=bounds;
  return bounds;
}
function normalizeSpriteFrame(frame){
  const img=frame?.querySelector?.('img.sprite-img[data-normalize-sprite]');
  if(!img)return;
  const apply=()=>{
    try{
      const b=getVisibleSpriteBounds(img);
      if(!b)return;
      const fw=frame.clientWidth,fh=frame.clientHeight;
      const targetH=fh*0.94;
      const s=targetH/b.h;
      img.style.width=`${b.nw*s}px`;
      img.style.height=`${b.nh*s}px`;
      img.style.left=`${fw/2-(b.x+b.w/2)*s}px`;
      img.style.top=`${fh-(b.y+b.h)*s}px`;
      img.style.bottom='auto';
      img.style.transform='none';
    }catch(_){
      img.style.left='50%';
      img.style.bottom='0';
      img.style.height='100%';
      img.style.transform='translateX(-50%)';
    }
  };
  if(img.complete&&img.naturalWidth)apply();
  else img.addEventListener('load',apply,{once:true});
}
function normalizeRenderedSprites(){
  document.querySelectorAll('[data-sprite-frame]').forEach(normalizeSpriteFrame);
}
const costPips=cost=>Array.from({length:Math.min(cost,5)},(_,k)=>`<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#60d060;border:1px solid #3a6a3a;margin:0 1px"></span>`).join('')+(cost>5?`+${cost-5}`:'');

// ── COLTELLI DA LANCIO ────────────────────────────────────────────────────────
// Carta speciale: non è nella pool delle mosse trovabili.
// Viene aggiunta direttamente alla mano da altre mosse/oggetti.
// Costo 0, danno base 20 + _shivBonusDmg (variabile cumulativa del giocatore).
// Una volta usata, sparisce — non va negli scarti né nell'exhaust.
// Crit chance uguale alle altre mosse (getCrit standard).
const SHIV_CARD={
  id:'shiv',name:'Coltello da lancio',type:'atk',rarity:1,cost:0,_isShiv:true,
  desc:'Infliggi 20 danni fissi. Costo 0. [Esaurimento]'
};

// ── EQUIPAGGIAMENTO ───────────────────────────────────────────────────────────
const EQUIPMENT_SLOTS = ['helmet','armor','gloves','legs','weapon','offhand','ring'];

const ALL_EQUIPMENT = {
  // ── SET GUERRIERO ──
  soldier_helmet:{id:'soldier_helmet',name:'Elmo del Soldato',slot:'helmet',def:3,bonus:{},passiveDesc:'',setId:'soldier'},
  soldier_armor: {id:'soldier_armor', name:'Corazza del Soldato',slot:'armor',def:5,bonus:{},passiveDesc:'',setId:'soldier'},
  soldier_legs:  {id:'soldier_legs',  name:'Gambali del Soldato',slot:'legs',def:3,bonus:{},passiveDesc:'',setId:'soldier'},
  soldier_boots: {id:'soldier_boots', name:'Stivali del Soldato',slot:'boots',def:2,bonus:{},passiveDesc:'',setId:'soldier'},
  longsword:     {id:'longsword',     name:'Spada Lunga',slot:'weapon',def:0,bonus:{strength:2},passiveDesc:'',setId:'soldier'},
  wooden_shield: {id:'wooden_shield', name:'Scudo di Legno',slot:'offhand',def:4,bonus:{},passiveDesc:'',setId:'soldier'},
  ring_red_eye:  {id:'ring_red_eye',  name:"Anello dell'Occhio Rosso",slot:'ring',def:0,bonus:{},passiveDesc:'+10% danno sotto 50% HP',setId:'soldier'},
  // ── SET MAGO ──
  apprentice_helmet:{id:'apprentice_helmet',name:'Cappuccio Apprendista',slot:'helmet',def:1,bonus:{},passiveDesc:'',setId:'apprentice'},
  apprentice_armor: {id:'apprentice_armor', name:'Veste Apprendista',slot:'armor',def:2,bonus:{},passiveDesc:'',setId:'apprentice'},
  apprentice_legs:  {id:'apprentice_legs',  name:'Pantaloni Apprendista',slot:'legs',def:1,bonus:{},passiveDesc:'',setId:'apprentice'},
  apprentice_boots: {id:'apprentice_boots', name:'Calzari Apprendista',slot:'boots',def:1,bonus:{},passiveDesc:'',setId:'apprentice'},
  sorcerer_staff:   {id:'sorcerer_staff',   name:'Bastone da Stregone',slot:'weapon',def:0,bonus:{intelligence:2},passiveDesc:'Primo incantesimo per turno: -1 stamina',setId:'apprentice'},
  buckler_mage:     {id:'buckler_mage',     name:'Buckler',slot:'offhand',def:2,bonus:{},passiveDesc:'',setId:'apprentice'},
  ring_dragon:      {id:'ring_dragon',      name:'Anello del Dragone',slot:'ring',def:0,bonus:{},passiveDesc:'+10% danno incantesimi',setId:'apprentice'},
  // ── SET LADRO ──
  brigand_helmet:{id:'brigand_helmet',name:'Cappuccio del Brigante',slot:'helmet',def:1,bonus:{},passiveDesc:'',setId:'brigand'},
  brigand_armor: {id:'brigand_armor', name:'Giubba del Brigante',slot:'armor',def:2,bonus:{},passiveDesc:'',setId:'brigand'},
  brigand_legs:  {id:'brigand_legs',  name:'Pantaloni del Brigante',slot:'legs',def:1,bonus:{},passiveDesc:'',setId:'brigand'},
  brigand_boots: {id:'brigand_boots', name:'Stivali del Brigante',slot:'boots',def:1,bonus:{},passiveDesc:'+1 stamina regen per turno',setId:'brigand'},
  dagger:        {id:'dagger',        name:'Pugnale',slot:'weapon',def:0,bonus:{dexterity:2},passiveDesc:'',setId:'brigand'},
  buckler_rogue: {id:'buckler_rogue', name:'Buckler',slot:'offhand',def:2,bonus:{},passiveDesc:'',setId:'brigand'},
  ring_carim:    {id:'ring_carim',    name:'Anello di Carim',slot:'ring',def:0,bonus:{},passiveDesc:'Critici +20% danno',setId:'brigand'},
  // ── SET PALADINO ──
  crusader_helmet:{id:'crusader_helmet',name:'Elmo del Crociato',slot:'helmet',def:3,bonus:{},passiveDesc:'',setId:'crusader'},
  crusader_armor: {id:'crusader_armor', name:'Corazza del Crociato',slot:'armor',def:5,bonus:{},passiveDesc:'',setId:'crusader'},
  crusader_legs:  {id:'crusader_legs',  name:'Gambali del Crociato',slot:'legs',def:3,bonus:{},passiveDesc:'',setId:'crusader'},
  crusader_boots: {id:'crusader_boots', name:'Stivali del Crociato',slot:'boots',def:2,bonus:{},passiveDesc:'',setId:'crusader'},
  sacred_board:   {id:'sacred_board',   name:'Tavola Sacra',slot:'weapon',def:0,bonus:{faith:2},passiveDesc:'Cure +10%',setId:'crusader'},
  sacred_shield:  {id:'sacred_shield',  name:'Scudo Sacro',slot:'offhand',def:5,bonus:{},passiveDesc:'10% blocco colpi',setId:'crusader'},
  ring_sun:       {id:'ring_sun',       name:'Anello del Sole',slot:'ring',def:0,bonus:{},passiveDesc:'Cure +10%',setId:'crusader'},
  // ── Equipaggiamento da evento casuale ──
  coda_viverna:   {id:'coda_viverna',   name:'Coda di Viverna',slot:'weapon',def:0,bonus:{strength:10,faith:5},passiveDesc:'Attacchi fisici: bruciatura leggera; raramente divampa piu forte.',setId:null,eventOnly:true},
};

const SET_BONUSES={
  soldier:    {desc:'Sotto 50% HP: recuperi 3% HP max a fine turno',effect:'soldier_regen'},
  apprentice: {desc:'Grandezza mano +1',effect:'apprentice_hand'},
  brigand:    {desc:'Schivata +10%',effect:'brigand_dodge'},
  crusader:   {desc:'Riflesso Sacro +50% più forte con DEF potenziata',effect:'crusader_reflect'},
  gambler:    {desc:'Crit → pesca 1 carta',effect:'gambler_crit_draw'},
};

function getStartingEquipment(classId){
  const sets={
    warrior:['soldier_helmet','soldier_armor','soldier_legs','soldier_boots','longsword','wooden_shield','ring_red_eye'],
    mage:   ['apprentice_helmet','apprentice_armor','apprentice_legs','apprentice_boots','sorcerer_staff','buckler_mage','ring_dragon'],
    rogue:  ['brigand_helmet','brigand_armor','brigand_legs','brigand_boots','dagger','buckler_rogue','ring_carim'],
    paladin:['crusader_helmet','crusader_armor','crusader_legs','crusader_boots','sacred_board','sacred_shield','ring_sun'],
  };
  const equipped={};
  (sets[classId]||[]).forEach(id=>{
    const piece=ALL_EQUIPMENT[id];
    if(piece)equipped[piece.slot]={...piece};
  });
  return equipped;
}

function getEquipDef(player){
  if(!player.equipment)return 0;
  return Object.values(player.equipment).reduce((sum,piece)=>sum+(piece?.def||0),0);
}

function getActiveSetBonus(player){
  if(!player.equipment)return null;
  const armorSlots=['helmet','armor','gloves','legs'];
  const setIds=armorSlots.map(s=>player.equipment[s]?.setId).filter(Boolean);
  if(setIds.length===4&&setIds.every(s=>s===setIds[0])){return SET_BONUSES[setIds[0]]||null;}
  return null;
}

function getEquipBonus(player,stat){
  if(!player.equipment)return 0;
  return Object.values(player.equipment).reduce((sum,piece)=>sum+(piece?.bonus?.[stat]||0),0);
}
function recalcPlayerStaminaFromVigor(){
  const p=G.player;if(!p)return;
  const oldMax=p.maxStamina||0;
  const newMax=10+Math.floor((p.vigor||10)/3)+getEquipBonus(p,'maxStamina');
  const diff=newMax-oldMax;
  p.maxStamina=newMax;
  p.baseStamina=newMax;
  p.stamina=clamp((p.stamina||0)+diff,0,newMax);
}

// ── DATI CLASSI ───────────────────────────────────────────────────────────────
const CLASSES=[
  {id:'warrior',name:'Guerriero',color:'#ff8080',desc:'Tank robusto. Forza devastante, altissima resistenza.',
   passive:'⚔ Furia Berserker: sotto il 50% HP la STR effettiva è raddoppiata.',
   affinity:['atk'],
   hp:120,strength:18,vigor:14,intelligence:6,dexterity:9,faith:8,arcane:6,
   baseCrit:0.05,pips:{hp:5,atk:4,def:4},
   moves:[]},
  {id:'mage',name:'Mago',color:'#c0a0ff',desc:'Maestro della magia. Intelligenza e Arcano elevatissimi.',
   passive:'✨ Mente Espansa: pesca 2 carte extra ogni turno (mano da 7).',
   affinity:['mag'],
   hp:70,strength:6,vigor:9,intelligence:20,dexterity:8,faith:9,arcane:10,
   baseCrit:0.05,pips:{hp:2,atk:2,def:2},
   moves:[]},
  {id:'rogue',name:'Ladro',color:'#f0c040',desc:'Agile e letale. Destrezza e Arcano per critici e status.',
   passive:'🗡 Apertura: il primo attacco di ogni turno infligge sempre critico.',
   affinity:['atk','crit'],
   hp:85,strength:8,vigor:13,intelligence:9,dexterity:18,faith:6,arcane:12,
   baseCrit:0.05,pips:{hp:3,atk:4,def:3},
   moves:[]},
  {id:'paladin',name:'Paladino',color:'#80d0ff',desc:'Guerriero sacro. Fede alta, buona resistenza.',
   passive:'🛡 Riflesso Sacro: con DEF potenziata ≥1 stage, ogni colpo subito viene riflesso al nemico per il 15% della DEF.',
   affinity:['def','mag'],
   hp:100,strength:12,vigor:10,intelligence:8,dexterity:8,faith:18,arcane:7,
   baseCrit:0.05,pips:{hp:4,atk:3,def:4},
   moves:[]}
];

// ── MOSSE GIOCATORE ───────────────────────────────────────────────────────────

// Pool globale per mosse trovabili come reward/negozio/riposo
// (le mosse iniziali delle classi NON sono qui)
const ALL_MOVES=[
  // ── Mosse Coltelli da lancio (trovabili da tutte le classi) ────────────────
  {id:'shiv_shield',   name:'Nascondersi tra le Ombre', type:'buff',  rarity:1, cost:1,
   desc:'Aggiungi 2 Coltelli da lancio alla mano. DEF ▲2 stage per 3 turni.',
   effect:'shiv_2_def2'},
  {id:'shiv_strike',   name:'Colpo e Fuga',              type:'atk',   rarity:2, cost:2,
   desc:'Infliggi 25% di DEX + 25% di STR. Aggiungi 1 Coltello da lancio alla mano.',
   effect:'shiv_1_strike', power:0},
  {id:'shiv_arsenal',  name:'Arsenale di Lame',          type:'buff',  rarity:2, cost:1,
   desc:'Aggiungi 3 Coltelli da lancio alla mano. [Esaurimento]',
   exhaust:true, effect:'shiv_3_exhaust'},
  {id:'shiv_tempo',    name:'Rimescola e Colpisci',      type:'buff',  rarity:3, cost:2,
   desc:'Aggiungi 2 Coltelli da lancio alla mano. Pesca 1 carta. Scarta 1 carta.',
   effect:'shiv_2_draw_discard'},

  // ── Mosse "carte" ─────────────────────────────────────────────────────────────
  {id:'card_draw3_hp',  name:'Disperazione',             type:'buff',  rarity:2, cost:1,
   desc:'Pesca 3 carte. Perdi 20% degli HP massimi. DEF ▼2 stage per 3 turni.',
   effect:'draw3_cost_hp_def'},
  {id:'card_hand_dmg',  name:'Tempesta di Carte',        type:'atk',   rarity:2, cost:2,
   desc:'Infliggi 15 danni per ogni carta in mano.',
   effect:'dmg_15x_hand', power:0},
  {id:'card_deck_dmg',  name:'Biblioteca di Morte',      type:'atk',   rarity:2, cost:2,
   desc:'Infliggi 5 danni per ogni carta nel mazzo.',
   effect:'dmg_5x_deck', power:0},
  {id:'card_draw_scrap',name:'Scambio Arcano',           type:'mag',   rarity:2, cost:2,
   desc:'Infliggi 50% di INT. Pesca 1 carta. Scarta 1 carta.',
   effect:'mag_draw_discard', power:0.5},
  {id:'card_disc_dmg',  name:'Peso dei Caduti',          type:'atk',   rarity:3, cost:2,
   desc:'Infliggi 25 danni per ogni carta nella pila degli scarti.',
   effect:'dmg_25x_discard', power:0},
  {id:'card_exhaust2',  name:'Sacrificio Arcano',        type:'mag',   rarity:3, cost:3,
   desc:'Infliggi 100% di INT. Esaurisci 2 carte dal mazzo.',
   effect:'mag_exhaust_2', power:1.0},
  {id:'card_mag_draw',  name:'Illuminazione',            type:'buff',  rarity:2, cost:1,
   desc:'INT ▲2 stage per 3 turni. Pesca 1 carta.',
   effect:'buff_mag_draw'},
];

// ── GUERRIERO ──────────────────────────────────────────────────────────────────
const WARRIOR_MOVES=[
  // Comuni ×2
  {id:'w_fendente',       name:'Fendente',          type:'atk',  rarity:1, cost:1,
   desc:'Infliggi 80% di STR.',
   power:0.8},
  {id:'w_fendente_2',     name:'Fendente',          type:'atk',  rarity:1, cost:1,
   desc:'Infliggi 80% di STR.',
   power:0.8},
  {id:'w_colpo_poderoso', name:'Colpo Poderoso',    type:'atk',  rarity:1, cost:2,
   desc:'Infliggi 140% di STR.',
   power:1.4},
  {id:'w_colpo_poderoso_2',name:'Colpo Poderoso',   type:'atk',  rarity:1, cost:2,
   desc:'Infliggi 140% di STR.',
   power:1.4},
  // Buff
  {id:'w_postura',        name:"Postura d'Acciaio", type:'buff', rarity:1, cost:1,
   desc:'DEF ▲1 stage per 5 turni.',
   effect:'buff_def_1s_5t'},
  // Debuff
  {id:'w_urlo',           name:'Urlo di Guerra',    type:'debuff',rarity:1, cost:1,
   desc:'ATK nemico ▼1 stage per 3 turni.',
   effect:'debuff_atk'},
  // Rare
  {id:'w_sfida',          name:'Grido di Sfida',    type:'buff', rarity:2, cost:1,
   desc:'DEF ▲2 stage per 3 turni.',
   effect:'buff_def_2s_3t'},
  {id:'w_carica',         name:'Carica Brutale',    type:'atk',  rarity:2, cost:2,
   desc:'Infliggi 180% di STR.',
   power:1.8},
  {id:'w_sanguina',       name:'Fendente Cruento',  type:'atk',  rarity:2, cost:2,
   desc:'Infliggi 100% di STR. Applica 20 + 0% di ARC sanguinamento.',
   power:1.0, statusChance:{bleed:20, poison:0, burn:0, freeze:0, plague:0}},
  {id:'w_rabbia',         name:'Ira del Berserker', type:'atk',  rarity:2, cost:3,
   desc:'Infliggi 220% di STR. Costo: 10% degli HP massimi.',
   effect:'self_cost_10', power:2.2},
];

// ── MAGO ───────────────────────────────────────────────────────────────────────
const MAGE_MOVES=[
  // Comuni ×2
  {id:'m_dardo',          name:'Dardo Magico',      type:'mag',  rarity:1, cost:1,
   desc:'Infliggi 80% di INT.',
   power:0.8},
  {id:'m_dardo_2',        name:'Dardo Magico',      type:'mag',  rarity:1, cost:1,
   desc:'Infliggi 80% di INT.',
   power:0.8},
  {id:'m_esplosione',     name:'Esplosione Arcana', type:'mag',  rarity:1, cost:2,
   desc:'Infliggi 140% di INT.',
   power:1.4},
  {id:'m_esplosione_2',   name:'Esplosione Arcana', type:'mag',  rarity:1, cost:2,
   desc:'Infliggi 140% di INT.',
   power:1.4},
  // Buff
  {id:'m_concentrazione', name:'Concentrazione',    type:'buff', rarity:1, cost:1,
   desc:'MAG ▲1 stage per 3 turni.',
   effect:'buff_mag_self5'},
  // Debuff
  {id:'m_maledizione',    name:'Maledizione',       type:'debuff',rarity:1, cost:1,
   desc:'MAG nemico ▼1 stage per 3 turni.',
   effect:'debuff_both'},
  // Rare
  {id:'m_fulmine',        name:'Fulmine',           type:'mag',  rarity:2, cost:2,
   desc:'Infliggi 120% di INT.',
   power:1.2},
  {id:'m_gelo',           name:'Lancia di Ghiaccio',type:'mag',  rarity:2, cost:2,
   desc:'Infliggi 90% di INT. 25% di congelare il nemico.',
   power:0.9, statusChance:{freeze:0.25, poison:0, burn:0, bleed:0, plague:0}},
  {id:'m_scarica',        name:'Scarica Arcana',    type:'mag',  rarity:2, cost:1,
   desc:'Infliggi 60% di INT.',
   power:0.6},
  {id:'m_tempesta',       name:'Tempesta di Fulmini',type:'mag', rarity:2, cost:3,
   desc:'Infliggi 100% di INT × numero di mosse giocate questo turno.',
   effect:'chaos_storm', power:1.0},
];

// ── LADRO ──────────────────────────────────────────────────────────────────────

// Effetto custom: schivata passiva per 2 turni + prossimo atk forceCrit
// Implementato via statusEffect night_veil_ready già presente nel codice
const ROGUE_MOVES=[
  // Comuni ×2
  {id:'r_pugnalata',      name:'Pugnalata Rapida',  type:'atk',  rarity:1, cost:1,
   desc:'Infliggi 80% di DEX.',
   power:0.8},
  {id:'r_pugnalata_2',    name:'Pugnalata Rapida',  type:'atk',  rarity:1, cost:1,
   desc:'Infliggi 80% di DEX.',
   power:0.8},
  {id:'r_affondata',      name:'Affondata',         type:'atk',  rarity:1, cost:2,
   desc:'Infliggi 140% di DEX.',
   power:1.4},
  {id:'r_affondata_2',    name:'Affondata',         type:'atk',  rarity:1, cost:2,
   desc:'Infliggi 140% di DEX.',
   power:1.4},
  // Buff
  {id:'r_passo_furtivo',  name:'Passo Furtivo',     type:'buff', rarity:1, cost:1,
   desc:'Schivata +40% per 2 turni. Prossimo attacco garantito critico.',
   effect:'spectral_form'},
  // Debuff
  {id:'r_acceca',         name:'Acceca',            type:'debuff',rarity:1, cost:1,
   desc:'ATK nemico ▼1 stage per 3 turni.',
   effect:'debuff_atk'},
  // Rare
  {id:'r_veleno',         name:'Lama Avvelenata',   type:'atk',  rarity:2, cost:2,
   desc:'Infliggi 80% di DEX. 30% di avvelenare il nemico.',
   power:0.8, statusChance:{poison:0.30, burn:0, freeze:0, bleed:0, plague:0}},
  {id:'r_doppio',         name:'Doppio Colpo',      type:'atk',  rarity:2, cost:2,
   desc:'2 colpi da 60% di DEX ciascuno.',
   power:0.6, hits:2},
  {id:'r_sparisci',       name:'Sparisci',          type:'buff', rarity:2, cost:2,
   desc:'Forma Spettrale: schivata +40%, critico ×3 per 4 turni.',
   effect:'spectral_form'},
  {id:'r_esecuzione',     name:'Colpo Letale',      type:'atk',  rarity:2, cost:3,
   desc:'Infliggi 150% di DEX. Sotto il 30% HP nemico: infliggi il 60% degli HP nemici correnti.',
   power:1.5, effect:'guaranteed_crit_low_hp'},
];

// ── PALADINO ───────────────────────────────────────────────────────────────────

// FAI viene usata come stat base per le mosse "mag" del Paladino tramite getEffFai
// Per ora le mosse mag del Paladino usano getMag (INT=8) — usiamo faith come power scale
// tramite effect personalizzato. Per semplicità usiamo type:'mag' con power alto
// finché non aggiungiamo getEffFai nel sistema. Le mosse comuni scalano su FAI via
// un workaround: il Paladino ha FAI 18 ma INT 8, quindi usiamo type:'atk' con
// power scalato su faith. Implementiamo un effect 'faith_atk' dedicato oppure
// usiamo 'mag' e accettiamo che ora scala su INT (8) — da aggiornare in futuro.
// SCELTA: usiamo type:'atk' con effect nativo per le mosse FAI, così almeno STR (12)
// scala decentemente. Le rare usano effect dedicati.
const PALADIN_MOVES=[
  // Comuni ×2
  {id:'p_colpo_sacro',    name:'Colpo Sacro',       type:'atk',  rarity:1, cost:1,
   desc:'Infliggi 80% di STR.',
   power:0.8},
  {id:'p_colpo_sacro_2',  name:'Colpo Sacro',       type:'atk',  rarity:1, cost:1,
   desc:'Infliggi 80% di STR.',
   power:0.8},
  {id:'p_punizione',      name:'Punizione Divina',  type:'atk',  rarity:1, cost:2,
   desc:'Infliggi 140% di STR.',
   power:1.4},
  {id:'p_punizione_2',    name:'Punizione Divina',  type:'atk',  rarity:1, cost:2,
   desc:'Infliggi 140% di STR.',
   power:1.4},
  // Buff
  {id:'p_benedizione',    name:'Benedizione',       type:'buff', rarity:1, cost:1,
   desc:'DEF ▲1 stage per 5 turni.',
   effect:'buff_def_1s_5t'},
  // Debuff
  {id:'p_vulnerabilita',  name:'Vulnerabilità',     type:'debuff',rarity:1, cost:1,
   desc:'DEF nemico ▼1 stage per 3 turni.',
   effect:'debuff_def'},
  // Rare
  {id:'p_scudo_colpo',    name:'Colpo dello Scudo', type:'atk',  rarity:2, cost:2,
   desc:'Infliggi 120% della DEF effettiva.',
   effect:'shield_slam'},
  {id:'p_cura',           name:'Guarigione',        type:'heal', rarity:2, cost:2,
   desc:'Ripristina 40% della DEF effettiva come HP.',
   effect:'heal_def40'},
  {id:'p_giudizio',       name:'Giudizio Divino',   type:'mag',  rarity:2, cost:3,
   desc:'Infliggi 140% di INT. DEF nemico ▼1 stage.',
   power:1.4, effect:'debuff_def'},
  {id:'p_voto',           name:'Voto di Ferro',     type:'buff', rarity:2, cost:2,
   desc:'Costo: 10% degli HP. DEF ▲3 stage per 5 turni.',
   effect:'vow_of_iron'},
];


// Mossa AoE universale (test)
const AOE_TEST_MOVE={id:'u_onda_urto',name:"Onda d'Urto",type:'atk',rarity:1,cost:2,
  desc:"Infliggi 50% di STR a tutti i nemici. [AOE]",power:0.5,aoe:true};

// Mappa classe → mazzo iniziale
const CLASS_MOVE_POOLS={
  warrior: [...WARRIOR_MOVES,{...AOE_TEST_MOVE}],
  mage:    [...MAGE_MOVES,{...AOE_TEST_MOVE}],
  rogue:   [...ROGUE_MOVES,{...AOE_TEST_MOVE}],
  paladin: [...PALADIN_MOVES,{...AOE_TEST_MOVE}],
};

// IDs delle mosse iniziali per ogni classe — escluse dalla pool trovabile in partita
const STARTING_MOVE_IDS = {
  warrior: new Set(WARRIOR_MOVES.map(m=>m.id).concat(['u_onda_urto'])),
  mage:    new Set(MAGE_MOVES.map(m=>m.id).concat(['u_onda_urto'])),
  rogue:   new Set(ROGUE_MOVES.map(m=>m.id).concat(['u_onda_urto'])),
  paladin: new Set(PALADIN_MOVES.map(m=>m.id).concat(['u_onda_urto'])),
};

// Pool mosse trovabili (reward/negozio) — include le mosse dell'altra classe + ALL_MOVES
// Ma NON include le mosse iniziali della classe selezionata
function getRewardPool(classId){
  const startingIds = STARTING_MOVE_IDS[classId] || new Set();
  const allClassMoves = [
    ...WARRIOR_MOVES, ...MAGE_MOVES, ...ROGUE_MOVES, ...PALADIN_MOVES, ...ALL_MOVES
  ];
  // Rimuovi duplicati per id e mosse iniziali della classe
  const seen = new Set();
  return allClassMoves.filter(m => {
    if(seen.has(m.id)) return false;
    seen.add(m.id);
    return !startingIds.has(m.id);
  });
}

// ── OGGETTI ───────────────────────────────────────────────────────────────────
const ITEMS=[
  // ── Oggetti base placeholder ──
  {id:'item_comune',    name:'Erba Comune',        icon:'🌿',rarity:1,desc:'+10 HP massimi',          effect:'hp_flat_10'},
  {id:'item_raro',      name:'Pozione Rara',        icon:'🧪',rarity:2,desc:'+10 HP massimi',          effect:'hp_flat_10'},
  {id:'item_epico',     name:'Amuleto Epico',       icon:'💎',rarity:3,desc:'+10 HP massimi',          effect:'hp_flat_10'},
  {id:'item_leggend',   name:'Reliquia Leggendaria',icon:'🏺',rarity:4,desc:'+10 HP massimi',          effect:'hp_flat_10'},
  // ── Oggetti Coltelli da lancio ──
  {id:'gemma_affilata',  name:'Gemma Affilata',       icon:'🔷',rarity:2,
   desc:'I tuoi Coltelli da lancio infliggono 10 danni in più.',
   effect:'shiv_dmg_10'},
  // ── DONI INIZIALI (esclusivi del nodo di partenza) ──────────────────────────
  {id:'gift_binocolo',      name:'Binocolo',              icon:'🔭',rarity:3,unique:true,
   desc:'+12% probabilità critico su tutte le mosse.',
   lore:"Apparteneva a un esploratore che non tornò mai. Attraverso le lenti, il dungeon sembra diverso — come se i punti deboli del nemico brillassero un istante prima del colpo.",
   effect:'gift_binocolo'},
  {id:'gift_pendente',      name:'Pendente Misterioso',   icon:'🔮',rarity:3,unique:true,
   desc:'Non fa nulla... per ora. Potrebbe rivelarsi utile in futuro.',
   effect:'gift_pendente'},
  {id:'gift_masterkey',     name:'Chiave Maestra',        icon:'🗝',rarity:3,unique:true,
   desc:'Una chiave antica. Sblocca percorsi alternativi dopo il primo piano. (Non ancora implementato.)',
   effect:'gift_masterkey'},
  {id:'gift_anello_piccolo',name:'Piccolo Anello',        icon:'💍',rarity:3,unique:true,
   desc:'+25 HP massimi. Semplice, ma rassicurante da indossare.',
   effect:'gift_anello_piccolo'},
  {id:'gift_anello_strega', name:"Anello della Strega",   icon:'🌙',rarity:3,unique:true,
   desc:'+5 INT, +5 ARC, +5 FAI. Emana un calore oscuro che amplifica il potere arcano.',
   effect:'gift_anello_strega'},
  {id:'cimiero_artorias', name:'Cimiero di Artorias', icon:'🗝',rarity:4,unique:true,
   desc:'Apre il passaggio verso la Tomba di Artorias dal Giardino Radice Oscura.',
   effect:'cimiero_artorias'},
  {id:'white_sign_soapstone', name:'White Sign Soapstone', icon:'☀',rarity:4,unique:true,
   desc:'Dono di Solaire. Permette la jolly cooperation e aumenta la Fede di 10.',
   effect:'white_sign_soapstone'},
];

// ── RICOMPENSE MIMIC ──────────────────────────────────────────────────────────
// Lista degli oggetti droppabili dal Mimic. Ogni oggetto viene rimosso dopo essere
// stato consegnato, così non si ripete nella stessa partita.
const MIMIC_REWARDS_POOL = [
  {
    id:'mimic_simbolo_avarizia',
    name:"Simbolo dell'Avarizia",
    slot:'helmet', rarity:4, def:3,
    bonus:{maxHp:15},
    passiveDesc:'Inizio combattimento: subisci 10 danni. Anime guadagnate +15%.',
    setId:null, icon:'💰',
    _mimicEffect:'avarizia'
  },
  {
    id:'mimic_ascia_occulta',
    name:'Ascia Occulta',
    slot:'weapon', rarity:4, def:0,
    bonus:{strength:5, arcane:5, faith:5},
    passiveDesc:'Ogni colpo applica 3 di morbo mortale al nemico.',
    setId:null, icon:'🪓',
    _mimicEffect:'ascia_occulta'
  },
];

// ── POOL EQUIPAGGIAMENTO TROVABILE ────────────────────────────────────────────
// Placeholder per tutti i tipi di slot — danno solo statistiche.
// In futuro questi verranno sostituiti da pezzi con effetti unici.
const EQUIP_POOL = [
  // ── ARMI (weapon) ──
  {id:'sword_iron',    name:'Spada di Ferro',      slot:'weapon', rarity:1, def:0, bonus:{strength:3}, passiveDesc:'', setId:null, icon:'⚔'},
  {id:'sword_steel',   name:'Spada d\'Acciaio',    slot:'weapon', rarity:2, def:0, bonus:{strength:5}, passiveDesc:'', setId:null, icon:'⚔'},
  {id:'axe_heavy',     name:'Ascia Pesante',        slot:'weapon', rarity:2, def:0, bonus:{strength:6, vigor:-1}, passiveDesc:'', setId:null, icon:'🪓'},
  {id:'sword_silver',  name:'Spada d\'Argento',    slot:'weapon', rarity:3, def:0, bonus:{strength:8, dexterity:2}, passiveDesc:'', setId:null, icon:'⚔'},
  {id:'staff_oak',     name:'Bastone di Quercia',   slot:'weapon', rarity:1, def:0, bonus:{intelligence:3}, passiveDesc:'', setId:null, icon:'🪄'},
  {id:'staff_crystal', name:'Bastone di Cristallo', slot:'weapon', rarity:2, def:0, bonus:{intelligence:5}, passiveDesc:'', setId:null, icon:'🪄'},
  {id:'staff_void',    name:'Bastone del Vuoto',    slot:'weapon', rarity:3, def:0, bonus:{intelligence:7, arcane:3}, passiveDesc:'', setId:null, icon:'🪄'},
  {id:'dagger_bone',   name:'Pugnale d\'Osso',      slot:'weapon', rarity:1, def:0, bonus:{dexterity:3}, passiveDesc:'', setId:null, icon:'🗡'},
  {id:'dagger_serp',   name:'Pugnale Serpente',     slot:'weapon', rarity:2, def:0, bonus:{dexterity:5, arcane:1}, passiveDesc:'', setId:null, icon:'🗡'},
  {id:'blade_faith',   name:'Lama della Fede',      slot:'weapon', rarity:2, def:0, bonus:{faith:4, strength:2}, passiveDesc:'', setId:null, icon:'✝'},
  {id:'blade_sacred',  name:'Spada Sacra',          slot:'weapon', rarity:3, def:0, bonus:{faith:6, strength:3}, passiveDesc:'', setId:null, icon:'✝'},
  // ── ARMI COLTELLI DA LANCIO (weapon) ──
  {id:'lama_infernale',  name:'Lama dell\'Inferno',  slot:'weapon', rarity:3, def:0, bonus:{arcane:15}, passiveDesc:'I Coltelli da lancio hanno (5% + scaling ARC)% di bruciare il nemico.', setId:null, icon:'🔥'},
  {id:'lama_glaciale',   name:'Lama Glaciale',        slot:'weapon', rarity:3, def:0, bonus:{arcane:15}, passiveDesc:'I Coltelli da lancio hanno (5% + scaling ARC)% di congelare il nemico.', setId:null, icon:'❄️'},
  {id:'lama_velenosa',   name:'Lama Velenosa',        slot:'weapon', rarity:3, def:0, bonus:{arcane:15}, passiveDesc:'I Coltelli da lancio hanno (5% + scaling ARC)% di avvelenare il nemico.', setId:null, icon:'☠️'},
  {id:'lama_sanguinante',name:'Lama Sanguinante',     slot:'weapon', rarity:3, def:0, bonus:{arcane:15}, passiveDesc:'I Coltelli da lancio infliggono 1 + scaling ARC sanguinamento (sempre).', setId:null, icon:'🩸'},
  // ── OFF-HAND COLTELLI DA LANCIO (offhand) ──
  {id:'benda_maestro',   name:'Benda del Maestro',   slot:'offhand', rarity:4, def:0, bonus:{strength:10, dexterity:10}, passiveDesc:'Per ogni Coltello da lancio usato in questo combattimento, i Coltelli da lancio infliggono +5 danni.', setId:null, icon:'🥷'},
  {id:'shield_wood',   name:'Scudo di Legno',       slot:'offhand', rarity:1, def:3, bonus:{}, passiveDesc:'', setId:null, icon:'🛡'},
  {id:'shield_iron',   name:'Scudo di Ferro',       slot:'offhand', rarity:2, def:5, bonus:{vigor:1}, passiveDesc:'', setId:null, icon:'🛡'},
  {id:'shield_tower',  name:'Scudo Torre',          slot:'offhand', rarity:3, def:8, bonus:{vigor:2}, passiveDesc:'', setId:null, icon:'🛡'},
  {id:'orb_arcane',    name:'Orb Arcano',           slot:'offhand', rarity:2, def:0, bonus:{intelligence:3, arcane:2}, passiveDesc:'', setId:null, icon:'🔮'},
  {id:'tome_dark',     name:'Tomo Oscuro',          slot:'offhand', rarity:3, def:0, bonus:{intelligence:4, arcane:4}, passiveDesc:'', setId:null, icon:'📕'},
  // ── ELMO (helmet) ──
  {id:'helm_leather',  name:'Casco di Cuoio',       slot:'helmet', rarity:1, def:2, bonus:{}, passiveDesc:'', setId:null, icon:'🪖'},
  {id:'helm_chain',    name:'Casco a Maglia',       slot:'helmet', rarity:2, def:3, bonus:{vigor:1}, passiveDesc:'', setId:null, icon:'🪖'},
  {id:'helm_plate',    name:'Elmo di Piastra',      slot:'helmet', rarity:3, def:5, bonus:{vigor:2, strength:1}, passiveDesc:'', setId:null, icon:'🪖'},
  {id:'hood_shadow',   name:'Cappuccio dell\'Ombra',slot:'helmet', rarity:2, def:1, bonus:{dexterity:2, arcane:1}, passiveDesc:'', setId:null, icon:'🎩'},
  {id:'circlet_mage',  name:'Cerchio del Mago',     slot:'helmet', rarity:2, def:1, bonus:{intelligence:3}, passiveDesc:'', setId:null, icon:'👑'},
  // ── CORAZZA (armor) ──
  {id:'armor_leather', name:'Armatura di Cuoio',    slot:'armor', rarity:1, def:4, bonus:{}, passiveDesc:'', setId:null, icon:'🦺'},
  {id:'armor_chain',   name:'Cotta di Maglia',      slot:'armor', rarity:2, def:6, bonus:{vigor:1}, passiveDesc:'', setId:null, icon:'🦺'},
  {id:'armor_plate',   name:'Armatura di Piastra',  slot:'armor', rarity:3, def:9, bonus:{vigor:2, strength:1}, passiveDesc:'', setId:null, icon:'🦺'},
  {id:'robe_apprentice',name:'Veste dell\'Apprendista',slot:'armor',rarity:1,def:2,bonus:{intelligence:2},passiveDesc:'',setId:null,icon:'👘'},
  {id:'robe_arcane',   name:'Veste Arcana',         slot:'armor', rarity:3, def:3, bonus:{intelligence:4, arcane:2}, passiveDesc:'', setId:null, icon:'👘'},
  // ── GAMBALI (legs) ──
  {id:'legs_leather',  name:'Gambali di Cuoio',     slot:'legs', rarity:1, def:2, bonus:{}, passiveDesc:'', setId:null, icon:'🩳'},
  {id:'legs_chain',    name:'Gambali a Maglia',     slot:'legs', rarity:2, def:3, bonus:{vigor:1}, passiveDesc:'', setId:null, icon:'🩳'},
  {id:'legs_plate',    name:'Gambali di Piastra',   slot:'legs', rarity:3, def:5, bonus:{strength:1}, passiveDesc:'', setId:null, icon:'🩳'},
  // ── STIVALI (boots) ──
  {id:'boots_leather', name:'Stivali di Cuoio',     slot:'boots', rarity:1, def:1, bonus:{}, passiveDesc:'', setId:null, icon:'👢'},
  {id:'boots_swift',   name:'Stivali Veloci',       slot:'boots', rarity:2, def:1, bonus:{dexterity:2}, passiveDesc:'', setId:null, icon:'👢'},
  {id:'boots_iron',    name:'Stivali di Ferro',     slot:'boots', rarity:2, def:2, bonus:{vigor:1}, passiveDesc:'', setId:null, icon:'👢'},
  {id:'boots_arcane',  name:'Stivali Arcani',       slot:'boots', rarity:3, def:1, bonus:{arcane:3, dexterity:1}, passiveDesc:'', setId:null, icon:'👢'},
  // ── ANELLO (ring) ──
  {id:'ring_iron',     name:'Anello di Ferro',      slot:'ring', rarity:1, def:0, bonus:{vigor:2}, passiveDesc:'', setId:null, icon:'💍'},
  {id:'ring_power',    name:'Anello del Potere',    slot:'ring', rarity:2, def:0, bonus:{strength:3}, passiveDesc:'', setId:null, icon:'💍'},
  {id:'ring_wisdom',   name:'Anello della Saggezza',slot:'ring', rarity:2, def:0, bonus:{intelligence:3}, passiveDesc:'', setId:null, icon:'💍'},
  {id:'ring_shadow',   name:'Anello dell\'Ombra',   slot:'ring', rarity:3, def:0, bonus:{dexterity:3, arcane:2}, passiveDesc:'', setId:null, icon:'💍'},
  {id:'ring_faith',    name:'Anello della Fede',    slot:'ring', rarity:2, def:0, bonus:{faith:3}, passiveDesc:'', setId:null, icon:'💍'},
  {id:'ring_vitality', name:'Anello della Vitalità',slot:'ring', rarity:2, def:0, bonus:{vigor:3}, passiveDesc:'', setId:null, icon:'💍'},

  // ── SET GAMBLER ──
  {id:'gambler_helmet', name:'Cappello del Giocatore', slot:'helmet', rarity:2, def:5, bonus:{intelligence:3}, passiveDesc:'', setId:'gambler', icon:'🎩'},
  {id:'gambler_armor',  name:'Giacca del Giocatore',   slot:'armor',  rarity:2, def:7, bonus:{dexterity:3},    passiveDesc:'', setId:'gambler', icon:'🃏'},
  {id:'gambler_legs',   name:'Pantaloni del Giocatore',slot:'legs',   rarity:2, def:4, bonus:{intelligence:3}, passiveDesc:'', setId:'gambler', icon:'🃏'},
  {id:'gambler_boots',  name:'Stivali del Giocatore',  slot:'boots',  rarity:2, def:2, bonus:{dexterity:3},    passiveDesc:'', setId:'gambler', icon:'🎩'},

  // ── ARMA GAMBLER ──
  {id:'blade_gambler', name:'Lama del Fato', slot:'weapon', rarity:3, def:0,
   bonus:{intelligence:10, dexterity:10},
   passiveDesc:'Ogni colpo infligge +2 danni per carta in mano.', setId:null, icon:'🃏'},
];

// Applica un pezzo di equipaggiamento — sostituisce qualunque cosa ci sia in quello slot.
// I bonus vengono letti dinamicamente da getEquipBonus(), quindi basta swappare il riferimento.
function applyEquipPiece(player, piece) {
  if (!player.equipment) player.equipment = {};
  const prev=player.equipment[piece.slot];
  player.equipment[piece.slot] = { ...piece };
  if(player===G.player&&((prev?.bonus?.maxStamina||0)!==(piece.bonus?.maxStamina||0))){
    recalcPlayerStaminaFromVigor();
  }
}

// Genera 4 pezzi di equipaggiamento casuali, uno per slot casuale (tutti slot diversi)
function rollEquipOffer() {
  const slots = shuffle([...EQUIPMENT_SLOTS]);
  const offered = [];
  for (const slot of slots) {
    if (offered.length >= 4) break;
    const pool = EQUIP_POOL.filter(e => e.slot === slot);
    if (!pool.length) continue;
    offered.push(choice(pool));
  }
  // Se non abbiamo 4 slot unici (mancano pool), riempi da slot già usati
  while (offered.length < 4) {
    const extra = choice(EQUIP_POOL);
    if (!offered.find(e => e.id === extra.id)) offered.push(extra);
  }
  return offered;
}

// ── NEMICI ────────────────────────────────────────────────────────────────────
// Stats placeholder, mosse da 1 danno per testing
const PLACEHOLDER_MOVES=[
  {id:'enemy_atk1',name:'Attacco',    type:'atk',cost:1,power:1,_flat:1},
  {id:'enemy_atk2',name:'Colpo Forte',type:'atk',cost:2,power:1,_flat:1}
];
const ENEMIES=[
  {id:'fantoccio_placeholder',name:'Fantoccio place holder',color:'#b8b8b8',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:99,sprite:null,_noScale:true,
    moves:[...PLACEHOLDER_MOVES]},
  {id:'balderknight',name:'Balder Knight',color:'#c0a060',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:1,sprite:'images/balderknight.png',
    moves:[...PLACEHOLDER_MOVES]},
  {id:'undead',name:'Undead',color:'#a0c0a0',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:1,sprite:'images/undead.png',
    moves:[...PLACEHOLDER_MOVES]},
  {id:'undeaddog',name:'Undead Dog',color:'#d0a080',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:1,sprite:'images/undeaddog.png',
    moves:[...PLACEHOLDER_MOVES]},
  {id:'undeadspear',name:'Non Morto Lancia',color:'#90b0a0',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:1,sprite:'images/undeadspear.png',
    moves:[...PLACEHOLDER_MOVES]},
  {id:'undeadaxe',name:'Non Morto Ascia',color:'#b09080',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:1,sprite:'images/undeadaxe.png',
    moves:[...PLACEHOLDER_MOVES]},
  {id:'orc',name:'Orco',color:'#609060',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:2,
    moves:[...PLACEHOLDER_MOVES]},
  {id:'witch',name:'Strega',color:'#a060d0',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:2,
    moves:[...PLACEHOLDER_MOVES]},
  {id:'troll',name:'Troll',color:'#707030',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:2,
    moves:[...PLACEHOLDER_MOVES]},
  {id:'golem',name:'Golem',color:'#8080a0',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:3,
    moves:[...PLACEHOLDER_MOVES]},
  {id:'vampire',name:'Vampiro',color:'#d04060',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:3,
    moves:[...PLACEHOLDER_MOVES]},
  // ── Nemici esclusivi degli eventi casuali ──
  {id:'viverna',name:'Viverna',color:'#5fba7d',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:2,
    sprite:'images/vivernanemico.png',eventOnly:true,
    dropEquip:'coda_viverna',
    moves:[...PLACEHOLDER_MOVES]},
  {id:'mimic',name:'Mimic',color:'#f0c040',hp:60,strength:14,vigor:12,intelligence:8,dexterity:10,faith:6,arcane:8,tier:2,
    sprite:'images/mimic.png',eventOnly:true,
    _isMimic:true,
    moves:[...PLACEHOLDER_MOVES]},
  {id:'dark_knight',name:'Cavaliere Nero',color:'#3355ff',hp:80,strength:16,vigor:14,intelligence:6,dexterity:10,faith:8,arcane:4,tier:2,
    sprite:'images/cavalierenero.png',eventOnly:true,
    moves:[...PLACEHOLDER_MOVES]}
];
const BOSSES=[
  [{id:'fantoccio_boss',name:'Fantoccio boss',color:'#ff5f6d',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,isBoss:true,_noScale:true,
    moves:[...PLACEHOLDER_MOVES]}],
  [{id:'gargoyle',name:'Gargoyle',color:'#a0a0c0',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,isBoss:true,sprite:'images/gargoyle.png',dropItem:'item_epico',
    moves:[...PLACEHOLDER_MOVES]},
   {id:'demonetoro',name:'Demone Toro',color:'#c04020',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,isBoss:true,sprite:'images/demonetoro.png',dropItem:'item_epico',
    moves:[...PLACEHOLDER_MOVES]},
   {id:'demonecapra',name:'Demone Capra',color:'#805020',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,isBoss:true,sprite:'images/demonecapra.png',dropItem:'item_epico',
    moves:[...PLACEHOLDER_MOVES]}],
  [{id:'hydra',name:'Idra a 3 Teste',color:'#40a060',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,isBoss:true,
    moves:[...PLACEHOLDER_MOVES]}],
  [{id:'lich',name:'Lich Supremo',color:'#c080ff',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,isBoss:true,
    moves:[...PLACEHOLDER_MOVES]}]
];
const ELITES_POOL=[
  [{id:'fantoccio_elite',name:'Fantoccio elite',color:'#b995ff',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:99,isElite:true,_noScale:true,
    moves:[...PLACEHOLDER_MOVES]}],
  [{id:'cavalierenero',name:'Cavaliere Nero',color:'#8060ff',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:1,sprite:'images/cavalierenero.png',isElite:true,dropItem:'item_epico',
    moves:[...PLACEHOLDER_MOVES]},
   {id:'armoredboar',name:'Armored Boar',color:'#c07830',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:1,sprite:'images/boar.png',isElite:true,dropItem:'item_epico',
    moves:[...PLACEHOLDER_MOVES]},
   {id:'channeler',name:'Channeler',color:'#c060d0',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:1,sprite:'images/channeler.png',isElite:true,dropItem:'item_epico',
    moves:[...PLACEHOLDER_MOVES]}],
  [{id:'golemdiamante',name:'Golem di Diamante',color:'#60d0ff',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:2,isElite:true,
    moves:[...PLACEHOLDER_MOVES]}],
  [{id:'stregonescarlatto',name:'Stregone Scarlatto',color:'#ff4060',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:3,isElite:true,
    moves:[...PLACEHOLDER_MOVES]}]
];

// ── MUSICA ────────────────────────────────────────────────────────────────────
let ACTIVE_MUSIC=null;
let ACTIVE_MUSIC_KEY=null;
let ACTIVE_MUSIC_FADE=null;
function playLoopingMusic(key,src,opts={}){
  if(ACTIVE_MUSIC_KEY===key&&ACTIVE_MUSIC)return;
  stopMusic();
  const sources=Array.isArray(src)?src:[src];
  let sourceIdx=0;
  const startSource=(source)=>{
    if(ACTIVE_MUSIC)ACTIVE_MUSIC.pause();
    const audio=new Audio(source);
    audio.loop=true;
    const targetVolume=opts.volume??0.65;
    const fadeMs=opts.fadeMs||0;
    audio.volume=fadeMs?0:targetVolume;
    audio.onerror=()=>{
      if(ACTIVE_MUSIC_KEY!==key||sourceIdx>=sources.length-1)return;
      sourceIdx++;
      startSource(sources[sourceIdx]);
    };
    ACTIVE_MUSIC=audio;
    ACTIVE_MUSIC_KEY=key;
    audio.play().catch(()=>{});
    if(fadeMs){
      const started=Date.now();
      ACTIVE_MUSIC_FADE=setInterval(()=>{
        if(ACTIVE_MUSIC!==audio){clearInterval(ACTIVE_MUSIC_FADE);return;}
        const t=Math.min(1,(Date.now()-started)/fadeMs);
        audio.volume=targetVolume*t;
        if(t>=1){clearInterval(ACTIVE_MUSIC_FADE);ACTIVE_MUSIC_FADE=null;}
      },50);
    }
  };
  startSource(sources[sourceIdx]);
}
function stopMusic(){
  if(ACTIVE_MUSIC_FADE){clearInterval(ACTIVE_MUSIC_FADE);ACTIVE_MUSIC_FADE=null;}
  if(ACTIVE_MUSIC){
    ACTIVE_MUSIC.pause();
    ACTIVE_MUSIC.currentTime=0;
  }
  ACTIVE_MUSIC=null;
  ACTIVE_MUSIC_KEY=null;
}
const FINAL_BATTLE_MUSIC={
  hopes:'musica/hopesanddreams.mp3',
  save:'musica/savetheworld.mp3',
  spear:['musica/spearofjustice.mp3','musica/truehero.mp3'],
  finale:'musica/finale.mp3',
  truehero:'musica/truehero.mp3',
  asgore:'musica/asgore.mp3'
};
function isFinalGwynMusicBattle(){
  if(G.zone!=='kiln')return false;
  const ids=(G.enemies||[]).map(e=>e.id);
  return !!G._finalBattleRoute||['gwyn','gwyndolin_finale','re_senza_nome','anima_tizzoni'].some(id=>ids.includes(id)||G.enemy?.id===id);
}
function playFinalBattleMusic(track,opts={}){
  if(!isFinalGwynMusicBattle())return;
  const src=FINAL_BATTLE_MUSIC[track]||FINAL_BATTLE_MUSIC.hopes;
  playLoopingMusic(`final_battle_${track}`,src,opts);
}
function stopFinalBattleMusic(){
  if((ACTIVE_MUSIC_KEY||'').startsWith('final_battle_')||ACTIVE_MUSIC_KEY==='gwyn_pacifist_phase1'||ACTIVE_MUSIC_KEY==='gwyn_pacifist_phase2')stopMusic();
}
function isPacifistGwynBattle(){return isFinalGwynMusicBattle()&&finalBattleRoute()==='pacifist';}
function playGwynPacifistMusic(phase){playFinalBattleMusic(phase===2?'save':'hopes');}
function stopGwynPacifistMusic(){stopFinalBattleMusic();}

// ── GAME STATE ────────────────────────────────────────────────────────────────
let G={};
function initGame(){stopMusic();G={floor:1,zone:'undead_burg',map:null,player:null,enemy:null,enemies:[],log:[],busy:false,coins:0,humanity:0,lordSoulFragments:0,lordSoulFragmentsByBoss:{},_statLevels:{},_pendingMove:null,_pendingMoveIdx:-1,_pendingCost:0,_giftChosen:false,_giftOffer:[],_usedRandomEvents:{},_pendingDropEquip:null,_mimicBattle:false,_mimicRewardsGiven:[],_kaatheEncounterPending:false,completedZones:[],defeatedBosses:{},npcProgress:{npcKills:[],route:'pacifist'}};}

// ── STAT HELPERS ──────────────────────────────────────────────────────────────
const hasItem=id=>G.player&&G.player.items&&G.player.items.some(i=>i.id===id);

// ── ZONE / ROUTE ──────────────────────────────────────────────────────────────
const ZONES={
  undead_burg:{name:'Borgo Non Morti',img:'borgononmorti.png',tier:1},
  depths:{name:'Fogne',img:'fogne.png',tier:2},
  darkroot:{name:'Giardino Radice Oscura',img:'giardinoradiceoscura.png',tier:2},
  blighttown:{name:'Città Infame',img:'cittainfame.png',tier:3},
  artorias_grave:{name:'Tomba di Artorias',img:'tombadiartorias.png',tier:3,bossFlag:'sif'},
  sens:{name:'Fortezza di Sen',img:'fortezzadisen.png',tier:4},
  anor_londo:{name:'Anor Londo',img:'anorlondo.png',tier:5},
  lost_izalith:{name:'Lost Izalith',img:'lostizalith.png',tier:6,lord:true},
  tomb_giants:{name:'Tomba dei Giganti',img:'tombadeigiganti.png',tier:6,lord:true},
  new_londo:{name:'Petite Londo',img:'petitelondo.png',tier:6,lord:true,requires:{boss:'sif',text:'devi prima sconfiggere Sif, il lupo grigio'}},
  dukes_archives:{name:'Archivi del Duca',img:'archivi_duca.png',tier:6,lord:true},
  kiln:{name:'Fornace della Prima Fiamma',img:'shrine.png',tier:7,final:true}
};
const LORD_ZONES=['lost_izalith','tomb_giants','new_londo','dukes_archives'];
const zoneName=id=>ZONES[id]?.name||'Zona sconosciuta';
const zoneTier=()=>ZONES[G.zone]?.tier||G.floor||1;
function hasCompletedZone(id){return (G.completedZones||[]).includes(id);}
function isZoneUnlocked(id){
  const z=ZONES[id];
  if(!z)return {ok:false,reason:'zona non trovata'};
  if(id==='blighttown'&&G.zone==='undead_burg'&&!hasItem('gift_masterkey')&&!hasCompletedZone('depths')){
    return {ok:false,reason:'serve la Chiave Maestra oppure devi completare le Fogne'};
  }
  if(id==='artorias_grave'&&!hasItem('cimiero_artorias')){
    return {ok:false,reason:'serve il Cimiero di Artorias'};
  }
  if(z.requires?.boss&&!G.defeatedBosses?.[z.requires.boss]){
    return {ok:false,reason:z.requires.text};
  }
  return {ok:true,reason:''};
}
function getNextZoneOptions(){
  const current=G.zone||'undead_burg';
  if(current==='undead_burg')return ['depths','darkroot','blighttown'];
  if(current==='depths')return ['blighttown'];
  if(current==='darkroot')return ['artorias_grave','blighttown'];
  if(current==='artorias_grave')return ['blighttown'];
  if(current==='blighttown')return ['sens'];
  if(current==='sens')return ['anor_londo'];
  if(current==='anor_londo')return LORD_ZONES.filter(id=>!hasCompletedZone(id));
  if(LORD_ZONES.includes(current)){
    const remaining=LORD_ZONES.filter(id=>!hasCompletedZone(id));
    return [...remaining,'kiln'];
  }
  return [];
}
function getZoneImagePath(id){return `images/${ZONES[id]?.img||id+'.png'}`;}
function getBattleArenaPath(){
  if(G.zone==='kiln'&&G._soulOfCinderBattle)return 'images/arena_anima.png';
  if(G.zone==='kiln'&&(G._genocideGaelBattle||G._genocideManusBattle))return 'images/arena_gael.png';
  if(G.zone==='kiln'&&isFinalGwynMusicBattle())return 'images/arena_gwyn.png';
  return ZONE_ARENAS[G.zone]||DEFAULT_ARENA;
}
function setBattleArenaBackground(){
  const el=document.getElementById('arena-bg');
  if(!el)return;
  const src=getBattleArenaPath();
  if(src===G._loadedArenaPath)return;
  G._loadedArenaPath=src;
  const img=new Image();
  img.onload=()=>{el.style.backgroundImage=`url('${src}')`;};
  img.onerror=()=>{el.style.backgroundImage=`url('${DEFAULT_ARENA}')`;};
  img.src=src;
}
function enemySpritePath(id,extra={}){
  if(extra.sprite!==undefined) return extra.sprite;
  const spriteId=ENEMY_SPRITE_ALIASES[id]||id;
  return AVAILABLE_ENEMY_SPRITES.has(spriteId)?`images/${spriteId}.png`:null;
}
function enemyTpl(id,name,extra={}){
  return {id,name,color:extra.color||'#b8b8b8',hp:10,strength:10,vigor:10,intelligence:10,dexterity:10,faith:10,arcane:10,tier:99,sprite:enemySpritePath(id,extra),
    moves:[...PLACEHOLDER_MOVES],_noScale:true,...extra};
}

const NPC_ROUTE_REGISTRY={
  patches:{name:'Patches',enemyId:'patches_npc',sprite:'images/patches.png',hp:16,strength:10,vigor:12,dexterity:18,arcane:14},
  andre:{name:'Andre di Astora',enemyId:'andre_npc',sprite:'images/andre.png',hp:22,strength:22,vigor:18,dexterity:10,faith:8},
  solaire:{name:'Solaire di Astora',enemyId:'solaire_event',sprite:'images/solaire_pazzo.png',hp:18,strength:16,vigor:16,faith:18,dropEquip:'sun_shield'},
  quelana:{name:'Quelana di Izalith',enemyId:'quelana_npc',sprite:'images/quelana.png',hp:16,intelligence:20,arcane:20,dexterity:12},
  siegmeyer:{name:'Siegmeyer di Catarina',enemyId:'siegmeyer_npc',sprite:'images/siegmeyer.png',hp:22,strength:18,vigor:20,dexterity:8,faith:10},
  logan:{name:'Logan il Grande Cappello',enemyId:'logan_mad',sprite:'images/logan.png',hp:20,intelligence:24,arcane:16,dexterity:10,dropEquip:'logan_crystal_catalyst',forceSprite:true},
  giant_blacksmith:{name:'Fabbro Gigante',enemyId:'giant_blacksmith',sprite:'images/giant_blacksmith.png',hp:24,strength:24,vigor:20,dropEquip:'giant_blacksmith_hammer'},
  gwynevere:{name:'Gwynevere',enemyId:'gwynevere_npc',sprite:'images/gwynevere.png',hp:18,faith:24,arcane:18,vigor:16},
  gwyndolin:{name:'Gwyndolin il Sole Oscuro',enemyId:'gwyndolin_npc',sprite:'images/gwyndolin.png',hp:18,intelligence:22,faith:22,dexterity:16},
  lautrec:{name:'Lautrec di Carim',enemyId:'lautrec_npc',sprite:'images/lautrec.png',hp:18,dexterity:20,arcane:14,dropEquip:'ring_carim'},
  ingward:{name:'Ingward',enemyId:'ingward_npc',sprite:'images/ingward.png',hp:16,intelligence:16,faith:16,arcane:20},
  magic_blacksmith:{name:'Fabbro magico',enemyId:'magic_blacksmith_npc',sprite:'images/magic_blacksmith.png',hp:18,intelligence:18,arcane:18,vigor:12},
  fair_lady:{name:'Fair Lady',enemyId:'fair_lady_npc',sprite:'images/fair_lady.png',hp:20,faith:20,arcane:20,vigor:14},
  alvina:{name:'Alvina',enemyId:'alvina_npc',sprite:'images/alvina.png',hp:16,dexterity:20,arcane:22,vigor:12},
  kirk:{name:'Kirk, Cavaliere di Spine',enemyId:'kirk_npc',sprite:'images/kirk.png',hp:18,strength:16,vigor:14,dexterity:18,arcane:12,dropEquip:'beast_dark_ring'},
  havel:{name:'Havel la Roccia',enemyId:'havel_npc',sprite:'images/havel.png',hp:24,strength:22,vigor:24,dexterity:6,dropEquip:'havel_ring'}
};
const NPC_DIALOGUE_LINES={
  patches:{
    normal:["I'm Trusty Patches, the one-and-only!","Heh heh. We'll be wonderful friends."],
    entry:["What you again? Well, well!","Ah, good to see you're well, mate.","I'm Trusty Patches, the one-and-only!"],
    aggro:["I knew it!","You rotten cleric!"]
  },
  andre:{
    normal:["Well, you must be a new arrival.","I'm Andre, of Astora.","Need anything forged?"],
    entry:["Well, hello again.","You seem to be doing all right.","Need anything forged?","Don't get yourself killed."],
    aggro:["Well, you've got some nerve! Coming at me like that!","I'll tear you to shreds! You bloody Hollow!"],
    farewell:["Prithee, be careful!"]
  },
  solaire:{
    normal:["If only I could be so grossly incandescent!","Praise the sun!"],
    aggro:["...Finally, I have found it, I have!","I am the sun!"]
  },
  quelana:{
    normal:["Hmm... A mere Undead, yet you can see me? Fascinating...","I am Quelana of Izalith."],
    aggro:["The voice of reason fails? Then here is a lesson for you...","What is it! Fool!"]
  },
  siegmeyer:{
    normal:["Still closed... Still closed... Mmm.","So here I sit, in quite a pickle.","Weighing my options, so to speak!"],
    aggro:["That's your game, is it?","Well, I'm certainly not backing down!","By the honour of my knighthood!"]
  },
  logan:{
    normal:["There you are. I was expecting you.","I quite understand. Study is invigorating!","The knowledge here is limitless."],
    aggro:["I fail to see your design.","Perhaps some sorcery will change your mind!"]
  },
  giant_blacksmith:{
    normal:["Mng. Hello. Forge, I can! Strong, I am!","You come, I forge, we talk. You good friend."],
    shop:["Forge, I can! Strong, I am!","Talk, 'tis no good. But forge...very good!"],
    aggro:["Oww. Oi! Stop that!"]
  },
  gwynevere:{
    normal:["Thou hast journey'd far, and overcome much, chosen Undead.","I bequeath the Lordvessel to thee."],
    aggro:["O Heretic, swathed in Dark..."]
  },
  gwyndolin:{
    normal:["Halt! This is the tomb of the Great Lord Gwyn.","O Disciple of the Dark Sun."],
    aggro:["O Heretic, swathed in Dark...","Thou shalt perish in the twilight of Anor Londo."]
  },
  lautrec:{
    normal:["I am Knight Lautrec of Carim.","Keh heh heh heh..."],
    aggro:["You leave me no choice.","If this is our fate, so be it!"]
  },
  ingward:{
    normal:["I am Ingward, the guardian of the seal.","New Londo was sacrificed to contain the Darkwraiths."],
    aggro:["You are no different from the rest...","So be it! I am Ingward, the guardian of the seal."]
  },
  magic_blacksmith:{
    normal:["I'm Rickert of Vinheim.","What is it? There's nothing to talk about."],
    aggro:["What! No!","What are you doing!"]
  },
  fair_lady:{
    normal:["Quelaag? My dear sister.","Oh my dear sister. Do not mind me, it does not hurt terribly."],
    aggro:["Ahh!","Eek!"]
  },
  alvina:{
    normal:["I'm Alvina of the Darkroot Wood.","For thee, no mercy shall be shown."],
    aggro:["What a fool we have, what a wretched fool we have!"]
  },
  kirk:{aggro:["No one shall pass."]},
  havel:{aggro:["..."]}
};
function npcProgress(){
  if(!G.npcProgress)G.npcProgress={};
  if(!Array.isArray(G.npcProgress.npcKills))G.npcProgress.npcKills=[];
  return G.npcProgress;
}
function npcKillCount(){return npcProgress().npcKills.length;}
function routeKillCount(){
  return Math.max(npcKillCount(),Math.floor(G.humanity||0));
}
function totalKillableNpcs(){return Object.keys(NPC_ROUTE_REGISTRY).length;}
function isNpcKilled(id){return npcProgress().npcKills.includes(id);}
function npcName(id){return NPC_ROUTE_REGISTRY[id]?.name||id;}
function currentRoute(){
  const kills=routeKillCount();
  if(kills>=totalKillableNpcs())return 'genocide';
  return kills===0?'pacifist':'neutral';
}
function refreshRouteState(){
  const p=npcProgress();
  p.route=currentRoute();
  p.genocideComplete=p.route==='genocide';
  return p.route;
}
function gainHumanity(amount=1){
  G.humanity=(G.humanity||0)+amount;
  G._lastHumanityDrop=(G._lastHumanityDrop||0)+amount;
  addLog(`+${amount} umanita! (Tot: ${G.humanity})`,'system');
}
function registerNpcKill(id){
  if(!NPC_ROUTE_REGISTRY[id])return;
  const p=npcProgress();
  const firstKill=!p.npcKills.includes(id);
  if(firstKill){
    p.npcKills.push(id);
    gainHumanity(1);
  }
  p.lastNpcKilled=id;
  p.killedNpcNames=p.npcKills.map(npcName);
  refreshRouteState();
  purgeDeadServiceNodes();
}
function purgeDeadServiceNodes(){
  if(!G.map?.nodes)return;
  Object.values(G.map.nodes).forEach(node=>{
    if(node.type==='shop'&&isNpcKilled('patches'))node.type='fight';
    if(node.type==='forge'&&isNpcKilled('andre'))node.type='fight';
  });
}
function npcIdForEnemyId(enemyId){
  return Object.entries(NPC_ROUTE_REGISTRY).find(([,cfg])=>cfg.enemyId===enemyId)?.[0]||null;
}
function npcDialogueLine(id,type='normal'){
  const group=NPC_DIALOGUE_LINES[id]||{};
  const lines=group[type]||group.normal;
  if(!lines)return '';
  const pool=Array.isArray(lines)?lines.filter(Boolean):[lines];
  return pool.length?choice(pool):'';
}
function npcDialogueHtml(id,type='normal'){
  const line=npcDialogueLine(id,type);
  return line?`<br><br><em>"${line}"</em>`:'';
}
function npcTextWithOriginalLine(id,text,type='normal'){
  const body=String(text||'');
  if(/<em>\s*["“]/i.test(body))return body;
  return `${body}${npcDialogueHtml(id,type)}`;
}
function npcDialogueOnlyHtml(id,type='normal'){
  const line=npcDialogueLine(id,type)||`${npcName(id)} ti fissa in silenzio.`;
  return `<em>"${line}"</em>`;
}
function ensureNpcEnemyTemplates(){
  Object.entries(NPC_ROUTE_REGISTRY).forEach(([id,cfg])=>{
    let enemy=ENEMIES.find(e=>e.id===cfg.enemyId);
    if(!enemy){
      enemy=enemyTpl(cfg.enemyId,cfg.name,{isElite:true,eventOnly:true,hp:cfg.hp||18,strength:cfg.strength||10,vigor:cfg.vigor||10,intelligence:cfg.intelligence||10,dexterity:cfg.dexterity||10,faith:cfg.faith||10,arcane:cfg.arcane||10,sprite:cfg.sprite,dropEquip:cfg.dropEquip});
      ENEMIES.push(enemy);
    }
    enemy._npcId=id;
    if(cfg.forceSprite&&cfg.sprite)enemy.sprite=cfg.sprite;
    if(cfg.dropEquip)enemy.dropEquip=cfg.dropEquip;
  });
}
function noteNpcKillFromEnemy(enemy){
  const id=G._pendingNpcKillId||enemy?._npcId||npcIdForEnemyId(enemy?.id);
  if(id)registerNpcKill(id);
  G._pendingNpcKillId=null;
  G._npcBattleId=null;
}
function resetBattleRuntimeState(){
  G._defeatedEnemies=[];
  G._lastDefeatedEnemy=null;
  G._battleWon=false;
  G._pendingMove=null;
  G._pendingMoveIdx=-1;
  G._pendingCost=0;
  G._targeting=false;
  G._movesThisTurn=0;
  G._isFirstMoveThisTurn=false;
  G._staminaSpentThisTurn=0;
  G._enemyUsedHeavy=false;
  G._staffDiscountUsed=false;
  G._firstAttackDone=false;
}
function npcFightButton(id,label){
  if(!NPC_ROUTE_REGISTRY[id]||isNpcKilled(id))return '';
  return `<button class="btn danger" onclick="startNpcBattle('${id}')">${label||`Combatti ${npcName(id)}`}</button>`;
}
function routeShopPrice(price){
  return Math.ceil((price||0)*(routeKillCount()>5?1.2:1));
}
function npcShopFearText(id){
  const n=npcName(id);
  return `<div style="margin:8px 0 10px;padding:9px 10px;background:#170b12;border:1px solid #ff6060;border-radius:8px;color:#f0c0c0;font-size:10px;line-height:1.55">
    <div style="color:#ff8080;font-size:9px;letter-spacing:1px;margin-bottom:4px">DIALOGO</div>
    <em>"Ti prego... compra quello che vuoi e vattene. Ho sentito cosa fai alla gente."</em><br>
    <span style="color:#c08080">${n} ti guarda senza riuscire a nascondere la paura. Prezzi +20%.</span>
  </div>`;
}
function npcShopBlocked(id,img){
  if(isNpcKilled(id)){
    setNpcDialogEvent(img,`${npcName(id)} non c'e piu. Il luogo e rimasto vuoto, e nessuno osa prendere il suo posto.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
    return true;
  }
  if(routeKillCount()>=10){
    setNpcDialogEvent(img,`${npcName(id)} si irrigidisce appena ti vede.<br><br><em>"No. Non voglio parlarti. Vai via."</em><br><br>Non ti vendera nulla. A questo punto la tua fama arriva prima dei tuoi passi.`,`${npcFightButton(id)}<button class="btn" onclick="completeEvent()">Vai via</button>`);
    return true;
  }
  return false;
}
function showNpcEvent(id,img,text,buttons,opts={}){
  if(isNpcKilled(id)){
    setNpcDialogEvent(img,`${npcName(id)} non e piu qui. Resta solo il peso della scelta che hai gia fatto.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
    return;
  }
  if(routeKillCount()>=10&&!opts.ignoreMassacreRefusal){
    const forcedActions=opts.noFight?(buttons||''):npcFightButton(id);
    setNpcDialogEvent(img,`${npcName(id)} arretra prima ancora che tu possa parlare.<br><br><em>"Stammi lontano. Non voglio avere nulla a che fare con te."</em>`,`${forcedActions}<button class="btn" onclick="completeEvent()">Vai via</button>`);
    return;
  }
  const body=opts.noOriginalLine?String(text||''):npcTextWithOriginalLine(id,text,opts.dialogueType||'normal');
  setNpcDialogEvent(img,body,`${buttons||''}${opts.noFight?'':npcFightButton(id)}`);
}
function startNpcBattle(id){
  ensureNpcEnemyTemplates();
  const cfg=NPC_ROUTE_REGISTRY[id];
  if(!cfg||isNpcKilled(id)){completeEvent();return;}
  const base=ENEMIES.find(e=>e.id===cfg.enemyId);
  if(!base){completeEvent();return;}
  const enemy=scaleEnemy(base,zoneTier());
  enemy._npcId=id;
  enemy.name=cfg.name;
  enemy.sprite=cfg.sprite||enemy.sprite;
  enemy.eventOnly=true;
  enemy.isElite=true;
  enemy.dropEquip=cfg.dropEquip||enemy.dropEquip||null;
  G._pendingNpcKillId=id;
  G._npcBattleId=id;
  G.enemies=[enemy];
  G.enemy=enemy;
  resetBattleRuntimeState();
  G._eventBattle=true;
  G._mimicBattle=false;
  G._pendingDropEquip=enemy.dropEquip||null;
  G.log=[];
  _initCombat();
  G.busy=false;
  closeMenus();
  resetNpcDialogLayout();
  showScreen('battle');
  document.getElementById('battle-floor-label').textContent=`⚠ NPC — ${cfg.name}`;
  addLog(`Appare ${enemy.name}!`,'system');
  showNpcBattleIntro(id);
}
ensureNpcEnemyTemplates();
const ZONE_NORMALS={
  depths:[
    enemyTpl('ratto','Ratto'),enemyTpl('rana_mortale','Rana mortale'),enemyTpl('slime','Slime')
  ],
  blighttown:[
    enemyTpl('cane_fuoco','Cane di fuoco'),enemyTpl('cerbottaniere_velenoso','Cerbottaniere velenoso'),
    enemyTpl('zanzara_gigante','Zanzara gigante'),enemyTpl('sanguisuga','Sanguisuga'),enemyTpl('ragno_fuoco','Ragno di fuoco')
  ],
  darkroot:[
    enemyTpl('golem_cristallo','Golem di cristallo'),enemyTpl('arbusto','Arbusto'),enemyTpl('rana_rossa','Rana rossa'),enemyTpl('omino_fungo','Omino fungo')
  ],
  artorias_grave:[
    enemyTpl('protettore_mago','Mago protettore della foresta'),enemyTpl('protettore_ladro','Ladro protettore della foresta'),enemyTpl('protettore_cavaliere','Cavaliere protettore della foresta')
  ],
  sens:[
    enemyTpl('uomo_serpente','Uomo serpente'),enemyTpl('mago_serpente','Mago serpente'),enemyTpl('balder_arco','Balder Knight arco'),
    enemyTpl('balder_stocco','Balder Knight stocco'),enemyTpl('balder_spada','Balder Knight spada')
  ],
  anor_londo:[
    enemyTpl('imp','Imp'),enemyTpl('cavaliere_argento_alabarda',"Cavaliere d'argento alabarda"),
    enemyTpl('cavaliere_argento_spada_scudo',"Cavaliere d'argento spada e scudo"),
    enemyTpl('cavaliere_argento_arco',"Cavaliere d'argento arco ammazzadraghi"),enemyTpl('guardiano_dipinto','Guardiano del dipinto')
  ],
  tomb_giants:[
    enemyTpl('scheletro','Scheletro'),enemyTpl('scheletro_ruota','Scheletro ruota'),enemyTpl('scheletro_gigante','Scheletro gigante'),enemyTpl('scheletro_bestia','Scheletro bestia')
  ],
  lost_izalith:[
    enemyTpl('demone_capra_lost','Demone Capra'),enemyTpl('demone_toro_lost','Demone Toro'),enemyTpl('culo_drago','Culo di drago'),enemyTpl('mangiatore_caos','Mangiatore di caos')
  ],
  dukes_archives:[
    enemyTpl('non_morto_cristallizzato','Non morto cristallizzato'),enemyTpl('armoredboar_archive','Cinghiale corazzato',ENEMIES.find(e=>e.id==='armoredboar')||{}),
    enemyTpl('channeler_archive','Channeler',{_spawnWith:['non_morto_cristallizzato','non_morto_cristallizzato']}),enemyTpl('golem_cristallo_archive','Golem di cristallo'),
    enemyTpl('conchiglia_mangiauomini','Conchiglia mangiauomini')
  ],
};
const ZONE_ELITES={
  depths:[
    enemyTpl('ratto_gigante','Ratto gigante',{isElite:true,_spawnWith:['ratto','ratto']}),enemyTpl('macellaio_pazzo','Macellaio pazzo',{isElite:true})
  ],
  blighttown:[
    enemyTpl('ogre_inf_mazza','Ogre infestato con mazza',{isElite:true}),enemyTpl('ogre_inf_macigno','Ogre infestato con macigno',{isElite:true})
  ],
  darkroot:[
    enemyTpl('cavaliere_nero_alabarda','Cavaliere nero alabarda',{isElite:true}),enemyTpl('golem_pietra_antico','Golem di pietra antico',{isElite:true})
  ],
  artorias_grave:[
    enemyTpl('gatto_gigante','Gatto gigante',{isElite:true}),enemyTpl('grande_uomo_fungo','Grande uomo fungo',{isElite:true})
  ],
  sens:[
    enemyTpl('demone_titanite','Demone di titanite',{isElite:true,_multiCountRange:[1,3]}),enemyTpl('gigante_campana','Gigante della campana',{isElite:true})
  ],
  anor_londo:[
    enemyTpl('gargoyle_anor','Gargoyle',{isElite:true,sprite:'images/gargoyle.png'}),enemyTpl('sentinella_reale','Sentinella reale',{isElite:true})
  ],
  tomb_giants:[
    enemyTpl('cavaliere_nero_grande_ascia','Cavaliere nero grande ascia',{isElite:true}),enemyTpl('girandola','Girandola',{isElite:true})
  ],
  lost_izalith:[
    enemyTpl('demone_centipede','Demone centipede',{isElite:true}),enemyTpl('scarica_infinita','Scarica infinita',{isElite:true}),enemyTpl('demone_infuocato','Demone infuocato',{isElite:true})
  ],
  dukes_archives:[
    enemyTpl('golem_cristallo_dorato','Golem di cristallo dorato',{isElite:true}),enemyTpl('farfalla_luna_archivi','Farfalla della luna',{isElite:true})
  ],
};
const ZONE_BOSSES={
  depths:[enemyTpl('drago_famelico','Drago famelico',{isBoss:true})],
  blighttown:[enemyTpl('quelag','Quelag',{isBoss:true})],
  darkroot:[enemyTpl('farfalla_luna','Farfalla della luna',{isBoss:true}),enemyTpl('hydra_darkroot','Hydra',{isBoss:true})],
  artorias_grave:[enemyTpl('sif','Sif, il lupo grigio',{isBoss:true})],
  sens:[enemyTpl('golem_ferro','Golem di ferro',{isBoss:true})],
  anor_londo:[enemyTpl('ornstein','Ornstein',{isBoss:true,_group:['ornstein','smough']})],
  tomb_giants:[enemyTpl('nito','Nito il Re tombale',{isBoss:true})],
  lost_izalith:[enemyTpl('culla_caos','Culla del Caos',{isBoss:true,isLeaderGroup:true,_lockedUntilSeals:true,hp:1,_fixedHp:1,_group:['sigillo_sinistro','culla_caos','sigillo_destro']})],
  dukes_archives:[enemyTpl('seath','Seath il senza scaglie',{isBoss:true})],
  kiln:[enemyTpl('gwyn','Gwyn, il Re dei Tizzoni',{isBoss:true,hp:30,strength:25,vigor:22,dexterity:18,faith:20,arcane:8,sprite:'images/gwyn.png'})],
};
const SPECIAL_ENEMIES={
  ornstein:enemyTpl('ornstein','Ornstein',{isBoss:true}),
  smough:enemyTpl('smough','Smough',{isBoss:true}),
  sigillo_sinistro:enemyTpl('sigillo_sinistro','Sigillo sinistro',{isBoss:true}),
  sigillo_destro:enemyTpl('sigillo_destro','Sigillo destro',{isBoss:true}),
  culla_caos:enemyTpl('culla_caos','Culla del Caos',{isBoss:true,isLeaderGroup:true,_lockedUntilSeals:true,hp:1,_fixedHp:1})
};
const FINAL_BOSS_TEMPLATES={
  gwyndolin_finale:enemyTpl('gwyndolin_finale','Gwyndolin, Sole Oscuro',{
    isBoss:true,hp:26,strength:12,vigor:16,intelligence:28,dexterity:18,faith:28,arcane:22,color:'#d8b5ff',sprite:'images/gwyndolin.png',
    moves:[
      {id:'gwyndolin_frecce_lunari',name:'Frecce Lunari',type:'mag',cost:1,power:0.85},
      {id:'gwyndolin_lancia_sole_oscuro',name:'Lancia del Sole Oscuro',type:'mag',cost:2,power:1.25,statusChance:{burn:0.12,poison:0,freeze:0,bleed:0,plague:0}},
      {id:'gwyndolin_velo_luna',name:'Velo della Luna',type:'buff',cost:1,effect:'buff_mag_self5'}
    ]
  }),
  re_senza_nome:enemyTpl('re_senza_nome','Re senza nome',{
    isBoss:true,hp:34,strength:30,vigor:24,intelligence:12,dexterity:24,faith:30,arcane:10,color:'#d8c56a',sprite:'images/re_senza_nome.png',
    moves:[
      {id:'nameless_fendente_tempesta',name:'Fendente della Tempesta',type:'atk',cost:1,power:0.95},
      {id:'nameless_lancia_fulmine',name:'Lancia del Fulmine',type:'mag',cost:2,power:1.35,statusChance:{burn:0.15,poison:0,freeze:0,bleed:0,plague:0}},
      {id:'nameless_assalto_re',name:'Assalto del Re',type:'atk',cost:3,power:1.9}
    ]
  }),
  anima_tizzoni:enemyTpl('anima_tizzoni',"Anima dei Tizzoni",{
    isBoss:true,hp:72,strength:34,vigor:30,intelligence:30,dexterity:26,faith:34,arcane:22,color:'#ffb35c',sprite:'images/anima_tizzoni.png',
    moves:[
      {id:'cinder_spada_cenere',name:'Spada di Cenere',type:'atk',cost:1,power:1.0,statusChance:{burn:0.08,poison:0,freeze:0,bleed:0,plague:0}},
      {id:'cinder_lancia_fiamma',name:'Lancia della Fiamma',type:'mag',cost:2,power:1.35,statusChance:{burn:0.18,poison:0,freeze:0,bleed:0,plague:0}},
      {id:'cinder_memoria_lord',name:'Memoria dei Lord',type:'buff',cost:2,effect:'infernal_contract'},
      {id:'cinder_combo_tizzoni',name:'Combo dei Tizzoni',type:'atk',cost:3,power:0.75,hits:3}
    ]
  }),
  gael_finale:enemyTpl('gael_finale','Gael, Cavaliere Schiavo',{
    isBoss:true,hp:68,strength:34,vigor:28,intelligence:12,dexterity:30,faith:14,arcane:30,color:'#b84a4a',sprite:'images/gael.png',
    moves:[
      {id:'gael_spada_spezzata',name:'Spada del Sangue Oscuro',type:'atk',cost:1,power:1.05,statusChance:{burn:0,poison:0,freeze:0,bleed:0.14,plague:0}},
      {id:'gael_balestra',name:'Raffica di Balestra',type:'atk',cost:2,power:0.55,hits:3},
      {id:'gael_mantello_rosso',name:'Mantello Rosso',type:'atk',cost:2,power:1.35,statusChance:{burn:0,poison:0,freeze:0,bleed:0.18,plague:0}},
      {id:'gael_furia_pittura',name:'Furia per la Pittura',type:'buff',cost:2,effect:'berserker_bonus'}
    ]
  }),
  manus_finale:enemyTpl('manus_finale',"Manus, Padre dell'Abisso",{
    isBoss:true,hp:88,strength:38,vigor:36,intelligence:18,dexterity:18,faith:8,arcane:40,color:'#8b5cff',sprite:'images/manus.png',
    moves:[
      {id:'manus_artiglio_abisso',name:"Artiglio dell'Abisso",type:'atk',cost:1,power:1.15,statusChance:{burn:0,poison:0,freeze:0,bleed:0.14,plague:0}},
      {id:'manus_ruggito_oscuro',name:'Ruggito Oscuro',type:'debuff',cost:1,effect:'debuff_all'},
      {id:'manus_grandine_oscura',name:'Grandine Oscura',type:'mag',cost:2,power:0.7,hits:3},
      {id:'manus_schianto_primordiale',name:'Schianto Primordiale',type:'atk',cost:3,power:2.0}
    ]
  })
};
function makeFinalBossEnemy(id){
  const base=FINAL_BOSS_TEMPLATES[id];
  return base?scaleEnemy(base,zoneTier()):null;
}
function getZoneEnemyPool(){
  if((G.zone||'undead_burg')==='undead_burg')return ENEMIES.filter(e=>!e.eventOnly&&e.id!=='fantoccio_placeholder'&&e.tier<=1);
  return ZONE_NORMALS[G.zone]||ENEMIES.filter(e=>e.id==='fantoccio_placeholder');
}
function getZoneElitePool(){
  if((G.zone||'undead_burg')==='undead_burg')return ELITES_POOL[1]||[];
  return ZONE_ELITES[G.zone]||ELITES_POOL[0]||[];
}
function getZoneBossPool(){
  if((G.zone||'undead_burg')==='undead_burg')return BOSSES[1]||[];
  return ZONE_BOSSES[G.zone]||BOSSES[0]||[];
}

// ── NUOVO SISTEMA BUFF A STAGE (stile Pokémon) ────────────────────────────────
// buffs[stat] = array di { stage: N, turns: T }  (stage positivo = buff)
// debuffs[stat] = array di { stage: N, turns: T } (stage positivo = debuff)
// Stage netti = somma buff stage - somma debuff stage, clamp [-6, +6]
// Moltiplicatori: +1→×1.5, +2→×2.0, +3→×2.5, +4→×3.0, +5→×3.5, +6→×4.0
//                 -1→÷1.5, -2→÷2.0, ecc.

// Converte uno stage netto in moltiplicatore: +1→×1.5, +2→×2.0 ecc.
// Negativi specchiati: -1→÷1.5 = ×0.67 ecc.
function stageMult(netStage){
  const s=Math.max(-6,Math.min(6,netStage));
  if(s>=0) return 1+s*0.5;
  return 1/(1+Math.abs(s)*0.5);
}

function getNetStage(u, stat){
  const buffStage=(u.buffs[stat]||[]).reduce((sum,b)=>sum+b.stage,0);
  const debuffStage=(u.debuffs[stat]||[]).reduce((sum,b)=>sum+b.stage,0);
  return Math.max(-6,Math.min(6, buffStage-debuffStage));
}

// Applica un buff/debuff a stage su una statistica
// isDebuff=true → va in debuffs[], altrimenti in buffs[]
function applyStage(unit, stat, stage, turns, isDebuff=false){
  const arr=isDebuff?unit.debuffs:unit.buffs;
  if(!Array.isArray(arr[stat])) arr[stat]=[];
  arr[stat].push({stage, turns});
}

function getAtk(u,ip){
  const base=(u.strength||u.atk||1)+(ip?getEquipBonus(u,'strength'):0);
  const net=getNetStage(u,'atk');
  let v=Math.round(base*stageMult(net));
  if(ip){
    if(u.statusEffects?.artorias_blessing)v=Math.round(v*1.1);
    if(u.id==='warrior'&&u.hp<u.maxHp*0.5)v*=2;
    if(hasItem('pozione_furia')&&u.hp<u.maxHp*0.4)v=Math.round(v*1.25);
    if(hasItem('cuore_drago')&&u.hp<u.maxHp*0.5)v=Math.round(v*1.3);
  }
  return Math.max(1,Math.round(v));
}
function getDef(u){
  const base=(u===G.player)?getEquipDef(u):(u.vigor||u.def||0);
  const net=getNetStage(u,'def');
  let v=Math.round(base*stageMult(net));
  if(u===G.player&&u.statusEffects?.artorias_blessing)v=Math.round(v*1.1);
  return Math.max(0,v);
}
function getMag(u,ip){
  const base=(u.intelligence||u.mag||1)+(ip?getEquipBonus(u,'intelligence'):0);
  const net=getNetStage(u,'mag');
  let v=Math.round(base*stageMult(net));
  if(ip&&u.statusEffects?.artorias_blessing)v=Math.round(v*1.1);
  if(ip&&hasItem('cuore_drago')&&u.hp<u.maxHp*0.5)v=Math.round(v*1.3);
  return Math.max(1,Math.round(v));
}
function getEffDex(u,ip){
  const base=(u.dexterity||10)+(ip?getEquipBonus(u,'dexterity'):0);
  const net=getNetStage(u,'atk'); // dex scala sullo stesso stage dell'atk
  let v=Math.round(base*stageMult(net));
  if(ip&&u.statusEffects?.artorias_blessing)v=Math.round(v*1.1);
  return Math.max(1,v);
}
function getEffFai(u,ip){
  const base=(u.faith||10)+(ip?getEquipBonus(u,'faith'):0);
  const net=getNetStage(u,'mag'); // fai scala sullo stesso stage del mag
  let v=Math.round(base*stageMult(net));
  if(ip&&u.statusEffects?.artorias_blessing)v=Math.round(v*1.1);
  return Math.max(1,v);
}
function moveScalingStat(move,att,ip){
  if(move?.scaling)return move.scaling;
  if(move?.scaleStat)return move.scaleStat;
  if(move?.type==='mag')return (ip&&att?.id==='paladin')?'faith':'intelligence';
  if(move?.type==='atk')return (ip&&att?.id==='rogue')?'dexterity':'strength';
  return 'strength';
}
function getMovePowerValue(att,move,ip){
  switch(moveScalingStat(move,att,ip)){
    case 'dexterity':return getEffDex(att,ip);
    case 'faith':return getEffFai(att,ip);
    case 'arcane':{
      const base=(att.arcane||10)+(ip?getEquipBonus(att,'arcane'):0);
      const net=getNetStage(att,move?.type==='atk'?'atk':'mag');
      let v=Math.round(base*stageMult(net));
      if(ip&&att.statusEffects?.artorias_blessing)v=Math.round(v*1.1);
      return Math.max(1,v);
    }
    case 'intelligence':return getMag(att,ip);
    case 'strength':
    default:return getAtk(att,ip);
  }
}
function getCrit(u,ip,mc){
  let c=mc||(ip?(0.05+(u.dexterity||10)*0.001):0.05);
  if(ip&&u.statusEffects?.artorias_blessing)c*=1.1;
  if(ip&&u.statusEffects?.crit_boost)c*=2;
  if(ip&&hasItem('tractor'))c+=0.15;
  if(ip)c+=(u._giftCritBonus||0);
  return clamp(c,0,0.95);
}
function getCritMult(u,ip){
  let m=1.8;
  if(ip&&u.statusEffects?.crit_boost)m=2.0;
  if(ip&&hasItem('tractor'))m+=0.25;
  if(ip&&G.player.equipment?.ring?.id==='hornet_ring')m+=0.5;
  if(ip)m+=(u.critDmgBonus||0);
  return m;
}

// ── APPLY EFFECT ──────────────────────────────────────────────────────────────
// Helper: restituisce il moltiplicatore heal basato sull'equipaggiamento attivo
function _healBonus(ip){
  let b=1.0;
  if(ip){
    if(G.player.equipment?.ring?.id==='ring_sun')b+=0.1;
    if(G.player.equipment?.weapon?.id==='sacred_board')b+=0.1;
  }
  return b;
}
function applyEffect(eff,caster,target,ip){
  const debuffBlocked=target===G.player&&(hasItem('roccia')||hasItem('cuore_pietra')||G.player.equipment?.ring?.id==='cursebite_ring'||G.player.equipment?.offhand?.id==='greatshield_artorias'||getActiveSetBonus(G.player)?.effect==='havel_stone');
  function dg(fn){debuffBlocked?addLog('Immunità ai debuff!','passive'):fn();}
  const p=ip?caster:G.player; // riferimento al player per effetti energy
  switch(eff){
    // ── PLACEHOLDER: danno fisso 200
    case 'flat_200':{const dmg=200;target.hp=Math.max(0,target.hp-dmg);addLog(`${caster.name} infligge ${dmg} danni!`,ip?'player':'enemy');break;}
    // ── Buff stat (nuovo sistema a stage)
    case 'buff_both_self': applyStage(caster,'atk',1,3);applyStage(caster,'def',1,3);addLog(`${caster.name} potenzia ATK e DEF! (▲1 st, 3t)`,'system');break;
    case 'buff_atk_self':  applyStage(caster,'atk',1,3);addLog(`${caster.name} potenzia ATK! (▲1 st, 3t)`,'system');break;
    case 'buff_def_self':  applyStage(caster,'def',1,3);addLog(`${caster.name} potenzia DEF! (▲1 st, 3t)`,'system');break;
    case 'buff_mag_self5': applyStage(caster,'mag',2,5);addLog(`${caster.name} potenzia MAG! (▲2 st, 5t)`,'system');break;
    case 'buff_def_1s_5t': applyStage(caster,'def',1,5);addLog(`${caster.name} potenzia DEF! (▲1 st, 5t)`,'system');break;
    case 'buff_def_2s_3t': applyStage(caster,'def',2,3);addLog(`${caster.name} potenzia DEF! (▲2 st, 3t)`,'system');break;
    // ── Effetti Coltelli da lancio ───────────────────────────────────────────
    // Aggiungi 2 Coltelli da lancio + DEF ▲2 stage per 3 turni
    case 'shiv_2_def2':
      addShivToHand(2);applyStage(caster,'def',2,3);
      addLog(`${caster.name} si nasconde — DEF ▲2 st per 3t!`,'system');break;
    // Aggiungi 3 Coltelli da lancio (exhaust — già gestito lato mossa)
    case 'shiv_3_exhaust':
      addShivToHand(3);break;
    // Aggiungi 2 Coltelli da lancio + pesca 1 carta + scegli 1 da scartare
    case 'shiv_2_draw_discard':
      addShivToHand(2);drawCards(G.player,1);
      addLog(`${caster.name} rimescola le lame — 2 Coltelli da lancio, pesca 1 carta!`,'passive');
      G.busy=true;
      showShivDiscardChoice();break;
    // ── Heal
    case 'heal_atk25':{
      const h=Math.round(getAtk(caster,ip)*0.25*_healBonus(ip));caster.hp=clamp(caster.hp+h,0,caster.maxHp);addLog(`${caster.name} cura ${h} HP!`,'heal');break;}
    case 'heal_def40':{
      const h=Math.round(getDef(caster)*0.40*_healBonus(ip));caster.hp=clamp(caster.hp+h,0,caster.maxHp);addLog(`${caster.name} cura ${h} HP!`,'heal');break;}
    case 'heal_35_cleanse':{
      const h=Math.round(caster.maxHp*0.35*_healBonus(ip));caster.hp=clamp(caster.hp+h,0,caster.maxHp);caster.debuffs={};caster.statusEffects.poison=0;addLog(`${caster.name} cura ${h} HP e rimuove i debuff!`,'heal');break;}
    case 'cura_profonda':{
      const h=Math.round(Math.max(getMag(caster,ip),getDef(caster))*1.6*_healBonus(ip));caster.hp=clamp(caster.hp+h,0,caster.maxHp);addLog(`${caster.name} cura ${h} HP!`,'heal');break;}
    case 'vow_of_iron':{const c=Math.round(caster.maxHp*0.1);caster.hp=Math.max(1,caster.hp-c);applyStage(caster,'def',3,5);addLog(`${caster.name} sacrifica ${c} HP, DEF ▲3 st per 5 turni!`,'system');break;}
    case 'regen':caster.statusEffects.regen=3;addLog(`${caster.name} si rigenera!`,'system');break;
    // ── Test status
    case 'apply_plague_10':addPlague(target,10);break;
    // ── Debuff (nuovo sistema a stage)
    case 'debuff_atk':  dg(()=>{applyStage(target,'atk',1,3,true); addLog(`${target.name} perde ATK! (▼1 st, 3t)`,'system');});break;
    case 'debuff_def':  dg(()=>{applyStage(target,'def',1,3,true); addLog(`${target.name} perde DEF! (▼1 st, 3t)`,'system');});break;
    case 'debuff_both': dg(()=>{applyStage(target,'atk',1,3,true);applyStage(target,'mag',1,3,true);addLog(`${target.name} è indebolito! (▼1 st ATK+MAG, 3t)`,'system');});break;
    case 'debuff_all':  dg(()=>{['atk','def','mag'].forEach(k=>applyStage(target,k,1,3,true));addLog(`${target.name} è gravemente indebolito! (▼1 st tutto, 3t)`,'system');});break;
    case 'poison':      dg(()=>{target.statusEffects.poison=3;addLog(`${target.name} è avvelenato!`,'system');});break;
    case 'curse':       dg(()=>{applyStage(target,'atk',2,4,true);applyStage(target,'mag',2,4,true);addLog(`${target.name} è maledetto! (▼2 st ATK+MAG, 4t)`,'system');});break;
    case 'poison_def_down':dg(()=>{target.statusEffects.poison=3;applyStage(target,'def',2,3,true);addLog(`${target.name} avvelenato e DEF ▼2 st!`,'system');});break;
    case 'extend_debuffs':{
      let ext=false;
      ['atk','def','mag'].forEach(k=>{
        (target.debuffs[k]||[]).forEach(b=>{b.turns++;ext=true;});
      });
      if(target.statusEffects.poison>0){target.statusEffects.poison++;ext=true;}
      if(ext)addLog(`I debuff di ${target.name} sono prolungati!`,'system');break;
    }
    // ── Status / speciali
    case 'crit_boost':        caster.statusEffects.crit_boost=3;addLog(`${caster.name}: critici x2 per 3 turni!`,'passive');break;
    case 'berserker_bonus':   caster.statusEffects.berserker_bonus=1;addLog(`${caster.name}: prossimo colpo +40%!`,'passive');break;
    case 'spectral_form':     caster.statusEffects.spectral=4;addLog(`${caster.name}: Forma Spettrale! (+schivata, crit x3) 4t`,'passive');break;
    case 'primal_fury':       caster.statusEffects.primal=3;addLog(`${caster.name}: Furia Primordiale! (no DEF, +50% crit, lifesteal) 3t`,'passive');break;
    case 'infernal_contract': applyStage(caster,'atk',3,5);applyStage(caster,'def',3,5);applyStage(caster,'mag',3,5);caster.statusEffects.infernal_contract=5;addLog(`${caster.name}: Contratto Infernale! ▲3 st tutto per 5t`,'passive');break;
    case 'self_cost_20_dmgbuff':{const c=Math.round(caster.maxHp*0.2);caster.hp=Math.max(1,caster.hp-c);caster.statusEffects.dmgbuff=3;caster.statusEffects.dmgbuff_pct=1.5;addLog(`${caster.name} sacrifica ${c} HP — danni +50% per 3t!`,'system');break;}
    case 'steal_buffs':{let s=false;['atk','def','mag'].forEach(k=>{if((target.buffs[k]||[]).length>0){caster.buffs[k]=[...(caster.buffs[k]||[]),...target.buffs[k]];target.buffs[k]=[];s=true;}});addLog(s?`${caster.name} ruba i buff!`:`${target.name} non ha buff.`,'system');break;}
    case 'supernova':{if(!caster.buffs?.mag){addLog('Supernova richiede MAG potenziato!','system');break;}
      if(ip){G.player.moves.forEach((m,i)=>{if(m.effect!=='supernova')G.player.moves[i]={...m,_disabled:true};});}
      addLog('Supernova! Altre mosse esaurite per questo turno!','system');break;}
    // ── Stamina
    case 'gain_energy_1':     if(ip){G.player.stamina=clamp(G.player.stamina+2,0,G.player.maxStamina);addLog(`+2 stamina! (${G.player.stamina}/${G.player.maxStamina})⚡`,'passive');}break;
    case 'next_cost_minus1':  if(ip){caster.statusEffects.cost_minus1=1;addLog('Prossima mossa costerà 1 in meno!','passive');}break;
    case 'meditate_buff':     if(ip){caster.statusEffects.meditate=1;addLog('Medita: prossimo attacco fisico +50%!','passive');}break;
    case 'double_next_energy':if(ip){caster.statusEffects.double_next_stamina=1;addLog('Prossimo turno: stamina regen raddoppiata!','passive');}break;
    case 'hp_to_energy':{const c=Math.round(caster.maxHp*0.1);caster.hp=Math.max(1,caster.hp-c);if(ip)G.player.stamina=clamp(G.player.stamina+3,0,G.player.maxStamina);addLog(`Sacrifica ${c} HP → +3 stamina!`,'passive');break;}
    case 'overdrive':if(ip){G.player.maxStamina+=3;G.player.stamina=clamp(G.player.stamina+3,0,G.player.maxStamina);caster.statusEffects.overdrive=1;addLog('OVERDRIVE! Stamina max +3 questo turno!','passive');}break;
    case 'cosmic_resonance':  if(ip){caster.statusEffects.cosmic_resonance=3;addLog('+stamina extra/turno per 3 turni!','passive');}break;
    case 'nullify_energy':if(ip&&G.enemy.stamina>=2){G.enemy.stamina=0;addLog(`${target.name} perde tutta la stamina!`,'system');}else addLog('Stamina nemica non sufficiente.','system');break;
    // ── Mosse carte
    case 'draw3_cost_hp_def':{
      const hpCost=Math.round(caster.maxHp*0.2);
      caster.hp=Math.max(1,caster.hp-hpCost);
      applyStage(caster,'def',2,3,true);
      drawCards(ip?G.player:caster,3);
      addLog(`${caster.name} pesca 3 carte! -${hpCost} HP, DEF ▼2 st per 3t.`,'system');break;}
    case 'buff_mag_draw':{
      applyStage(caster,'mag',2,3);
      drawCards(ip?G.player:caster,1);
      addLog(`${caster.name} INT ▲2 st per 3t + pesca 1 carta!`,'passive');break;}
  }
}

// ── EXECUTE MOVE ──────────────────────────────────────────────────────────────
// Punto centrale di risoluzione di ogni mossa: smista tra danno flat, buff/debuff,
// mosse speciali (_specialMove) e danno normale con critico, schivata e on-hit.
function executeMove(att,move,def,ip){
  const lt=ip?'player':'enemy';
  if(ip&&!canTargetEnemy(def)){addLog('La Culla del Caos è protetta dai sigilli!','system');return;}
  if(!move._skipLog)addLog(`${att.name} usa ${move.name}!`,lt);

  // PLACEHOLDER: mosse con danno fisso
  if(move._flat||move.effect==='flat_200'){
    const dmg=move._forcedDamageTotal??(move._flat||200);
    def.hp=Math.max(0,def.hp-dmg);
    addLog(`${dmg} danni a ${def.name}!`,lt);
    _onHit(att,def,dmg,move,ip);
    return;
  }
  if(move.type==='buff'||move.type==='crit'){if(move.effect)applyEffect(move.effect,att,def,ip);return;}
  // Heal puri (no power)
  if((move.type==='heal'||move.type==='debuff')&&!move.power){if(move.effect)applyEffect(move.effect,att,def,ip);return;}
  // Heal con power
  if(move.type==='heal'&&move.power&&!move.effect){
    const powerStat=(move.scaling||move.scaleStat)?getMovePowerValue(att,move,ip):Math.max(getMag(att,ip),getDef(att));
    const h=Math.round(powerStat*move.power);
    att.hp=clamp(att.hp+h,0,att.maxHp);addLog(`${att.name} cura ${h} HP!`,'heal');return;
  }

  // Mosse speciali con calcolo danno proprio
  const special=_specialMove(att,move,def,ip,lt);
  if(special)return;

  // Danno normale (con tutti i modificatori)
  const hits=move.hits||1;let total=0;
  for(let h=0;h<hits;h++){
    // ATK base — usa la stat principale della classe
    let effAtk=getMovePowerValue(att,move,ip);
    let effDef=(move.effect==='pierce'||att.statusEffects?.primal)?0:getDef(def);
    if(ip&&att._abyssLens)effDef=Math.round(effDef*0.7);
    let bp=move.power||1;

    // Modificatori power
    if(move.effect==='bonus_vs_poison'&&def.statusEffects?.poison>0)bp*=1.4;
    if(move.effect==='battle_flow'&&ip)bp+=0.2*Math.max(0,(G._movesThisTurn||1)-1);
    if(move.effect==='scarica_finale'&&ip&&G.player.stamina===0)bp*=1.3;
    if(ip&&att.statusEffects?.flow_bonus&&h===0){bp*=(1+att.statusEffects.flow_bonus);att.statusEffects.flow_bonus=0;}
    if(ip&&att.statusEffects?.meditate&&move.type==='atk'){bp*=1.5;att.statusEffects.meditate=0;}
    if(att.statusEffects?.dmgbuff>0)bp*=(att.statusEffects.dmgbuff_pct||1.5);
    if(att.statusEffects?.berserker_bonus&&h===0&&total===0){bp*=1.4;att.statusEffects.berserker_bonus=0;addLog('Berserker: +40% danno!','passive');}
    if(ip&&att.statusEffects?.vengeance_bonus&&h===0&&total===0){bp*=1.5;att.statusEffects.vengeance_bonus=0;addLog('Vendetta: +50% danno!','passive');}
    // Equipaggiamento — modificatori bp
    if(ip&&G.player.equipment?.ring?.id==='ring_red_eye'&&att.hp<att.maxHp*0.5)bp*=1.1;
    if(ip&&G.player.equipment?.ring?.id==='ring_dragon'&&move.type==='mag')bp*=1.1;

    // Critico
    let forceCrit=move._forceCrit||(move.effect==='guaranteed_crit_low_hp'&&def.hp<def.maxHp*0.3)||(ip&&att.statusEffects?.night_veil_ready&&h===0&&total===0);
    if(forceCrit&&att.statusEffects?.night_veil_ready)att.statusEffects.night_veil_ready=0;

    // execute: sotto 50% usa danno fisso
    if(move.effect==='execute'&&def.hp<def.maxHp*0.5){
      const fd=move._forcedDamageTotal??Math.round(def.maxHp*0.6);def.hp=Math.max(0,def.hp-fd);total+=fd;
      addLog(`Esecuzione! ${fd} danni fissi!`,lt);_onHit(att,def,fd,move,ip);continue;
    }

    let dmg=Math.max(1,Math.round(effAtk*bp-effDef*0.5+rand(-2,2)));
    let isCrit=forceCrit||Math.random()<getCrit(att,ip,move.crit);
    if(move._forcedDamageTotal!=null){
      const base=Math.floor(move._forcedDamageTotal/hits);
      const rem=move._forcedDamageTotal-(base*hits);
      dmg=base+(h===hits-1?rem:0);
      isCrit=!!move._forceCrit;
    } else if(isCrit){
      const mult=ip&&att.statusEffects?.spectral>0?3.0:getCritMult(att,ip);
      dmg=Math.round(dmg*mult);G._lastCrit=true;
    }
    // Anello di Carim: critici +20% danno
    if(move._forcedDamageTotal==null&&ip&&G.player.equipment?.ring?.id==='ring_carim'&&isCrit)dmg=Math.round(dmg*1.2);
    // Lama del Fato: +2 danni per carta in mano
    if(ip&&G.player.equipment?.weapon?.id==='blade_gambler'){
      const handBonus=(G.player.moves?.length||0)*2;
      if(handBonus>0)dmg+=handBonus;
    }
    const primalHeal=ip&&att.statusEffects?.primal>0?Math.round(dmg*0.2):0;

    // Schivata
    if(!ip&&(G.player.statusEffects._setDodge||0)>0&&Math.random()<G.player.statusEffects._setDodge){addLog(`${G.player.name} schiva! (Set Brigante)`,'passive');continue;}
    if(!ip&&((hasItem('psyfly')&&Math.random()<0.20)||(G.player.equipment?.ring?.id==='dark_wood_grain_ring'&&Math.random()<0.15)||(G.player.equipment?.ring?.id==='ring_fog'&&Math.random()<0.10))){addLog(`${G.player.name} schiva!`,'passive');continue;}
    if(!ip&&G.player.statusEffects?.spectral>0&&Math.random()<0.40){addLog(`Forma Spettrale: schivata!`,'passive');continue;}
    if(!ip&&G.player.statusEffects?.holy_mantle){addLog('Holy Mantle assorbe il colpo!','passive');delete G.player.statusEffects.holy_mantle;continue;}
    if(!ip&&hasItem('elmetto_arrugginito')&&dmg>5)dmg=Math.max(1,dmg-5);
    if(!ip&&hasItem('elmo_cinghiale')&&isCrit){dmg=Math.round(dmg*0.6);addLog('Elmo del Cinghiale riduce il critico!','passive');}

    def.hp=Math.max(0,def.hp-dmg);total+=dmg;
    if(isCrit)addLog(`Critico! ${dmg} danni!`,'crit');
    else if(hits===1)addLog(`${dmg} danni a ${def.name}!`,lt);

    // Effetti on-hit
    if(move.effect==='lifesteal'){const s=Math.round(dmg*0.4);att.hp=clamp(att.hp+s,0,att.maxHp);addLog(`${att.name} drena ${s} HP!`,'heal');}
    if(move.effect==='lifesteal_enhanced'){const f=att.hp<att.maxHp*0.5?0.6:0.3;const s=Math.round(dmg*f);att.hp=clamp(att.hp+s,0,att.maxHp);addLog(`${att.name} drena ${s} HP!`,'heal');}
    if(move.effect==='recoil'){const rc=Math.round(dmg*0.3);att.hp=Math.max(1,att.hp-rc);addLog(`Rimbalzo: ${rc} danni!`,lt);}
    if(move.effect==='stun_on_crit'&&isCrit){def.statusEffects.stunned=1;addLog(`${def.name} è stordito!`,'system');}
    if(move.effect==='poison_on_crit'&&isCrit){def.statusEffects.poison=3;addLog(`${def.name} è avvelenato!`,'system');}
    if(move.effect==='energy_drain_hit'&&ip&&dmg>def.maxHp*0.15){G.player.stamina=clamp(G.player.stamina+2,0,G.player.maxStamina);addLog('+2 stamina (Vampiro)!','passive');}
    if(primalHeal>0)att.hp=clamp(att.hp+primalHeal,0,att.maxHp);
    if(ip&&isCrit&&hasItem('occhio_serpente')&&!def.statusEffects.poison){def.statusEffects.poison=3;addLog('Serpente: nemico avvelenato!','passive');}
    if(ip&&move.type==='atk'&&hasItem('lama_cavaliere')){applyStage(def,'def',1,2,true);addLog('Lama Oscura: DEF nemica giu!','passive');}
    if(ip&&move.type==='atk'&&hasItem('artiglio_garg')&&!G._gargoyleProc&&Math.random()<0.25){G._gargoyleProc=true;addLog('Artiglio: attacco ripetuto!','passive');}
    // statusChance da mossa (scalato con arcano del caster)
    if(move.statusChance){
      const cArcane=att.arcane||10;
      const sc=move.statusChance;
      if(sc.poison>0&&Math.random()<getStatusChance(sc.poison,cArcane)){def.statusEffects.poison=(def.statusEffects.poison||0)+3;addLog(`${def.name} è avvelenato!`,'system');}
      if(sc.burn>0&&Math.random()<getStatusChance(sc.burn,cArcane)){def.statusEffects.burn=(def.statusEffects.burn||0)+3;addLog(`${def.name} è in fiamme!`,'system');}
      if(sc.freeze>0&&Math.random()<getStatusChance(sc.freeze,cArcane)){applyFreeze(def);}
      if(sc.plague>0&&Math.random()<getStatusChance(sc.plague,cArcane)){addPlague(def,sc.plague*100);}
      // bleed: valore fisso per colpo, scalato sulla statistica reale della mossa.
      if(sc.bleed>0){
        const bleedStat=getMovePowerValue(att,move,ip);
        const bleedAmt=sc.bleed+bleedStat*0.1;
        addBleed(def,bleedAmt,cArcane);
      }
    }
    _onHit(att,def,dmg,move,ip);
  }
  if(hits>1)addLog(`Totale: ${total} danni!`,lt);
  if(move.effect==='zuffa_energy'&&ip&&total>0&&def.hp>0){G.player.stamina=clamp(G.player.stamina+2,0,G.player.maxStamina);addLog('Zuffa: +2 stamina!','passive');}

  // Effetti post-danno delegati ad applyEffect
  const inlineEffects=['lifesteal','lifesteal_enhanced','pierce','recoil','self_cost_15','self_cost_10',
    'shield_slam','lance_shield','drain_heal','execute','bonus_vs_poison','stun_on_crit','poison_on_crit',
    'guaranteed_crit_low_hp','energy_drain_hit','zuffa_energy','battle_flow','scarica_finale','meditate_buff',
    'ruin_strike','primal_fury','spectral_form','frenzy_repeat','sfogo_totale','bestial_charge','chaos_storm',
    'furia_eterna','primordial_impulse','price_of_power','time_paradox',
    'shiv_1_strike','shiv_2_def2','shiv_3_exhaust','shiv_2_draw_discard',
    'draw3_cost_hp_def','dmg_hand','dmg_deck','mag_draw_discard','dmg_discard','mag_exhaust_2','buff_mag_draw'];
  if(move.effect&&!inlineEffects.includes(move.effect))applyEffect(move.effect,att,def,ip);

  if(G._gargoyleProc&&ip){G._gargoyleProc=false;executeMove(att,move,def,ip);}
}

function _specialMove(att,move,def,ip,lt){
  // ── Coltelli da lancio: danno fisso speciale ───────────────────────────────
  if(move._isShiv&&ip){
    // Danno = 20 base + bonus cumulativi
    const totalBonus=(att._shivBonusDmg||0);
    let dmg=move._forcedDamageTotal??(20+totalBonus);
    // Critico — stessa probabilità delle altre mosse (getCrit standard con DEX)
    const isCrit=move._forceCrit||Math.random()<getCrit(att,ip,null);
    if(move._forcedDamageTotal==null&&isCrit){dmg=Math.round(dmg*getCritMult(att,ip));G._lastCrit=true;}
    // Anello di Carim potenzia i critici shiv
    if(move._forcedDamageTotal==null&&ip&&G.player.equipment?.ring?.id==='ring_carim'&&isCrit)dmg=Math.round(dmg*1.2);
    def.hp=Math.max(0,def.hp-dmg);
    if(isCrit)addLog(`Coltello da lancio — Critico! ${dmg} danni a ${def.name}!`,'crit');
    else addLog(`Coltello da lancio: ${dmg} danni a ${def.name}!`,lt);
    // Effetti status da armi shiv (calcolati in base all'ARC del giocatore)
    const arc=att.arcane||10;
    // scaling: 5% base + 0.5% per ogni punto ARC oltre 10, cap 80%
    const shivSc=Math.min(0.80,0.05+Math.max(0,arc-10)*0.005);
    if(ip){
      const wpn=G.player.equipment?.weapon?.id;
      const offh=G.player.equipment?.offhand?.id;
      if(wpn==='lama_infernale'&&Math.random()<shivSc){def.statusEffects.burn=(def.statusEffects.burn||0)+3;addLog(`${def.name} brucia!`,'system');}
      if(ip&&G.player.equipment?.weapon?.id==='coda_viverna'&&Math.random()<0.05){def.statusEffects.burn=(def.statusEffects.burn||0)+3;addLog(`${def.name} brucia (Coda di Viverna)!`,'system');}
      if(wpn==='lama_glaciale' &&Math.random()<shivSc){applyFreeze(def);}
      if(wpn==='lama_velenosa' &&Math.random()<shivSc){def.statusEffects.poison=(def.statusEffects.poison||0)+3;addLog(`${def.name} è avvelenato!`,'system');}
      if(wpn==='lama_sanguinante'){const bleedAmt=1+Math.max(0,arc-10)*0.1;addBleed(def,bleedAmt,arc);}
      if(move._forcedDamageTotal==null&&offh==='benda_maestro'){const comboDmg=(G._shivsUsedThisCombat||0)*5;if(comboDmg>0){def.hp=Math.max(0,def.hp-comboDmg);addLog(`Benda del Maestro: +${comboDmg} danni!`,'passive');}}
    }
    _onHit(att,def,dmg,move,ip);
    return true;
  }
  // ── COLPO E FUGA: 25% DEX + 25% STR + 1 Coltello da lancio ────────────────
  if(move.effect==='shiv_1_strike'&&ip){
    const dex=att.dexterity||10,str=att.strength||10;
    const dmg=move._forcedDamageTotal??Math.max(1,Math.round(dex*0.25+str*0.25+rand(-2,2)));
    def.hp=Math.max(0,def.hp-dmg);
    addLog(`Colpo e Fuga: ${dmg} danni a ${def.name}!`,lt);
    addShivToHand(1);
    _onHit(att,def,dmg,move,ip);
    return true;
  }
  const eff=move.effect;
  // self_cost (10% o 15%)
  if(eff==='self_cost_15'||eff==='self_cost_10'){
    const pct=eff==='self_cost_10'?0.1:0.15;
    const c=Math.round(att.maxHp*pct);att.hp=Math.max(1,att.hp-c);addLog(`${att.name} sacrifica ${c} HP!`,lt);
    const dmg=move._forcedDamageTotal??_calcDmg(att,def,ip,move.power,false);def.hp=Math.max(0,def.hp-dmg);addLog(`${dmg} danni!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='shield_slam'){
    const dmg=move._forcedDamageTotal??Math.max(1,Math.round(getDef(att)*1.5-getDef(def)*0.3+rand(-2,2)));
    def.hp=Math.max(0,def.hp-dmg);addLog(`${dmg} danni (scudo)!`,lt);
    applyStage(att,'def',1,2,true);addLog(`${att.name} DEF giu!`,'system');_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='lance_shield'){
    const dmg=move._forcedDamageTotal??Math.max(1,Math.round(getAtk(att,ip)*0.5+getDef(att)*0.5-getDef(def)*0.4+rand(-2,2)));
    def.hp=Math.max(0,def.hp-dmg);addLog(`${dmg} danni (lancia+scudo)!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='drain_heal'){
    const stat=getMovePowerValue(att,move,ip);
    const dmg=move._forcedDamageTotal??Math.max(1,Math.round(stat*(move.power||0.5)-getDef(def)*0.3+rand(-1,1)));
    def.hp=Math.max(0,def.hp-dmg);const h=Math.round(stat*0.4);att.hp=clamp(att.hp+h,0,att.maxHp);
    addLog(`${dmg} danni + cura ${h} HP!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='ruin_strike'){
    const dmg=move._forcedDamageTotal??Math.round(def.maxHp*0.4);def.hp=Math.max(0,def.hp-dmg);addLog(`Rovina: ${dmg} danni fissi!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='sfogo_totale'){
    const es=ip?(G._staminaSpentThisTurn||1):1;
    const dmg=move._forcedDamageTotal??_calcMoveDmg(att,def,ip,move,0.5*Math.max(1,es));def.hp=Math.max(0,def.hp-dmg);
    addLog(`Sfogo (${es} ST spesa): ${dmg} danni!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='chaos_storm'){
    const mu=ip?(G._movesThisTurn||1):1,pct=0.8+Math.random()*1.2;
    const dmg=move._forcedDamageTotal??_calcMoveDmg(att,def,ip,move,pct*mu);def.hp=Math.max(0,def.hp-dmg);
    addLog(`Caos (${mu} mosse): ${dmg} danni!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='bestial_charge'){
    const first=ip&&G._isFirstMoveThisTurn;
    const dmg=move._forcedDamageTotal??_calcMoveDmg(att,def,ip,move,1.6);def.hp=Math.max(0,def.hp-dmg);
    if(first&&ip){G.player.stamina=clamp(G.player.stamina+2,0,G.player.maxStamina);addLog(`Ricarica Bestiale (prima mossa): ${dmg} danni +2 stamina!`,lt);}
    else addLog(`Ricarica Bestiale: ${dmg} danni!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='primordial_impulse'){
    // Danno scala sulla stamina al momento del lancio (già scalata del costo)
    const launchCost=move.cost||3;
    const cs=ip?(G.player.stamina+launchCost):1;
    const dmg=move._forcedDamageTotal??_calcMoveDmg(att,def,ip,move,Math.max(1,cs*0.4));def.hp=Math.max(0,def.hp-dmg);
    addLog(`Impulso Primordiale (${cs} ST al lancio): ${dmg} danni!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='price_of_power'){
    const dmg=move._forcedDamageTotal??_calcMoveDmg(att,def,ip,move,4.0);def.hp=Math.max(0,def.hp-dmg);addLog(`PREZZO: ${dmg} danni!`,lt);
    if(ip){G.player.stamina=Math.round(G.player.stamina*0.5);addLog('Prossimo turno stamina dimezzata!','system');}
    _onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='furia_eterna'){
    const dmg=move._forcedDamageTotal??_calcMoveDmg(att,def,ip,move,1.2);def.hp=Math.max(0,def.hp-dmg);addLog(`Furia: ${dmg} danni!`,lt);
    if(ip){if(def.hp<=0){G.player.stamina=G.player.maxStamina;addLog('Abbattuto → stamina piena!','passive');}
    else{G.player.stamina=Math.max(0,G.player.stamina-2);addLog('Furia Eterna: -2 stamina!','system');}}
    _onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='time_paradox'){
    if(ip&&!G._timeParadoxUsed){
      G._timeParadoxUsed=true;G.player.stamina=G.player.maxStamina;
      G._movesThisTurn=0;G._isFirstMoveThisTurn=false;
      addLog('PARADOSSO TEMPORALE! Turno riparte con stamina piena!','passive');
      G.busy=false;renderBattle(true);
    } else addLog('Paradosso già usato!','system');return true;
  }
  // ── Mosse "carte" ────────────────────────────────────────────────────────────
  if(eff==='dmg_15x_hand'&&ip){
    const n=G.player.moves.length;
    const dmg=move._forcedDamageTotal??Math.max(1,n*15);
    def.hp=Math.max(0,def.hp-dmg);
    addLog(`Tempesta di Carte (${n} carte in mano): ${dmg} danni!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='dmg_5x_deck'&&ip){
    const n=G.player.deck.length;
    const dmg=move._forcedDamageTotal??Math.max(1,n*5);
    def.hp=Math.max(0,def.hp-dmg);
    addLog(`Biblioteca di Morte (${n} carte nel mazzo): ${dmg} danni!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='dmg_25x_discard'&&ip){
    const n=G.player.discard.length;
    const dmg=move._forcedDamageTotal??Math.max(1,n*25);
    def.hp=Math.max(0,def.hp-dmg);
    addLog(`Peso dei Caduti (${n} negli scarti): ${dmg} danni!`,lt);_onHit(att,def,dmg,move,ip);return true;
  }
  if(eff==='mag_draw_discard'&&ip){
    const dmg=move._forcedDamageTotal??Math.max(1,Math.round(getMag(att,ip)*0.5-getDef(def)*0.3+rand(-1,1)));
    def.hp=Math.max(0,def.hp-dmg);
    addLog(`Scambio Arcano: ${dmg} danni!`,lt);_onHit(att,def,dmg,move,ip);
    drawCards(G.player,1);
    addLog('Scambio: pesca 1 carta.','passive');
    // Attiva scelta discard come per Coltelli da lancio
    G.busy=true;showShivDiscardChoice();return true;
  }
  if(eff==='mag_exhaust_2'&&ip){
    const dmg=Math.max(1,Math.round(getMag(att,ip)*1.0-getDef(def)*0.3+rand(-2,2)));
    def.hp=Math.max(0,def.hp-dmg);
    addLog(`Sacrificio Arcano: ${dmg} danni!`,lt);_onHit(att,def,dmg,move,ip);
    // Lancia la scelta "esaurisci 2 carte dal deck"
    G.busy=true;showExhaust2Choice();return true;
  }
  return false;
}

// Overlay per scegliere 2 carte da esaurire dal deck (Sacrificio Arcano)
function showExhaust2Choice(){
  G._exhaust2Picks=[];
  renderExhaust2Choice();
}
function renderExhaust2Choice(){
  let ov=document.getElementById('exhaust2-overlay');
  if(!ov){
    ov=document.createElement('div');
    ov.id='exhaust2-overlay';
    ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.75);z-index:200;display:flex;align-items:center;justify-content:center;';
    document.body.appendChild(ov);
  }
  const picks=G._exhaust2Picks||[];
  const deck=G.player.deck;
  const need=2-picks.length;
  ov.innerHTML=`<div style="background:#0d0d1a;border:2px solid #c0a0ff;border-radius:12px;padding:16px;max-width:480px;width:95%;max-height:80vh;overflow-y:auto">
    <div style="font-size:13px;color:#c0a0ff;font-weight:bold;margin-bottom:4px">💀 Sacrificio Arcano</div>
    <div style="font-size:10px;color:#888;margin-bottom:10px">Scegli ${need} carta${need!==1?'e':''} da esaurire (${picks.length}/2 selezionate)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
      ${deck.map((m,i)=>{
        const r=RARITY_DATA[m.rarity||1];
        const sel=picks.includes(i);
        return`<div onclick="exhaust2Pick(${i})" style="padding:7px 8px;border:2px solid ${sel?'#ff6060':r.color};border-radius:6px;cursor:pointer;background:${sel?'#1a0808':'#12121e'};transition:all .15s">
          <div style="font-size:11px;font-weight:bold;color:${sel?'#ff8080':'#e0e0e0'}">${m.name}${sel?' 💀':''}</div>
          <div style="font-size:9px;color:#888">${m.desc||''}</div>
        </div>`;
      }).join('')}
    </div>
    <div style="margin-top:10px;display:flex;gap:8px">
      <button onclick="exhaust2Confirm()" ${picks.length>=2?'':'disabled'}
        style="flex:1;padding:7px;border-radius:6px;border:2px solid ${picks.length>=2?'#ff6060':'#333'};background:transparent;color:${picks.length>=2?'#ff8080':'#555'};cursor:${picks.length>=2?'pointer':'not-allowed'};font-family:'Courier New',monospace;font-size:11px">
        ✓ Esaurisci (${picks.length}/2)
      </button>
      <button onclick="exhaust2Skip()" style="padding:7px 14px;border-radius:6px;border:1px solid #555;background:transparent;color:#888;cursor:pointer;font-family:'Courier New',monospace;font-size:11px">Salta</button>
    </div>
  </div>`;
  ov.style.display='flex';
}
function exhaust2Pick(i){
  if(!G._exhaust2Picks)G._exhaust2Picks=[];
  const idx=G._exhaust2Picks.indexOf(i);
  if(idx>=0)G._exhaust2Picks.splice(idx,1);
  else if(G._exhaust2Picks.length<2)G._exhaust2Picks.push(i);
  renderExhaust2Choice();
}
function exhaust2Confirm(){
  const picks=(G._exhaust2Picks||[]).slice().sort((a,b)=>b-a); // rimuovi dal fondo
  picks.forEach(i=>{
    const m=G.player.deck.splice(i,1)[0];
    if(m){G.player.exhaust.push({...m});addLog(`${m.name} esaurita!`,'system');}
  });
  G._exhaust2Picks=[];
  const ov=document.getElementById('exhaust2-overlay');
  if(ov)ov.style.display='none';
  G.busy=false;renderBattle(true);
}
function exhaust2Skip(){
  G._exhaust2Picks=[];
  const ov=document.getElementById('exhaust2-overlay');
  if(ov)ov.style.display='none';
  G.busy=false;renderBattle(true);
}

function _calcDmg(att,def,ip,bp,isMag){
  // Supporto nuove statistiche: usa strength per fisico, intelligence per magico
  const ea=isMag?(att.intelligence||getMag(att,ip)):(att.strength||getAtk(att,ip));
  const dr=def.vigor||getDef(def);
  return Math.max(1,Math.round(ea*bp-dr*0.5+rand(-2,2)));
}
function _calcMoveDmg(att,def,ip,move,bp){
  const ea=getMovePowerValue(att,move,ip);
  const dr=def.vigor||getDef(def);
  return Math.max(1,Math.round(ea*bp-dr*0.5+rand(-2,2)));
}

function _normalPreviewDamage(att,move,def,ip){
  const hits=move.hits||1;
  let total=0;
  for(let h=0;h<hits;h++){
    let effAtk=getMovePowerValue(att,move,ip);
    let effDef=(move.effect==='pierce'||att.statusEffects?.primal)?0:getDef(def);
    if(ip&&att._abyssLens)effDef=Math.round(effDef*0.7);
    let bp=move.power||1;
    if(move.effect==='bonus_vs_poison'&&def.statusEffects?.poison>0)bp*=1.4;
    if(move.effect==='battle_flow'&&ip)bp+=0.2*Math.max(0,(G._movesThisTurn||1)-1);
    if(move.effect==='scarica_finale'&&ip&&G.player.stamina===0)bp*=1.3;
    if(ip&&att.statusEffects?.flow_bonus&&h===0)bp*=(1+att.statusEffects.flow_bonus);
    if(ip&&att.statusEffects?.meditate&&move.type==='atk')bp*=1.5;
    if(att.statusEffects?.dmgbuff>0)bp*=(att.statusEffects.dmgbuff_pct||1.5);
    if(att.statusEffects?.berserker_bonus&&h===0&&total===0)bp*=1.4;
    if(ip&&att.statusEffects?.vengeance_bonus&&h===0&&total===0)bp*=1.5;
    if(ip&&G.player.equipment?.ring?.id==='ring_red_eye'&&att.hp<att.maxHp*0.5)bp*=1.1;
    if(ip&&G.player.equipment?.ring?.id==='ring_dragon'&&move.type==='mag')bp*=1.1;
    if(move.effect==='execute'&&def.hp<def.maxHp*0.5){total+=Math.round(def.maxHp*0.6);continue;}
    let dmg=Math.max(1,Math.round(effAtk*bp-effDef*0.5));
    const forceCrit=move._forceCrit||(move.effect==='guaranteed_crit_low_hp'&&def.hp<def.maxHp*0.3)||(ip&&att.statusEffects?.night_veil_ready&&h===0&&total===0);
    if(forceCrit)dmg=Math.round(dmg*(ip&&att.statusEffects?.spectral>0?3.0:getCritMult(att,ip)));
    if(ip&&G.player.equipment?.ring?.id==='ring_carim'&&forceCrit)dmg=Math.round(dmg*1.2);
    if(move._forcedDamageTotal==null&&ip&&G.player.equipment?.weapon?.id==='blade_gambler'){
      const handBonus=(G.player.moves?.length||0)*2;
      if(handBonus>0)dmg+=handBonus;
    }
    total+=dmg;
  }
  return Math.max(0,total);
}

function previewMoveDamage(move,def,att=G.player,ip=true){
  if(!move||!def||!moveHasDamage(move))return null;
  if(move._flat||move.effect==='flat_200')return move._flat||200;
  if(move._isShiv){
    let dmg=20+(att._shivBonusDmg||0);
    if(move._forceCrit)dmg=Math.round(dmg*getCritMult(att,ip));
    if(ip&&G.player.equipment?.ring?.id==='ring_carim'&&move._forceCrit)dmg=Math.round(dmg*1.2);
    const combo=ip&&G.player.equipment?.offhand?.id==='benda_maestro'?(G._shivsUsedThisCombat||0)*5:0;
    return dmg+combo;
  }
  if(move.effect==='shiv_1_strike')return Math.max(1,Math.round((att.dexterity||10)*0.25+(att.strength||10)*0.25));
  if(move.effect==='self_cost_15'||move.effect==='self_cost_10')return _normalPreviewDamage(att,move,def,ip);
  if(move.effect==='shield_slam')return Math.max(1,Math.round(getDef(att)*1.5-getDef(def)*0.3));
  if(move.effect==='lance_shield')return Math.max(1,Math.round(getAtk(att,ip)*0.5+getDef(att)*0.5-getDef(def)*0.4));
  if(move.effect==='drain_heal')return Math.max(1,Math.round(getMovePowerValue(att,move,ip)*(move.power||0.5)-getDef(def)*0.3));
  if(move.effect==='ruin_strike')return Math.round(def.maxHp*0.4);
  if(move.effect==='sfogo_totale')return _calcMoveDmgNoVariance(att,def,ip,move,0.5*Math.max(1,ip?(G._staminaSpentThisTurn||1):1));
  if(move.effect==='chaos_storm')return _calcMoveDmgNoVariance(att,def,ip,move,1.4*Math.max(1,ip?(G._movesThisTurn||1):1));
  if(move.effect==='bestial_charge')return _calcMoveDmgNoVariance(att,def,ip,move,1.6);
  if(move.effect==='primordial_impulse'){
    const launchCost=move.cost||3,cs=ip?(G.player.stamina+launchCost):1;
    return _calcMoveDmgNoVariance(att,def,ip,move,Math.max(1,cs*0.4));
  }
  if(move.effect==='price_of_power')return _calcMoveDmgNoVariance(att,def,ip,move,4.0);
  if(move.effect==='furia_eterna')return _calcMoveDmgNoVariance(att,def,ip,move,1.2);
  if(move.effect==='dmg_15x_hand')return Math.max(1,(G.player.moves?.length||0)*15);
  if(move.effect==='dmg_5x_deck')return Math.max(1,(G.player.deck?.length||0)*5);
  if(move.effect==='dmg_25x_discard')return Math.max(1,(G.player.discard?.length||0)*25);
  if(move.effect==='mag_draw_discard')return Math.max(1,Math.round(getMag(att,ip)*0.5-getDef(def)*0.3));
  return _normalPreviewDamage(att,move,def,ip);
}

function _calcDmgNoVariance(att,def,ip,bp,isMag){
  const ea=isMag?(att.intelligence||getMag(att,ip)):(att.strength||getAtk(att,ip));
  const dr=def.vigor||getDef(def);
  return Math.max(1,Math.round(ea*bp-dr*0.5));
}
function _calcMoveDmgNoVariance(att,def,ip,move,bp){
  const ea=getMovePowerValue(att,move,ip);
  const dr=def.vigor||getDef(def);
  return Math.max(1,Math.round(ea*bp-dr*0.5));
}

function _onHit(att,def,dmg,move,ip){
  if(!ip&&hasItem('rammus')){const t=Math.round(getDef(G.player)*0.1);G.enemy.hp=Math.max(0,G.enemy.hp-t);addLog(`Rammus: ${t} riflessi!`,'passive');}
  if(!ip&&G.player.id==='paladin'&&getNetStage(G.player,'def')>=1){
    const sb=getActiveSetBonus(G.player);
    const reflectMult=sb?.effect==='crusader_reflect'?0.225:0.15;
    const reflect=Math.round(getEquipDef(G.player)*reflectMult||getDef(G.player)*reflectMult);
    G.enemy.hp=Math.max(0,G.enemy.hp-reflect);addLog(`Riflesso Sacro: ${reflect} danni riflessi!`,'passive');
  }
  if(!ip&&dmg>G.player.maxHp*0.15&&hasItem('amuleto_vendetta')){G.player.statusEffects.vengeance_bonus=1;addLog('Vendetta attivato!','passive');}
  if(ip&&G._lastCrit){const sb=getActiveSetBonus(G.player);if(sb?.effect==='gambler_crit_draw'){drawCards(G.player,1);addLog('Gambler: crit → pesca 1 carta!','passive');}}
  // ── Ascia Occulta: ogni colpo del giocatore applica 3 di morbo mortale
  if(ip&&dmg>0&&G.player.equipment?.weapon?.id==='mimic_ascia_occulta'){
    addPlague(def,3);
    addLog(`Ascia Occulta: +3 morbo mortale!`,'passive');
  }
  enforceGwynPacifistHalfHpGate(def);
  enforceGwynPacifistHalfHpGate(G.enemy);
}

// ── TICK ──────────────────────────────────────────────────────────────────────
// Applica gli effetti persistenti a inizio turno (veleno, bruciatura, regen…).
// Ritorna true se l'unità è stordita (skip turno).
function tickStatus(unit){
  const ie=unit===G.enemy,ip=unit===G.player;
  if(unit.statusEffects.stunned>0){addLog(`${unit.name} è stordito!`,'system');unit.statusEffects.stunned--;return true;}
  if(unit.statusEffects.poison>0){const inflicter=ip?G.enemy:G.player;const poisonStat=Math.max(inflicter.arcane||0,inflicter.dexterity||0,inflicter.intelligence||0);const dmg=Math.round(unit.maxHp*0.06+poisonStat*0.1);unit.hp=Math.max(0,unit.hp-dmg);addLog(`${unit.name} veleno: ${dmg} danni!`,ie?'enemy':'system');unit.statusEffects.poison--;}
  if(unit.statusEffects.burn>0){const inflicter=ip?G.enemy:G.player;const burnStat=Math.max(inflicter.faith||0,inflicter.arcane||0);const dmg=Math.round(unit.maxHp*0.06+burnStat*0.75);unit.hp=Math.max(0,unit.hp-dmg);addLog(`${unit.name} bruciatura: ${dmg} danni!`,ie?'enemy':'system');unit.statusEffects.burn--;}
  if((unit.statusEffects.bleed||0)>0){unit.statusEffects.bleed=Math.max(0,unit.statusEffects.bleed-10);}
  if((unit.statusEffects.plague||0)>0){unit.statusEffects.plague=Math.max(0,unit.statusEffects.plague-10);}
  if(unit.statusEffects.regen>0){const h=Math.round(unit.maxHp*0.08);unit.hp=clamp(unit.hp+h,0,unit.maxHp);addLog(`${unit.name} rigenera ${h} HP!`,'heal');unit.statusEffects.regen--;}
  if(ip&&hasItem('dente_idra')){const f=unit.statusEffects.poison>0?0.12:0.04;const h=Math.round(unit.maxHp*f);unit.hp=clamp(unit.hp+h,0,unit.maxHp);addLog(`Idra: +${h} HP!`,'heal');}
  if(ip&&hasItem('benda_sporca')&&unit.hp<unit.maxHp*0.25){const h=Math.round(unit.maxHp*0.03);unit.hp=clamp(unit.hp+h,0,unit.maxHp);addLog(`Benda: +${h} HP!`,'heal');}
  return false;
}

// Decrementa la durata di ogni strato di buff/debuff; rimuove quelli scaduti.
// Gestisce anche effetti temporanei speciali (infernal_contract, overdrive…).
function tickBuffs(unit){
  const ip=unit===G.player;
  // Decrementa e filtra ogni strato di buff/debuff per tutte le stat
  ['atk','def','mag'].forEach(stat=>{
    if(Array.isArray(unit.buffs[stat])){
      unit.buffs[stat]=unit.buffs[stat]
        .map(b=>({...b,turns:b.turns-1}))
        .filter(b=>b.turns>0);
    }
    if(Array.isArray(unit.debuffs[stat])){
      unit.debuffs[stat]=unit.debuffs[stat]
        .map(b=>({...b,turns:b.turns-1}))
        .filter(b=>b.turns>0);
    }
  });
  ['crit_boost','spectral','primal','dmgbuff','cosmic_resonance'].forEach(k=>{if((unit.statusEffects[k]||0)>0)unit.statusEffects[k]--;});
  if((unit.statusEffects.infernal_contract||0)>0){
    unit.statusEffects.infernal_contract--;
    if(unit.statusEffects.infernal_contract===0){const p=Math.round(unit.maxHp*0.3);unit.maxHp=Math.max(1,unit.maxHp-p);unit.hp=Math.min(unit.hp,unit.maxHp);addLog(`Contratto scaduto: -${p} HP max!`,'system');}
  }
  if(ip&&unit.statusEffects.overdrive===1){unit.maxStamina=unit.baseStamina||unit.maxStamina-3;unit.statusEffects.overdrive=0;}
}

// ── ENEMY AI ──────────────────────────────────────────────────────────────────
// Sceglie la mossa del nemico con un punteggio euristico: premia le cure quando
// è a bassa vita, i buff quando è sano, gli attacchi quando è in agonia.
function enemyAI(enemy){
  const e=enemy||G.enemies[0],p=G.player,hr=e.hp/e.maxHp;
  const pool=e.moves.filter(m=>(m.cost||1)<=e.stamina);
  if(!pool.length)return null;
  return pool.map(m=>{
    let s=rand(0,8);
    if(m.type==='heal')s+=hr<0.4?40:(hr>0.7?-20:0);
    if(m.type==='buff'&&hr>0.5)s+=12;
    if((m.type==='atk'||m.type==='mag')&&hr<0.3)s+=20;
    if(e.stamina-(m.cost||1)===0)s+=5;
    return{m,s};
  }).sort((a,b)=>b.s-a.s)[0].m;
}

// ── PLAYER / ENEMY MAKER ─────────────────────────────────────────────────────
function makePlayer(cls){
  // Mazzo iniziale: mosse specifiche della classe
  const deck=(CLASS_MOVE_POOLS[cls.id]||[]).map(m=>({...m}));
  const stMax=10+Math.floor((cls.vigor||10)/3);
  return{id:cls.id,name:cls.name,color:cls.color,passive:cls.passive,
    maxHp:cls.hp,hp:cls.hp,
    strength:cls.strength,vigor:cls.vigor,intelligence:cls.intelligence,
    dexterity:cls.dexterity,faith:cls.faith,arcane:cls.arcane,
    baseCrit:0.05+(cls.dexterity||10)*0.001,critDmgBonus:0,
    maxStamina:stMax,stamina:stMax,baseStamina:stMax,
    deck,moves:[],discard:[],exhaust:[],handSize:5,
    _shivBonusDmg:0,
    buffs:{atk:[],def:[],mag:[]},
    debuffs:{atk:[],def:[],mag:[]},
    statusEffects:{},items:[],
    equipment:getStartingEquipment(cls.id)};
}

// Pesca N carte dal mazzo nell'ordine in cui si trovano (shift).
// Se il mazzo finisce, rimischia gli scarti — l'exhaust rimane sempre fuori.
function drawCards(player,n){
  n=n||(player.handSize||5);
  if(player.id==='mage')n+=2;
  const sb=getActiveSetBonus(player);
  if(sb&&sb.effect==='apprentice_hand')n+=1;
  let drawn=0;
  while(drawn<n){
    if(player.deck.length===0){
      if(player.discard.length===0)break;
      player.deck=shuffle([...player.discard]);
      player.discard=[];
      addLog('Mazzo esaurito — scarti rimischiati!','system');
    }
    const card=player.deck.shift();
    player.moves.push({...card});
    drawn++;
  }
}
// drawHand è alias di drawCards — usato internamente
function drawHand(player){drawCards(player);}

// ── COLTELLI DA LANCIO HELPERS ────────────────────────────────────────────────
// Aggiunge n copie della carta speciale direttamente nella mano del giocatore
function addShivToHand(n){
  for(let i=0;i<n;i++) G.player.moves.push({...SHIV_CARD});
  addLog(`🗡 ${n} ${n===1?'Coltello da lancio aggiunto':'Coltelli da lancio aggiunti'} alla mano!`,'passive');
}

// Mostra l'overlay di scelta per scartare 1 carta
function showShivDiscardChoice(){
  const cards=G.player.moves;
  if(!cards.length){G.busy=false;renderBattle(true);return;}
  const ov=document.getElementById('shiv-discard-overlay');
  document.getElementById('shiv-discard-cards').innerHTML=cards.map((m,i)=>{
    const r=RARITY_DATA[m.rarity||1];
    const shivTag=m._isShiv?'<span style="font-size:8px;color:#ffcc00;margin-left:3px;font-weight:bold">[LANCIO]</span>':'';
    return`<div style="background:#12121e;border:1px solid ${r.color};border-radius:8px;padding:10px;cursor:pointer;transition:border-color .15s"
      onclick="pickShivDiscard(${i})"
      onmouseover="this.style.borderColor='#f0c040'" onmouseout="this.style.borderColor='${r.color}'">
      <div style="font-size:11px;font-weight:bold;color:#e0e0e0;margin-bottom:3px">${m.name}${shivTag}</div>
      <div style="font-size:9px;color:#888">${m.desc||''}</div>
    </div>`;
  }).join('');
  ov.style.display='flex';
}

// Gestisce la selezione della carta da scartare
function pickShivDiscard(i){
  const m=G.player.moves.splice(i,1)[0];
  if(m){
    if(m._isShiv){
      // I Coltelli da lancio scompaiono silenziosamente
      addLog('Coltello da lancio rimosso dalla mano.','passive');
    } else {
      G.player.discard.push({...m});
      addLog(`${m.name} scartata.`,'system');
    }
  }
  document.getElementById('shiv-discard-overlay').style.display='none';
  G.busy=false;
  renderBattle(true);
}
function scaleEnemy(base,floor){
  const eo=base.isElite||base.isBoss;
  const scale=base._noScale?1:1+(floor-1)*0.3;
  const hp=base._fixedHp||Math.round(base.hp*scale);
  const stMax=eo?8:6;
  return{...base,
    maxHp:hp,hp,
    strength:Math.round(base.strength*scale),
    vigor:Math.round(base.vigor*scale),
    intelligence:Math.round(base.intelligence*scale),
    dexterity:Math.round(base.dexterity*scale),
    faith:Math.round(base.faith*scale),
    arcane:Math.round(base.arcane*scale),
    atk:Math.round(base.strength*scale),
    def:Math.round(base.vigor*scale),
    mag:Math.round(base.intelligence*scale),
    maxStamina:stMax,stamina:stMax,
    buffs:{atk:[],def:[],mag:[]},debuffs:{atk:[],def:[],mag:[]},statusEffects:{},
    moves:base.moves.map(mv=>({...mv}))};
}

function applyItemStats(p,item){
  const s=item.effect;
  if(s==='hp_flat_10'){p.maxHp=p.maxHp+10;p.hp=Math.min(p.hp,p.maxHp);return;}
  // ── Oggetti Coltelli da lancio ──
  if(s==='shiv_dmg_10'){p._shivBonusDmg=(p._shivBonusDmg||0)+10;return;}
  // ── Doni iniziali ──
  if(s==='gift_binocolo'){p._giftCritBonus=(p._giftCritBonus||0)+0.12;return;}
  if(s==='gift_anello_piccolo'){p.maxHp=p.maxHp+25;p.hp=Math.min(p.hp+25,p.maxHp);return;}
  if(s==='gift_anello_strega'){p.intelligence=(p.intelligence||10)+5;p.arcane=(p.arcane||10)+5;p.faith=(p.faith||10)+5;return;}
  if(s==='white_sign_soapstone'){p.faith=(p.faith||0)+10;return;}
  // gift_pendente e gift_masterkey: nessun effetto immediato
  p.hp=Math.min(p.hp,p.maxHp);
}

function addPlayerItem(itemOrId,{apply=true,allowDuplicate=false}={}){
  const item=typeof itemOrId==='string'?ITEMS.find(i=>i.id===itemOrId):itemOrId;
  if(!item||!G.player)return null;
  if(!G.player.items)G.player.items=[];
  if(!allowDuplicate&&item.unique&&G.player.items.some(i=>i.id===item.id))return null;
  const owned={...item};
  G.player.items.push(owned);
  if(apply)applyItemStats(G.player,owned);
  return owned;
}

function syncQuestInventory(){
  if(G.player&&G.npcProgress?.solaire&&!hasItem('white_sign_soapstone')){
    addPlayerItem('white_sign_soapstone',{apply:false});
  }
}

// ── SCREEN ────────────────────────────────────────────────────────────────────
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById('screen-'+id).classList.add('active');}

// ── GLOSSARIO ─────────────────────────────────────────────────────────────────
let _gFilter=0;
function showGlossary(f){
  _gFilter=f||0;showScreen('glossary');
  const labels={0:'Tutte',1:'Comuni',2:'Rare',3:'Epiche',4:'Leggendarie',5:'Mitiche'};
  document.getElementById('glossary-filters').innerHTML=[0,1,2,3,4,5].map(r=>{
    const col=r===0?'#aaa':RARITY_DATA[r].color,act=_gFilter===r;
    return`<button onclick="showGlossary(${r})" style="font-size:10px;padding:3px 10px;border-radius:4px;border:1px solid ${col};background:${act?col:'transparent'};color:${act?'#0a0a0f':col};cursor:pointer;font-family:'Courier New',monospace">${labels[r]}</button>`;
  }).join('');
  const moves=_gFilter?ALL_MOVES.filter(m=>m.rarity===_gFilter):ALL_MOVES;
  document.getElementById('glossary-grid').innerHTML=moves.map(m=>{
    const r=RARITY_DATA[m.rarity||1];
    return`<div style="background:#12121e;border:1px solid ${r.color};border-radius:8px;padding:10px;box-shadow:0 0 6px ${r.glow}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <span style="font-weight:bold;color:#e0e0e0;font-size:11px">${m.name}</span>
        <span class="mtype type-${m.type}">${m.type.toUpperCase()}</span>
      </div>
      <div style="display:flex;gap:6px;align-items:center;margin-bottom:5px">${rarityBadge(m)}<span style="font-size:9px;color:#888">⚡ ${costPips(m.cost||1)} ${m.cost||1}</span></div>
      <div style="font-size:10px;color:#aaa;line-height:1.4">${m.desc||''}</div>
    </div>`;
  }).join('');
}

// ── SELEZIONE CLASSE ──────────────────────────────────────────────────────────
function showClassSelect(){
  document.getElementById('class-grid').innerHTML='';
  CLASSES.forEach(cls=>{
    const div=document.createElement('div');
    div.className='class-card';div.onclick=()=>selectClass(cls.id);div.id='class-'+cls.id;
    const bar=(v,t)=>`<div class="pips">${Array.from({length:5},(_,i)=>`<div class="pip${i<v?' on '+t:''}"></div>`).join('')}</div>`;
    div.innerHTML=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <img src="${SPRITES[cls.id]}" style="width:52px;height:64px;object-fit:contain">
        <div><div class="class-name" style="color:${cls.color}">${cls.name}</div><div class="class-desc">${cls.desc}</div></div>
      </div>
      <div class="passive-box">🔮 ${cls.passive}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;font-size:9px;margin-top:4px">
        ${[['STR',cls.strength],['VIG',cls.vigor],['INT',cls.intelligence],['DEX',cls.dexterity],['FAI',cls.faith],['ARC',cls.arcane]].map(([l,v])=>`<div style="color:#888">${l}: <b style="color:#c0a0ff">${v}</b></div>`).join('')}
      </div>`;
    document.getElementById('class-grid').appendChild(div);
  });
  G.selectedClass=null;document.getElementById('confirm-class-btn').disabled=true;
  showScreen('class');
}
function selectClass(id){G.selectedClass=id;document.querySelectorAll('.class-card').forEach(c=>c.classList.remove('selected'));document.getElementById('class-'+id).classList.add('selected');document.getElementById('confirm-class-btn').disabled=false;}
function confirmClass(){if(!G.selectedClass)return;G.player=makePlayer(CLASSES.find(c=>c.id===G.selectedClass));G.floor=1;G.zone='undead_burg';G.completedZones=[];G.defeatedBosses={};buildMap();showMap();}

// Mappa verticale a nodi, ispirata a Slay the Spire: un ingresso, rami multipli,
// collegamenti visibili e scelta limitata ai nodi raggiungibili.
const MAP_EVENT_META={
  start:{icon:'◆',label:'Ingresso',color:'#f0c040',hint:'La discesa comincia qui.'},
  frampt:{icon:'?',label:'Frampt',color:'#f0c040',hint:'Una voce antica ti attende.'},
  kaathe:{icon:'?',label:'Kaathe',color:'#8b6dff',hint:"L'Abisso ti parla."},
  fight:{icon:'⚔',label:'Nemico',color:'#d6ddf2',hint:'Un nemico si avvicina...'},
  rest:{icon:'🔥',label:'Falò',color:'#5ee0c2',hint:'Trovi un accampamento.'},
  chest:{icon:'✦',label:'Chest',color:'#f0c040',hint:'Una cassa ti attende.'},
  shop:{icon:'🛒',label:'Negozio',color:'#f0c040',hint:'Un mercante misterioso...'},
  elite:{icon:'☠',label:'Elite',color:'#b995ff',hint:'Un nemico potente blocca il passaggio.'},
  boss:{icon:'♛',label:'Boss',color:'#ff5f6d',hint:'Il Boss ti attende...'},
  forge:{icon:'⚒',label:'Forgia',color:'#ff7a45',hint:'Una forgia abbandonata...'},
  random_event:{icon:'?',label:'Evento',color:'#c0ff80',hint:'Qualcosa di inatteso ti attende...'}
};

function eventForMapRow(row,lastRow,floor){
  if(row===0){
    if(G._kaatheEncounterPending&&!G.npcProgress?.kaatheIntro)return 'kaathe';
    return (G.zone||'')==='sens'?'frampt':'start';
  }
  if(row===lastRow)return 'boss';
  if(row===Math.floor(lastRow*0.55))return 'rest';
  const pool=[
    {type:'fight',w:32},
    {type:'random_event',w:32},
    {type:'shop',w:10},
    {type:'forge',w:10},
    {type:'elite',w:8},
    {type:'chest',w:8}
  ].filter(entry=>{
    if(entry.type==='shop'&&isNpcKilled('patches'))return false;
    if(entry.type==='forge'&&isNpcKilled('andre'))return false;
    return true;
  });
  let roll=Math.random()*pool.reduce((sum,x)=>sum+x.w,0);
  for(const entry of pool){roll-=entry.w;if(roll<=0)return entry.type;}
  return 'fight';
}

function makeMapRows(){
  if((G.zone||'')==='kiln'){
    const types=['start','random_event','boss'];
    return types.map((type,row)=>[{
      id:`m${G.zone||G.floor}-${row}-0`,
      row,
      col:0,
      type,
      x:0.5,
      out:[],
      in:[]
    }]);
  }
  const lastRow=9;
  const widths=[1,rand(3,5),rand(4,5),rand(3,5),rand(4,5),rand(3,5),rand(4,5),rand(3,5),rand(3,4),1];
  return widths.map((w,row)=>Array.from({length:w},(_,col)=>{
    const id=`m${G.zone||G.floor}-${row}-${col}`;
    return {id,row,col,type:eventForMapRow(row,lastRow,G.floor||1),x:(col+1)/(w+1),out:[],in:[]};
  }));
}

function buildMap(){
  const rows=makeMapRows();
  const nodes={};
  rows.flat().forEach(n=>nodes[n.id]=n);
  for(let r=0;r<rows.length-1;r++){
    const cur=rows[r],next=rows[r+1];
    cur.forEach(n=>{
      const sorted=[...next].sort((a,b)=>Math.abs(a.x-n.x)-Math.abs(b.x-n.x));
      const targets=[sorted[0]];
      if(sorted[1]&&Math.random()<0.28)targets.push(sorted[1]);
      if(sorted[2]&&Math.random()<0.06)targets.push(sorted[2]);
      targets.forEach(t=>{if(!n.out.includes(t.id))n.out.push(t.id);if(!t.in.includes(n.id))t.in.push(n.id);});
    });
    next.forEach(n=>{
      if(n.in.length)return;
      const closest=[...cur].sort((a,b)=>Math.abs(a.x-n.x)-Math.abs(b.x-n.x))[0];
      closest.out.push(n.id);n.in.push(closest.id);
    });
  }
  const start=rows[0][0].id;
  G.map={rows,nodes,start,current:null,available:[start],completed:[],path:[],playerNode:start,travelFrom:null,travelTo:start};
}

function showMap(){showScreen('map');G.busy=false;document.getElementById('floor-title').textContent=zoneName(G.zone);renderFloorBar();renderPlayerHUD();renderEventChoice();}

function renderFloorBar(){
  if(!G.map)buildMap();
  const rows=G.map.rows,H=620,W=760,top=34,bottom=50,left=58,right=58;
  const step=(H-top-bottom)/(rows.length-1);
  const completed=new Set(G.map.completed),available=new Set(G.map.available);
  const current=G.map.current;
  const traveled=new Set();
  (G.map.path||[]).forEach((id,i,path)=>{if(path[i+1])traveled.add(`${id}>${path[i+1]}`);});
  const xy=n=>({x:left+n.x*(W-left-right),y:H-bottom-n.row*step});
  let s=`<div class="spire-map-wrap"><svg class="spire-map" viewBox="0 0 ${W} ${H}" role="img" aria-label="Mappa: ${zoneName(G.zone)}">`;
  rows.flat().forEach(n=>{
    const a=xy(n);
    n.out.forEach(id=>{
      const b=xy(G.map.nodes[id]);
      const active=completed.has(n.id)||available.has(id)||current===n.id;
      const pathDone=traveled.has(`${n.id}>${id}`);
      s+=`<path class="map-edge ${active?'is-lit':''} ${pathDone?'is-traveled':''}" d="M ${a.x} ${a.y-18} C ${a.x} ${(a.y+b.y)/2}, ${b.x} ${(a.y+b.y)/2}, ${b.x} ${b.y+18}"/>`;
    });
  });
  rows.flat().forEach(n=>{
    const p=xy(n),meta=MAP_EVENT_META[n.type]||MAP_EVENT_META.fight;
    const done=completed.has(n.id),can=available.has(n.id),cur=current===n.id;
    const cls=['map-node',`type-${n.type}`,done?'is-done':'',can?'is-available':'',cur?'is-current':''].filter(Boolean).join(' ');
    const click=can?`onclick="startMapNode('${n.id}')"`:'';
    s+=`<g class="${cls}" ${click} transform="translate(${p.x} ${p.y})">
      ${can?`<circle class="map-node-hit" r="34" onclick="startMapNode('${n.id}')"></circle>`:''}
      <circle r="22" style="--node-color:${meta.color}"></circle>
      <text y="6" text-anchor="middle">${done?'✓':meta.icon}</text>
      <text class="map-node-label" y="38" text-anchor="middle">${meta.label}</text>
    </g>`;
  });
  const tokenNode=G.map.nodes[G.map.travelTo||G.map.playerNode||G.map.start];
  if(tokenNode){
    const to=xy(tokenNode),fromNode=G.map.nodes[G.map.travelFrom]||tokenNode,from=xy(fromNode);
    const spr=G.player?SPRITES[G.player.id]:'';
    s+=`<g class="map-player-token" transform="translate(${to.x} ${to.y})">
      ${G.map.travelFrom&&G.map.travelFrom!==G.map.travelTo?`<animateTransform attributeName="transform" type="translate" from="${from.x} ${from.y}" to="${to.x} ${to.y}" dur="0.48s" fill="freeze" calcMode="spline" keySplines=".2 .9 .2 1"/>`:''}
      <circle r="18"></circle>
      ${spr?`<image href="${spr}" x="-17" y="-27" width="34" height="42" preserveAspectRatio="xMidYMid meet"></image>`:`<text y="6" text-anchor="middle">◆</text>`}
    </g>`;
  }
  s+='</svg></div>';
  document.getElementById('floor-bar').innerHTML=s;
}

function renderPlayerHUD(){
  const p=G.player;
  document.getElementById('player-hud').innerHTML=`<div class="map-player-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
      <span style="color:${p.color};font-weight:bold;font-size:13px">${p.name}</span>
      <span style="font-size:10px;color:#888">STR ${p.strength||10} | VIG ${p.vigor||10} | INT ${p.intelligence||10} | DEX ${p.dexterity||10} | FAI ${p.faith||10} | ARC ${p.arcane||10} | ⚡${p.stamina||0}/${p.maxStamina||0}</span>
    </div>
    ${hpBarHTML(p,{labelClass:'hp-label',barClass:'hp-bar',fillClass:'hp-fill',transition:'.4s'})}
    ${p.items?.length?`<div style="margin-top:4px;font-size:9px;color:#888">Oggetti: ${p.items.map(i=>i.icon+' '+i.name).join(', ')}</div>`:''}
  </div>`;
}

function renderEventChoice(){
  const area=document.getElementById('event-choice-area'),hint=document.getElementById('map-hint');
  const available=(G.map?.available||[]).map(id=>G.map.nodes[id]);
  if(!available.length){hint.textContent='';area.innerHTML='<p class="map-instruction">Percorso completato.</p>';return;}
  const labels=available.map(n=>MAP_EVENT_META[n.type]?.label||n.type).join(' / ');
  hint.textContent=available.length===1?`Nodo disponibile: ${labels}`:`Scegli uno dei ${available.length} nodi collegati`;
  area.innerHTML=`<div class="map-command-panel">
    <div class="map-instruction">Clicca un nodo luminoso sulla mappa per proseguire.</div>
    <div class="map-legend">${Object.entries(MAP_EVENT_META).filter(([k])=>k!=='start').map(([k,m])=>`<span><b style="color:${m.color}">${m.icon}</b> ${m.label}</span>`).join('')}</div>
  </div>`;
}

function startMapNode(id){
  if(!G.map||!G.map.available.includes(id)||G.busy)return;
  G.busy=true;
  const from=G.map.playerNode||G.map.start;
  G.map.current=id;
  G.map.playerNode=id;
  G.map.travelFrom=from;
  G.map.travelTo=id;
  G.map.available=[];
  if(!G.map.path.includes(id))G.map.path.push(id);
  renderFloorBar();
  renderEventChoice();
  setTimeout(()=>{G.map.travelFrom=null;startEvent();},520);
}

function startEvent(){
  resetNpcDialogLayout();
  const node=G.map?.nodes[G.map.current];
  const ev=node?.type;
  if(node?.row===0&&G._kaatheEncounterPending&&!G.npcProgress?.kaatheIntro)return showKaatheEncounter();
  if(ev==='start')return showZoneStartEvent();
  if(ev==='frampt')return showFramptEncounter();
  if(ev==='fight')startBattle(false);else if(ev==='elite')startElite();else if(ev==='boss')startBattle(true);else if(ev==='rest')showRest();else if(ev==='shop')showShopEnter();else if(ev==='forge')showForgeEnter();else if(ev==='chest')showChestChoice();else if(ev==='random_event')startRandomEvent();else showChestChoice();
}

function showZoneStartEvent(){
  if((G.zone||'undead_burg')==='sens')return showFramptEncounter();
  return showGiftScreen();
}

function resetNpcDialogLayout(){
  const screen=document.getElementById('screen-random-event');
  const txt=document.getElementById('re-text');
  const choices=document.getElementById('re-choices');
  if(screen)screen.classList.remove('npc-dialog');
  if(txt){
    txt.onclick=null;
    txt.innerHTML='';
    txt.classList.add('ut-done');
  }
  if(choices)choices.innerHTML='';
  if(G._npcDialogTimer){clearInterval(G._npcDialogTimer);G._npcDialogTimer=null;}
  G._npcDialogState=null;
}

function setStoryEvent(bg,text,buttons){
  resetNpcDialogLayout();
  const reBg=document.getElementById('re-bg');
  const reText=document.getElementById('re-text');
  const reChoices=document.getElementById('re-choices');
  if(reBg)reBg.style.backgroundImage=`url('${bg}')`;
  if(reText)reText.innerHTML=text;
  if(reChoices)reChoices.innerHTML=buttons;
  showScreen('random-event');
}

function splitNpcDialogPages(html){
  const parts=String(html||'').split(/<br\s*\/?>\s*<br\s*\/?>/i).map(s=>s.trim()).filter(Boolean);
  return parts.length?parts:[String(html||'')];
}

function renderNpcDialogPage(){
  const state=G._npcDialogState;
  const txt=document.getElementById('re-text');
  if(!state||!txt)return;
  if(G._npcDialogTimer){clearInterval(G._npcDialogTimer);G._npcDialogTimer=null;}
  txt.classList.remove('ut-done');
  txt.innerHTML='';
  const html=state.pages[state.index]||'';
  let i=0,out='';
  const finish=()=>{
    if(G._npcDialogTimer){clearInterval(G._npcDialogTimer);G._npcDialogTimer=null;}
    txt.innerHTML=html;
    state.typing=false;
    txt.classList.add('ut-done');
    if(state.index>=state.pages.length-1){
      const choices=document.getElementById('re-choices');
      if(choices)choices.innerHTML=state.buttons||'';
    }
  };
  state.typing=true;
  const choices=document.getElementById('re-choices');
  if(choices)choices.innerHTML='';
  G._npcDialogTimer=setInterval(()=>{
    if(i>=html.length){finish();return;}
    if(html[i]==='<'){
      const end=html.indexOf('>',i);
      if(end!==-1){out+=html.slice(i,end+1);i=end+1;}
      else{out+=html[i++];}
    }else{
      out+=html[i++];
    }
    txt.innerHTML=out;
  },18);
}

function advanceNpcDialog(){
  const state=G._npcDialogState;
  if(!state)return;
  const txt=document.getElementById('re-text');
  if(state.typing){
    if(G._npcDialogTimer){clearInterval(G._npcDialogTimer);G._npcDialogTimer=null;}
    txt.innerHTML=state.pages[state.index]||'';
    state.typing=false;
    txt.classList.add('ut-done');
    if(state.index>=state.pages.length-1){
      const choices=document.getElementById('re-choices');
      if(choices)choices.innerHTML=state.buttons||'';
    }
    return;
  }
  if(state.index<state.pages.length-1){
    state.index++;
    renderNpcDialogPage();
  }
}

function setNpcDialogEvent(bg,text,buttons){
  const screen=document.getElementById('screen-random-event');
  const reBg=document.getElementById('re-bg');
  const reText=document.getElementById('re-text');
  const reChoices=document.getElementById('re-choices');
  if(G._npcDialogTimer){clearInterval(G._npcDialogTimer);G._npcDialogTimer=null;}
  if(screen)screen.classList.add('npc-dialog');
  if(reBg){reBg.style.backgroundImage=`url('${bg}')`;reBg.innerHTML='';reBg.style.opacity='';reBg.style.transition='';}
  if(reChoices)reChoices.innerHTML='';
  G._npcDialogState={pages:splitNpcDialogPages(text),index:0,buttons:buttons||'',typing:false};
  if(reText)reText.onclick=advanceNpcDialog;
  showScreen('random-event');
  renderNpcDialogPage();
}

function transitionWithFinalFade(color,afterFade,{sceneSelector=null,overlayId='final-scene-transition'}={}){
  const overlay=document.createElement('div');
  overlay.id=overlayId;
  overlay.style.cssText=`position:fixed;inset:0;z-index:9999;background:${color};opacity:0;pointer-events:none;transition:opacity .85s ease-in-out`;
  document.body.appendChild(overlay);
  requestAnimationFrame(()=>{overlay.style.opacity='1';});
  setTimeout(()=>{
    afterFade();
    const scene=sceneSelector?document.querySelector(sceneSelector):null;
    if(scene){
      scene.style.opacity='0';
      scene.style.transition='opacity 1.05s ease-in-out';
      requestAnimationFrame(()=>{scene.style.opacity='1';});
    }
    setTimeout(()=>{overlay.style.opacity='0';},180);
    setTimeout(()=>{overlay.remove();},1300);
  },1120);
}
function transitionToSoulOfCinderBirth(){
  transitionWithFinalFade('#fff',showSoulOfCinderBirth,{sceneSelector:'#re-bg',overlayId:'final-white-transition'});
}

function setSceneNpcLine(screenId,npcId,type='entry',forcedLine){
  const screen=document.getElementById(screenId);
  if(!screen)return;
  let box=screen.querySelector('.scene-npc-dialog');
  if(!box){
    const scene=screen.querySelector('[id$="-scene"]')||screen.firstElementChild;
    if(!scene)return;
    box=document.createElement('div');
    box.className='scene-npc-dialog';
    scene.appendChild(box);
  }
  const line=forcedLine||npcDialogueLine(npcId,type);
  box.innerHTML=line?`<em>"${line}"</em>`:'';
  box.style.display=line?'block':'none';
  box.onclick=()=>{box.style.display='none';};
}

function clearBattleNpcDialog(){
  if(G._battleNpcDialogTimer){clearInterval(G._battleNpcDialogTimer);G._battleNpcDialogTimer=null;}
  const box=document.getElementById('battle-npc-dialog');
  if(box)box.remove();
  G._battleNpcDialogState=null;
}
function finishBattleNpcDialog(){
  clearBattleNpcDialog();
  G._npcIntroActive=false;
  G.busy=false;
  showScreen('battle');
  renderBattle(true);
}
function renderBattleNpcDialog(){
  const state=G._battleNpcDialogState;
  const txt=document.getElementById('battle-npc-dialog-text');
  if(!state||!txt)return;
  if(G._battleNpcDialogTimer){clearInterval(G._battleNpcDialogTimer);G._battleNpcDialogTimer=null;}
  txt.classList.remove('ut-done');
  txt.innerHTML='';
  const html=state.html||'';
  let i=0,out='';
  const finish=()=>{
    if(G._battleNpcDialogTimer){clearInterval(G._battleNpcDialogTimer);G._battleNpcDialogTimer=null;}
    txt.innerHTML=html;
    txt.classList.add('ut-done');
    state.typing=false;
  };
  state.typing=true;
  G._battleNpcDialogTimer=setInterval(()=>{
    if(i>=html.length){finish();return;}
    if(html[i]==='<'){
      const end=html.indexOf('>',i);
      if(end!==-1){out+=html.slice(i,end+1);i=end+1;}
      else out+=html[i++];
    }else out+=html[i++];
    txt.innerHTML=out;
  },18);
}
function advanceBattleNpcDialog(){
  const state=G._battleNpcDialogState;
  const txt=document.getElementById('battle-npc-dialog-text');
  if(!state)return finishBattleNpcDialog();
  if(state.typing){
    if(G._battleNpcDialogTimer){clearInterval(G._battleNpcDialogTimer);G._battleNpcDialogTimer=null;}
    if(txt){txt.innerHTML=state.html||'';txt.classList.add('ut-done');}
    state.typing=false;
    return;
  }
  finishBattleNpcDialog();
}
function showNpcBattleIntro(id){
  const wrap=document.getElementById('game-wrap2')||document.getElementById('battle-arena');
  if(!wrap||!G.enemy)return;
  G.busy=true;
  G._npcIntroActive=true;
  renderBattle(true);
  clearBattleNpcDialog();
  const box=document.createElement('div');
  box.id='battle-npc-dialog';
  box.onclick=advanceBattleNpcDialog;
  box.innerHTML=`
    <div class="battle-npc-dialog-name">${npcName(id)}</div>
    <div class="battle-npc-dialog-text" id="battle-npc-dialog-text"></div>
    <button type="button" class="battle-npc-dialog-start" onclick="event.stopPropagation();finishBattleNpcDialog()">Inizia combattimento</button>
    <div class="battle-npc-dialog-hint">Clicca per continuare</div>`;
  wrap.appendChild(box);
  G._battleNpcDialogState={html:npcDialogueOnlyHtml(id,'aggro'),typing:false};
  renderBattleNpcDialog();
}

function andreForgeFarewell(){
  if(isNpcKilled('andre')){completeEvent();return;}
  showScreen('forge-enter');
  const actions=document.querySelector('#screen-forge-enter > div:last-child');
  if(actions)actions.innerHTML=`<button class="btn gold" onclick="completeEvent()" style="font-size:11px;padding:5px 14px">Prosegui</button>`;
  const andre=document.getElementById('andre-img');
  if(andre){andre.style.pointerEvents='none';andre.style.cursor='default';}
  setTimeout(()=>_applySpritePos('andre-img',ANDRE_POS),0);
  setSceneNpcLine('screen-forge-enter','andre','farewell','Prithee, be careful!');
}

function framptText(body){
  return `<div style="font-size:10px;color:#9ba3ad;letter-spacing:1px;margin-bottom:8px">INCONTRO CON FRAMPT</div>${body}`;
}

function showFramptEncounter(phase){
  phase=phase||'start';
  if(G.npcProgress?.framptIntro&&phase==='start'){completeEvent();return;}
  const img='images/incontro_frampt.png';
  if(phase==='start'){
    setNpcDialogEvent(img,framptText(`Il cancello della Fortezza di Sen si e aperto dopo il rintocco delle campane. Prima ancora delle lame e dei massi, una voce antica emerge dall'ombra.<br><br><em>"Non morto prescelto, finalmente hai risposto al richiamo delle campane."</em><br><br><em>"Il mondo e sospeso su un filo. La Fiamma vacilla, e quando la Fiamma vacilla ogni cosa perde forma."</em><br><br><em>"Tu puoi impedire che il ciclo si spezzi."</em>`),
      `<button class="btn gold" onclick="showFramptEncounter('identity')">Avvicinati</button>
       <button class="btn" onclick="showFramptEncounter('decline')">Resta in silenzio</button>`);
    return;
  }
  if(phase==='identity'){
    setNpcDialogEvent(img,framptText(`La creatura si solleva lentamente, come se stesse aspettando proprio te. Il suo tono e solenne, quasi cerimoniale.<br><br><em>"Io sono Frampt, serpente primordiale e servitore del grande Lord Gwyn."</em><br><br><em>"Gwyn vincolo la Fiamma per salvare il mondo dall'oscurita. Ora la sua opera deve continuare."</em><br><br><em>"Per farlo, servono anime potenti. Anime degne di essere portate al Signore della Cenere."</em><br><br><em>"Tu non devi desiderare il buio. Devi purificarti, raccogliere cio che e forte, e consegnarlo alla Fiamma."</em>`),
      `<button class="btn gold" onclick="showFramptEncounter('accept')">Ascolta il tuo destino</button>
       <button class="btn" onclick="showFramptEncounter('decline')">Rifiuta</button>`);
    return;
  }
  if(phase==='accept'){
    setNpcDialogEvent(img,framptText(`Frampt piega il capo verso di te. Non ti offre conforto: ti consegna una direzione.<br><br><em>"Attraversa questa fortezza e raggiungi Anor Londo. Ottieni il Ricettacolo, poi raccogli le grandi anime dei Lord."</em><br><br><em>"Quando sarai pronto, presentati alla Fornace. Gwyn giudichera il tuo valore."</em><br><br><em>"Non ascoltare l'altro serpente. Kaathe parla di verita, ma conosce solo rovina."</em><br><br><em>"Egli sogna un mondo senza Fiamma: un vuoto immobile, senza calore, senza ordine, senza vita."</em><br><br>Frampt non nomina l'umanita che porti dentro di te. Non ti dice che la Dark Soul e parte della tua natura. Ti indica soltanto la strada verso il suo Lord.`),
      `<button class="btn gold" onclick="completeFramptEncounter()">Prosegui nella Fortezza</button>`);
    return;
  }
  setNpcDialogEvent(img,framptText(`Frampt resta immobile per qualche istante, deluso ma non ostile.<br><br><em>"Diffidare e naturale, piccolo non morto. Ma il ciclo non attendera la tua fede."</em><br><br><em>"Se incontrerai Kaathe, ricordalo: egli non vuole salvare il mondo. Vuole spegnerlo."</em><br><br>La sua voce si ritira nel buio. Anche senza accettare le sue parole, la strada davanti a te resta la stessa: Sen's Fortress.`),
    `<button class="btn" onclick="completeFramptEncounter()">Prosegui</button>`);
}

function completeFramptEncounter(){
  if(!G.npcProgress)G.npcProgress={};
  G.npcProgress.framptIntro=true;
  completeEvent();
}

function kaatheText(body){
  return `<div style="font-size:10px;color:#9ba3ad;letter-spacing:1px;margin-bottom:8px">INCONTRO CON KAATHE</div>${body}`;
}

function showKaatheEncounter(phase){
  phase=phase||'start';
  const img='images/incontro_kaathe.png';
  if(phase==='start'){
    setNpcDialogEvent(img,kaatheText(`L'ombra dei Quattro Re non ti ha lasciato davvero. Alla prima soglia libera, il buio si apre come una bocca e una voce antica ti raggiunge.<br><br><em>"Non morto, tu hai camminato dove Frampt non voleva che guardassi."</em><br><br><em>"Io sono Kaathe, serpente primordiale. E ti diro cio che il servitore di Gwyn ti ha nascosto."</em><br><br><em>"La Fiamma che ti chiede di salvare non e un sole. E una ferita tenuta aperta."</em>`),
      `<button class="btn gold" onclick="showKaatheEncounter('truth')">Ascolta</button>
       <button class="btn" onclick="showKaatheEncounter('decline')">Non fidarti</button>`);
    return;
  }
  if(phase==='truth'){
    setNpcDialogEvent(img,kaatheText(`Kaathe non parla del fuoco come Frampt. Parla dell'uomo, dell'Abisso, e di una verita nascosta sotto la leggenda degli dei.<br><br><em>"Frampt non ti manda alla Fornace per farti regnare. Ti manda come offerta."</em><br><br><em>"Le anime che raccogli saranno portate a Gwyn. Egli ti uccidera, le prendera, e la Fiamma continuera a bruciare ancora un poco."</em><br><br><em>"Ma le anime di oggi non sono le anime dell'inizio. Ogni vincolo e piu debole del precedente."</em><br><br><em>"Il fuoco, per sua natura, tende a spegnersi. Costringerlo a restare vivo rende la realta instabile."</em><br><br><em>"Il mondo diventera una fiamma malata: accesa e spenta nello stesso respiro, capace solo di deformare cio che illumina."</em>`),
      `<button class="btn gold" onclick="showKaatheEncounter('accept')">Accetta la verita</button>
       <button class="btn" onclick="showKaatheEncounter('decline')">Rifiuta</button>`);
    return;
  }
  if(phase==='accept'){
    setNpcDialogEvent(img,kaatheText(`La voce del serpente affonda nella memoria dell'Abisso. Non ti benedice: ti riconosce.<br><br><em>"Esiste un'altra forza. Non nasce dalla Fiamma, ma dalla sua ombra: la Dark Soul."</em><br><br><em>"La Fiamma si consuma col tempo. L'Anima Oscura, invece, cresce. Si divide, si annida negli uomini, e diventa piu profonda a ogni era."</em><br><br><em>"Tu sei non morto. L'umanita che Frampt ti chiede di negare e la tua natura stessa."</em><br><br><em>"Se vuoi creare una realta stabile, devi raccogliere abbastanza Anima Oscura da accendere una nuova Fiamma Oscura."</em><br><br><em>"Ma essa vive negli altri non morti. Per ottenerla tutta, dovrai ucciderli tutti."</em><br><br>Qualunque cosa tu scelga alla fine, ora sai che la Fiamma non e l'unica risposta. Sai anche il prezzo dell'altra.`),
      `<button class="btn gold" onclick="completeKaatheEncounter()">Prosegui</button>`);
    return;
  }
  setNpcDialogEvent(img,kaatheText(`Kaathe si ritrae appena, paziente e terribile.<br><br><em>"Puoi rifiutare le mie parole, non morto. Ma non puoi rifiutare cio che sei."</em><br><br><em>"Frampt ti chiama puro perche vuole che tu dimentichi la tua umanita. Io ti chiedo soltanto di guardarla."</em><br><br>Il buio si richiude. La sua presenza svanisce, ma non la domanda che ha lasciato dietro di se.`),
    `<button class="btn" onclick="completeKaatheEncounter()">Prosegui</button>`);
}

function completeKaatheEncounter(){
  if(!G.npcProgress)G.npcProgress={};
  G.npcProgress.kaatheIntro=true;
  G._kaatheEncounterPending=false;
  completeEvent();
}

// ── CHEST ───────────────────────────────────────────
function showChestChoice(){
  const bg=document.getElementById('re-bg');
  const txt=document.getElementById('re-text');
  const choices=document.getElementById('re-choices');
  if(bg)bg.style.backgroundImage="url('images/cassa.png')";
  if(txt)txt.innerHTML='Hai una chest davanti, cosa speri di trovarci dentro?';
  if(choices)choices.innerHTML=`
    <button class="btn gold" onclick="showChestMoveOffer()">Mosse</button>
    <button class="btn gold" onclick="showItemOffer()">Oggetti</button>
    <button class="btn gold" onclick="showArmory()">Armature</button>`;
  showScreen('random-event');
}

function showChestMoveOffer(){
  const pool=getRewardPool(G.player.id).filter(m=>!G.player.deck.find(pm=>pm.id===m.id));
  const offered=[],used=new Set();let att=0;
  while(offered.length<3&&att<40){
    att++;
    const r=rollRarity();
    const candidates=pool.filter(m=>m.rarity===r&&!used.has(m.id));
    if(!candidates.length)continue;
    const m=choice(candidates);
    offered.push(m);used.add(m.id);
  }
  while(offered.length<3){
    const m=pool.find(m=>!used.has(m.id));
    if(!m)break;
    offered.push(m);used.add(m.id);
  }
  G._chestMoveOffer=offered;
  document.getElementById('reward-title').textContent='Chest: Mosse';
  document.getElementById('reward-title').style.color='#f0c040';
  document.getElementById('reward-sub').textContent='Scegli una mossa da aggiungere al mazzo';
  document.getElementById('reward-content').innerHTML=`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">${
    offered.map((m,i)=>movCard(m,`pickChestMove(${i})`,false)).join('')
  }</div>`;
  showScreen('reward');
}

function pickChestMove(i){
  const move=G._chestMoveOffer?.[i];
  if(move)G.player.deck.push({...move});
  G._chestMoveOffer=null;
  completeEvent();
}

// ── EVENTI CASUALI ─────────────────────────────────────────────────────────────
// Dizionario per piano: ogni evento ha un id univoco e una funzione da chiamare.
// Quando viene pescato viene rimosso dal pool della partita (_usedRandomEvents[floor]).
const RANDOM_EVENT_POOL={
  1:['re_viverna','re_mimic_chest','re_dark_knight','re_solaire'],
  2:['re_mimic_chest','re_dark_knight','re_viverna'],
  3:['re_mimic_chest','re_dark_knight','re_solaire'],
  4:['re_mimic_chest','re_dark_knight'],
  5:['re_mimic_chest','re_dark_knight','re_solaire'],
  6:['re_mimic_chest','re_dark_knight'],
  7:['re_mimic_chest','re_dark_knight'],
};

function startRandomEvent(){
  const floor=G.floor;
  const pool=RANDOM_EVENT_POOL[floor]||[];
  // Lista eventi non ancora usati su questo piano
  const used=G._usedRandomEvents[floor]||[];
  const available=pool.filter(id=>!used.includes(id));
  if(available.length===0){
    // Pool esaurito: rimpiazza con un bottino normale
    showItemOffer();return;
  }
  const evId=choice(available);
  G._usedRandomEvents[floor]=[...used,evId];
  // Avvia la schermata dell'evento
  if(evId==='re_viverna')showEventViverna();
  else if(evId==='re_mimic_chest')showEventMimicChest();
  else if(evId==='re_dark_knight')showEventDarkKnight();
  else if(evId==='re_solaire')showEventSolaire();
}

// ── EVENTO: VIVERNA ─────────────────────────────────────────────────────────────
function showEventViverna(phase,state){
  // phase: 'start'(default), 'mid', 'mid_wait_or_cross'
  phase=phase||'start';
  state=state||{};
  const screen=document.getElementById('screen-random-event');
  const txt=document.getElementById('re-text');
  const choices=document.getElementById('re-choices');

  // Sfondo a schermo intero
  document.getElementById('re-bg').style.backgroundImage="url('images/viverna.png')";

  if(phase==='start'){
    txt.innerHTML="Ti trovi davanti a un lungo ponte avvolto nella nebbia.<br>Un'ombra alata sorvola le travi dall'alto. <b>Cosa vuoi fare?</b>";
    choices.innerHTML=`
      <button class="btn" onclick="showEventViverna('run_cross',{})">Corri e attraversi tutto il ponte</button>
      <button class="btn" onclick="showEventViverna('run_mid',{})">Corri e ti rifugi a metà ponte</button>`;
  } else if(phase==='run_cross'){
    // Danno immediato + oggetto casuale
    const dmg=30;
    G.player.hp=Math.max(1,G.player.hp-dmg);
    renderPlayerHUD();
    txt.innerHTML=`Corri a testa bassa. La viverna ti graffia con la coda mentre passi — <b>-${dmg} HP</b>.<br>Dall'altra parte trovi qualcosa abbandonato sul terreno.`;
    choices.innerHTML=`<button class="btn" onclick="showEventViverna('item_reward',{})" style="border-color:#f0c040;color:#f0c040">Raccogli l'oggetto</button>`;
  } else if(phase==='item_reward'){
    // Mostra la schermata oggetto standard poi chiudi evento
    G._reRandomEvent=true; // flag per tornare a completeEvent dopo
    showItemOfferSingle();
    return;
  } else if(phase==='run_mid'){
    const dmg=10;
    G.player.hp=Math.max(1,G.player.hp-dmg);
    renderPlayerHUD();
    txt.innerHTML=`Ti fermi a metà bridge, nascosto dietro una trave. La viverna ti sfiora — <b>-${dmg} HP</b>.<br>Ora sei bloccato a metà. <b>Cosa fai?</b>`;
    choices.innerHTML=`
      <button class="btn" onclick="showEventViverna('finish_cross',{})">Finisci di attraversare</button>
      <button class="btn" onclick="showEventViverna('wait_fight',{})">Aspetti che passi</button>`;
  } else if(phase==='finish_cross'){
    const heal=30;
    G.player.hp=Math.min(G.player.maxHp,G.player.hp+heal);
    renderPlayerHUD();
    txt.innerHTML=`Aspetti il momento giusto e scatti. Arrivi dall'altra parte senza ulteriori danni — <b>+${heal} HP</b> (riprenditi dal terrore).`;
    choices.innerHTML=`<button class="btn" onclick="completeEvent()">Prosegui →</button>`;
  } else if(phase==='wait_fight'){
    txt.innerHTML=`Aspetti troppo. La viverna ti fiuta e scende. Preparati a combattere!`;
    choices.innerHTML=`<button class="btn" onclick="startEventBattle('viverna')" style="border-color:#ff5f6d;color:#ff5f6d">Combatti!</button>`;
  }
  showScreen('random-event');
}

// ── EVENTO: CASSA MIMIC ────────────────────────────────────────────────────────
// Al momento dell'ingresso nell'evento si decide subito se la cassa è un mimic (50/50).
// La decisione viene salvata in G._mimicChestIsReal così entrambe le scelte
// leggono lo stesso esito e non c'è modo di "barare" rientrando.
function showEventMimicChest(){
  G._mimicChestIsReal = Math.random() < 0.5; // true = vera cassa, false = mimic
  const txt=document.getElementById('re-text');
  const choices=document.getElementById('re-choices');
  document.getElementById('re-bg').style.backgroundImage="url('images/mimicchest.png')";
  txt.innerHTML='Ti trovi davanti ad una cassa. <b>Cosa fai?</b>';
  choices.innerHTML=`
    <button class="btn" onclick="mimicChestOpen()" style="border-color:#f0c040;color:#f0c040">🔓 La apri</button>
    <button class="btn" onclick="mimicChestHit()" style="border-color:#ff8080;color:#ff8080">⚔ Gli tiri un colpo</button>`;
  showScreen('random-event');
}

function mimicChestOpen(){
  if(G._mimicChestIsReal){
    // Vera cassa → oggetto casuale
    showItemOfferSingle();
  } else {
    // È un mimic: 50 HP di danno immediati + combattimento con HP pieni
    const dmg=50;
    G.player.hp=Math.max(1,G.player.hp-dmg);
    const txt=document.getElementById('re-text');
    const choices=document.getElementById('re-choices');
    txt.innerHTML=`La cassa scatta e ti azzanna! <b>-${dmg} HP!</b><br>È un Mimic! Si prepara ad attaccarti!`;
    choices.innerHTML=`<button class="btn" onclick="startMimicBattle(false)" style="border-color:#ff5f6d;color:#ff5f6d">⚔ Combatti!</button>`;
    showScreen('random-event');
  }
}

function mimicChestHit(){
  if(G._mimicChestIsReal){
    // Vera cassa: rompi tutto, nessuna ricompensa
    const txt=document.getElementById('re-text');
    const choices=document.getElementById('re-choices');
    document.getElementById('re-bg').style.backgroundImage="url('images/mimicchest.png')";
    txt.innerHTML='Colpisci la cassa e la sfasci. Il contenuto va in mille pezzi. <b>Non ottieni nulla.</b>';
    choices.innerHTML=`<button class="btn" onclick="completeEvent()">Prosegui →</button>`;
    showScreen('random-event');
  } else {
    // È un mimic: combattimento ma con HP al 50%
    startMimicBattle(true);
  }
}

// Avvia il combattimento col mimic.
// halfHp=true → il mimic parte con metà degli HP (colpo preventivo)
function startMimicBattle(halfHp){
  const base=ENEMIES.find(e=>e.id==='mimic');
  if(!base){completeEvent();return;}
  const enemy=scaleEnemy(base,G.floor);
  if(halfHp){
    enemy.hp=Math.floor(enemy.maxHp*0.5);
    // maxHp rimane invariato: la barra HP mostrerà il mimic già ferito al 50%
  }
  G.enemies=[enemy];
  G.enemy=enemy;
  G._defeatedEnemies=[];G._lastDefeatedEnemy=null;G._battleWon=false;
  G._eventBattle=true;
  G._mimicBattle=true;     // flag: alla vittoria mostrare ricompensa mimic
  G._pendingDropEquip=null;
  G.log=[];_initCombat();G.busy=false;closeMenus();
  showScreen('battle');
  document.getElementById('battle-floor-label').textContent=`⚠ MIMIC — Piano ${G.floor}`;
  addLog(`Il Mimic balza fuori dalla cassa!`,'system');
  if(halfHp)addLog('Il Mimic è già ferito per il tuo colpo!','passive');
  renderBattle();
}

// Mostra la schermata ricompensa mimic dopo la vittoria.
// Pesca un oggetto casuale da MIMIC_REWARDS_POOL (quelli non ancora presi).
function showMimicRewardScreen(){
  // Filtra gli oggetti già ottenuti in questa partita
  const available=MIMIC_REWARDS_POOL.filter(r=>
    !G.player.equipment?.[r.slot] || G.player.equipment[r.slot]?.id !== r.id
  ).filter(r=>
    !(G._mimicRewardsGiven||[]).includes(r.id)
  );

  if(!available.length){
    // Pool esaurita: nessuna ricompensa
    completeEvent();return;
  }
  const reward=choice(available);
  // Segna come dato per non riproporlo
  if(!G._mimicRewardsGiven)G._mimicRewardsGiven=[];
  G._mimicRewardsGiven.push(reward.id);

  const r=RARITY_DATA[reward.rarity||4];
  const bonusStr=Object.entries(reward.bonus||{})
    .map(([k,v])=>`<div style="color:#80ff80;font-size:10px">+${v} ${k.toUpperCase()}</div>`)
    .join('');

  document.getElementById('reward-title').textContent='Mimic Sconfitto!';
  document.getElementById('reward-title').style.color='#f0c040';
  document.getElementById('reward-sub').textContent='Nella cassa trovi qualcosa di prezioso...';
  document.getElementById('reward-content').innerHTML=`
    <div style="display:flex;justify-content:center;margin-bottom:16px">
      <img src="images/mimic.png" style="width:80px;height:80px;object-fit:contain;opacity:.5;filter:grayscale(1)">
    </div>
    <div style="background:#12121e;border:2px solid ${r.color};border-radius:12px;padding:18px;max-width:280px;margin:0 auto;text-align:center;box-shadow:0 0 20px ${r.glow}">
      <div style="font-size:36px;margin-bottom:8px">${reward.icon}</div>
      <div style="font-weight:bold;color:${r.color};font-size:14px;margin-bottom:4px">${reward.name}</div>
      <div style="margin-bottom:8px">${rarityBadge(reward)}</div>
      <div style="font-size:10px;color:#aaa;margin-bottom:6px;text-transform:capitalize">${reward.slot}</div>
      ${reward.def>0?`<div style="font-size:10px;color:#80d080;margin-bottom:4px">DEF +${reward.def}</div>`:''}
      ${bonusStr}
      ${reward.passiveDesc?`<div style="font-size:9px;color:#c0a0ff;margin-top:8px;border-top:1px solid #333;padding-top:8px">${reward.passiveDesc}</div>`:''}
      <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
        <button class="btn" onclick="pickMimicReward('${reward.id}')" style="border-color:${r.color};color:${r.color}">✓ Prendi</button>
        <button class="btn" onclick="skipMimicReward()" style="border-color:#444;color:#666">✕ Lascia</button>
      </div>
    </div>`;
  showScreen('reward');
}

function pickMimicReward(id){
  const reward=MIMIC_REWARDS_POOL.find(r=>r.id===id);
  if(!reward)return;
  if(!G.player.equipment)G.player.equipment={};
  G.player.equipment[reward.slot]={...reward};
  // Applica bonus stat
  Object.entries(reward.bonus||{}).forEach(([k,v])=>{
    if(k==='maxHp'){G.player.maxHp+=v;G.player.hp=Math.min(G.player.hp+v,G.player.maxHp);}
    else G.player[k]=(G.player[k]||0)+v;
  });
  document.getElementById('reward-content').innerHTML=`<p style="text-align:center;color:#f0c040;font-size:13px;margin:20px 0">✓ ${reward.name} equipaggiato!</p>
    <div style="text-align:center;margin-top:10px"><button class="btn" onclick="completeEvent()">Continua →</button></div>`;
}

function skipMimicReward(){
  document.getElementById('reward-content').innerHTML=`<p style="text-align:center;color:#666;font-size:11px;margin:20px 0">Hai lasciato la ricompensa.</p>
    <div style="text-align:center;margin-top:10px"><button class="btn" onclick="completeEvent()">Continua →</button></div>`;
}


// ── EVENTO: CAVALIERE NERO ─────────────────────────────────────────────────────
function showEventDarkKnight(){
  const re_bg=document.getElementById('re-bg');
  const txt=document.getElementById('re-text');
  const choices=document.getElementById('re-choices');
  re_bg.style.backgroundImage="url('images/incontro_cavaliere.png')";
  txt.innerHTML='Vedi davanti a te un cavaliere nero girato di spalle con un oggetto sbrilluccicante ai suoi piedi.';
  choices.innerHTML=`
    <button class="btn" onclick="darkKnightIgnore()" style="border-color:#80c0ff;color:#80c0ff">🚶 Lo ignori e prosegui <span style="color:#80ff80">(+15 Max HP)</span></button>
    <button class="btn" onclick="darkKnightGrab()" style="border-color:#f0c040;color:#f0c040">🤏 Cerchi di prendere l'oggetto</button>`;
  showScreen('random-event');
}

function darkKnightIgnore(){
  // +15 max HP
  G.player.maxHp+=15;
  G.player.hp=Math.min(G.player.hp+15,G.player.maxHp);
  const txt=document.getElementById('re-text');
  const choices=document.getElementById('re-choices');
  txt.innerHTML='Ti sei tenuto alla larga dal cavaliere. Ti senti più robusto. <b>+15 Max HP</b>';
  choices.innerHTML=`<button class="btn" onclick="completeEvent()">Prosegui →</button>`;
  showScreen('random-event');
}

function darkKnightGrab(){
  // 50/50: oggetto casuale oppure combattimento
  if(Math.random()<0.5){
    // Fortuna: oggetto casuale
    const txt=document.getElementById('re-text');
    const choices=document.getElementById('re-choices');
    txt.innerHTML="Con un gesto furtivo riesci ad afferrare l'oggetto prima che il cavaliere si accorga di te.";
    choices.innerHTML=`<button class="btn" onclick="darkKnightShowItem()" style="border-color:#f0c040;color:#f0c040">✓ Raccogli</button>`;
    showScreen('random-event');
  } else {
    // Sfortuna: combattimento col Dark Knight
    const txt=document.getElementById('re-text');
    const choices=document.getElementById('re-choices');
    txt.innerHTML='Il cavaliere si gira di scatto e ti punta la lama in gola!';
    choices.innerHTML=`<button class="btn" onclick="startEventBattle('dark_knight')" style="border-color:#ff5f6d;color:#ff5f6d">⚔ Combatti!</button>`;
    showScreen('random-event');
  }
}

function darkKnightShowItem(){
  // Riusa showItemOfferSingle ma con titolo custom
  showItemOfferSingle('Oggetto del cavaliere nero');
}

// ── EVENTO: INCONTRO CON SOLAIRE ───────────────────────────────────────────────
// Struttura a fasi: 'start' → 'talk' → 'proposition' → 'reward'
function showEventSolaire(phase){
  phase=phase||'start';
  const re_bg=document.getElementById('re-bg');
  const txt=document.getElementById('re-text');
  const choices=document.getElementById('re-choices');

  if(phase==='start'){
    showNpcEvent('solaire','images/evento_solaire_undead_burg.png',`Ti trovi su un balcone che si affaccia sui paesaggi di Lordran. Noti una figura in armatura di maglia con una tunica bianca e verde intenta a guardare verso l'orizzonte.`,`
      <button class="btn" onclick="showEventSolaire('talk')" style="border-color:#f0e040;color:#f0e040">☀ Vai a parlarci</button>
      <button class="btn" onclick="completeEvent()" style="border-color:#444;color:#888">Ignora</button>`);

  } else if(phase==='talk'){
    setNpcDialogEvent('images/evento_solaire_undead_burg_dialogo.png',`<em>"Ah, hello! You don't look Hollow, far from it! I am Solaire of Astora, an adherent of the Lord of Sunlight. Now that I am Undead, I have come to this great land, the birthplace of Lord Gwyn, to seek my very own sun! ...Do you find that strange? Well, you should! No need to hide your reaction. I get that look all the time! Hah hah hah! I have a proposition, if you have a moment."</em>`,`<button class="btn" onclick="showEventSolaire('proposition')" style="border-color:#f0e040;color:#f0e040">☀ Yes</button>${npcFightButton('solaire')}`);
    return;

  } else if(phase==='proposition'){
    setNpcDialogEvent('images/evento_solaire_undead_burg_dialogo.png',`<em>"This pleases me greatly! Well then, take this. We are amidst strange beings, in a strange land. The flow of time itself is convoluted; with heroes centuries old phasing in and out. The very fabric wavers, and relations shift and obscure. There's no telling how much longer your world and mine will remain in contact. But, use this, to summon one another as spirits, cross the gaps between the worlds, and engage in jolly co-operation! Of course, we are not the only ones engaged in this. But I am a warrior of the sun! Spot my summon signature easily by its brilliant aura. If you miss it, you must be blind! Hah hah hah!"</em>`,`<button class="btn" onclick="showEventSolaire('reward')" style="border-color:#f0e040;color:#f0e040">☀ Ricevi la White Sign Soapstone</button>${npcFightButton('solaire')}`);
    return;

  } else if(phase==='reward'){
    addPlayerItem('white_sign_soapstone');
    // Sistema NPC progress: dizionario G.npcProgress, chiave = id npc
    if(!G.npcProgress)G.npcProgress={};
    G.npcProgress.solaire=Math.max(G.npcProgress.solaire||0,1);
    setNpcDialogEvent('images/evento_solaire_undead_burg_dialogo.png',`Hai ricevuto la <b style="color:#f0e040">White Sign Soapstone</b>.<br><br>Solaire sorride verso il sole e torna a scrutare l'orizzonte.`,`<button class="btn" onclick="completeEvent()">Prosegui →</button>`);
    return;
  }

  showScreen('random-event');
}



function showItemOfferSingle(customTitle){
  const pool=shuffle(ITEMS.filter(i=>!i.unique&&!G.player.items?.find(pi=>pi.id===i.id)));
  const item=pool[0];
  if(!item){completeEvent();return;}
  G._itemOffer=[item];
  const r=RARITY_DATA[item.rarity||1];
  document.getElementById('item-offer-grid').innerHTML=`
    <div class="inv-item" onclick="pickItemEvent(0)" style="border-color:${r.color};box-shadow:0 0 6px ${r.glow}">
      <div style="font-size:28px;margin-bottom:6px">${item.icon}</div>
      <div class="iname" style="color:${r.color}">${item.name}</div>
      <div style="margin-bottom:4px">${rarityBadge(item)}</div>
      <div class="idesc">${item.desc}</div>
    </div>
    <div style="text-align:center;margin-top:10px">
      <button class="btn" onclick="completeEvent()" style="font-size:11px;padding:5px 14px;color:#888;border-color:#444">Salta</button>
    </div>`;
  document.querySelector('#screen-item h2').textContent=customTitle||'Bottino dal ponte!';
  showScreen('item');
}
function pickItemEvent(i){const item=G._itemOffer[i];if(!item)return;addPlayerItem(item);completeEvent();}

// Battaglia da evento: inizia un combattimento con un nemico eventOnly
function startEventBattle(enemyId){
  const base=ENEMIES.find(e=>e.id===enemyId);
  if(!base){completeEvent();return;}
  const enemy=scaleEnemy(base,G.floor);
  G.enemies=[enemy];
  G.enemy=enemy;
  resetBattleRuntimeState();
  G._eventBattle=true; // dopo la vittoria showRewardScreen mostrerà dropEquip
  G._mimicBattle=false;
  G._pendingNpcKillId=null;
  G._npcBattleId=null;
  G._pendingDropEquip=base.dropEquip||null;
  G.log=[];_initCombat();G.busy=false;closeMenus();
  showScreen('battle');
  document.getElementById('battle-floor-label').textContent=`⚠ EVENTO — Piano ${G.floor}`;
  addLog(`Appare ${enemy.name}!`,'system');
  renderBattle();
}

// ── SCHERMATA DONO INIZIALE ───────────────────────────────────────────────────
const GIFT_POOL=['gift_binocolo','gift_pendente','gift_masterkey','gift_anello_piccolo','gift_anello_strega'];

function showGiftScreen(){
  // Se il dono è già stato scelto (nodo rivisitato per bug), vai alla mappa
  if(G._giftChosen){completeEvent();return;}
  const offered=shuffle(GIFT_POOL).slice(0,3).map(id=>ITEMS.find(i=>i.id===id));
  G._giftOffer=offered;
  const r=RARITY_DATA[3]; // tutti epici
  const cards=offered.map((it,i)=>{
    const loreHTML=it.lore
      ?`<div style="margin-top:8px;padding:6px 8px;background:#0a0a14;border-left:2px solid #f0c04066;border-radius:0 4px 4px 0">
          <div style="font-size:8px;color:#f0c040;letter-spacing:1px;margin-bottom:3px">LORE</div>
          <div style="font-size:9px;color:#888;line-height:1.5;font-style:italic">${it.lore}</div>
        </div>`
      :'';
    return`<div onclick="pickGift(${i})" style="background:#12121e;border:2px solid ${r.color};border-radius:10px;padding:14px;cursor:pointer;transition:all .2s;box-shadow:0 0 10px ${r.glow}"
      onmouseover="this.style.background='#1a1628';this.style.transform='translateY(-3px)'"
      onmouseout="this.style.background='#12121e';this.style.transform='translateY(0)'">
      <div style="font-size:36px;text-align:center;margin-bottom:10px">${it.icon}</div>
      <div style="font-weight:bold;color:${r.color};font-size:13px;text-align:center;margin-bottom:6px">${it.name}</div>
      <div style="font-size:9px;padding:2px 8px;border-radius:3px;border:1px solid ${r.color};color:${r.color};background:rgba(0,0,0,0.4);display:inline-block;margin-bottom:8px">${r.name}</div>
      <div style="font-size:10px;color:#ccc;line-height:1.5">${it.desc}</div>
      ${loreHTML}
    </div>`;
  }).join('');

  // Usa screen-reward come schermata (già esiste e funziona)
  document.getElementById('reward-title').textContent='Scegli il tuo Dono';
  document.getElementById('reward-title').style.color='#f0c040';
  document.getElementById('reward-sub').textContent="Un dono ti attende all'ingresso del dungeon. Scegline uno solo.";
  document.getElementById('reward-content').innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:10px">${cards}</div>`;
  showScreen('reward');
}

function pickGift(i){
  const item=G._giftOffer[i];
  if(!item)return;
  addPlayerItem(item);
  G._giftChosen=true;
  completeEvent();
}
// ── ARMERIA ───────────────────────────────────────────────────────────────────
// 4 pezzi casuali (tutti slot diversi), gratuiti, con menu di conferma che mostra
// il pezzo attuale vs quello nuovo prima di applicare.
function showArmory() {
  G._armoryOffer = rollEquipOffer();
  G._armoryPending = null; // pezzo in attesa di conferma
  renderArmoryScreen();
  showScreen('armory');
}

function renderArmoryScreen() {
  const offer = G._armoryOffer;
  const slotLabels = {helmet:'Elmo',armor:'Corazza',gloves:'Guanti',legs:'Gambali',boots:'Stivali',weapon:'Arma',offhand:'Off-hand',ring:'Anello'};
  const slotColors = {weapon:'#ff8080',offhand:'#80d0ff',helmet:'#c0a0ff',armor:'#c0a0ff',gloves:'#c0a0ff',legs:'#c0a0ff',boots:'#c0a0ff',ring:'#f0c040'};

  const cards = offer.map((piece, i) => {
    const r = RARITY_DATA[piece.rarity || 1];
    const old = G.player.equipment?.[piece.slot];
    const bonusStr = obj => Object.entries(obj||{}).map(([k,v])=>`${v>0?'+':''}${v} ${k.toUpperCase()}`).filter(s=>!s.startsWith('0')).join(', ') || '—';
    const defStr = d => d > 0 ? `DEF +${d}` : '';
    const sc = slotColors[piece.slot] || '#aaa';
    return `<div style="background:#12121e;border:2px solid ${r.color};border-radius:10px;padding:12px;box-shadow:0 0 10px ${r.glow}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span style="font-size:16px">${piece.icon||'🗡'}</span>
        <span style="font-size:9px;padding:2px 6px;border-radius:3px;background:#1a1a2e;border:1px solid ${sc};color:${sc}">${slotLabels[piece.slot]||piece.slot}</span>
      </div>
      <div style="font-weight:bold;color:#e0e0e0;font-size:12px;margin-bottom:2px">${piece.name}</div>
      <div style="margin-bottom:6px">${rarityBadge(piece)}</div>
      <div style="font-size:10px;color:#80d080;margin-bottom:2px">${defStr(piece.def)||'Nessuna DEF'}</div>
      <div style="font-size:10px;color:#c0a0ff;margin-bottom:8px">${bonusStr(piece.bonus)}</div>
      <div style="font-size:9px;color:#555;border-top:1px solid #222;padding-top:6px;margin-bottom:8px">
        <span style="color:#888">Attuale: </span>
        ${old ? `<span style="color:#aaa">${old.icon||''}${old.name}</span> <span style="color:#80a080">${defStr(old.def)||''}</span> <span style="color:#888a">${bonusStr(old.bonus)}</span>` : '<span style="color:#444">Nessuno</span>'}
      </div>
      <button onclick="armoryConfirm(${i})" class="btn" style="width:100%;font-size:11px;padding:6px;border-color:#80d0ff;color:#80d0ff">
        ${old ? '🔄 Sostituisci' : '+ Equipaggia'}
      </button>
    </div>`;
  }).join('');

  const el = document.getElementById('armory-offer-grid');
  if (el) el.innerHTML = cards;

  // Menu di conferma (visibile solo se c'è un pending)
  const conf = document.getElementById('armory-confirm-box');
  if (conf) conf.style.display = 'none';
}

function armoryConfirm(i) {
  const piece = G._armoryOffer[i];
  const old = G.player.equipment?.[piece.slot];
  G._armoryPending = { piece, idx: i };

  const slotLabels = {helmet:'Elmo',armor:'Corazza',gloves:'Guanti',legs:'Gambali',boots:'Stivali',weapon:'Arma',offhand:'Off-hand',ring:'Anello'};
  const bonusStr = obj => Object.entries(obj||{}).map(([k,v])=>`${v>0?'+':''}${v} ${k.toUpperCase()}`).filter(s=>!s.startsWith('0')).join(', ') || '—';
  const defStr = d => d > 0 ? `DEF +${d}` : '';
  const r = RARITY_DATA[piece.rarity || 1];

  const conf = document.getElementById('armory-confirm-box');
  conf.style.display = 'block';
  conf.innerHTML = `
    <div style="background:#0d0d1a;border:2px solid #80d0ff;border-radius:10px;padding:14px;margin-top:12px">
      <div style="font-size:12px;color:#80d0ff;font-weight:bold;text-align:center;margin-bottom:12px">⚔ Conferma equipaggiamento — ${slotLabels[piece.slot]||piece.slot}</div>
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:14px">
        <!-- VECCHIO -->
        <div style="background:#12121e;border:1px solid #444;border-radius:8px;padding:10px;text-align:center;opacity:${old?1:0.4}">
          <div style="font-size:9px;color:#888;margin-bottom:4px">ATTUALE</div>
          ${old
            ? `<div style="font-size:18px;margin-bottom:4px">${old.icon||'🗡'}</div>
               <div style="font-size:11px;color:#aaa;font-weight:bold;margin-bottom:3px">${old.name}</div>
               <div style="font-size:10px;color:#80d080">${defStr(old.def)||'—'}</div>
               <div style="font-size:10px;color:#c0a0ff">${bonusStr(old.bonus)}</div>`
            : `<div style="font-size:24px;margin:8px 0">—</div><div style="font-size:10px;color:#555">Nessuno</div>`}
        </div>
        <!-- FRECCIA -->
        <div style="font-size:22px;color:#ff8040">→</div>
        <!-- NUOVO -->
        <div style="background:#12121e;border:2px solid ${r.color};border-radius:8px;padding:10px;text-align:center;box-shadow:0 0 8px ${r.glow}">
          <div style="font-size:9px;color:#80d0ff;margin-bottom:4px">NUOVO</div>
          <div style="font-size:18px;margin-bottom:4px">${piece.icon||'🗡'}</div>
          <div style="font-size:11px;color:#e0e0e0;font-weight:bold;margin-bottom:3px">${piece.name}</div>
          <div style="font-size:10px;color:#80d080">${defStr(piece.def)||'—'}</div>
          <div style="font-size:10px;color:#c0a0ff">${bonusStr(piece.bonus)}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <button onclick="armoryApply()" class="btn" style="flex:1;padding:8px;border-color:#40d040;color:#40d040;font-size:11px">✓ Conferma</button>
        <button onclick="armoryCancel()" class="btn" style="flex:1;padding:8px;border-color:#ff6060;color:#ff6060;font-size:11px">✕ Annulla</button>
      </div>
    </div>`;
}

function armoryApply() {
  if (!G._armoryPending) return;
  const { piece, idx } = G._armoryPending;
  applyEquipPiece(G.player, piece);
  // Rimuovi il pezzo preso dall'offerta
  G._armoryOffer.splice(idx, 1);
  G._armoryPending = null;
  // Se non ci sono più pezzi, completa l'evento
  if (G._armoryOffer.length === 0) { completeEvent(); return; }
  renderArmoryScreen();
  // Mostra conferma breve
  const conf = document.getElementById('armory-confirm-box');
  if (conf) { conf.innerHTML = `<div style="text-align:center;color:#40d040;font-size:12px;padding:10px">✓ ${piece.name} equipaggiato!</div>`; conf.style.display='block'; }
  setTimeout(() => { if (document.getElementById('armory-confirm-box')) document.getElementById('armory-confirm-box').style.display='none'; }, 1200);
}

function armoryCancel() {
  G._armoryPending = null;
  const conf = document.getElementById('armory-confirm-box');
  if (conf) conf.style.display = 'none';
}
function showZoneSelect(){
  const opts=getNextZoneOptions();
  if(!opts.length){showVictory();return;}
  const title=document.getElementById('zone-select-title');
  const sub=document.getElementById('zone-select-sub');
  const grid=document.getElementById('zone-choice-grid');
  const msg=document.getElementById('zone-lock-message');
  if(title)title.textContent='Scegli la prossima zona';
  if(sub)sub.textContent=`Zona completata: ${zoneName(G.zone)}`;
  if(msg)msg.textContent='';
  grid.innerHTML=opts.map(id=>{
    const z=ZONES[id],lock=isZoneUnlocked(id),locked=!lock.ok;
    return`<div class="zone-choice${locked?' locked':''}" onclick="chooseZone('${id}')">
      <img class="zone-choice-img" src="${getZoneImagePath(id)}" alt="${z.name}" onerror="this.style.display='none';this.insertAdjacentHTML('afterend','<div class=&quot;zone-choice-img&quot; style=&quot;display:flex;align-items:center;justify-content:center;color:#666;font-size:10px;padding:8px&quot;>${z.name}</div>')">
      <div class="zone-choice-name">${z.name}</div>
      <div class="zone-choice-req">${locked?lock.reason:''}</div>
    </div>`;
  }).join('');
  showScreen('zone-select');
}
function chooseZone(id){
  const lock=isZoneUnlocked(id);
  const msg=document.getElementById('zone-lock-message');
  if(!lock.ok){
    if(msg)msg.textContent=`Impossibile andare a ${zoneName(id)}: ${lock.reason}.`;
    return;
  }
  G.zone=id;
  G.floor=zoneTier();
  G.map=null;
  buildMap();
  G.player.hp=clamp(G.player.hp+Math.round(G.player.maxHp*0.3),0,G.player.maxHp);
  showMap();
}
function completeEvent(){
  G._eventBattle=false;
  G._pendingDropEquip=null;
  G._pendingNpcKillId=null;
  G._npcBattleId=null;
  if(G.map&&G.map.current){
    const node=G.map.nodes[G.map.current];
    if(node&&!G.map.completed.includes(node.id))G.map.completed.push(node.id);
    const next=node?.out||[];
    G.map.available=next.filter(id=>!G.map.completed.includes(id));
    G.map.current=null;
    if(!G.map.available.length){
      if(!hasCompletedZone(G.zone))G.completedZones.push(G.zone);
      const z=ZONES[G.zone];
      if(z?.bossFlag)G.defeatedBosses[z.bossFlag]=true;
      if(z?.final){showVictory();return;}
      showZoneSelect();
      return;
    }
  }
  if(G.map){G.map.travelFrom=null;G.map.travelTo=G.map.playerNode||G.map.start;}
  showMap();
}

// ── MENU ──────────────────────────────────────────────────────────────────────
function _stageTag(u, stat){
  const net=getNetStage(u,stat);
  if(net===0)return'';
  const col=net>0?'#80d080':'#ff8080';
  const arrow=net>0?'▲':'▼';
  return` <span style="color:${col};font-size:9px">${arrow}${Math.abs(net)} ×${stageMult(net).toFixed(1)}</span>`;
}
// ── MENU A TENDA (nuovo sistema con tab) ─────────────────────────────────────
let _ngActive={map:'stats',battle:'stats'};

function _ngStatsHTML(p){
  const coins=G.coins||0;
  const humanity=G.humanity||0;
  return`<div style="margin-bottom:8px">
    <div style="font-size:10px;color:#c0a0ff;margin-bottom:8px">${p.passive||''}</div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:10px">
      <div class="stat-chip"><span class="sc-val" style="color:#40d040">${p.hp}<span style="font-size:9px;color:#666">/${p.maxHp}</span></span><span class="sc-lab">HP</span></div>
      <div class="stat-chip"><span class="sc-val" style="color:#ff8080">${p.strength||10}</span><span class="sc-lab">STR</span></div>
      <div class="stat-chip"><span class="sc-val" style="color:#80d080">${p.vigor||10}</span><span class="sc-lab">VIG</span></div>
      <div class="stat-chip"><span class="sc-val" style="color:#c0a0ff">${p.intelligence||10}</span><span class="sc-lab">INT</span></div>
      <div class="stat-chip"><span class="sc-val" style="color:#f0c040">${p.dexterity||10}</span><span class="sc-lab">DEX</span></div>
      <div class="stat-chip"><span class="sc-val" style="color:#80c0ff">${p.faith||10}</span><span class="sc-lab">FAI</span></div>
      <div class="stat-chip"><span class="sc-val" style="color:#ff80c0">${p.arcane||10}</span><span class="sc-lab">ARC</span></div>
      <div class="stat-chip"><span class="sc-val" style="color:#c0a0ff">${coins}</span><span class="sc-lab">💀 ANIME</span></div>
      <div class="stat-chip"><span class="sc-val" style="color:#f7f7f7">${humanity}</span><span class="sc-lab">H UMANITA</span></div>
    </div>
    <div style="margin-top:4px;font-size:10px;color:#888">
      ATK eff: <b style="color:#e0e0e0">${getAtk(p,true)}</b>${_stageTag(p,'atk')} &nbsp;
      DEF eff: <b style="color:#e0e0e0">${getDef(p)}</b> <span style="font-size:9px;color:#555">(equip: ${getEquipDef(p)})</span>${_stageTag(p,'def')} &nbsp;
      MAG eff: <b style="color:#e0e0e0">${getMag(p,true)}</b>${_stageTag(p,'mag')}
    </div>
    <div style="margin-top:6px">${staminaBar(p.stamina||0,p.maxStamina||0)}</div>
  </div>`;
}

function _ngMovesHTML(p){
  const deck=p.deck||p.moves||[];
  if(!deck.length)return`<div style="color:#555;font-size:11px;text-align:center;padding:14px">Nessuna mossa nel mazzo.</div>`;
  return deck.map(m=>{
    const r=RARITY_DATA[m.rarity||1];
    const shivLabel=m._isShiv?`<span style="font-size:8px;color:#ffcc00;font-weight:bold;margin-left:3px">[LANCIO]</span>`:'';
    const costStr=m._isShiv?`<span style="color:#ffcc00;font-size:9px">Gratis ✦</span>`:costPips(m.cost||1);
    return`<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:#12121e;border-radius:6px;border-left:3px solid ${m._isShiv?'#ffcc00':r.color};margin-bottom:5px">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px">
          <b style="font-size:11px;color:#e0e0e0">${m.name}</b>
          <span class="mtype type-${m.type}">${m.type.toUpperCase()}</span>
          ${rarityBadge(m)}${shivLabel}
        </div>
        <div style="font-size:9px;color:#777">${m.desc||''}</div>
        ${moveFormulaHTML(m,p)}
      </div>
      <div style="font-size:10px;color:#60d060;white-space:nowrap">${costStr}</div>
    </div>`;
  }).join('');
}

function _ngItemsHTML(p){
  syncQuestInventory();
  const items=p.items||[];
  if(!items.length)return`<div style="color:#555;font-size:11px;text-align:center;padding:14px">Nessun oggetto posseduto.</div>`;
  return`<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${items.map(it=>{
    const r=RARITY_DATA[it.rarity||1];
    return`<div style="background:#12121e;border:1px solid ${r.color};border-radius:8px;padding:8px;text-align:center">
      <div style="font-size:24px;margin-bottom:3px">${it.icon||'📦'}</div>
      <div style="font-size:10px;font-weight:bold;color:${r.color};margin-bottom:3px">${it.name}</div>
      <div style="font-size:9px;color:#777">${it.desc||''}</div>
    </div>`;
  }).join('')}</div>`;
}

function _fillMenuSprite(spriteId){
  const el=document.getElementById(spriteId);
  if(!el||!G.player)return;
  const src=SPRITES[G.player.id];
  el.innerHTML=src
    ?`<img src="${src}" style="width:58px;height:76px;object-fit:contain;filter:drop-shadow(0 4px 16px ${G.player.color}66)">`
    :`<div style="font-size:48px">🧙</div>`;
}

function _ngEquipHTML(p){
  if(!p.equipment)return'<div style="color:#555;font-size:11px;text-align:center;padding:14px">Nessun equipaggiamento.</div>';
  const slotLabels={helmet:'Elmo',armor:'Corazza',gloves:'Guanti',legs:'Gambali',boots:'Stivali',weapon:'Arma',offhand:'Off-hand',ring:'Anello'};
  const totalDef=getEquipDef(p);
  const setBonus=getActiveSetBonus(p);
  return`<div style="font-size:10px;color:#888;margin-bottom:6px">DEF totale: <b style="color:#e0e0e0">${totalDef}</b>${setBonus?` &nbsp;✦ <span style="color:#f0c040">${setBonus.desc}</span>`:''}</div>
    ${EQUIPMENT_SLOTS.map(slot=>{
      const piece=p.equipment[slot];
      if(!piece)return`<div style="padding:4px 6px;background:#0d0d1a;border-radius:4px;margin-bottom:4px;font-size:10px;color:#444">${slotLabels[slot]}: —</div>`;
      const bonusStr=Object.entries(piece.bonus||{}).map(([k,v])=>`+${v} ${k.toUpperCase()}`).join(', ');
      return`<div style="padding:5px 8px;background:#12121e;border-radius:4px;margin-bottom:4px;border-left:2px solid #555">
        <div style="display:flex;justify-content:space-between;font-size:10px">
          <span style="color:#e0e0e0">${piece.name}</span>
          <span style="color:#80a080">${piece.def>0?`DEF +${piece.def}`:''}</span>
        </div>
        ${bonusStr?`<div style="font-size:9px;color:#c0a0ff">${bonusStr}</div>`:''}
        ${piece.passiveDesc?`<div style="font-size:9px;color:#888">${piece.passiveDesc}</div>`:''}
      </div>`;
    }).join('')}`;
}

function ngSwitch(ctx,tab){
  _ngActive[ctx]=tab;
  const p=G.player;
  ['stats','moves','items','equip'].forEach(t=>{
    const el=document.getElementById(`ng-tab-${ctx}-${t}`);
    if(el)el.className='ng-tab'+(t===tab?' active':'');
  });
  const panel=document.getElementById(`ng-panel-${ctx}`);
  if(!panel||!p)return;
  if(tab==='stats') panel.innerHTML=_ngStatsHTML(p);
  else if(tab==='moves') panel.innerHTML=_ngMovesHTML(p);
  else if(tab==='equip') panel.innerHTML=_ngEquipHTML(p);
  else panel.innerHTML=_ngItemsHTML(p);
}

function toggleMenu(id){
  const m=document.getElementById(id);
  const wasOpen=m.classList.contains('open');
  closeMenus();
  if(!wasOpen){
    m.classList.add('open');
    const ctx=id==='menu-overlay'?'map':'battle';
    _fillMenuSprite(`ng-sprite-${ctx}`);
    ngSwitch(ctx,_ngActive[ctx]||'stats');
  }
}
function closeMenus(){document.querySelectorAll('.menu-overlay').forEach(m=>m.classList.remove('open'));}

function showPileMenu(pile){
  const p=G.player;if(!p)return;
  const titles={deck:'📚 Mazzo',discard:'♻ Scarti',exhaust:'💀 Esaurite'};
  const cards=pile==='deck'?p.deck:pile==='discard'?p.discard:p.exhaust;
  document.getElementById('pile-menu-title').textContent=`${titles[pile]} (${(cards||[]).length} carte)`;
  document.getElementById('pile-menu-cards').innerHTML=(cards||[]).length===0
    ?'<div style="color:#555;font-size:11px;grid-column:1/-1;text-align:center;padding:20px">Nessuna carta</div>'
    :(cards||[]).map(m=>{
      const r=RARITY_DATA[m.rarity||1];
      const exhaustTag=m.exhaust?'<span style="font-size:8px;color:#ff6060;margin-left:3px">[Esaurimento]</span>':'';
      const shivTag=m._isShiv?'<span style="font-size:8px;color:#ffcc00;margin-left:3px;font-weight:bold">[LANCIO]</span>':'';
      return`<div style="background:#12121e;border:1px solid ${m._isShiv?'#ffcc00':r.color};border-radius:8px;padding:8px;box-shadow:0 0 5px ${r.glow}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
          <span style="font-size:11px;font-weight:bold;color:#e0e0e0">${m.name}${exhaustTag}${shivTag}</span>
          <span class="mtype type-${m.type}">${m.type.toUpperCase()}</span>
        </div>
        <div style="display:flex;gap:4px;align-items:center;margin-bottom:3px">${rarityBadge(m)}<span style="font-size:9px;color:#60d060">${m._isShiv?'Gratis ✦':costPips(m.cost||1)}</span></div>
        <div style="font-size:9px;color:#888">${m.desc||''}</div>
      </div>`;
    }).join('');
  document.getElementById('pile-menu-overlay').style.display='flex';
}
function closePileMenu(){document.getElementById('pile-menu-overlay').style.display='none';}


// ── BATTLE ────────────────────────────────────────────────────────────────────
// Prepara lo stato all'inizio di ogni combattimento: azzera buff/debuff/status,
// rimischia tutto il deck (escluse le exhaust), pesca la mano iniziale.
function _initCombat(){
  const p=G.player;
  p.buffs={atk:[],def:[],mag:[]};p.debuffs={atk:[],def:[],mag:[]};p.statusEffects={};
  if((p._artoriasBlessingCombats||0)>0){
    p.statusEffects.artorias_blessing=1;
    p._artoriasBlessingCombats--;
  }
  // Stamina riparte al massimo
  p.stamina=p.maxStamina;
  // Flag di battaglia
  G._movesThisTurn=0;G._isFirstMoveThisTurn=false;G._lastCrit=false;
  G._staminaSpentThisTurn=0;G._enemyUsedHeavy=false;G._timeParadoxUsed=false;
  G._firstAttackDone=false;G._staffDiscountUsed=false;
  G._shivsUsedThisCombat=0; // contatore Coltelli da lancio usati (reset ogni combattimento)
  // Rimischia tutto in un deck fresco (deck + scarti + mano rimasta), exhaust rimane escluso.
  p.deck=shuffle([...(p.deck||[]),...(p.discard||[]),...(p.moves||[])].filter(m=>!m._isShiv));
  p.discard=[];
  p.moves=[];
  // Pesca mano iniziale
  drawCards(p);
  // ── Passiva Simbolo dell'Avarizia: -10 HP a inizio combattimento
  if(p.equipment?.helmet?.id==='mimic_simbolo_avarizia'){
    const dmg=10;
    p.hp=Math.max(1,p.hp-dmg);
    addLog(`Simbolo dell'Avarizia: -${dmg} HP!`,'system');
  }
}
function allZoneTemplates(){
  return [
    ...Object.values(ZONE_NORMALS).flat(),
    ...Object.values(ZONE_ELITES).flat(),
    ...Object.values(ZONE_BOSSES).flat(),
    ...Object.values(FINAL_BOSS_TEMPLATES),
    ...Object.values(SPECIAL_ENEMIES),
    ...ENEMIES,
    ...BOSSES.flat(),
    ...ELITES_POOL.flat()
  ];
}
function getEnemyTemplate(id){
  return allZoneTemplates().find(e=>e.id===id)||enemyTpl(id,id);
}
function buildEncounter(base){
  if(base._group){
    return base._group.map(id=>scaleEnemy(getEnemyTemplate(id),zoneTier()));
  }
  if(base._spawnWith){
    const leader=scaleEnemy(base,zoneTier());
    leader.isLeaderGroup=true;
    const minions=base._spawnWith.map(id=>scaleEnemy(getEnemyTemplate(id),zoneTier()));
    if(minions.length>=2)return [minions[0],leader,minions[1]];
    return [leader,...minions];
  }
  if(base._multiCountRange){
    const [lo,hi]=base._multiCountRange;
    const n=rand(lo,hi);
    return Array.from({length:n},(_,i)=>scaleEnemy({...base,id:`${base.id}_${i+1}`,name:n>1?`${base.name} ${i+1}`:base.name},zoneTier()));
  }
  return [scaleEnemy(base,zoneTier())];
}
function chaosSealsAlive(){
  return G.enemies?.some(e=>(e.id==='sigillo_sinistro'||e.id==='sigillo_destro')&&e.hp>0);
}
function canTargetEnemy(e){
  if(!e||e.hp<=0)return false;
  if(e._lockedUntilSeals&&chaosSealsAlive())return false;
  return true;
}
function rollEnemyCount(){const r=Math.random()*100;if(r<50)return 1;if(r<80)return 2;return 3;}
function rememberDefeatedEnemy(e){
  if(!e||e._removedFromBattle)return;
  e._removedFromBattle=true;
  if(!Array.isArray(G._defeatedEnemies))G._defeatedEnemies=[];
  G._defeatedEnemies.push(e);
  if(e.isBoss||e.isElite||!G._lastDefeatedEnemy)G._lastDefeatedEnemy=e;
}
function cleanupDeadEnemies(){
  if(!Array.isArray(G.enemies)||!G.enemies.length)return false;
  const dead=G.enemies.filter(e=>e.hp<=0);
  if(!dead.length)return false;
  dead.forEach(rememberDefeatedEnemy);
  G.enemies=G.enemies.filter(e=>e.hp>0);
  G._battleWon=G._fourKingsActive?(G._fourKingsHp||0)<=0:G.enemies.length===0;
  if(G.enemies.length)G.enemy=G.enemies.find(e=>e.isLeaderGroup||e.isBoss||e.isElite)||G.enemies[0];
  return true;
}
function allEnemiesDead(){return G._battleWon||G.enemies.every(e=>e.hp<=0);}
function aliveEnemies(){return G.enemies.filter(e=>e.hp>0);}

function startBattle(isBoss){
  const pool=getZoneEnemyPool();
  if(isBoss){
    const bossBase=choice(getZoneBossPool());
    const boss=scaleEnemy(bossBase,zoneTier());
    // Demone Capra: spawna con 2 cani non morti (layout leader-group)
    if(bossBase.id==='demonecapra'){
      const dogBase=ENEMIES.find(e=>e.id==='undeaddog');
      boss.isLeaderGroup=true;
      const minion1=scaleEnemy(dogBase,zoneTier());
      const minion2=scaleEnemy(dogBase,zoneTier());
      // ordine: [gregario_sx, leader_centro, gregario_dx] per il renderer
      G.enemies=[minion1,boss,minion2];
    } else {
      G.enemies=buildEncounter(bossBase);
    }
  } else {
    const n=rollEnemyCount();
    const first=choice(pool);
    if(first?._spawnWith){
      G.enemies=buildEncounter(first);
    } else {
      G.enemies=[];
      for(let i=0;i<n;i++) G.enemies.push(...buildEncounter(choice(pool)));
    }
  }
  G.enemy=G.enemies.find(e=>e.isLeaderGroup||e.isBoss)||G.enemies[0];
  G._defeatedEnemies=[];G._lastDefeatedEnemy=null;G._battleWon=false;
  if(isBoss&&G.zone==='kiln'){
    G._finalBattleRoute=currentRoute();
    G._finalBattleLordSouls=lordSoulFragmentCount();
    G._gwynFinalPhaseTriggered=false;
    G._gwynPacifistPhase2=false;
    G._gwynReinforcementsActive=false;
    G._soulOfCinderBattle=false;
    G._loadedArenaPath=null;
    G._genocideGaelBattle=false;
    G._genocideManusBattle=false;
    if(G._finalBattleRoute==='genocide'){
      G.enemies=[];G.enemy=null;G.log=[];
      closeMenus();
      stopFinalBattleMusic();
      showGenocideGaelIntro('distance');
      return;
    }
  } else if(isBoss){
    G._finalBattleRoute=null;
    G._finalBattleLordSouls=0;
    G._gwynFinalPhaseTriggered=false;
    G._gwynPacifistPhase2=false;
    G._gwynReinforcementsActive=false;
    G._soulOfCinderBattle=false;
    G._genocideGaelBattle=false;
    G._genocideManusBattle=false;
  }
  G.log=[];_initCombat();G.busy=false;closeMenus();
  showScreen('battle');
  document.getElementById('battle-floor-label').textContent=(isBoss?'⚠ BOSS — ':'')+zoneName(G.zone);
  addLog(G.enemies.length===1?`Appare ${G.enemy.name}!`:`Appaiono ${G.enemies.map(e=>e.name).join(', ')}!`,'system');
  if(isBoss&&isFinalGwynMusicBattle())playFinalBattleMusic('hopes');
  else stopFinalBattleMusic();
  renderBattle();
}
function startElite(){
  const base=choice(getZoneElitePool());
  const elite=scaleEnemy(base,zoneTier());elite.isElite=true;
  // Channeler: spawna con 2 non morti normali (layout leader-group)
  if(base.id==='channeler'){
    const undeadBase=ENEMIES.find(e=>e.id==='undead');
    elite.isLeaderGroup=true;
    const minion1=scaleEnemy(undeadBase,zoneTier());
    const minion2=scaleEnemy(undeadBase,zoneTier());
    // ordine: [gregario_sx, leader_centro, gregario_dx]
    G.enemies=[minion1,elite,minion2];
  } else {
    G.enemies=buildEncounter(base);
    G.enemies.forEach(e=>{e.isElite=true;});
  }
  G.enemy=G.enemies.find(e=>e.isLeaderGroup||e.isElite)||G.enemies[0];
  G._defeatedEnemies=[];G._lastDefeatedEnemy=null;G._battleWon=false;
  G.log=[];_initCombat();G.busy=false;closeMenus();
  showScreen('battle');document.getElementById('battle-floor-label').textContent=`⚠ ELITE — ${zoneName(G.zone)}`;
  addLog(G.enemies.length===1?`Appare ${G.enemy.name}!`:`Appaiono ${G.enemies.map(e=>e.name).join(', ')}!`,'system');renderBattle();
}
const addLog=(msg,type='')=>{G.log.push({msg,type});const box=document.getElementById('log-box');if(box){box.innerHTML=G.log.slice(-25).map(l=>`<div class="log-line ${l.type}">${l.msg}</div>`).join('');box.scrollTop=box.scrollHeight;}};

// Costruisce la stringa HTML dei badge di stato (veleno, buff stage, ecc.)
// da mostrare negli HUD di battaglia. Chiamato una sola volta per HUD e cachato.
function buildBadges(u){
  let b='';
  const SE=u.statusEffects;
  const tb=(key,label,color,bg)=>{if(SE?.[key]>0)b+=`<span class="sbadge" style="background:${bg};color:${color}">${label}${SE[key]}</span>`;};
  if(SE?.poison)b+=`<span class="sbadge" style="background:#2a0a2a;color:#d080d0">☠${SE.poison}</span>`;
  if(SE?.burn>0)b+=`<span class="sbadge" style="background:#3a1500;color:#ff8040">🔥${SE.burn}</span>`;
  if(SE?.freeze>0)b+=`<span class="sbadge" style="background:#0a1a3a;color:#80c0ff">❄${SE.freeze}</span>`;
  if(SE?.bleed>0)b+=`<span class="sbadge" style="background:#2a0a0a;color:#ff4060">🩸${Math.round(SE.bleed)}</span>`;
  if(SE?.plague>0)b+=`<span class="sbadge" style="background:#1a0a2a;color:#a040ff">☣${Math.round(SE.plague)}</span>`;
  if(SE?.regen)b+=`<span class="sbadge" style="background:#103a10;color:#80d080">↑reg${SE.regen}</span>`;
  if(SE?.crit_boost)b+=`<span class="sbadge" style="background:#1a2a3a;color:#80c0ff">⚡${SE.crit_boost}</span>`;
  if(SE?.holy_mantle)b+=`<span class="sbadge" style="background:#2a2a10;color:#f0c040">🧥</span>`;
  if(SE?.spectral)b+=`<span class="sbadge" style="background:#1a1a3a;color:#c0c0ff">👻${SE.spectral}</span>`;
  if(SE?.primal)b+=`<span class="sbadge" style="background:#3a1a00;color:#ff8040">🔥${SE.primal}</span>`;
  if(SE?.dmgbuff)b+=`<span class="sbadge" style="background:#2a1a00;color:#f0c040">+dmg${SE.dmgbuff}</span>`;
  if(SE?.infernal_contract)b+=`<span class="sbadge" style="background:#3a1500;color:#ff8040">Contratto ${SE.infernal_contract}</span>`;
  tb('magic_weapon','Arma+','#9adbd1','#102a2a');
  tb('great_magic_weapon','Arma++','#9adbd1','#102a2a');
  tb('crystal_magic_weapon','Cristallo+','#c0a0ff','#1d1530');
  tb('sunlight_blade','Sole+','#f0c040','#2a2208');
  tb('darkmoon_blade','Luna+','#d8b5ff','#201730');
  tb('deep_protection','Protezione ','#80d080','#102a18');
  tb('karmic_justice','Karma ','#f0c040','#2a2208');
  tb('fire_guard','Antifuoco ','#ffb080','#301608');
  if(SE?.tears_denial)b+=`<span class="sbadge" style="background:#202840;color:#d6ddf2">Lacrime</span>`;
  if(SE?.night_veil_ready)b+=`<span class="sbadge" style="background:#171728;color:#c0c0ff">Primo crit</span>`;
  if(SE?.berserker_bonus)b+=`<span class="sbadge" style="background:#301608;color:#ffb080">Berserk</span>`;
  if(SE?.vengeance_bonus)b+=`<span class="sbadge" style="background:#2a0a0a;color:#ff8080">Vendetta</span>`;
  if(SE?.meditate)b+=`<span class="sbadge" style="background:#1a2530;color:#9adbd1">Medita</span>`;
  if(SE?.cost_minus1)b+=`<span class="sbadge" style="background:#102a1a;color:#80d080">Costo-1</span>`;
  if(SE?.double_next_stamina)b+=`<span class="sbadge" style="background:#102a1a;color:#80d080">Regen x2</span>`;
  tb('cosmic_resonance','Cosmica ','#c0a0ff','#171028');
  // Buff/debuff a stage — mostra stage netto per ogni stat
  ['atk','def','mag'].forEach(stat=>{
    const net=getNetStage(u,stat);
    const minTurns=n=>{if(!n||!n.length)return 0;return Math.min(...n.map(x=>x.turns));};
    if(net>0){
      const t=minTurns(u.buffs[stat]);
      const label={atk:'ATK',def:'DEF',mag:'MAG'}[stat];
      b+=`<span class="sbadge" style="background:#1a2a1a;color:#80d080">▲${label}+${net}(${t}t) ×${stageMult(net).toFixed(1)}</span>`;
    } else if(net<0){
      const t=minTurns(u.debuffs[stat]);
      const label={atk:'ATK',def:'DEF',mag:'MAG'}[stat];
      b+=`<span class="sbadge" style="background:#2a1a1a;color:#ff8080">▼${label}${net}(${t}t) ×${stageMult(net).toFixed(2)}</span>`;
    }
  });
  return b;
}

function buildAccumulationBars(u){
  let html='';
  if((u.statusEffects?.bleed||0)>0){
    const pct=Math.min(100,u.statusEffects.bleed);
    html+=`<div style="margin-bottom:2px"><div style="display:flex;justify-content:space-between;font-size:8px;color:#ff4060;margin-bottom:1px"><span>🩸 Sanguinamento</span><span>${Math.round(pct)}/100</span></div><div style="height:4px;background:#2a0a0a;border-radius:2px;overflow:hidden"><div style="width:${pct}%;height:100%;background:#ff4060;border-radius:2px;transition:width .3s"></div></div></div>`;
  }
  if((u.statusEffects?.plague||0)>0){
    const pct=Math.min(100,u.statusEffects.plague);
    html+=`<div style="margin-bottom:2px"><div style="display:flex;justify-content:space-between;font-size:8px;color:#a040ff;margin-bottom:1px"><span>☣ Morbo Mortale</span><span>${Math.round(pct)}/100</span></div><div style="height:4px;background:#1a0a2a;border-radius:2px;overflow:hidden"><div style="width:${pct}%;height:100%;background:#a040ff;border-radius:2px;transition:width .3s"></div></div></div>`;
  }
  return html;
}

// ── ENEMY HUD / SPRITES ──────────────────────────────────────────────────────
const EMAP_EMOJI={balderknight:'🗡',undead:'💀',undeaddog:'🐕',undeadspear:'⚔',undeadaxe:'🪓',orc:'👹',witch:'🧙',troll:'🧌',golem:'🗿',vampire:'🧛',hydra:'🐍',lich:'💀',armoredboar:'🐗',cavalierenero:'🗡',golemdiamante:'💎',stregonescarlatto:'🔥',channeler:'🔮',demonetoro:'🐂',demonecapra:'🐐'};

function buildEnemyMiniHUD(e){
  const dead=e.hp<=0;
  return`<div style="font-size:9px;font-weight:bold;color:${e.color||'#e0e0e0'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.name}${e.isBoss?' 👑':e.isElite?' ⚠':''}</div>
    <div style="font-size:8px;color:#888;margin:1px 0">${dead?'💀 Sconfitto':e.hp+'/'+e.maxHp+' HP'}</div>
    ${dead?'':hpBarHTML(e,{labelClass:'sr-only',transition:'.4s'})}
    ${unitBadgesHTML(e,{center:true})}`;
}

const BOSS_BAR_COLORS={
  fantoccio_boss:'#ff5f6d',
  gargoyle:'#bfc6ff',
  demonetoro:'#d75227',
  demonecapra:'#a66a35',
  hydra:'#48c07a',
  lich:'#c080ff',
  drago_famelico:'#8aa36f',
  quelag:'#ff5a36',
  farfalla_luna:'#c79cff',
  hydra_darkroot:'#42c37c',
  sif:'#b9c9e8',
  golem_ferro:'#c5aa68',
  ornstein:'#ffd15a',
  smough:'#d8b07a',
  nito:'#9b8cff',
  culla_caos:'#ff7a22',
  sigillo_sinistro:'#ff8a3d',
  sigillo_destro:'#ff8a3d',
  seath:'#a7e7ff',
  four_kings:'#7d68ff',
  gwyn:'#ff8a32',
  gwyndolin_finale:'#d8b5ff',
  re_senza_nome:'#d8c56a',
  anima_tizzoni:'#ffb35c',
  gael_finale:'#b84a4a',
  manus_finale:'#8b5cff'
};

function bossBarKey(e){
  const id=e?.id||'';
  if(e?._fourKings||e?._fourKing||id==='four_kings'||id.startsWith('four_king'))return 'four_kings';
  return id;
}

function bossBarColor(e){
  return BOSS_BAR_COLORS[bossBarKey(e)]||e?.color||'#f0c040';
}

function bossHpEntries(){
  if(G._fourKingsActive){
    return [{
      name:'I 4 Re',
      hp:Math.max(0,Math.round(G._fourKingsHp||0)),
      max:Math.max(1,Math.round(G._fourKingsMaxHp||1)),
      color:bossBarColor({_fourKings:true})
    }];
  }
  return (G.enemies||[])
    .filter(e=>e?.isBoss&&e.hp>0&&!e._absorbedByPartner)
    .map(e=>({
      name:e.name,
      hp:Math.max(0,Math.round(e.hp||0)),
      max:Math.max(1,Math.round(e.maxHp||1)),
      color:bossBarColor(e)
    }));
}

function renderBossTopBar(){
  const panel=document.getElementById('boss-hp-panel');
  if(!panel)return;
  const entries=bossHpEntries();
  if(!entries.length){
    panel.classList.remove('active');
    panel.innerHTML='';
    return;
  }
  panel.classList.add('active');
  panel.innerHTML=entries.map(b=>{
    const pct=Math.max(0,Math.min(100,Math.round((b.hp/b.max)*100)));
    return `<div class="boss-hp-row" style="--boss-color:${b.color}">
      <div class="boss-hp-head">
        <span class="boss-hp-name" style="color:${b.color}">${b.name}</span>
        <span class="boss-hp-value">${b.hp}/${b.max}</span>
      </div>
      <div class="boss-hp-track"><div class="boss-hp-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

function needsTarget(move){
  if(move.aoe) return false;
  if(move.type==='buff'||move.type==='crit') return false;
  if(move.type==='heal'&&!move.power) return false;
  if(move.type==='heal'&&move.power&&!move.effect) return false;
  return true;
}

function moveHasDamage(move){
  return classifyMove(move).doesDamage;
}

function playerMoveCost(move,{consume=false}={}){
  let cost=move.cost||0;
  const staff=G.player?.equipment?.weapon?.id;
  if((staff==='sorcerer_staff'||staff==='logan_crystal_catalyst')&&!G._staffDiscountUsed&&move.type==='mag'){
    cost=Math.max(0,cost-1);
    if(consume)G._staffDiscountUsed=true;
  }
  return cost;
}

function preparedPlayerMove(move){
  if(!move)return null;
  const out={...move};
  if(G.player?.id==='rogue'&&!G._firstAttackDone&&(move.type==='atk'||move.type==='mag'))out._forceCrit=true;
  return out;
}

function consumeFirstAttackFlag(move){
  if(G.player?.id==='rogue'&&!G._firstAttackDone&&(move.type==='atk'||move.type==='mag')){
    G._firstAttackDone=true;
  }
}

function moveFormulaHTML(move,p=G.player){
  if(!move||move._curse)return '';
  if(move._isShiv)return `<span class="mformula">Danno: ${20+(p?._shivBonusDmg||0)} fisso</span>`;
  if(move.effect==='shiv_1_strike')return `<span class="mformula">Danno: 25% DEX + 25% STR</span>`;
  if(move._flat||move.effect==='flat_200')return `<span class="mformula">Danno: ${move._flat||200} fisso</span>`;
  if(move.effect==='ruin_strike')return `<span class="mformula">Danno: 40% HP max nemico</span>`;
  if(move.effect==='dmg_15x_hand')return `<span class="mformula">Danno: 15 x carte in mano</span>`;
  if(move.effect==='dmg_5x_deck')return `<span class="mformula">Danno: 5 x carte nel mazzo</span>`;
  if(move.effect==='dmg_25x_discard')return `<span class="mformula">Danno: 25 x scarti</span>`;
  if(move.effect==='shield_slam')return `<span class="mformula">Danno: 150% DEF</span>`;
  if(move.effect==='lance_shield')return `<span class="mformula">Danno: 50% STR + 50% DEF</span>`;
  if(move.effect==='drain_heal'){
    const statLabels={strength:'STR',dexterity:'DEX',intelligence:'INT',faith:'FAI',arcane:'ARC'};
    return `<span class="mformula">Danno: ${Math.round((move.power||0.5)*100)}% ${statLabels[moveScalingStat(move,p,true)]||'INT'}</span>`;
  }
  if(move.power){
    const statLabels={strength:'STR',dexterity:'DEX',intelligence:'INT',faith:'FAI',arcane:'ARC'};
    const stat=statLabels[moveScalingStat(move,p,true)]||(move.type==='mag'?(p?.id==='paladin'?'FAI':'INT'):(p?.id==='rogue'?'DEX':'STR'));
    const hits=move.hits&&move.hits>1?` x${move.hits}`:'';
    return `<span class="mformula">Danno: ${Math.round(move.power*100)}% ${stat}${hits}</span>`;
  }
  return '';
}

function enemySpriteStyle(e,baseStyle=''){
  const flip=['protettore_cavaliere','protettore_ladro','protettore_mago'].includes(e.id);
  return `${baseStyle}${flip?'scale:-1 1;':''}`;
}
function enemySpriteSlot(e,fallback){
  if(e?.id==='gael_finale')return GAEL_SLOT;
  if(e?.id==='manus_finale')return MANUS_SLOT;
  if(e?._soulOfCinder)return SOUL_CINDER_SLOT;
  if(G._gwynReinforcementsActive){
    if(e?.id==='re_senza_nome')return GWYN_TRIO_SLOT_NAMELESS;
    if(e?.id==='gwyn')return GWYN_TRIO_SLOT_GWYN;
    if(e?.id==='gwyndolin_finale')return GWYN_TRIO_SLOT_GWYNDOLIN;
  }
  if(e?._gwynPacifistEmpowered)return GWYN_PHASE2_SLOT;
  if(e?._osPhase2Giant)return ORNSTEIN_SMOUGH_PHASE2_SLOT;
  if(G.zone==='anor_londo'&&(e.id==='ornstein'||e.id==='smough')){
    return e.id==='ornstein'?ORNSTEIN_SMOUGH_SLOT_ORNSTEIN:ORNSTEIN_SMOUGH_SLOT_SMOUGH;
  }
  if(G.zone==='anor_londo'&&!e.isBoss&&!e.isElite&&fallback===NORMAL_POS){
    return ANOR_LONDO_MULTI_SLOT_2;
  }
  return SPRITE_OVERRIDES[e.id]||fallback;
}

function renderEnemySprites(){
  const n=G.enemies.length;
  const targeting=!!G._pendingMove;
  const esb=document.getElementById('enemy-sprite-box');
  const ehb=document.getElementById('enemy-hud-box');

  if(n===1){
    // Stesso approccio del multi: contenitore full-arena, slot absolute
    esb.style.cssText='position:absolute;inset:0;z-index:2;pointer-events:none';
    const e=G.enemies[0];
    const pos=enemySpriteSlot(e,e.isBoss?BOSS_POS:e.isElite?ELITE_POS:NORMAL_POS);
    const canTarget=targeting&&canTargetEnemy(e);
    esb.innerHTML=`<div id="enemy-slot-0" class="enemy-target" data-enemy-idx="0"
      style="position:absolute;top:${pos.top};right:${pos.right};display:flex;flex-direction:column;align-items:center;pointer-events:auto;cursor:${canTarget?'crosshair':'default'}"
      ${canTarget?'onclick="selectTarget(0)"':''}>
      <div style="position:relative">
        ${e.sprite
          ?spriteImageHTML('spr-enemy-0',e.sprite,'spr-idle-enemy',pos,enemySpriteStyle(e,'filter:drop-shadow(0 4px 12px rgba(0,0,0,.8))'))
          :`<div id="spr-enemy-0" class="spr-idle-enemy" style="font-size:${e.isBoss?'120':'90'}px;line-height:1;width:${pos.width};text-align:center">${EMAP_EMOJI[e.id]||'👾'}</div>`
        }
        <div class="target-damage-preview"></div>
        ${canTarget?`<div class="target-ring" style="position:absolute;inset:-4px;pointer-events:none"></div>`:''}
      </div>
    </div>`;
    if(e.isBoss){
      ehb.style.display='none';
      ehb.innerHTML='';
    } else {
      ehb.style.display='';
      ehb.innerHTML=battleHUDHTML(e,{showAccumulation:true,showStats:true});
    }
    normalizeRenderedSprites();
  } else {
    esb.style.cssText='position:absolute;inset:0;z-index:2;pointer-events:none';
    ehb.style.display='none';

    // ── LEADER GROUP: leader al centro (indice 1), gregari ai lati ──────────
    const hasLeader=G.enemies.some(e=>e.isLeaderGroup);
    if(hasLeader){
      // enemies = [gregario_sx(0), leader(1), gregario_dx(2)]
      // Lo slot dipende dal FLAG, non dall'indice — il leader prende sempre LG_SLOT_CENTER
      let minionCount=0;
      esb.innerHTML=G.enemies.map((e,i)=>{
        const dead=e.hp<=0;
        const canTarget=targeting&&canTargetEnemy(e);
        const isLeader=e.isLeaderGroup;
        let sl;
        if(isLeader){ sl=LG_SLOT_CENTER; }
        else { sl=minionCount===0?LG_SLOT_LEFT:LG_SLOT_RIGHT; minionCount++; }
        const borderColor=isLeader?(e.isBoss?'#f0c040':e.isElite?'#8060ff':'#888'):'#555';
        return`<div id="enemy-slot-${i}" class="enemy-target" data-enemy-idx="${i}"
          style="position:absolute;top:${sl.top};right:${sl.right};display:flex;flex-direction:column;align-items:center;pointer-events:auto;cursor:${canTarget?'crosshair':'default'}"
          ${canTarget?`onclick="selectTarget(${i})"`:''}>
          <div style="position:relative">
            ${e.sprite
              ?spriteImageHTML(`spr-enemy-${i}`,e.sprite,'spr-idle-enemy',sl,enemySpriteStyle(e,`${dead?'opacity:0.2;filter:grayscale(1);':`filter:drop-shadow(0 0 14px ${borderColor}88);`}`))
              :`<div id="spr-enemy-${i}" class="spr-idle-enemy" style="font-size:${isLeader?'72':'48'}px;line-height:${sl.height};${dead?'opacity:0.2':''}">${EMAP_EMOJI[e.id]||'👾'}</div>`
            }
            <div class="target-damage-preview"></div>
            ${canTarget?`<div class="target-ring" style="position:absolute;inset:-6px;pointer-events:none"></div>`:''}
          </div>
          ${e.isBoss?'':`<div id="enemy-mini-hud-${i}" style="background:rgba(10,10,20,0.93);border:1px solid ${borderColor};border-radius:6px;padding:4px 7px;margin-top:3px;text-align:center;width:${sl.width}">
            ${buildEnemyMiniHUD(e)}
          </div>`}
        </div>`;
      }).join('');

    // ── MULTI NORMALE ────────────────────────────────────────────────────────
    } else {
      const SLOTS=G.zone==='anor_londo'
        ?[ANOR_LONDO_MULTI_SLOT_1,ANOR_LONDO_MULTI_SLOT_2,ANOR_LONDO_MULTI_SLOT_3]
        :[MULTI_ENEMY_SLOT_1,MULTI_ENEMY_SLOT_2,MULTI_ENEMY_SLOT_3];
      esb.innerHTML=G.enemies.map((e,i)=>{
        if(e._absorbedByPartner)return '';
        const dead=e.hp<=0;
        const canTarget=targeting&&canTargetEnemy(e);
        const sl=enemySpriteSlot(e,SLOTS[i]||SLOTS[2]);
        return`<div id="enemy-slot-${i}" class="enemy-target" data-enemy-idx="${i}"
          style="position:absolute;top:${sl.top};right:${sl.right};display:flex;flex-direction:column;align-items:center;pointer-events:auto;cursor:${canTarget?'crosshair':'default'}"
          ${canTarget?`onclick="selectTarget(${i})"`:''}>
          <div style="position:relative">
            ${e.sprite
              ?spriteImageHTML(`spr-enemy-${i}`,e.sprite,'spr-idle-enemy',sl,enemySpriteStyle(e,`filter:drop-shadow(0 4px 12px rgba(0,0,0,.8));${dead?'opacity:0.2;filter:grayscale(1);':''}`))
              :`<div id="spr-enemy-${i}" class="spr-idle-enemy" style="font-size:52px;line-height:${sl.height};${dead?'opacity:0.2':''}">${EMAP_EMOJI[e.id]||'👾'}</div>`
            }
            <div class="target-damage-preview"></div>
            ${canTarget?`<div class="target-ring" style="position:absolute;inset:-6px;pointer-events:none"></div>`:''}
          </div>
          ${e.isBoss?'':`<div id="enemy-mini-hud-${i}" style="background:rgba(10,10,20,0.93);border:1px solid ${e.color||'#555'};border-radius:6px;padding:4px 7px;margin-top:3px;text-align:center;width:${sl.width}">
            ${buildEnemyMiniHUD(e)}
          </div>`}
        </div>`;
      }).join('');
    }
    normalizeRenderedSprites();
  }
}

function updateEnemyHUDs(){
  const n=G.enemies.length;
  if(n===1){
    const e=G.enemies[0];
    const hb=document.getElementById('enemy-hud-box');
    if(hb){
      if(e.isBoss){
        hb.style.display='none';
        hb.innerHTML='';
      } else {
        hb.style.display='';
        hb.innerHTML=battleHUDHTML(e,{showAccumulation:true,showStats:true});
      }
    }
  } else {
    G.enemies.forEach((e,i)=>{
      const el=document.getElementById(`enemy-mini-hud-${i}`);
      if(el)el.innerHTML=buildEnemyMiniHUD(e);
    });
  }
}

function renderBattle(skip){
  const p=G.player;
  setBattleArenaBackground();
  document.getElementById('player-hud-box').innerHTML=battleHUDHTML(p,{showAccumulation:true,showStamina:true});
  // Sprite e HUD nemici
  if(!skip){
    renderEnemySprites();
    document.getElementById('player-sprite-box').innerHTML=SPRITES[p.id]
      ?spriteImageHTML('spr-player',SPRITES[p.id],'spr-idle-player',PLAYER_POS,`position:relative;top:${PLAYER_POS.top};left:${PLAYER_POS.left};filter:drop-shadow(0 4px 12px rgba(0,0,0,.8))`):'';}
  else{updateEnemyHUDs();}
  normalizeRenderedSprites();
  renderBossTopBar();
  // Contatori pile
  const _deckEl=document.getElementById('pile-deck-count');
  const _discardEl=document.getElementById('pile-discard-count');
  const _exhaustEl=document.getElementById('pile-exhaust-count');
  if(_deckEl)_deckEl.textContent=(p.deck||[]).length;
  if(_discardEl)_discardEl.textContent=(p.discard||[]).length;
  if(_exhaustEl)_exhaustEl.textContent=(p.exhaust||[]).length;
  // Griglia mosse
  const targeting=!!G._pendingMove;
  let mgHTML=`<div style="grid-column:1/-1;font-size:10px;color:#888;text-align:center;margin-bottom:2px">`;
  if(targeting){
    mgHTML+=`🎯 <span style="color:#f0c040;font-weight:bold">Clicca un nemico per colpirlo!</span></div>`;
    mgHTML+=p.moves.map((m,i)=>{
      const sel=G._pendingMoveIdx===i;
      return`<button class="mbtn" disabled style="${rarityBorder(m)};opacity:${sel?1:0.25};${sel?'border-color:#f0c040;box-shadow:0 0 12px #f0c04066':''}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
          <span class="mname">${m.name}</span><span class="mtype type-${m.type}">${m.type.toUpperCase()}</span>
        </div>
        <div class="mdesc">${m.desc||''}</div>
      </button>`;
    }).join('');
    mgHTML+=`<button class="btn" onclick="cancelTargeting()" style="grid-column:1/-1;font-size:11px;padding:6px;margin-top:2px;border-color:#ff6060;color:#ff6060">✕ Annulla</button>`;
  } else {
    mgHTML+=`🃏 Mano: ${p.moves.length} carte</div>`;
    mgHTML+=p.moves.map((m,i)=>{
      const cost=m.cost||0,canUse=!G.busy&&p.stamina>=cost&&!m._disabled&&!m._curse;
      const aoeTag=m.aoe?`<span style="font-size:8px;color:#c0a0ff;margin-left:3px">[AOE]</span>`:'';
      const exhaustTag=m.exhaust?`<span style="font-size:8px;color:#ff6060;margin-left:3px">[Esaurimento]</span>`:'';
      const shivTag=m._isShiv?`<span style="font-size:8px;color:#ffcc00;margin-left:3px;font-weight:bold">[LANCIO]</span>`:'';
      const curseTag=m._curse?`<span style="font-size:8px;color:#ff6060;margin-left:3px;font-weight:bold">[MALEDIZIONE]</span>`:'';
      const shivStyle=m._isShiv?'border-color:#ffcc00;box-shadow:0 0 8px rgba(255,204,0,0.35);':m._curse?'border-color:#ff6060;box-shadow:0 0 8px rgba(255,96,96,0.25);':'';
      const costLabel=m._isShiv?`<span style="font-size:9px;color:#ffcc00;font-weight:bold">Gratis ✦</span>`:costPips(cost||1);
      const shownCostLabel=m._curse?`<span style="font-size:9px;color:#ff6060;font-weight:bold">Inutilizzabile</span>`:costLabel;
      const dragAttr=canUse&&needsTarget(m)?`onpointerdown="startMoveDrag(event,${i})"`:'';
      return`<button class="mbtn" ${dragAttr} onclick="if(!G._suppressCardClick)playerTurn(${i});G._suppressCardClick=false" ${canUse?'':'disabled'} style="${rarityBorder(m)};${shivStyle};${!canUse&&!G.busy?'opacity:0.4':''}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
          <span class="mname">${m.name}${aoeTag}${exhaustTag}${shivTag}${curseTag}</span><span class="mtype type-${m.type}">${m.type.toUpperCase()}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px">
          ${rarityBadge(m)}<span>${shownCostLabel}</span>
        </div>
        <div class="mdesc">${m.desc||''}</div>
        ${moveFormulaHTML(m,p)}
      </button>`;
    }).join('');
    mgHTML+=`<button class="btn" onclick="endPlayerTurn()" ${G.busy?'disabled':''} style="grid-column:1/-1;font-size:11px;padding:6px;margin-top:2px;border-color:#555;color:#888">Fine Turno ↩</button>`;
  }
  document.getElementById('move-grid').innerHTML=mgHTML;
}

// ── ANIMAZIONI ────────────────────────────────────────────────────────────────
function classifyMove(move){
  const t=move.type,eff=move.effect||'';
  const isHeal=t==='heal';
  const isSelfBuff=(t==='buff'||t==='crit')||(t==='heal'&&!move.power&&(eff.startsWith('buff_')||['regen','crit_boost','vow_of_iron','self_cost_20_dmgbuff','spectral_form','primal_fury','infernal_contract','gain_energy_1','next_cost_minus1','meditate_buff','double_next_energy','hp_to_energy','overdrive','cosmic_resonance','time_paradox'].includes(eff)));
  const isPureDebuff=t==='debuff'&&!move.power;
  const doesDamage=!isHeal&&!isSelfBuff&&!isPureDebuff&&(move._isShiv||move._flat||move.power>0||['flat_200','self_cost_15','self_cost_10','shield_slam','lance_shield','drain_heal','ruin_strike','sfogo_totale','chaos_storm','bestial_charge','primordial_impulse','price_of_power','furia_eterna','shiv_1_strike','dmg_15x_hand','dmg_5x_deck','dmg_25x_discard','mag_draw_discard'].includes(eff));
  const debuffAfterDmg=doesDamage&&['poison','debuff_atk','debuff_def','debuff_both','debuff_all','curse','poison_def_down'].includes(eff);
  return{isSelfBuff,isPureDebuff,doesDamage,debuffAfterDmg};
}
function applyAnim(sprId,cls,dur,cb){
  const el=document.getElementById(sprId);if(!el){cb?.();return;}
  const idle=sprId==='spr-player'?'spr-idle-player':'spr-idle-enemy';
  el.classList.remove(idle,'spr-atk-player','spr-atk-enemy','spr-hit','spr-buff','spr-debuff','spr-cast');
  void el.offsetWidth;el.classList.add(cls);
  setTimeout(()=>{el.classList.remove(cls);el.classList.add(idle);cb?.();},dur);
}
function spawnDmg(sprId,val,crit,heal){
  if(!val)return;const el=document.getElementById(sprId),ar=document.getElementById('battle-arena');if(!el||!ar)return;
  const br=el.getBoundingClientRect(),a=ar.getBoundingClientRect(),n=document.createElement('div');
  n.className='dmg-number'+(crit?' is-crit':heal?' is-heal':'');n.textContent=(heal?'+':'')+val;
  n.style.left=(br.left-a.left+br.width*0.3)+'px';n.style.top=(br.top-a.top+br.height*0.15)+'px';
  ar.appendChild(n);setTimeout(()=>n.remove(),1150);
}
function moveAnimStyle(move,attacker){
  if(move.animStyle)return move.animStyle;
  const eff=move.effect||'';
  if(move._isShiv)return 'slash-dex';
  if(move.type==='heal')return 'holy';
  if(move.type==='buff'||move.type==='crit')return 'aura';
  if(move.type==='debuff'||['poison','curse','debuff_atk','debuff_def','debuff_both','debuff_all','poison_def_down'].includes(eff))return 'hex';
  if(['burn','primal_fury','infernal_contract','chaos_storm','furia_eterna'].includes(eff))return 'fire';
  if(['freeze','spectral_form','cosmic_resonance','time_paradox'].includes(eff))return 'arcane';
  if(move.type==='mag')return attacker?.id==='paladin'?'holy':'arcane';
  if(attacker?.id==='rogue')return 'slash-dex';
  return 'slash-str';
}
function spritePoint(sprId,side){
  const el=document.getElementById(sprId),ar=document.getElementById('battle-arena');
  if(!el||!ar)return null;
  const br=el.getBoundingClientRect(),a=ar.getBoundingClientRect();
  return {x:br.left-a.left+br.width*(side==='right'?0.72:0.35),y:br.top-a.top+br.height*0.42};
}
function spawnMoveFX(sprAtk,sprDef,move,attacker){
  const ar=document.getElementById('battle-arena');
  const from=spritePoint(sprAtk,sprAtk==='spr-player'?'right':'left');
  const to=spritePoint(sprDef,sprAtk==='spr-player'?'left':'right');
  if(!ar||!from||!to)return;
  const style=moveAnimStyle(move,attacker);
  const fx=document.createElement('div');
  fx.className=`move-fx fx-${style}`;
  fx.style.setProperty('--sx',`${from.x}px`);
  fx.style.setProperty('--sy',`${from.y}px`);
  fx.style.setProperty('--tx',`${to.x}px`);
  fx.style.setProperty('--ty',`${to.y}px`);
  ar.appendChild(fx);
  setTimeout(()=>fx.remove(),760);
}
function animOneTurn({sprAtk,sprDef,move,attacker,defender,ip,cb}){
  const{isSelfBuff,isPureDebuff,doesDamage,debuffAfterDmg}=classifyMove(move);
  const atkCls=sprAtk==='spr-player'?'spr-atk-player':'spr-atk-enemy';
  const exec=()=>{const hpB=defender.hp,hpA=attacker.hp;executeMove(attacker,move,defender,ip);return{dmg:Math.max(0,hpB-defender.hp),heal:Math.max(0,attacker.hp-hpA)};};
  if(isSelfBuff){exec();applyAnim(sprAtk,'spr-buff',700,()=>{renderBattle(true);cb?.();});return;}
  if(isPureDebuff){exec();applyAnim(sprDef,'spr-debuff',700,()=>{renderBattle(true);cb?.();});return;}
  const castCls=move.type==='mag'||move.type==='heal'||move.type==='buff'||move.type==='debuff'||move.type==='crit'?'spr-cast':atkCls;
  applyAnim(sprAtk,castCls,420,()=>{
    if(doesDamage)spawnMoveFX(sprAtk,sprDef,move,attacker);
    const{dmg,heal}=exec();
    if(heal>0)spawnDmg(sprAtk,heal,false,true);
    if(dmg>0){spawnDmg(sprDef,dmg,G._lastCrit,false);G._lastCrit=false;
      applyAnim(sprDef,'spr-hit',560,()=>{renderBattle(true);if(debuffAfterDmg)setTimeout(()=>applyAnim(sprDef,'spr-debuff',700,cb),120);else cb?.();});
    } else{renderBattle(true);cb?.();}
  });
}

function clearMoveDragUI(){
  document.getElementById('move-drag-arrow')?.remove();
  document.querySelectorAll('.enemy-target.drag-hover').forEach(el=>el.classList.remove('drag-hover'));
  document.querySelectorAll('.target-damage-preview').forEach(el=>{el.textContent='';el.style.display='none';});
}

function updateMoveDragArrow(state,x,y){
  let arrow=document.getElementById('move-drag-arrow');
  if(!arrow){
    arrow=document.createElement('div');
    arrow.id='move-drag-arrow';
    arrow.innerHTML='<div class="move-drag-line"></div><div class="move-drag-head"></div>';
    document.body.appendChild(arrow);
  }
  const dx=x-state.startX,dy=y-state.startY;
  const len=Math.max(10,Math.hypot(dx,dy));
  const ang=Math.atan2(dy,dx)*180/Math.PI;
  arrow.style.left=state.startX+'px';
  arrow.style.top=state.startY+'px';
  arrow.style.width=len+'px';
  arrow.style.transform=`rotate(${ang}deg)`;
}

function dragTargetAt(x,y,state){
  document.querySelectorAll('.enemy-target.drag-hover').forEach(el=>el.classList.remove('drag-hover'));
  document.querySelectorAll('.target-damage-preview').forEach(el=>{el.textContent='';el.style.display='none';});
  const targets=[...document.querySelectorAll('.enemy-target')];
  const el=targets.find(t=>{
    const r=t.getBoundingClientRect();
    return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom;
  });
  if(!el)return null;
  const idx=Number(el.dataset.enemyIdx);
  const enemy=G.enemies?.[idx];
  if(!canTargetEnemy(enemy))return null;
  const dmg=previewMoveDamage(state.move,enemy,G.player,true);
  el.classList.add('drag-hover');
  const box=el.querySelector('.target-damage-preview');
  if(box&&dmg!=null){box.textContent=dmg;box.style.display='block';}
  return {idx,enemy,dmg};
}

function startMoveDrag(ev,idx){
  if(G.busy||G._pendingMove)return;
  const base=G.player.moves[idx];if(!base||base._curse)return;
  const cost=playerMoveCost(base);
  if(!base._isShiv&&G.player.stamina<cost){addLog(`Stamina insufficiente! (serve ${cost})⚡`,'system');return;}
  const move=preparedPlayerMove(base);
  if(!needsTarget(move))return;
  ev.preventDefault();
  // Rilascia il pointer capture automatico del browser: senza questo, tutti gli
  // eventi pointermove/pointerup rimangono "catturati" dal bottone e dragTargetAt
  // non riesce a trovare il nemico sotto il cursore al momento del rilascio.
  const btn=ev.currentTarget;
  if(btn.releasePointerCapture&&ev.pointerId!=null){
    try{btn.releasePointerCapture(ev.pointerId);}catch(_){}
  }
  G._suppressCardClick=true;
  const r=btn.getBoundingClientRect();
  const state={idx,move,startX:r.left+r.width/2,startY:r.top+r.height/2,target:null};
  G._dragMove=state;
  // Salviamo il riferimento al bottone nella closure: ev.currentTarget è null
  // all'interno di onUp perché quel listener è su window, non sul bottone.
  btn.classList.add('is-dragging-card');
  const onMove=e=>{
    updateMoveDragArrow(state,e.clientX,e.clientY);
    state.target=dragTargetAt(e.clientX,e.clientY,state);
  };
  const onUp=e=>{
    window.removeEventListener('pointermove',onMove);
    window.removeEventListener('pointerup',onUp);
    btn.classList.remove('is-dragging-card');
    const target=dragTargetAt(e.clientX,e.clientY,state);
    clearMoveDragUI();
    G._dragMove=null;
    setTimeout(()=>{G._suppressCardClick=false;},0);
    if(target)playDraggedMove(state.idx,target.idx,state.move,target.dmg);
  };
  window.addEventListener('pointermove',onMove);
  window.addEventListener('pointerup',onUp);
  onMove(ev);
}

function discardUsedCard(card){
  if(!card)return;
  if(card._isShiv)G._shivsUsedThisCombat=(G._shivsUsedThisCombat||0)+1;
  else if(card.exhaust)G.player.exhaust.push({...card});
  else G.player.discard.push({...card});
}

function spendMoveCostAndCounters(move,cost){
  G.player.stamina-=cost;
  G._staminaSpentThisTurn=(G._staminaSpentThisTurn||0)+cost;
  G._isFirstMoveThisTurn=(G._movesThisTurn||0)===0;
  G._movesThisTurn=(G._movesThisTurn||0)+1;
  consumeFirstAttackFlag(move);
}

function playDraggedMove(idx,enemyIdx,preparedMove,forcedDamage){
  const original=G.player.moves[idx];
  if(!original||G.busy)return;
  const enemy=G.enemies[enemyIdx];
  if(!canTargetEnemy(enemy))return;
  const cost=playerMoveCost(original);
  if(!original._isShiv&&G.player.stamina<cost)return;
  playerMoveCost(original,{consume:true});
  const used=G.player.moves.splice(idx,1)[0];
  const move={...preparedMove,_forcedDamageTotal:forcedDamage};
  discardUsedCard(used);
  G.busy=true;
  spendMoveCostAndCounters(move,cost);
  renderBattle(true);
  animOneTurn({sprAtk:'spr-player',sprDef:`spr-enemy-${enemyIdx}`,move,attacker:G.player,defender:enemy,ip:true,cb:()=>{
    renderBattle(true);
    if(maybeTriggerGwynPacifistPhase2())return;
    const removed=cleanupDeadEnemies();
    renderBattle(!removed);
    if(allEnemiesDead()){setTimeout(endBattle,500);return;}
    G.busy=false;renderBattle(!removed);
  }});
}

// ── TURNO GIOCATORE ───────────────────────────────────────────────────────────
// Gestisce il click su una mossa in mano: verifica stamina, applica sconti
// (bastone da stregone), gestisce AoE, self-buff e modalità targeting.
function playerTurn(idx){
  if(G.busy||G._pendingMove)return;
  const original=G.player.moves[idx];if(!original)return;
  if(original._curse){addLog(`${original.name}: non puoi usare questa maledizione.`,'system');return;}
  const cost=playerMoveCost(original);
  if(!original._isShiv&&G.player.stamina<cost){addLog(`Stamina insufficiente! (serve ${cost})⚡`,'system');return;}
  let move=preparedPlayerMove(original);
  if(needsTarget(move)){addLog('Trascina la carta su un nemico per usarla.','system');return;}
  // Rimuovi la carta dalla mano e mandala in discard o exhaust
  // I Coltelli da lancio spariscono senza andare da nessuna parte
  const _usedCard=G.player.moves.splice(idx,1)[0];
  const _discardCard=()=>discardUsedCard(_usedCard);
  // AoE: esegui subito su tutti i nemici
  if(move.aoe){
    _discardCard();
    playerMoveCost(original,{consume:true});
    spendMoveCostAndCounters(move,cost);
    executeAoEMove(move);return;
  }
  // Buff/heal self: esegui senza target
  if(!needsTarget(move)){
    _discardCard();
    G.busy=true;
    playerMoveCost(original,{consume:true});
    spendMoveCostAndCounters(move,cost);
    renderBattle(true);
    const targetEnemy=aliveEnemies()[0]||G.enemies[0];
    animOneTurn({sprAtk:'spr-player',sprDef:'spr-enemy-0',move,attacker:G.player,defender:targetEnemy,ip:true,cb:()=>{
      renderBattle(true);
      if(maybeTriggerGwynPacifistPhase2())return;
      const removed=cleanupDeadEnemies();
      renderBattle(!removed);
      if(allEnemiesDead()){setTimeout(endBattle,500);return;}
      G.busy=false;renderBattle(!removed);
    }});
    return;
  }
  addLog('Trascina la carta su un nemico per usarla.','system');
}

function selectTarget(enemyIdx){
  if(!G._pendingMove)return;
  const e=G.enemies[enemyIdx];
  if(!canTargetEnemy(e)){addLog('La Culla del Caos è protetta dai sigilli!','system');return;}
  const move=G._pendingMove;
  const cost=G._pendingCost;
  G._pendingMove=null;G._pendingMoveIdx=-1;G._pendingCost=0;
  renderEnemySprites(); // rimuove subito gli anelli dorati di targeting
  G.busy=true;
  G.player.stamina-=cost;
  G._staminaSpentThisTurn=(G._staminaSpentThisTurn||0)+cost;
  G._isFirstMoveThisTurn=(G._movesThisTurn||0)===0;
  G._movesThisTurn=(G._movesThisTurn||0)+1;
  renderBattle(true);
  animOneTurn({sprAtk:'spr-player',sprDef:`spr-enemy-${enemyIdx}`,move,attacker:G.player,defender:e,ip:true,cb:()=>{
    renderBattle(true);
    if(maybeTriggerGwynPacifistPhase2())return;
    const removed=cleanupDeadEnemies();
    renderBattle(!removed);
    if(allEnemiesDead()){setTimeout(endBattle,500);return;}
    G.busy=false;renderBattle(!removed);
  }});
}

function cancelTargeting(){
  G._pendingMove=null;G._pendingMoveIdx=-1;G._pendingCost=0;
  renderBattle(false);
}

function executeAoEMove(move){
  G.busy=true;
  renderBattle(true);
  const alive=G.enemies.map((_,i)=>i).filter(i=>canTargetEnemy(G.enemies[i]));
  addLog(`${G.player.name} usa ${move.name} su tutti i nemici!`,'player');
  applyAnim('spr-player','spr-atk-player',450,()=>{
    alive.forEach(i=>{
      const e=G.enemies[i];
      const hpB=e.hp;
      spawnMoveFX('spr-player',`spr-enemy-${i}`,move,G.player);
      executeMove(G.player,{...move,_skipLog:true},e,true);
      const dmg=Math.max(0,hpB-e.hp);
      if(dmg>0){spawnDmg(`spr-enemy-${i}`,dmg,G._lastCrit,false);G._lastCrit=false;applyAnim(`spr-enemy-${i}`,'spr-hit',560,()=>{});}
    });
    setTimeout(()=>{
      renderBattle(true);
      if(maybeTriggerGwynPacifistPhase2())return;
      const removed=cleanupDeadEnemies();
      renderBattle(!removed);
      if(allEnemiesDead()){setTimeout(endBattle,400);return;}
      G.busy=false;renderBattle(!removed);
    },650);
  });
}

function endPlayerTurn(){if(G.busy)return;G.busy=true;addLog('Fine turno.','system');setTimeout(doEnemyTurn,400);}

function doEnemyTurn(){
  G.enemies.forEach(e=>{
    if(e.hp<=0)return;
    if(e.statusEffects.freeze>0){e.stamina=Math.floor(e.maxStamina/2);e.statusEffects.freeze--;addLog(`${e.name} è congelato!`,'system');}
    else{e.stamina=e.maxStamina;}
  });
  renderBattle(true);
  doNextEnemyAction(0);
}
function doNextEnemyAction(idx){
  while(idx<G.enemies.length&&G.enemies[idx].hp<=0)idx++;
  if(idx>=G.enemies.length){finishTurn();return;}
  doEnemyAction(idx);
}
function doEnemyAction(enemyIdx){
  const e=G.enemies[enemyIdx];
  const move=enemyAI(e);
  if(!move||e.stamina<=0){doNextEnemyAction(enemyIdx+1);return;}
  const cost=move.cost||1;
  if(cost>=3)G._enemyUsedHeavy=true;
  e.stamina-=cost;renderBattle(true);
  const hpBefore=G.player.hp;
  animOneTurn({sprAtk:`spr-enemy-${enemyIdx}`,sprDef:'spr-player',move,attacker:e,defender:G.player,ip:false,cb:()=>{
    if(G.player.equipment?.offhand?.id==='sacred_shield'&&G.player.hp<hpBefore&&Math.random()<0.10){
      G.player.hp=hpBefore;addLog('Scudo Sacro: colpo bloccato!','passive');
    }
    const removed=cleanupDeadEnemies();
    renderBattle(!removed);
    if(G.player.hp<=0){setTimeout(showGameOver,500);return;}
    if(maybeTriggerGwynPacifistPhase2())return;
    if(allEnemiesDead()){setTimeout(endBattle,400);return;}
    setTimeout(()=>doNextEnemyAction(enemyIdx+1),350);
  }});
}

// Fine turno: applica tick a tutti, rigenera stamina con formula dinamica
// (base + bonus percentuale basato su stamina rimasta × vigor), pesca nuova mano.
function finishTurn(){
  G.enemies.forEach(e=>{if(e.hp>0){tickStatus(e);tickBuffs(e);}});
  tickStatus(G.player);tickBuffs(G.player);
  G.enemies.forEach(enforceGwynPacifistHalfHpGate);
  if(maybeTriggerGwynPacifistPhase2())return;
  const removed=cleanupDeadEnemies();
  if(allEnemiesDead()){setTimeout(endBattle,400);return;}
  if(G.player.hp<=0){setTimeout(showGameOver,500);return;}
  const p=G.player;

  // ── Stamina regen dinamica
  // Formula: base(2) + floor(stamina_attuale/stamina_max × vigor_bonus)
  // Più stamina hai rimasta, più recuperi — incentiva a non svuotarla tutta
  const vigorBonus=Math.round((p.vigor||10)*0.4);
  const regenPct=p.maxStamina>0?p.stamina/p.maxStamina:0;
  let regen=Math.max(1,Math.round(2+regenPct*vigorBonus));
  // Stivali del Brigante: +1 stamina regen
  if(p.equipment?.gloves?.id==='brigand_boots')regen+=1;
  if(p.statusEffects.freeze>0){p.stamina=Math.floor(p.maxStamina/2);p.statusEffects.freeze--;addLog(`${p.name} è congelato! Stamina dimezzata.`,'system');}else{p.stamina=clamp(p.stamina+regen,0,p.maxStamina);addLog(`Stamina: +${regen} → ${p.stamina}/${p.maxStamina}⚡`,'system');}

  // Set bonus
  const sb=getActiveSetBonus(p);
  if(sb){
    if(sb.effect==='soldier_regen'&&p.hp<p.maxHp*0.5){
      const h=Math.round(p.maxHp*0.03);p.hp=clamp(p.hp+h,0,p.maxHp);addLog(`Set Soldato: +${h} HP!`,'heal');
    }
    if(sb.effect==='apprentice_hand'){
      p.handSize=(p.id==='mage')?8:6;
    }
    if(sb.effect==='brigand_dodge'){
      p.statusEffects._setDodge=0.10;
    }
  }

  // Reset contatori turno
  G._movesThisTurn=0;G._isFirstMoveThisTurn=false;G._staminaSpentThisTurn=0;G._enemyUsedHeavy=false;
  G._staffDiscountUsed=false;G._firstAttackDone=false;
  G.player.moves.forEach(m=>{delete m._disabled;});
  // Scarta le carte rimaste in mano (i Coltelli da lancio scompaiono, non vanno negli scarti)
  if(G.player.moves.length>0){
    G.player.discard.push(...G.player.moves.filter(m=>!m._isShiv));
    G.player.moves=[];
  }
  // Pesca nuova mano
  drawCards(G.player);
  G.busy=false;
  renderBattle(!removed);
}

// Fine combattimento: recupera 10% HP, calcola e distribuisce anime (monete),
// poi avvia la schermata ricompense dopo un breve delay.
function endBattle(){
  // Determina il nemico primario per le ricompense (boss/elite prima, poi primo)
  const defeated=G._defeatedEnemies?.length?G._defeatedEnemies:G.enemies;
  const rewardEnemy=G._lastDefeatedEnemy||defeated.find(e=>e.isBoss||e.isElite)||defeated[0]||G.enemy;
  G.enemy=rewardEnemy;
  addLog(defeated.length>1?`Battaglia vinta!`:`${G.enemy.name} sconfitto!`,'system');
  // Rimischia subito il mazzo: deck + scarti + mano rimasta, esclusi Coltelli da lancio.
  // Le exhaust NON rientrano nel mazzo (comportamento invariato).
  const p=G.player;
  p.deck=shuffle([...(p.deck||[]),...(p.discard||[]),...(p.moves||[])].filter(m=>!m._isShiv));
  p.discard=[];p.moves=[];
  // Registra se il nemico sconfitto ha un dropEquip speciale (usato poi in showRewardScreen)
  G._pendingDropEquip=G._eventBattle?(G._pendingDropEquip||G.enemy?.dropEquip||null):(G.enemy?.dropEquip||null);
  const h=Math.round(G.player.maxHp*0.1);G.player.hp=clamp(G.player.hp+h,0,G.player.maxHp);addLog(`+${h} HP.`,'heal');
  if(!G.enemy?.isBoss&&!G.enemy?.isElite&&hasItem('sacca_ossa')){const sb=Math.round(G.player.maxHp*0.05);G.player.hp=clamp(G.player.hp+sb,0,G.player.maxHp);addLog(`Sacca di Ossa: +${sb} HP!`,'heal');}
  if(G.player.equipment?.ring?.id==='evil_eye_ring'){const eh=Math.round(G.player.maxHp*0.08);G.player.hp=clamp(G.player.hp+eh,0,G.player.maxHp);addLog(`Anello del Malocchio: +${eh} HP!`,'heal');}
  const fl=clamp(zoneTier()-1,0,COIN_DROP.normal.length-1);
  let coins=0;
  defeated.forEach(e=>{
    const cr=e.isBoss?COIN_DROP.boss[fl]:e.isElite?COIN_DROP.elite[fl]:COIN_DROP.normal[fl];
    coins+=rand(cr.min,cr.max);
  });
  if(hasItem('moneta_fortuna'))coins=Math.round(coins*1.15);
  if(G.player.equipment?.ring?.id==='covetous_silver_serpent_ring')coins=Math.round(coins*1.20);
  if(G.player.equipment?.helmet?.id==='mimic_simbolo_avarizia')coins=Math.round(coins*1.15);
  G.coins=(G.coins||0)+coins;addLog(`+${coins} anime! (Tot: ${G.coins})💀`,'system');
  G._lastBattleCoins=coins;
  G._lastBattleHp=h;
  renderBattle(true);
  // Se era una battaglia mimic → schermata ricompensa mimic dedicata
  if(G._mimicBattle){
    G._mimicBattle=false;
    setTimeout(showMimicRewardScreen,900);
    return;
  }
  setTimeout(showRewardScreen,900);
}

// ── RICOMPENSE BOSS / FINALI ─────────────────────────────────────────────────
const BOSS_THEMATIC_REWARDS={
  gargoyle:{kind:'item',id:'artiglio_garg',note:'Ricompensa ispirata alle armi ottenibili dai Gargoyle.'},
  demonetoro:{kind:'equip',id:'demon_greataxe',note:'Arma demoniaca da build forza.'},
  demonecapra:{kind:'equip',id:'demon_great_machete',note:'Mannaia demoniaca affine al boss.'},
  drago_famelico:{kind:'equip',id:'dragon_king_greataxe',note:'Premio ispirato al taglio della coda del Drago Famelico.'},
  quelag:{kind:'equip',id:'quelaag_furysword',note:"Arma forgiata dall'Anima di Quelaag."},
  farfalla_luna:{kind:'item',id:'psyfly',note:'Anima della Farfalla della Luna adattata come reliquia.'},
  hydra_darkroot:{kind:'item',id:'dragon_scale',note:"Scaglia di drago legata all'identita draconica dell'Hydra."},
  sif:{kind:'equip',id:'greatsword_artorias',note:'Arma legata ad Artorias e al destino di Sif.'},
  golem_ferro:{kind:'equip',id:'golem_axe',note:"Arma forgiata dal Nucleo del Golem di Ferro."},
  ornstein:{kind:'equip',id:'dragonslayer_spear',note:"Arma forgiata dall'Anima di Ornstein."},
  smough:{kind:'equip',id:'smough_hammer',note:"Arma forgiata dall'Anima di Smough."},
  nito:{kind:'equip',id:'gravelord_sword',note:'Arma del patto dei Servi del Re Tombale.'},
  culla_caos:{kind:'move',id:'ds1_chaos_storm',note:'Piromanzia del caos legata a Izalith.'},
  seath:{kind:'equip',id:'moonlight_greatsword',note:'Arma ottenibile dalla coda di Seath.'},
  four_kings:{kind:'equip',id:'dark_hand',note:"Reliquia dei Darkwraith e dell'Abisso di Petite Londo."},
  gwyn:{kind:'move',id:'myth_gwyn_first_flame',note:'Tecnica mitica legata alla Prima Fiamma.'}
};
const LORD_SOUL_FRAGMENT_NAMES={
  quelag:"Frammento dell'Anima di Lord di Quelaag",
  nito:"Frammento dell'Anima di Lord di Nito",
  seath:"Frammento dell'Anima di Lord di Seath",
  four_kings:"Frammento dell'Anima di Lord dei Quattro Re"
};
function bossRewardKey(e=G.enemy){
  const id=e?.id||'';
  if(e?._fourKings||e?._fourKing||id==='four_kings'||id.startsWith('four_king'))return 'four_kings';
  return id;
}
function bossRewardObject(entry){
  if(!entry)return null;
  if(entry.kind==='equip')return ALL_EQUIPMENT[entry.id]||null;
  if(entry.kind==='move')return ALL_MOVES.find(m=>m.id===entry.id)||null;
  return ITEMS.find(i=>i.id===entry.id)||null;
}
function getBossThematicReward(e=G.enemy){
  const key=bossRewardKey(e);
  const entry=BOSS_THEMATIC_REWARDS[key];
  const obj=bossRewardObject(entry);
  return entry&&obj?{...entry,key,obj}:null;
}
function lordSoulFragmentKey(e=G.enemy){
  if(!e?.isBoss)return null;
  const key=bossRewardKey(e);
  return LORD_SOUL_FRAGMENT_NAMES[key]?key:null;
}
function lordSoulFragmentCount(){
  return G.lordSoulFragments||Object.keys(G.lordSoulFragmentsByBoss||{}).length||0;
}
function maybeGrantLordSoulFragment(e=G.enemy){
  const key=lordSoulFragmentKey(e);
  if(!key)return;
  if(!G.lordSoulFragmentsByBoss)G.lordSoulFragmentsByBoss={};
  if(G.lordSoulFragmentsByBoss[key])return;
  G.lordSoulFragmentsByBoss[key]=true;
  G.lordSoulFragments=(G.lordSoulFragments||0)+1;
  G._lastLordSoulFragmentName=LORD_SOUL_FRAGMENT_NAMES[key];
  addLog(`${G._lastLordSoulFragmentName} ottenuto! (${G.lordSoulFragments}/4)`,'system');
}
function isFinalGwyn(e=G.enemy){
  return G.zone==='kiln'&&e?.id==='gwyn';
}
function finalBattleRoute(){
  return G._finalBattleRoute||(G.zone==='kiln'?currentRoute():null);
}
function finalBattleLordSouls(){
  return Number.isFinite(G._finalBattleLordSouls)?G._finalBattleLordSouls:lordSoulFragmentCount();
}
function isFinalKilnBattle(e=G.enemy){
  if(G.zone!=='kiln')return false;
  if(G._finalBattleRoute)return true;
  return ['gwyn','gwyndolin_finale','re_senza_nome','anima_tizzoni','gael_finale','manus_finale'].includes(e?.id);
}
function finalGwynPhaseKind(){
  if(G.zone!=='kiln'||G._gwynFinalPhaseTriggered)return null;
  const g=(G.enemies||[]).find(e=>e.id==='gwyn');
  if(!g)return null;
  const route=finalBattleRoute();
  const fragments=finalBattleLordSouls();
  if(route==='pacifist'&&fragments>=4)return 'pacifist_reinforcements';
  if(route==='neutral'&&fragments>=4)return 'neutral_soul_cinder';
  if(route==='neutral'&&fragments<4)return 'neutral_empowered';
  return null;
}
function isFinalGwynPhaseOne(e){
  return e?.id==='gwyn'&&!!finalGwynPhaseKind();
}
function enforceGwynPacifistHalfHpGate(e){
  if(!isFinalGwynPhaseOne(e))return false;
  const half=Math.max(1,Math.ceil(e.maxHp*0.5));
  if(e.hp<half){
    e.hp=half;
    return true;
  }
  return false;
}
function showEndingPanel(title,img,text){
  stopGwynPacifistMusic();
  showScreen('victory');
  const h=document.querySelector('#screen-victory h1');
  if(h)h.textContent=title;
  document.getElementById('vic-sprite').innerHTML=`<img src="${img}" style="width:min(420px,88vw);max-height:300px;object-fit:contain;filter:drop-shadow(0 0 20px #f0c04055)" onerror="this.style.display='none'">`;
  document.getElementById('victory-msg').innerHTML=text;
}
function showPacifistGwynEnding(){
  const fragments=lordSoulFragmentCount();
  if(fragments>=4){
    showEndingPanel(
      'Finale Pacifista - Vincolo della Fiamma',
      'images/gwyn_sconfitto.png',
      `Gwyn cade davanti alla Fornace. Con lui si spengono anche Gwyndolin e il Re senza nome, richiamati troppo tardi per salvare il padre.<br><br>Raccogli quelle anime immense e vincoli la fiamma. Non sai davvero quale volonta ti abbia spinto a farlo, ma alla fine segui le indicazioni di Frampt.<br><br><span style="color:#f0c040;font-size:11px">Il ciclo continua.</span>`
    );
    return;
  }
  showEndingPanel(
    'Finale Pacifista - Il Re dei Tizzoni',
    'images/gwyn_vince.png',
    `Hai raggiunto Gwyn senza macchiarti dell'umanita degli altri, ma con solo ${fragments}/4 frammenti delle Anime dei Lord.<br><br>Quando il Re dei Tizzoni comprende che non sei abbastanza potente da sostenere la fiamma, il duello finisce in un solo gesto. La tua anima viene presa, il tuo viaggio si spegne, e il ciclo trova ancora una volta il modo di continuare senza di te.`
  );
}
function showGenocideGaelIntro(phase='distance'){
  if(phase==='distance'){
    setNpcDialogEvent(
      'images/genocide_gael_uccide_gwyn.png',
      'La cenere della Fornace cade lenta, quasi immobile.<br><br>In lontananza vedi Gwyn inginocchiato davanti alla fiamma. Un uomo avvolto in un mantello rosso gli sta sopra, e la sua lama scende una volta soltanto.<br><br>Il Re dei Tizzoni non si rialza.',
      `<button class="btn" onclick="showGenocideGaelIntro('turn')">Continua</button>`
    );
    return;
  }
  if(phase==='turn'){
    setNpcDialogEvent(
      'images/genocide_gael_si_gira.png',
      'L’uomo si ferma. Lentamente si gira verso di te, come se avesse sentito il peso dell’umanita che porti addosso.<br><br>Ti avvicini attraverso la cenere. Lui stringe la spada e parla con una voce consumata.<br><br><em>"For my lady\'s painting, I need the dark within you."</em>',
      `<button class="btn" onclick="showGenocideGaelIntro('face')">Continua</button>`
    );
    return;
  }
  setNpcDialogEvent(
    'images/genocide_gael_volto.png',
    '<em>"Your Dark Soul."</em>',
    `<button class="btn gold" onclick="transitionToGenocideGaelBattle()">Combatti</button>`
  );
}
function beginFinalBossBattle(enemyId,musicTrack){
  const boss=makeFinalBossEnemy(enemyId);
  if(!boss)return;
  G.enemies=[boss];
  G.enemy=boss;
  G._defeatedEnemies=[];G._lastDefeatedEnemy=null;G._battleWon=false;
  G.log=[];
  _initCombat();
  G.busy=false;
  closeMenus();
  resetNpcDialogLayout();
  showScreen('battle');
  document.getElementById('battle-floor-label').textContent='⚠ BOSS — '+zoneName(G.zone);
  addLog(`Appare ${G.enemy.name}!`,'system');
  playFinalBattleMusic(musicTrack||'truehero');
  renderBattle();
}
function startGenocideGaelBattle(){
  G._genocideGaelBattle=true;
  G._genocideManusBattle=false;
  G._soulOfCinderBattle=false;
  G._gwynReinforcementsActive=false;
  G._loadedArenaPath=null;
  beginFinalBossBattle('gael_finale','truehero');
}
function transitionToGenocideGaelBattle(){
  transitionWithFinalFade('#fff',startGenocideGaelBattle,{overlayId:'genocide-gael-white-transition'});
}
function showGenocideManusIntro(){
  stopFinalBattleMusic();
  setNpcDialogEvent(
    'images/genocide_manus_portale.png',
    "Gael cade nella cenere, ma l'oscurita dentro di te non si placa.<br><br>Le anime dei Lord reagiscono ai frammenti di umanita che hai raccolto. La Fornace non trova piu una direzione: fuoco, cenere e Dark Soul si spingono l'uno contro l'altra.<br><br>Davanti a te si apre un portale nero, piu antico del vincolo della fiamma e piu profondo di ogni morte che hai lasciato alle spalle.<br><br>Dall'altra parte senti l'ultimo grande frammento di oscurita. Se Manus cade, l'Anima Oscura sara finalmente intera.",
    `<button class="btn gold" onclick="transitionToGenocideManusBattle()">Affronta Manus</button>`
  );
}
function startGenocideManusBattle(){
  G._genocideGaelBattle=false;
  G._genocideManusBattle=true;
  G._loadedArenaPath=null;
  beginFinalBossBattle('manus_finale','asgore');
}
function transitionToGenocideManusBattle(){
  transitionWithFinalFade('#000',startGenocideManusBattle,{overlayId:'genocide-manus-black-transition'});
}
function showGenocideEnding(){
  const fragments=finalBattleLordSouls();
  showEndingPanel(
    fragments>=4?'True Genocide - Era dell’Umanita':'Genocide - Fuoco Umano',
    fragments>=4?'images/finale_true_genocide.png':'images/finale_genocide.png',
    fragments>=4
      ?`Manus crolla davanti alla Fornace e l'Abisso tace.<br><br>Hai raccolto l'umanita degli NPC, le anime dei Lord, la missione incompiuta di Gael e l'ultimo frammento primordiale di oscurita. Dentro di te la Dark Soul non e piu spezzata.<br><br>La Prima Fiamma non viene vincolata: viene superata. Inizia la definitiva Era dell'Umanita.`
      :`Gael cade nella cenere, ma cio che hai raccolto non e completo.<br><br>Hai abbastanza umanita da contaminare la Fornace e piegare il fuoco alla tua natura, ma non abbastanza da creare una realta stabile.<br><br>Nasce un'era dell'umanita incompleta, potente e fragile, destinata a tremare sotto il peso della tua scelta.`
  );
}
function maybeTriggerGwynPacifistPhase2(){
  const g=(G.enemies||[]).find(e=>e.id==='gwyn');
  const phase=finalGwynPhaseKind();
  if(!g||!phase)return false;
  if(g.hp>g.maxHp/2)return false;
  G._gwynFinalPhaseTriggered=true;
  G._gwynPacifistPhase2=true;
  g.hp=Math.max(1,Math.ceil(g.maxHp*0.5));
  G.busy=true;
  renderBattle(true);
  stopGwynPacifistMusic();
  if(phase==='pacifist_reinforcements'){
    setNpcDialogEvent(
      'images/gwyn_rinforzi.png',
      'Gwyn barcolla davanti alla Fornace, ma non arretra.<br><br>La cenere ai suoi piedi si solleva come nebbia. Due presenze rispondono al richiamo del sangue divino: Gwyndolin, Sole Oscuro, e il Re senza nome.<br><br>Gwyn non cerca piu soltanto di vincere. Vuole assicurarsi che nessuno possa spezzare il ciclo dopo di lui.',
      `<button class="btn" onclick="showGwynDragonReinforcements()">Continua</button>`
    );
    return true;
  }
  if(phase==='neutral_soul_cinder'){
    setNpcDialogEvent(
      'images/gwyn_potenziamento.png',
      'Gwyn comprende cio che porti dentro di te.<br><br>Non sei puro. Nella tua anima esiste umanita, e per lui basta questo a renderti una minaccia per la Fiamma.<br><br>Disperato, il vecchio re tende la mano verso la Fornace e usurpa cio che resta del fuoco, deciso a impedirti di contaminarlo.',
      `<button class="btn" onclick="showSoulOfCinderTransformationStart()">Continua</button>`
    );
    return true;
  }
  setNpcDialogEvent(
    'images/gwyn_potenziamento.png',
    'Gwyn arretra verso la Fornace della Prima Fiamma.<br><br>Per la prima volta, il vecchio re sembra disperato. La fiamma dentro la fornace si piega verso di lui, come se rispondesse ancora al suo nome.<br><br>Gwyn attinge di nuovo al fuoco originario. Le sue ferite si chiudono, la cenere si accende, e il duello ricomincia a un livello che il mondo non vedeva da secoli.',
    `<button class="btn" onclick="resumeGwynEmpoweredPhase()">Continua</button>`
  );
  return true;
}
function showGwynDragonReinforcements(){
  playFinalBattleMusic('save',{fadeMs:5000});
  setNpcDialogEvent(
    'images/rinforzi_su_drago.png',
    'Il cielo sopra la Fornace si squarcia in un rombo antico.<br><br>Il Re senza nome discende tra cenere e fulmini, portando con se l\'ombra di una guerra mai dimenticata. Al suo fianco, Gwyndolin prepara la luce fredda della Luna Oscura.<br><br>Il duello non e piu contro Gwyn soltanto. Ora stai affrontando cio che resta della sua stirpe.',
    `<button class="btn" onclick="resumeGwynPacifistReinforcements()">Continua</button>`
  );
}
function resumeGwynPacifistReinforcements(){
  const g=(G.enemies||[]).find(e=>e.id==='gwyn');
  if(g&&!G._gwynReinforcementsActive){
    const half=Math.max(1,Math.ceil(g.maxHp*0.5));
    g.hp=Math.min(Math.max(1,g.hp),half);
    const gwyndolin=makeFinalBossEnemy('gwyndolin_finale');
    const nameless=makeFinalBossEnemy('re_senza_nome');
    if(gwyndolin&&nameless){
      G._gwynReinforcementsActive=true;
      G.enemies=[nameless,g,gwyndolin];
      G.enemy=g;
      G._loadedArenaPath=null;
      addLog('Gwyn chiama i suoi figli: Gwyndolin e il Re senza nome entrano in battaglia.','crit');
    }
  }
  playFinalBattleMusic('save');
  resetNpcDialogLayout();
  showScreen('battle');
  G.busy=false;
  renderBattle(false);
}
function showSoulOfCinderTransformationStart(){
  setNpcDialogEvent(
    'images/inizio_trasformazione.png',
    'Il fuoco entra nel corpo di Gwyn come una lama senza forma.<br><br>Per un istante il vecchio re non sembra piu un avversario, ma un tramite. La sua anima si apre, e dentro la Fornace qualcosa risponde da epoche che non sono ancora nate.<br><br>La trasformazione e appena iniziata.',
    `<button class="btn" onclick="transitionToSoulOfCinderBirth()">Continua</button>`
  );
}
function showSoulOfCinderBirth(){
  playFinalBattleMusic('finale');
  setNpcDialogEvent(
    'images/compare_anima_tizzoni.png',
    "Nel momento in cui Gwyn strappa il fuoco dalla Fornace, il tempo smette di scorrere in linea retta.<br><br>La Fiamma non contiene piu soltanto il suo potere. Contiene echi, sacrifici, futuri vincolatori, anime che non dovrebbero ancora esistere e che pure rispondono al richiamo.<br><br>Il tempo stagnante della Fornace collassa in un solo corpo. Davanti a te nasce l'Anima dei Tizzoni.",
    `<button class="btn" onclick="resumeGwynSoulOfCinderPhase()">Continua</button>`
  );
}
function resumeGwynSoulOfCinderPhase(){
  const soul=makeFinalBossEnemy('anima_tizzoni');
  if(soul){
    soul._soulOfCinder=true;
    G._soulOfCinderBattle=true;
    G._gwynReinforcementsActive=false;
    G.enemies=[soul];
    G.enemy=soul;
    G._loadedArenaPath=null;
    addLog("La Fornace si svuota. L'Anima dei Tizzoni si manifesta!",'crit');
  }
  playFinalBattleMusic('finale');
  resetNpcDialogLayout();
  showScreen('battle');
  G.busy=false;
  renderBattle(false);
}
function resumeGwynEmpoweredPhase(){
  const g=(G.enemies||[]).find(e=>e.id==='gwyn');
  if(g&&!g._gwynPacifistEmpowered){
    g._gwynPacifistEmpowered=true;
    g.name='Gwyn, Lord della Fiamma';
    g.maxHp=Math.max(1,Math.round(g.maxHp*1.5));
    g.hp=g.maxHp;
    ['strength','vigor','intelligence','dexterity','faith','arcane','atk','def','mag'].forEach(k=>{g[k]=Math.round((g[k]||10)*1.5);});
    g.statusEffects.fire_guard=2;
    G.enemy=g;
    addLog('Gwyn attinge alla Prima Fiamma: vita piena e corpo gigantesco!','crit');
  }
  if(finalBattleRoute()==='neutral'&&finalBattleLordSouls()<4)playFinalBattleMusic('spear');
  resetNpcDialogLayout();
  showScreen('battle');
  G.busy=false;
  renderBattle(false);
}
function resumeGwynPacifistPhase2(){resumeGwynEmpoweredPhase();}

// ── SCHERMATA RICOMPENSE ──────────────────────────────────────────────────────
function showRewardScreen(){
  const e=G.enemy,isElite=e.isElite,isBoss=e.isBoss,isSpecial=isElite||isBoss;
  noteNpcKillFromEnemy(e);
  maybeGrantLordSoulFragment(e);
  if(isFinalKilnBattle(e)&&finalBattleRoute()==='pacifist'){showPacifistGwynEnding();return;}
  if(isFinalKilnBattle(e)&&finalBattleRoute()==='genocide'){
    if(e.id==='gael_finale'&&finalBattleLordSouls()>=4){showGenocideManusIntro();return;}
    if(e.id==='gael_finale'||e.id==='manus_finale'){showGenocideEnding();return;}
  }
  const coins=G._lastBattleCoins||0;
  const titleCol=isBoss?'#f0c040':isElite?'#8060ff':'#c0a0ff';
  const titleTxt=isBoss?'⚔ Boss Sconfitto!':isElite?'⚠ Elite Sconfitto!':'Nemico Sconfitto!';
  const subTxt=isBoss?`${zoneName(G.zone)} — Boss eliminato`:isElite?`${zoneName(G.zone)} — Elite eliminato`:zoneName(G.zone);

  document.getElementById('reward-title').textContent=titleTxt;
  document.getElementById('reward-title').style.color=titleCol;
  document.getElementById('reward-sub').textContent=subTxt;

  // Sprite del nemico sconfitto — usa la mappa emoji globale EMAP_EMOJI
  const sprHTML=e.sprite
    ?`<img src="${e.sprite}" style="width:80px;height:80px;object-fit:contain;opacity:0.5;filter:grayscale(1) drop-shadow(0 0 12px ${titleCol})">`
    :`<div style="font-size:64px;opacity:0.5">${EMAP_EMOJI[e.id]||'👾'}</div>`;

  // Box monete
  const coinsHTML=`
    <div style="background:#12121e;border:1px solid #3a3000;border-radius:10px;padding:14px;text-align:center;margin-bottom:14px">
      <div style="font-size:11px;color:#888;margin-bottom:4px">Anime ottenute</div>
      <div style="font-size:28px;font-weight:bold;color:#c0a0ff">+${coins} 💀</div>
      <div style="font-size:10px;color:#666;margin-top:2px">Totale: ${G.coins} anime</div>
    </div>`;
  const humanityHTML=G._lastHumanityDrop?`
    <div style="background:#15151c;border:1px solid #f7f7f7;border-radius:10px;padding:10px;text-align:center;margin-bottom:14px">
      <div style="font-size:11px;color:#aaa;margin-bottom:3px">Umanita ottenuta</div>
      <div style="font-size:22px;font-weight:bold;color:#f7f7f7">+${G._lastHumanityDrop} H</div>
      <div style="font-size:10px;color:#777;margin-top:2px">Totale: ${G.humanity||0} umanita</div>
    </div>`:'';
  const lordFragmentHTML=G._lastLordSoulFragmentName?`
    <div style="background:#1a1224;border:1px solid #f0c040;border-radius:10px;padding:10px;text-align:center;color:#f0c040;font-size:11px;margin-bottom:14px">
      ✦ ${G._lastLordSoulFragmentName} ottenuto (${lordSoulFragmentCount()}/4)
    </div>`:'';

  // Bottone ricompensa
  const btnLabel=isBoss?'✨ Ottieni Ricompensa Unica':isElite?'🎁 Apri Drop Elite':'⚔ Ottieni Mossa';
  const btnColor=isBoss?'#c060ff':isElite?'#4da6ff':'#4da6ff';
  const rewardBtnHTML=`
    <div style="text-align:center;margin-bottom:16px">
      <button onclick="openRewardChoice()" style="background:#12121e;border:2px solid ${btnColor};color:${btnColor};padding:12px 28px;border-radius:8px;cursor:pointer;font-family:'Courier New',monospace;font-size:13px;letter-spacing:1px;box-shadow:0 0 12px ${btnColor}44;transition:all .2s" onmouseover="this.style.background='${btnColor}';this.style.color='#0a0a0f'" onmouseout="this.style.background='#12121e';this.style.color='${btnColor}'">${btnLabel}</button>
    </div>`;

  document.getElementById('reward-content').innerHTML=`
    <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:16px">
      ${sprHTML}
      <div style="text-align:left">
        <div style="font-size:14px;font-weight:bold;color:${titleCol};margin-bottom:4px">${e.name}</div>
        <div style="font-size:10px;color:#666">${isBoss?'Boss':isElite?'Elite':'Nemico'} — ${zoneName(G.zone)}</div>
        <div style="font-size:10px;color:#40d040;margin-top:4px">+${G._lastBattleHp||0} HP recuperati</div>
      </div>
    </div>
    ${lordFragmentHTML}
    ${coinsHTML}
    ${humanityHTML}
    ${rewardBtnHTML}
    <div id="reward-choice-area"></div>
    <div style="text-align:center;margin-top:10px">
      <button class="btn" onclick="completeEvent()" id="reward-continue-btn" style="display:none">Continua →</button>
    </div>`;

  showScreen('reward');
  G._lastHumanityDrop=0;
  G._lastLordSoulFragmentName=null;
}
function openRewardChoice(){
  const e=G.enemy,isSpecial=e.isElite||e.isBoss;
  document.querySelector('[onclick="openRewardChoice()"]').style.display='none';
  if(G._eventBattle&&G._pendingDropEquip) buildEventEquipReward();
  else if(e.isBoss&&getBossThematicReward(e)) buildBossReward();
  else if(e.isElite&&!e.isBoss) buildEliteItemReward();
  else if(isSpecial) buildEliteBossReward();
  else buildNormalReward();
}

function buildBossReward(){
  const reward=getBossThematicReward(G.enemy);
  if(!reward){buildEliteBossReward();return;}
  G._bossReward=reward;
  const obj=reward.obj;
  const r=RARITY_DATA[obj.rarity||3];
  const typeLabel={equip:'Equipaggiamento unico',item:'Oggetto unico',move:'Mossa unica'}[reward.kind]||'Ricompensa unica';
  const statLines=reward.kind==='equip'
    ?Object.entries(obj.bonus||{}).map(([k,v])=>`<div style="color:#80ff80;font-size:10px">+${v} ${k.toUpperCase()}</div>`).join('')
    :'';
  const desc=obj.passiveDesc||obj.desc||reward.note||'';
  document.getElementById('reward-choice-area').innerHTML=`
    <p style="text-align:center;color:#888;font-size:11px;margin-bottom:10px">Ricompensa speciale del boss:</p>
    <div style="background:#12121e;border:2px solid ${r.color};border-radius:10px;padding:16px;max-width:310px;margin:0 auto;text-align:center;box-shadow:0 0 16px ${r.glow}">
      <div style="font-size:38px;margin-bottom:8px">${obj.icon||'✦'}</div>
      <div style="font-weight:bold;color:${r.color};font-size:13px;margin-bottom:6px">${obj.name}</div>
      <div style="font-size:9px;color:#aaa;border:1px solid #444;border-radius:3px;padding:2px 8px;display:inline-block;margin-bottom:8px">${typeLabel}</div>
      ${statLines}
      <div style="font-size:9px;color:#aaa;margin-top:6px">${desc}</div>
      <div style="font-size:9px;color:#777;margin-top:8px;border-top:1px solid #333;padding-top:6px">${reward.note||''}</div>
      <button class="btn" onclick="pickBossReward()" style="border-color:${r.color};color:${r.color};margin-top:14px">Prendi</button>
    </div>`;
}
function pickBossReward(){
  const reward=G._bossReward;
  if(!reward)return;
  const obj=reward.obj;
  if(reward.kind==='equip'){
    applyEquipPiece(G.player,obj);
    addLog(`${obj.name} equipaggiato!`,'system');
    document.getElementById('reward-choice-area').innerHTML=`<p style="text-align:center;color:#f0c040;font-size:12px;margin:12px 0">✓ Equipaggiamento ottenuto!</p>`;
  } else if(reward.kind==='item'){
    if(!G.player.items?.some(i=>i.id===obj.id))addPlayerItem(obj);
    addLog(`${obj.name} ottenuto!`,'system');
    document.getElementById('reward-choice-area').innerHTML=`<p style="text-align:center;color:#f0c040;font-size:12px;margin:12px 0">✓ Oggetto ottenuto!</p>`;
  } else {
    if(!G.player.deck.find(m=>m.id===obj.id))G.player.deck.push({...obj});
    addLog(`${obj.name} aggiunta al mazzo!`,'system');
    document.getElementById('reward-choice-area').innerHTML=`<p style="text-align:center;color:#40d040;font-size:12px;margin:12px 0">✓ Mossa aggiunta al mazzo!</p>`;
  }
  document.getElementById('reward-continue-btn').style.display='inline-block';
}

// Ricompensa da battaglia evento: mostra l'equipaggiamento speciale con prendi/salta
function buildEventEquipReward(){
  const eq=ALL_EQUIPMENT[G._pendingDropEquip];
  if(!eq){document.getElementById('reward-continue-btn').style.display='';return;}
  const slotLabel={weapon:'ARMA UNICA',ring:'ANELLO UNICO',offhand:'SCUDO UNICO',helmet:'ELMO UNICO',armor:'ARMATURA UNICA',gloves:'GUANTI UNICI',legs:'GAMBALI UNICI',boots:'STIVALI UNICI'}[eq.slot]||'EQUIPAGGIAMENTO UNICO';
  const statLines=Object.entries(eq.bonus||{}).map(([k,v])=>`<div style="color:#80ff80;font-size:10px">+${v} ${k.toUpperCase()}</div>`).join('');
  document.getElementById('reward-choice-area').innerHTML=`
    <p style="text-align:center;color:#f0c040;font-size:11px;margin-bottom:10px">Hai trovato equipaggiamento speciale:</p>
    <div style="background:#12121e;border:2px solid #f0c040;border-radius:10px;padding:16px;max-width:260px;margin:0 auto;text-align:center;box-shadow:0 0 16px #f0c04044">
      <div style="font-size:36px;margin-bottom:8px">${eq.icon||'E'}</div>
      <div style="font-weight:bold;color:#f0c040;font-size:13px;margin-bottom:6px">${eq.name}</div>
      <div style="font-size:9px;color:#aaa;border:1px solid #444;border-radius:3px;padding:2px 8px;display:inline-block;margin-bottom:8px">${slotLabel}</div>
      ${statLines}
      ${eq.passiveDesc?`<div style="font-size:9px;color:#c0a0ff;margin-top:6px;border-top:1px solid #333;padding-top:6px">${eq.passiveDesc}</div>`:''}
      <div style="display:flex;gap:8px;justify-content:center;margin-top:14px">
        <button class="btn" onclick="pickEventEquip('${eq.id}')" style="border-color:#f0c040;color:#f0c040">Prendi</button>
        <button class="btn" onclick="skipEventEquip()" style="border-color:#444;color:#666">Salta</button>
      </div>
    </div>`;
}
function pickEventEquip(id){
  const eq=ALL_EQUIPMENT[id];if(!eq)return;
  applyEquipPiece(G.player,eq);
  G._eventBattle=false;G._pendingDropEquip=null;
  document.getElementById('reward-choice-area').innerHTML='<p style="text-align:center;color:#80ff80;font-size:12px">Equipaggiamento ottenuto!</p>';
  document.getElementById('reward-continue-btn').style.display='';
}
function skipEventEquip(){
  G._eventBattle=false;G._pendingDropEquip=null;
  document.getElementById('reward-continue-btn').style.display='';
}

// ── RICOMPENSA NORMALE: 3 mosse casuali pesate ───────────────────────────────
function buildNormalReward(){
  const pool=getRewardPool(G.player.id).filter(m=>!G.player.deck.find(pm=>pm.id===m.id));
  const offered=[],used=new Set();let att=0;
  while(offered.length<3&&att<40){att++;const r=rollRarity();const c=pool.filter(m=>m.rarity===r&&!used.has(m.id));if(!c.length)continue;const m=choice(c);offered.push(m);used.add(m.id);}
  while(offered.length<3){const m=pool.find(m=>!used.has(m.id));if(!m)break;offered.push(m);used.add(m.id);}
  G._rewardOffer=offered;

  document.getElementById('reward-choice-area').innerHTML=`
    <p style="text-align:center;color:#888;font-size:11px;margin-bottom:10px">Scegli una mossa da aggiungere al mazzo:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
      ${offered.map((m,i)=>rewardMovCard(m,`pickRewardMove(${i})`)).join('')}
    </div>
    <p style="text-align:center;margin-top:10px"><button class="btn" onclick="skipRewardMove()">Salta</button></p>`;
}

// ── RICOMPENSA ELITE: 1 oggetto raro o superiore ─────────────────────────────
function rollEliteItemRarity(){
  const weights=[{r:2,w:55},{r:3,w:30},{r:4,w:13},{r:5,w:2}];
  let n=rand(1,100);
  for(const {r,w} of weights){n-=w;if(n<=0)return r;}
  return 2;
}
function getEliteItemDrop(){
  const pool=ITEMS.filter(i=>(i.rarity||1)>=2&&!i.unique&&i.effect!=='story_soul');
  if(!pool.length)return null;
  for(let i=0;i<30;i++){
    const rarity=rollEliteItemRarity();
    const choices=pool.filter(it=>(it.rarity||1)===rarity);
    if(choices.length)return choice(choices);
  }
  return choice(pool);
}
function buildEliteItemReward(){
  const item=getEliteItemDrop();
  G._eliteItemDrop=item;
  if(!item){
    document.getElementById('reward-choice-area').innerHTML=`<p style="text-align:center;color:#666;font-size:11px;margin:12px 0">Nessun oggetto elite disponibile.</p>`;
    document.getElementById('reward-continue-btn').style.display='inline-block';
    return;
  }
  const r=RARITY_DATA[item.rarity||2];
  document.getElementById('reward-choice-area').innerHTML=`
    <p style="text-align:center;color:#888;font-size:11px;margin-bottom:10px">L'elite ha lasciato cadere un oggetto:</p>
    <div style="background:#12121e;border:2px solid ${r.color};border-radius:10px;padding:16px;max-width:300px;margin:0 auto;text-align:center;box-shadow:0 0 16px ${r.glow}">
      <div style="font-size:36px;margin-bottom:8px">${item.icon||'I'}</div>
      <div style="font-weight:bold;color:${r.color};font-size:13px;margin-bottom:6px">${item.name}</div>
      <div style="margin-bottom:8px">${rarityBadge(item)}</div>
      <div style="font-size:9px;color:#aaa;line-height:1.45">${item.desc||''}</div>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:14px">
        <button class="btn" onclick="pickEliteItemDrop()" style="border-color:${r.color};color:${r.color}">Prendi</button>
        <button class="btn" onclick="skipEliteItemDrop()" style="border-color:#444;color:#666">Salta</button>
      </div>
    </div>`;
}
function pickEliteItemDrop(){
  const item=G._eliteItemDrop;
  if(!item)return skipEliteItemDrop();
  addPlayerItem(item,{allowDuplicate:true});
  addLog(`${item.name} ottenuto!`,'system');
  G._eliteItemDrop=null;
  document.getElementById('reward-choice-area').innerHTML=`<p style="text-align:center;color:#f0c040;font-size:12px;margin:12px 0">✓ Oggetto aggiunto all'inventario!</p>`;
  document.getElementById('reward-continue-btn').style.display='inline-block';
}
function skipEliteItemDrop(){
  G._eliteItemDrop=null;
  document.getElementById('reward-choice-area').innerHTML=`<p style="text-align:center;color:#666;font-size:11px;margin:12px 0">Oggetto lasciato a terra.</p>`;
  document.getElementById('reward-continue-btn').style.display='inline-block';
}

// ── RICOMPENSA ELITE/BOSS: oggetto unico, mossa nemico, mossa rara ────────────
function buildEliteBossReward(){
  const e=G.enemy;
  // Opzione 1: oggetto peculiare del nemico (se esiste e non già posseduto)
  const did=e.dropItem;
  const dropItem=did?ITEMS.find(i=>i.id===did):null;
  const alreadyOwned=dropItem&&G.player.items?.some(pi=>pi.id===did);
  const opt1=dropItem&&!alreadyOwned?dropItem:null;

  // Opzione 2: una mossa dal mazzo del nemico non già nel deck del player
  const enemyMovePool=e.moves.filter(m=>!G.player.deck.find(pm=>pm.id===m.id));
  const opt2=enemyMovePool.length?choice(enemyMovePool):null;

  // Opzione 3: mossa rara casuale (no comuni; epiche/leggendarie più probabili)
  // Pesi: rarity1=0, rarity2=25, rarity3=45, rarity4=30
  const ELITE_RARITY_W=[{r:2,w:25},{r:3,w:45},{r:4,w:30}];
  function rollEliteRarity(){let n=rand(1,100);for(const{r,w}of ELITE_RARITY_W){n-=w;if(n<=0)return r;}return 3;}
  const elitePool=ALL_MOVES.filter(m=>m.rarity>=2&&!G.player.deck.find(pm=>pm.id===m.id));
  let opt3=null;for(let i=0;i<30&&!opt3;i++){const r=rollEliteRarity();const c=elitePool.filter(m=>m.rarity===r&&(!opt2||m.id!==opt2.id));if(c.length)opt3=choice(c);}
  if(!opt3)opt3=elitePool.find(m=>(!opt2||m.id!==opt2.id))||elitePool[0];

  G._rewardEliteOpts={opt1,opt2,opt3};

  const opts=[];
  if(opt1){
    const r=RARITY_DATA[opt1.rarity||2];
    opts.push(`<div class="mccard" onclick="pickEliteReward('item')" style="border-color:${r.color};box-shadow:0 0 10px ${r.glow};text-align:center;cursor:pointer">
      <div style="font-size:32px;margin-bottom:6px">${opt1.icon}</div>
      <div style="font-weight:bold;color:#e0e0e0;font-size:12px;margin-bottom:4px">${opt1.name}</div>
      <div style="margin-bottom:6px">${rarityBadge(opt1)}${opt1.unique?'<span style="font-size:9px;margin-left:4px;padding:1px 5px;border-radius:3px;border:1px solid #f0c040;color:#f0c040">UNICO</span>':''}</div>
      <div style="font-size:9px;color:#aaa">${opt1.desc}</div>
      <div style="font-size:9px;color:#888;margin-top:6px;border-top:1px solid #333;padding-top:4px">Oggetto equipaggiamento</div>
    </div>`);
  } else {
    opts.push(`<div class="mccard" style="border-color:#333;opacity:0.4;text-align:center">
      <div style="font-size:32px;margin-bottom:6px">🚫</div>
      <div style="font-weight:bold;color:#666;font-size:11px">Oggetto già posseduto</div>
    </div>`);
  }
  if(opt2){
    opts.push(rewardMovCard({...opt2,rarity:e.isBoss?3:2},"pickEliteReward('move2')",'Mossa del nemico'));
  }
  if(opt3){
    opts.push(rewardMovCard(opt3,"pickEliteReward('move3')",'Mossa rara casuale'));
  }

  document.getElementById('reward-choice-area').innerHTML=`
    <p style="text-align:center;color:#888;font-size:11px;margin-bottom:10px">Scegli la tua ricompensa:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
      ${opts.join('')}
    </div>
    <p style="text-align:center;margin-top:10px"><button class="btn" onclick="skipRewardMove()">Salta</button></p>`;
}

function rewardMovCard(m,onclick,label){
  const r=RARITY_DATA[m.rarity||1];
  return`<div class="mccard" onclick="${onclick}" style="border-color:${r.color};box-shadow:0 0 8px ${r.glow};cursor:pointer">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <span style="font-weight:bold;color:#e0e0e0;font-size:11px">${m.name}</span>
      <span class="mtype type-${m.type}">${m.type.toUpperCase()}</span>
    </div>
    <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px">${rarityBadge(m)}<span style="font-size:9px;color:#60c0ff">⚡${m.cost||1}</span></div>
    <div style="font-size:9px;color:#aaa">${m.desc||''}</div>
    ${label?`<div style="font-size:9px;color:#888;margin-top:6px;border-top:1px solid #333;padding-top:4px">${label}</div>`:''}
  </div>`;
}

function pickRewardMove(i){
  const m=G._rewardOffer[i];
  if(m){G.player.deck.push({...m});addLog(`${m.name} aggiunta al mazzo!`,'system');}
  document.getElementById('reward-choice-area').innerHTML=`<p style="text-align:center;color:#40d040;font-size:12px;margin:12px 0">✓ Mossa aggiunta al mazzo!</p>`;
  document.getElementById('reward-continue-btn').style.display='inline-block';
  document.querySelector('[onclick="skipRewardMove()"]')?.remove();
}

function pickEliteReward(type){
  const opts=G._rewardEliteOpts;
  if(type==='item'&&opts.opt1){
    const item=opts.opt1;
    addPlayerItem(item);
    addLog(`${item.name} ottenuto!`,'system');
    document.getElementById('reward-choice-area').innerHTML=`<p style="text-align:center;color:#f0c040;font-size:12px;margin:12px 0">✓ Oggetto aggiunto all'inventario!</p>`;
  } else {
    const m=type==='move2'?opts.opt2:opts.opt3;
    if(m){G.player.deck.push({...m});addLog(`${m.name} aggiunta al mazzo!`,'system');}
    document.getElementById('reward-choice-area').innerHTML=`<p style="text-align:center;color:#40d040;font-size:12px;margin:12px 0">✓ Mossa aggiunta al mazzo!</p>`;
  }
  document.getElementById('reward-continue-btn').style.display='inline-block';
}

function skipRewardMove(){
  document.getElementById('reward-choice-area').innerHTML=`<p style="text-align:center;color:#666;font-size:11px;margin:12px 0">Ricompensa saltata.</p>`;
  document.getElementById('reward-continue-btn').style.display='inline-block';
}

// ── VECCHIE FUNZIONI REWARD (mantenute per compatibilità menu) ────────────────
function showMoveReward(){showRewardScreen();}
// ── REST (SANTUARIO) ──────────────────────────────────────────────────────────
function showRest(){
  showScreen('rest');
  document.getElementById('rest-level-panel').style.display='none';
  renderRestSoulsDisplay();
}

function toggleLevelMenu(){
  const panel=document.getElementById('rest-level-panel');
  const hint=document.getElementById('rest-hint-label');
  const open=panel.style.display==='none'||panel.style.display==='';
  panel.style.display=open?'block':'none';
  hint.style.display=open?'none':'block';
  if(open){renderRestSoulsDisplay();renderRestStatsList();}
}

function renderRestSoulsDisplay(){
  const el=document.getElementById('rest-souls-count');
  if(el)el.textContent=`${G.coins||0} 💀`;
}

// Costo globale: aumenta di 15 per ogni livello acquistato su qualsiasi statistica
function getStatUpCost(){
  const totalLvls=Object.values(G._statLevels||{}).reduce((s,v)=>s+v,0);
  return 20+totalLvls*15;
}

function renderRestStatsList(){
  const p=G.player;
  if(!G._statLevels)G._statLevels={};
  const STATS=[
    {id:'strength',    label:'Forza (STR)',         color:'#ff8080'},
    {id:'vigor',       label:'Vigore (VIG)',         color:'#40d040'},
    {id:'intelligence',label:'Intelligenza (INT)',   color:'#c0a0ff'},
    {id:'dexterity',   label:'Destrezza (DEX)',      color:'#f0c040'},
    {id:'faith',       label:'Fede (FAI)',            color:'#80d0ff'},
    {id:'arcane',      label:'Arcano (ARC)',          color:'#d080d0'},
    {id:'maxHp',       label:'HP Massimi (+10)',      color:'#40d040'},
  ];
  const souls=G.coins||0;
  const cost=getStatUpCost();
  const canAfford=souls>=cost;
  document.getElementById('rest-stats-list').innerHTML=`
    <div style="text-align:center;margin-bottom:8px;padding:5px;background:#0d0d1a;border:1px solid #3a2060;border-radius:6px">
      <span style="font-size:10px;color:#888">Costo prossimo livello: </span>
      <span style="font-size:14px;font-weight:bold;color:${canAfford?'#c0a0ff':'#555'}">💀 ${cost}</span>
    </div>`+
  STATS.map(s=>{
    const cur=p[s.id]||0;
    const lvl=G._statLevels[s.id]||0;
    return`<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 8px;margin-bottom:5px;background:#0d0d1a;border:1px solid #2a2040;border-radius:6px">
      <div>
        <div style="font-size:11px;color:${s.color};font-weight:bold">${s.label}</div>
        <div style="font-size:10px;color:#888">Valore: <b style="color:#e0e0e0">${s.id==='maxHp'?cur:cur}</b>${lvl>0?` <span style="color:#c0a0ff;font-size:9px">(+${lvl} lvl)</span>`:''}</div>
      </div>
      <button onclick="restLevelUp('${s.id}')" ${canAfford?'':'disabled'}
        style="width:28px;height:28px;border-radius:50%;border:2px solid ${canAfford?'#c0a0ff':'#333'};background:${canAfford?'#1a1030':'transparent'};color:${canAfford?'#c0a0ff':'#444'};cursor:${canAfford?'pointer':'not-allowed'};font-size:16px;line-height:1;font-weight:bold;transition:all .15s"
        onmouseover="if(${canAfford})this.style.background='#c0a0ff';this.style.color='#0a0a0f'"
        onmouseout="if(${canAfford})this.style.background='#1a1030';this.style.color='#c0a0ff'">+</button>
    </div>`;
  }).join('');
}

function restLevelUp(statId){
  if(!G._statLevels)G._statLevels={};
  const cost=getStatUpCost();
  if((G.coins||0)<cost)return;
  G.coins-=cost;
  G._statLevels[statId]=(G._statLevels[statId]||0)+1;
  if(statId==='maxHp'){
    G.player.maxHp+=10;
    G.player.hp=Math.min(G.player.hp+10,G.player.maxHp);
  } else {
    G.player[statId]=(G.player[statId]||0)+1;
    if(statId==='vigor'){
      recalcPlayerStaminaFromVigor();
    }
  }
  renderRestSoulsDisplay();
  renderRestStatsList();
}

// ── NEGOZIO ───────────────────────────────────────────────────────────────────
function _applySpritePos(id,pos){
  const img=document.getElementById(id);if(!img)return;
  Object.assign(img.style,pos);
}

function showShopEnter(){
  if(npcShopBlocked('patches','images/negozio.png'))return;
  showScreen('shop-enter');
  const actions=document.querySelector('#screen-shop-enter > div:last-child');
  if(actions)actions.innerHTML=`${npcFightButton('patches')}<button class="btn" onclick="completeEvent()" style="font-size:11px;padding:5px 14px">Ignora e prosegui</button>`;
  setSceneNpcLine('screen-shop-enter','patches','entry');
  // Riapplica posizione salvata ogni volta che si apre
  setTimeout(()=>_applySpritePos('patches-img',PATCHES_POS),0);
}

function openShopInner(){
  if(npcShopBlocked('patches','images/negozio.png'))return;
  showScreen('shop');
  buildShopOffers();
  renderShopInner();
}

function buildShopOffers(){
  const pool=getRewardPool(G.player.id).filter(m=>!G.player.deck.find(pm=>pm.id===m.id));
  // 3 mosse con pesi normali
  const moves=[],used=new Set();let att=0;
  while(moves.length<3&&att<60){att++;const r=rollRarity();const c=pool.filter(m=>m.rarity===r&&!used.has(m.id));if(!c.length)continue;const m=choice(c);moves.push(m);used.add(m.id);}
  while(moves.length<3){const m=pool.find(m=>!used.has(m.id));if(!m)break;moves.push(m);used.add(m.id);}

  // 3 oggetti casuali (solo veri oggetti, NO equipaggiamento)
  const ip=shuffle(ITEMS.filter(i=>!i.unique&&!G.player.items?.find(pi=>pi.id===i.id))).slice(0,3);
  const zoneItems=[];
  if(G.zone==='darkroot'&&!hasItem('cimiero_artorias')){
    const crest=ITEMS.find(i=>i.id==='cimiero_artorias');
    if(crest)zoneItems.push({type:'item',data:crest,price:routeShopPrice(1000),bought:false,zoneOnly:true});
  }

  G._shopOffers=[
    ...moves.map(m=>({type:'move',data:m,price:routeShopPrice(SHOP_PRICES.move+(m.rarity-1)*20),bought:false})),
    ...zoneItems,
    ...ip.map(it=>({type:'item',data:it,price:routeShopPrice(SHOP_PRICES.item),bought:false})),
    {type:'potion',price:routeShopPrice(SHOP_PRICES.potion),bought:false},
    {type:'remove',price:routeShopPrice(25),bought:false}
  ];
}

function renderShopInner(){
  document.getElementById('shop-coins').textContent=`💀 ${G.coins||0}`;
  const sections=[];
  if(routeKillCount()>5)sections.push(npcShopFearText('patches'));

  // Sezione mosse
  const moveOffers=G._shopOffers.filter(o=>o.type==='move');
  if(moveOffers.some(o=>!o.bought)){
    sections.push(`<div style="margin-bottom:14px">
      <div style="font-size:11px;color:#c0a0ff;letter-spacing:1px;margin-bottom:6px;border-bottom:1px solid #222;padding-bottom:3px">⚔ MOSSE</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
        ${moveOffers.map((o,gi)=>{
          const i=G._shopOffers.indexOf(o);
          if(o.bought)return`<div style="background:#0d0d1a;border:1px solid #222;border-radius:8px;padding:10px;opacity:0.35;text-align:center"><div style="font-size:11px;color:#555">Venduto</div></div>`;
          const m=o.data,r=RARITY_DATA[m.rarity||1],can=(G.coins||0)>=o.price;
          return`<div style="background:#12121e;border:2px solid ${r.color};border-radius:8px;padding:10px;box-shadow:0 0 6px ${r.glow}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
              <span style="font-weight:bold;color:#e0e0e0;font-size:11px">${m.name}</span>
              <span class="mtype type-${m.type}">${m.type.toUpperCase()}</span>
            </div>
            <div style="display:flex;gap:4px;align-items:center;margin-bottom:4px">${rarityBadge(m)}<span style="font-size:9px;color:#60c0ff">⚡${m.cost||1}</span></div>
            <div style="font-size:9px;color:#aaa;margin-bottom:6px">${m.desc||''}</div>
            <button onclick="buyShopItem(${i})" ${can?'':'disabled'} style="width:100%;padding:4px;border-radius:4px;border:1px solid ${can?'#f0c040':'#3a3000'};background:transparent;color:${can?'#f0c040':'#555'};cursor:${can?'pointer':'not-allowed'};font-family:'Courier New',monospace;font-size:10px">💀 ${o.price} anime</button>
          </div>`;
        }).join('')}
      </div>
    </div>`);
  }

  // Sezione oggetti
  const itemOffers=G._shopOffers.filter(o=>o.type==='item');
  if(itemOffers.some(o=>!o.bought)){
    sections.push(`<div style="margin-bottom:14px">
      <div style="font-size:11px;color:#f0c040;letter-spacing:1px;margin-bottom:6px;border-bottom:1px solid #222;padding-bottom:3px">🎒 OGGETTI</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
        ${itemOffers.map(o=>{
          const i=G._shopOffers.indexOf(o);
          if(o.bought)return`<div style="background:#0d0d1a;border:1px solid #222;border-radius:8px;padding:10px;opacity:0.35;text-align:center"><div style="font-size:11px;color:#555">Venduto</div></div>`;
          const it=o.data,r=RARITY_DATA[it.rarity||1],can=(G.coins||0)>=o.price;
          return`<div style="background:#12121e;border:2px solid ${r.color};border-radius:8px;padding:10px;box-shadow:0 0 6px ${r.glow};text-align:center">
            <div style="font-size:28px;margin-bottom:4px">${it.icon}</div>
            <div style="font-weight:bold;color:#e0e0e0;font-size:11px;margin-bottom:3px">${it.name}</div>
            <div style="margin-bottom:4px">${rarityBadge(it)}</div>
            <div style="font-size:9px;color:#aaa;margin-bottom:6px">${it.desc}</div>
            <button onclick="buyShopItem(${i})" ${can?'':'disabled'} style="width:100%;padding:4px;border-radius:4px;border:1px solid ${can?'#f0c040':'#3a3000'};background:transparent;color:${can?'#f0c040':'#555'};cursor:${can?'pointer':'not-allowed'};font-family:'Courier New',monospace;font-size:10px">💀 ${o.price} anime</button>
          </div>`;
        }).join('')}
      </div>
    </div>`);
  }

  // Sezione servizi
  const potIdx=G._shopOffers.findIndex(o=>o.type==='potion');
  const remIdx=G._shopOffers.findIndex(o=>o.type==='remove');
  const pot=G._shopOffers[potIdx],rem=G._shopOffers[remIdx];
  sections.push(`<div style="margin-bottom:14px">
    <div style="font-size:11px;color:#80d080;letter-spacing:1px;margin-bottom:6px;border-bottom:1px solid #222;padding-bottom:3px">⚗ SERVIZI</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${pot&&!pot.bought?`<div style="background:#12121e;border:1px solid #40a040;border-radius:8px;padding:10px;text-align:center">
        <div style="font-size:28px;margin-bottom:4px">🧪</div>
        <div style="font-weight:bold;color:#80d080;font-size:11px;margin-bottom:3px">Pozione di Forza</div>
        <div style="font-size:9px;color:#aaa;margin-bottom:6px">+15% HP massimi permanenti</div>
        <button onclick="buyShopItem(${potIdx})" ${(G.coins||0)>=pot.price?'':'disabled'} style="width:100%;padding:4px;border-radius:4px;border:1px solid ${(G.coins||0)>=pot.price?'#f0c040':'#3a3000'};background:transparent;color:${(G.coins||0)>=pot.price?'#f0c040':'#555'};cursor:${(G.coins||0)>=pot.price?'pointer':'not-allowed'};font-family:'Courier New',monospace;font-size:10px">💀 ${pot.price} anime</button>
      </div>`:`<div style="background:#0d0d1a;border:1px solid #222;border-radius:8px;padding:10px;opacity:0.35;text-align:center"><div style="font-size:11px;color:#555">Venduto</div></div>`}
      ${rem&&!rem.bought?`<div style="background:#12121e;border:1px solid #ff6060;border-radius:8px;padding:10px;text-align:center" id="shop-remove-box">
        <div style="font-size:28px;margin-bottom:4px">🗑</div>
        <div style="font-weight:bold;color:#ff8080;font-size:11px;margin-bottom:3px">Rimuovi Mossa</div>
        <div style="font-size:9px;color:#aaa;margin-bottom:6px">Elimina una mossa dal mazzo</div>
        <button onclick="startRemoveMove()" ${(G.coins||0)>=rem.price?'':'disabled'} style="width:100%;padding:4px;border-radius:4px;border:1px solid ${(G.coins||0)>=rem.price?'#ff6060':'#3a1010'};background:transparent;color:${(G.coins||0)>=rem.price?'#ff8080':'#555'};cursor:${(G.coins||0)>=rem.price?'pointer':'not-allowed'};font-family:'Courier New',monospace;font-size:10px">💀 ${rem.price} anime</button>
      </div>`:`<div style="background:#0d0d1a;border:1px solid #222;border-radius:8px;padding:10px;opacity:0.35;text-align:center"><div style="font-size:11px;color:#555">Venduto</div></div>`}
    </div>
  </div>`);

  document.getElementById('shop-sections').innerHTML=sections.join('');
}

function buyShopItem(i){
  const o=G._shopOffers[i];if(!o||o.bought||(G.coins||0)<o.price)return;
  G.coins-=o.price;o.bought=true;
  if(o.type==='move'){G.player.deck.push({...o.data});}
  else if(o.type==='item'&&o.data){addPlayerItem(o.data);}
  else if(o.type==='potion'){const b=Math.round(G.player.maxHp*0.15);G.player.maxHp+=b;G.player.hp=clamp(G.player.hp+b,0,G.player.maxHp);}
  renderShopInner();
}

function startRemoveMove(){
  // Mostra lista mosse da rimuovere sovrapposta nella sezione servizi
  const remIdx=G._shopOffers.findIndex(o=>o.type==='remove');
  const rem=G._shopOffers[remIdx];
  if(!rem||(G.coins||0)<rem.price)return;
  const box=document.getElementById('shop-remove-box');
  if(!box)return;
  box.innerHTML=`<div style="font-size:10px;color:#ff8080;margin-bottom:6px;font-weight:bold">Scegli la mossa da eliminare:</div>
    <div style="max-height:160px;overflow-y:auto">
      ${G.player.deck.map((m,j)=>{
        const r=RARITY_DATA[m.rarity||1];
        return`<div onclick="confirmRemoveMove(${j})" style="padding:4px 6px;border:1px solid ${r.color};border-radius:4px;margin-bottom:3px;cursor:pointer;background:#0d0d1a;font-size:9px;display:flex;justify-content:space-between;align-items:center" onmouseover="this.style.background='#1a0808'" onmouseout="this.style.background='#0d0d1a'">
          <span style="color:#e0e0e0">${m.name}${m._upgraded?'<span style="color:#f0c040;font-size:8px;margin-left:4px">★</span>':''}</span>
          <span style="color:#888">⚡${m.cost||1}</span>
        </div>`;
      }).join('')}
    </div>
    <button onclick="renderShopInner()" style="margin-top:6px;font-size:9px;padding:2px 8px;border:1px solid #555;background:transparent;color:#888;border-radius:3px;cursor:pointer;font-family:'Courier New',monospace">Annulla</button>`;
}

function confirmRemoveMove(j){
  const remIdx=G._shopOffers.findIndex(o=>o.type==='remove');
  const rem=G._shopOffers[remIdx];
  if(!rem||(G.coins||0)<rem.price)return;
  G.coins-=rem.price;rem.bought=true;
  const removed=G.player.deck.splice(j,1)[0];
  // rimuovi dalla mano e dagli scarti se presente
  G.player.moves=G.player.moves.filter(m=>m.id!==removed.id);
  G.player.discard=G.player.discard.filter(m=>m.id!==removed.id);
  renderShopInner();
}

// ── FORGIA ────────────────────────────────────────────────────────────────────
const FORGE_COST={1:30,2:55,3:85,4:120,5:190};

function showForgeEnter(){
  if(npcShopBlocked('andre','images/forgia.png'))return;
  showScreen('forge-enter');
  const actions=document.querySelector('#screen-forge-enter > div:last-child');
  if(actions)actions.innerHTML=`${npcFightButton('andre')}<button class="btn" onclick="andreForgeFarewell()" style="font-size:11px;padding:5px 14px">Ignora e prosegui</button>`;
  const andre=document.getElementById('andre-img');
  if(andre){andre.style.pointerEvents='';andre.style.cursor='pointer';}
  setSceneNpcLine('screen-forge-enter','andre','entry');
  setTimeout(()=>_applySpritePos('andre-img',ANDRE_POS),0);
}

function openForgeInner(){
  if(npcShopBlocked('andre','images/forgia.png'))return;
  showScreen('forge');
  document.getElementById('forge-coins').textContent=G.coins||0;
  renderForgeList();
}

// Calcola il potenziamento parametrico di una mossa secondo priorità:
// colpi > potenza > costo. Restituisce null se già potenziata.
function calcUpgrade(m){
  if(m._upgraded)return null; // già potenziata
  const up={...m,_upgraded:true};
  // Priorità: hits > power > cost
  if(m.hits&&m.hits>0){
    up.hits=m.hits+1;
    up._upgradeDesc=`Colpi: ${m.hits} → ${up.hits}`;
  } else if(m.power&&m.power>0){
    up.power=Math.round((m.power+0.2)*10)/10;
    up._upgradeDesc=`Potenza: ${m.power} → ${up.power}`;
  } else if((m.cost||1)>1){
    up.cost=Math.max(1,(m.cost||1)-1);
    up._upgradeDesc=`Costo: ${m.cost||1} → ${up.cost} energia`;
  } else {
    // heal/buff senza power: riduci costo se possibile, altrimenti boost generico
    if((m.cost||1)>1){up.cost=Math.max(1,(m.cost||1)-1);up._upgradeDesc=`Costo: ${m.cost||1} → ${up.cost} energia`;}
    else{up._genericBoost=true;up._upgradeDesc='Efficacia potenziata (+20%)';}
  }
  return up;
}

function renderForgeList(){
  document.getElementById('forge-coins').textContent=G.coins||0;
  const deck=G.player.deck;
  document.getElementById('forge-list').innerHTML=deck.map((m,i)=>{
    const r=RARITY_DATA[m.rarity||1];
    const cost=routeShopPrice(FORGE_COST[m.rarity||1]);
    const canUpgrade=!m._upgraded&&(G.coins||0)>=cost;
    const alreadyUp=m._upgraded;
    return`<div onclick="${alreadyUp?'':'selectForgeMove('+i+')'}"
      style="padding:8px 10px;border:1px solid ${alreadyUp?'#333':r.color};border-radius:6px;margin-bottom:5px;cursor:${alreadyUp?'default':'pointer'};background:#0d0d1a;transition:background .15s;opacity:${alreadyUp?0.5:1}"
      onmouseover="if(!${alreadyUp})this.style.background='#141424'" onmouseout="this.style.background='#0d0d1a'">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:11px;font-weight:bold;color:${alreadyUp?'#555':'#e0e0e0'}">${m.name}${alreadyUp?' <span style="color:#f0c040;font-size:9px">★ Potenziata</span>':''}</span>
        <span class="mtype type-${m.type}">${m.type.toUpperCase()}</span>
      </div>
      <div style="display:flex;gap:6px;align-items:center;margin-top:2px">${rarityBadge(m)}<span style="font-size:9px;color:#60c0ff">⚡${m.cost||1}</span><span style="font-size:9px;color:${canUpgrade?'#f0c040':'#555'};margin-left:auto">💀${cost}</span></div>
    </div>`;
  }).join('')||'<p style="color:#555;font-size:11px;text-align:center;padding:20px">Nessuna mossa nel mazzo</p>';
}

function selectForgeMove(i){
  const m=G.player.deck[i];
  if(!m||m._upgraded)return;
  const up=calcUpgrade(m);
  const cost=routeShopPrice(FORGE_COST[m.rarity||1]);
  const canAfford=(G.coins||0)>=cost;
  const r=RARITY_DATA[m.rarity||1];

  document.getElementById('forge-preview').innerHTML=`
    <div style="width:100%">
      <div style="font-size:10px;color:#888;text-align:center;margin-bottom:8px">PRIMA → DOPO</div>
      <!-- Carta originale -->
      <div style="background:#12121e;border:1px solid ${r.color};border-radius:8px;padding:10px;margin-bottom:8px;opacity:0.7">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-weight:bold;color:#aaa;font-size:11px">${m.name}</span>
          <span class="mtype type-${m.type}">${m.type.toUpperCase()}</span>
        </div>
        <div style="display:flex;gap:4px;margin-bottom:4px">${rarityBadge(m)}<span style="font-size:9px;color:#60c0ff">⚡${m.cost||1}</span>${m.power?`<span style="font-size:9px;color:#888">P:${m.power}</span>`:''}${m.hits?`<span style="font-size:9px;color:#888">×${m.hits}</span>`:''}</div>
      </div>
      <!-- Freccia -->
      <div style="text-align:center;font-size:18px;color:#ff8040;margin-bottom:8px">▼</div>
      <!-- Carta potenziata -->
      <div style="background:#12121e;border:2px solid #ff8040;border-radius:8px;padding:10px;margin-bottom:10px;box-shadow:0 0 12px #ff804044">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-weight:bold;color:#e0e0e0;font-size:11px">${up.name} <span style="color:#f0c040;font-size:9px">★</span></span>
          <span class="mtype type-${up.type}">${up.type.toUpperCase()}</span>
        </div>
        <div style="display:flex;gap:4px;margin-bottom:4px">${rarityBadge(up)}<span style="font-size:9px;color:#60c0ff">⚡${up.cost||1}</span>${up.power?`<span style="font-size:9px;color:#ff8040">P:${up.power}</span>`:''}${up.hits?`<span style="font-size:9px;color:#ff8040">×${up.hits}</span>`:''}</div>
        <div style="font-size:10px;color:#ff8040;font-weight:bold;margin-bottom:4px">✦ ${up._upgradeDesc}</div>
        <div style="font-size:9px;color:#aaa">${up.desc||''}</div>
      </div>
      <button onclick="confirmForgeUpgrade(${i})" ${canAfford?'':'disabled'}
        style="width:100%;padding:8px;border-radius:6px;border:2px solid ${canAfford?'#ff8040':'#3a1800'};background:${canAfford?'#1a0d00':'transparent'};color:${canAfford?'#ff8040':'#555'};cursor:${canAfford?'pointer':'not-allowed'};font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px">
        ${canAfford?`🔨 Potenzia — 💀 ${cost} anime`:`Anime insufficienti (${cost} richieste)`}
      </button>
    </div>`;
}

function confirmForgeUpgrade(i){
  const m=G.player.deck[i];if(!m||m._upgraded)return;
  const cost=routeShopPrice(FORGE_COST[m.rarity||1]);
  if((G.coins||0)<cost)return;
  const up=calcUpgrade(m);
  if(!up)return;
  G.coins-=cost;
  // Applica upgrade in-place
  Object.assign(G.player.deck[i],up);
  // Aggiorna anche le copie in mano se presenti
  G.player.moves.forEach((mv,j)=>{if(mv.id===m.id)Object.assign(G.player.moves[j],up);});
  // Mostra conferma e chiudi forgia
  document.getElementById('forge-preview').innerHTML=`<div style="text-align:center"><div style="font-size:32px;margin-bottom:8px">⚒</div><div style="color:#ff8040;font-weight:bold;font-size:13px;margin-bottom:4px">${up.name} potenziata!</div><div style="color:#f0c040;font-size:11px">${up._upgradeDesc}</div></div>`;
  renderForgeList();
  // Chiudi automaticamente dopo 1.5s
  setTimeout(()=>andreForgeFarewell(),1500);
}

// ── MOSSE OFFER ───────────────────────────────────────────────────────────────
const movCard=(m,onclick,dim)=>{const r=RARITY_DATA[m.rarity||1];return`<div class="mccard" onclick="${onclick}" style="border-color:${dim?'#ff6060':r.color};box-shadow:0 0 8px ${dim?'rgba(255,0,0,.2)':r.glow}">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><span style="font-weight:bold;color:#e0e0e0;font-size:11px">${m.name}</span><span class="mtype type-${m.type}">${m.type.toUpperCase()}</span></div>
  <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px">${rarityBadge(m)}<span style="font-size:9px;color:#60c0ff">⚡${m.cost||1}</span></div>
  <div style="font-size:9px;color:#aaa">${m.desc||''}</div>
</div>`;};

function showMoveOffer(){
  const pool=getRewardPool(G.player.id).filter(m=>!G.player.deck.find(pm=>pm.id===m.id));
  const offered=[],used=new Set();let att=0;
  while(offered.length<3&&att<30){att++;const r=rollRarity();const c=pool.filter(m=>m.rarity===r&&!used.has(m.id));if(!c.length)continue;const m=choice(c);offered.push(m);used.add(m.id);}
  while(offered.length<3){const m=pool.find(m=>!used.has(m.id));if(!m)break;offered.push(m);used.add(m.id);}
  G._moveOffer=offered;G._newMove=null;
}
function pickMove(i){
  G._newMove={...G._moveOffer[i]};
  G.player.deck.push(G._newMove);
  G._newMove=null;
  completeEvent();
}

// ── ITEM OFFER ────────────────────────────────────────────────────────────────
function showItemOffer(){
  showScreen('item');
  const pool=shuffle(ITEMS.filter(i=>!i.unique&&!G.player.items?.find(pi=>pi.id===i.id))).slice(0,3);
  G._itemOffer=pool;
  document.getElementById('item-offer-grid').innerHTML=pool.map((it,i)=>{
    const r=RARITY_DATA[it.rarity||1];
    return`<div class="inv-item" onclick="pickItem(${i})" style="border-color:${r.color};box-shadow:0 0 6px ${r.glow}">
      <div style="font-size:28px;margin-bottom:6px">${it.icon}</div>
      <div class="iname" style="color:${r.color}">${it.name}</div>
      <div style="margin-bottom:4px">${rarityBadge(it)}</div>
      <div class="idesc">${it.desc}</div>
    </div>`;
  }).join('');
}
function pickItem(i){const item=G._itemOffer[i];addPlayerItem(item);completeEvent();}

// ── GAME OVER / VITTORIA ──────────────────────────────────────────────────────
function showGameOver(){
  stopGwynPacifistMusic();
  showScreen('gameover');
  document.getElementById('go-sprite').innerHTML=G.player?`<img src="${SPRITES[G.player.id]}" style="width:80px;height:100px;object-fit:contain;opacity:.25;transform:rotate(90deg)">`:''  ;
  document.getElementById('gameover-msg').innerHTML=`Sei caduto a ${zoneName(G.zone)}.<br>L'oscurità ti ha inghiottito.<br><br><span style="color:#666;font-size:10px">Ogni sconfitta è una lezione.</span>`;
}
function showVictory(){
  stopGwynPacifistMusic();
  showScreen('victory');
  document.getElementById('vic-sprite').innerHTML=G.player?`<img src="${SPRITES[G.player.id]}" style="width:100px;height:120px;object-fit:contain">`:'' ;
  document.getElementById('victory-msg').innerHTML=`Hai raggiunto la Fornace della Prima Fiamma.<br>Il viaggio è compiuto.<br><br><span style="color:#666;font-size:10px">Sei un vero eroe.</span>`;
}
function restartGame(){initGame();showScreen('title');buildTitleHeroCards();}

// ── TITLE HERO CARDS ─────────────────────────────────────────────────────────
function buildTitleHeroCards(){
  const grid=document.getElementById('title-hero-cards');
  if(!grid)return;
  grid.innerHTML=CLASSES.map(cls=>{
    const spr=SPRITES[cls.id]||'';
    return`<div class="hero-card" style="--hc:${cls.color}44;border-color:#2a2a3a">
      <img src="${spr}" alt="${cls.name}" onerror="this.style.display='none'">
      <div class="hc-name" style="color:${cls.color}">${cls.name}</div>
      <div class="hc-hp">❤ HP ${cls.hp}</div>
      <div class="hc-stat"><span>STR</span><b>${cls.strength||10}</b></div>
      <div class="hc-stat"><span>VIG</span><b>${cls.vigor||10}</b></div>
      <div class="hc-stat"><span>INT</span><b>${cls.intelligence||10}</b></div>
      <div class="hc-stat"><span>DEX</span><b>${cls.dexterity||10}</b></div>
      <div class="hc-stat"><span>FAI</span><b>${cls.faith||10}</b></div>
      <div class="hc-stat"><span>ARC</span><b>${cls.arcane||10}</b></div>
    </div>`;
  }).join('');
}

// ── INIT ──────────────────────────────────────────────────────────────────────
initGame();
buildTitleHeroCards();


