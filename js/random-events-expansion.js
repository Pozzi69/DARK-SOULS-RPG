// Random events expansion for Depths, Blighttown and Sen's Fortress.
// Loaded after the core files so it can extend data and replace event dispatch.
(function(){
  const EVENT_IMAGES={
    muro:"images/evento_muro_sospetto.png",
    kirk1:"images/evento_kirk_esca.png",
    kirk2:"images/evento_kirk_invasione.png",
    fat:"images/evento_passaggio_stretto.png",
    quelanaHidden:"images/evento_quelana_invisibile.png",
    fairLady:"images/evento_fair_lady.png",
    quelana2:"images/evento_quelana_blighttown.png",
    inserto:"images/evento_parassita_blighttown.png",
    siegmeyerBlight:"images/evento_siegmeyer_blighttown.png",
    siegmeyerSens:"images/evento_siegmeyer_sens.png",
    siegmeyerAnor:"images/evento_siegmeyer_anor_londo.png",
    siegmeyerLost:"images/evento_siegmeyer_lost_izalith.png",
    axes:"images/evento_trappola_asce_sens.png",
    arrows:"images/evento_trappola_frecce_sens.png",
    rock:"images/evento_trappola_roccia_sens.png",
    loganKeySens:"images/evento_chiave_logan_sens.png",
    loganCageSens:"images/evento_logan_gabbia_sens.png",
    dukesArchiveKey:"images/evento_chiave_archivi_duca.png",
    dukesLoganCage:"images/evento_logan_gabbia_archivi.png",
    dukesLoganLibrary:"images/evento_logan_biblioteca.png",
    dukesMadLogan:"images/evento_logan_impazzito.png",
    giantBlacksmith:"images/evento_fabbro_gigante.png",
    anorSolaire:"images/evento_solaire_anor_londo.png",
    gwynevere:"images/evento_gwynevere.png",
    gwyndolinReveal:"images/evento_gwyndolin_rivelazione.png",
    blackEyeOrb:"images/evento_globo_occhio_nero.png",
    lautrec:"images/evento_lautrec_invasione.png",
    ingward:"images/evento_ingward.png",
    distantItem:"images/evento_oggetto_petitelondo.png",
    magicBlacksmith:"images/evento_fabbro_magico.png",
    darkrootHydraHavel:"images/evento_hydra_havel.png",
    darkrootLakeItem:"images/evento_oggetto_lago_darkroot.png",
    darkrootTunnelBonfire:"images/evento_falo_tunnel_darkroot.png",
    darkrootRiskyBonfire:"images/evento_falo_rischioso_darkroot.png",
    artoriasHunters:"images/evento_alvina_cacciatori.png",
    artoriasTomb:"images/evento_tomba_artorias.png",
    artoriasHornetRing:"images/evento_anello_calabrone.png",
    lostSolaireSaved:"images/evento_solaire_salvato_lost_izalith.png",
    lostSolaireMad:"images/evento_solaire_pazzo_lost_izalith.png",
    quelanaTomb:"images/evento_tomba_quelana.png",
    kilnThreshold:"images/fornace_panorama.png"
  };

  const PYRO_MOVES=[
    {id:'pyro_fireball',name:'Palla di Fuoco',type:'mag',rarity:1,cost:1,power:0.65,effect:'burn',desc:'Infliggi 65% INT. Può bruciare.'},
    {id:'pyro_fireball_intense',name:'Palla di Fuoco Intensa',type:'mag',rarity:2,cost:2,power:0.95,effect:'burn',desc:'Infliggi 95% INT. Può bruciare.'},
    {id:'pyro_chaos_fireball',name:'Palla di Fuoco Caotica',type:'mag',rarity:3,cost:3,power:1.2,effect:'burn',desc:'Infliggi 120% INT e bruciatura.'},
    {id:'pyro_flame_whirl',name:'Fiamma Vorticosa',type:'mag',rarity:2,cost:2,power:0.55,hits:2,effect:'burn',desc:'2 colpi da 55% INT. Può bruciare.'},
    {id:'pyro_combustion',name:'Combustione',type:'mag',rarity:1,cost:1,power:0.8,desc:'Infliggi 80% INT.'},
    {id:'pyro_wildfire',name:'Fuoco Selvaggio',type:'mag',rarity:2,cost:2,power:0.45,aoe:true,effect:'burn',desc:'Infliggi 45% INT a tutti. Può bruciare.'},
    {id:'pyro_fire_rain',name:'Pioggia di Fuoco',type:'mag',rarity:3,cost:3,power:0.45,hits:3,effect:'burn',desc:'3 colpi da 45% INT. Può bruciare.'},
    {id:'pyro_flame_fury',name:'Furia di Fiamma',type:'buff',rarity:3,cost:2,effect:'infernal_contract',desc:'ATK, DEF e MAG ▲3 stage per 5 turni.'},
    {id:'pyro_great_fireball',name:'Grande Palla di Fuoco',type:'mag',rarity:3,cost:3,power:1.35,effect:'burn',desc:'Infliggi 135% INT. Può bruciare.'},
    {id:'pyro_great_chaos_fireball',name:'Grande Palla di Fuoco Caotica',type:'mag',rarity:4,cost:4,power:1.65,effect:'burn',desc:'Infliggi 165% INT e bruciatura.'}
  ];

  const BLACK_EYE_ORB_CURSE={id:'black_eye_orb_curse',name:"Globo dell'Occhio Cinereo",type:'curse',rarity:3,cost:0,_curse:true,desc:'Maledizione: occupa uno slot nel mazzo e non puo essere giocata.'};
  const LOGAN_KEY_CURSE={id:'logan_key_curse',name:'Chiave della Gabbia di Logan',type:'curse',rarity:3,cost:0,_curse:true,desc:'Maledizione: occupa uno slot nel mazzo finche non liberi Logan.'};
  const LOGAN_ARCHIVE_KEY_CURSE={id:'logan_archive_key_curse',name:'Chiave misteriosa degli Archivi',type:'curse',rarity:3,cost:0,_curse:true,desc:'Maledizione: occupa uno slot nel mazzo finche non scopri quale gabbia apre.'};

  const QUEST_MOVES=[
    {id:'resist_curse',name:'Resistenza Maledizioni',type:'buff',rarity:2,cost:1,effect:'buff_def_1s_5t',desc:'DEF su per 5 turni. Incantesimo dei Sigillatori di Petite Londo.'},
    {id:'soul_arrow',name:"Freccia dell'Anima",type:'mag',rarity:1,cost:1,power:0.9,desc:'Infliggi 90% INT.'},
    {id:'great_soul_arrow',name:"Possente Freccia dell'Anima",type:'mag',rarity:2,cost:2,power:1.35,desc:'Infliggi 135% INT.'},
    {id:'gwyn_lightning',name:'Fulmine di Gwyn',type:'mag',rarity:4,cost:4,power:2.25,effect:'debuff_def',desc:'Miracolo devastante. Infligge 225% INT e abbassa la DEF nemica.'},
    {id:'forest_hunter',name:'Cacciatore della Foresta',type:'buff',rarity:3,cost:2,effect:'spectral_form',desc:'Schivata +40% e critico potenziato per 4 turni.'},
    {id:'magic_sword',name:'Spada magica',type:'buff',rarity:2,cost:1,effect:'buff_mag_self5',desc:'MAG su per 5 turni. Un fondamento della scuola di Vinheim.'},
    {id:'magic_shield',name:'Scudo magico',type:'buff',rarity:2,cost:1,effect:'buff_def_2s_3t',desc:'DEF su per 3 turni.'},
    {id:'great_heavy_soul_arrow',name:"Grande pesante Freccia dell'Anima",type:'mag',rarity:3,cost:3,power:1.65,desc:'Infliggi 165% INT.'},
    {id:'homing_soulmass',name:'Proiettili a ricerca',type:'mag',rarity:3,cost:3,power:0.55,hits:3,desc:'3 colpi da 55% INT.'},
    {id:'soul_spear',name:"Lancia dell'Anima",type:'mag',rarity:3,cost:3,power:1.9,effect:'debuff_def',desc:'Infliggi 190% INT e abbassi la DEF.'},
    {id:'crystal_soul_spear',name:"Lancia dell'Anima di Cristallo",type:'mag',rarity:4,cost:4,power:2.45,effect:'debuff_def',desc:'Infliggi 245% INT e abbassi la DEF.'},
    {id:'homing_crystal_soulmass',name:'Cristalli a ricerca',type:'mag',rarity:4,cost:4,power:0.55,hits:5,desc:'5 colpi da 55% INT.'},
    {id:'white_dragon_breath',name:'Soffio di cristallo del drago bianco',type:'mag',rarity:4,cost:4,power:1.55,aoe:true,effect:'debuff_def',desc:'Infliggi 155% INT a tutti e incrina la DEF.'}
  ];

  const GIANT_BLACKSMITH_SHOP=[
    {id:'giant_helm',name:'Elmo del Gigante',slot:'helmet',rarity:3,def:7,bonus:{vigor:2,strength:1},passiveDesc:'Parte del set del gigante.',setId:'giant',icon:'H',price:90},
    {id:'giant_armor',name:'Corazza del Gigante',slot:'armor',rarity:3,def:12,bonus:{vigor:3,strength:1},passiveDesc:'Parte del set del gigante.',setId:'giant',icon:'A',price:120},
    {id:'giant_gauntlets',name:'Guanti del Gigante',slot:'gloves',rarity:3,def:5,bonus:{strength:2},passiveDesc:'Parte del set del gigante.',setId:'giant',icon:'G',price:80},
    {id:'giant_leggings',name:'Gambali del Gigante',slot:'legs',rarity:3,def:5,bonus:{vigor:2},passiveDesc:'Parte del set del gigante.',setId:'giant',icon:'B',price:80},
    {id:'giant_halberd',name:'Alabarda del Gigante',slot:'weapon',rarity:4,def:0,bonus:{strength:10,dexterity:4},passiveDesc:'Attacchi fisici pesanti, pensati per build forza.',setId:null,icon:'P',price:150},
    {id:'giant_shield',name:'Scudo del Gigante',slot:'offhand',rarity:4,def:12,bonus:{vigor:4,strength:2},passiveDesc:'Difesa altissima, ma richiede braccia solide.',setId:null,icon:'S',price:130}
  ];

  const MAGIC_BLACKSMITH_SHOP=[
    {kind:'move',id:'soul_arrow',price:55},
    {kind:'move',id:'great_soul_arrow',price:90},
    {kind:'equip',id:'mage_catalyst',name:'Catalizzatore del Mago',slot:'weapon',rarity:3,def:0,bonus:{intelligence:8,arcane:3},passiveDesc:'Le magie colpiscono con piu stabilita.',setId:null,icon:'C',price:120}
  ];

  const LOGAN_ARCHIVE_SHOP=[
    {id:'magic_sword',price:70},
    {id:'magic_shield',price:70},
    {id:'great_heavy_soul_arrow',price:135},
    {id:'homing_soulmass',price:145},
    {id:'soul_spear',price:170},
    {id:'crystal_soul_spear',price:235},
    {id:'homing_crystal_soulmass',price:245},
    {id:'white_dragon_breath',price:270}
  ];

  function addData(){
    if(!ITEMS.some(i=>i.id==='large_ember'))ITEMS.push({id:'large_ember',name:'Tizzone Grande',icon:'🔥',rarity:4,unique:true,desc:'Reliquia da forgia. Andre potrà usarla per potenziamenti futuri.',effect:'large_ember'});
    if(!ITEMS.some(i=>i.id==='logan_freed'))ITEMS.push({id:'logan_freed',name:'Promessa di Logan',icon:'📘',rarity:3,unique:true,desc:'Logan è stato liberato. Il suo shop sarà disponibile in seguito.',effect:'logan_freed'});
    if(!ALL_EQUIPMENT.beast_dark_ring)ALL_EQUIPMENT.beast_dark_ring={id:'beast_dark_ring',name:'Anello della Bestia Oscura',slot:'ring',def:0,bonus:{strength:4,dexterity:4,arcane:2},passiveDesc:'Critici +10% quando sei sotto il 50% HP.',setId:null,icon:'💍'};
    if(!EQUIP_POOL.some(e=>e.id==='beast_dark_ring'))EQUIP_POOL.push(ALL_EQUIPMENT.beast_dark_ring);
    if(!EQUIP_POOL.some(e=>e.id==='pyromancy_flame'))EQUIP_POOL.push({id:'pyromancy_flame',name:'Mano per Piromanzie',slot:'weapon',rarity:3,def:0,bonus:{intelligence:4,faith:4,arcane:4},passiveDesc:'Le piromanzie sono più facili da sostenere.',setId:null,icon:'🔥'});
    if(!ALL_EQUIPMENT.giant_blacksmith_hammer)ALL_EQUIPMENT.giant_blacksmith_hammer={id:'giant_blacksmith_hammer',name:'Martello del Fabbro Gigante',slot:'weapon',rarity:4,def:0,bonus:{strength:14,vigor:3},passiveDesc:'Colpi fisici poderosi. Ricordo di una scelta crudele.',setId:null,icon:'M',eventOnly:true};
    if(!ALL_EQUIPMENT.zweihander_siegmeyer)ALL_EQUIPMENT.zweihander_siegmeyer={id:'zweihander_siegmeyer',name:'Zweihander di Siegmeyer',slot:'weapon',rarity:4,def:0,bonus:{strength:18,vigor:5},passiveDesc:'I colpi fisici pesanti diventano piu affidabili. Arma conclusiva della quest di Siegmeyer.',setId:null,icon:'Z',eventOnly:true};
    if(!ALL_EQUIPMENT.sun_shield)ALL_EQUIPMENT.sun_shield={id:'sun_shield',name:'Scudo del Sole',slot:'offhand',rarity:4,def:10,bonus:{faith:8,vigor:4},passiveDesc:'Cure e miracoli splendono piu forte sotto il sole.',setId:null,icon:'S',eventOnly:true};
    if(!ALL_EQUIPMENT.logan_crystal_catalyst)ALL_EQUIPMENT.logan_crystal_catalyst={id:'logan_crystal_catalyst',name:'Catalizzatore cristallizzato di Logan',slot:'weapon',rarity:4,def:0,bonus:{intelligence:18,arcane:8,faith:4},passiveDesc:'Primo incantesimo per turno: -1 stamina. Catalizzatore finale della quest di Logan.',setId:null,icon:'L',eventOnly:true};
    if(!ALL_EQUIPMENT.havel_ring)ALL_EQUIPMENT.havel_ring={id:'havel_ring',name:"Anello di Havel",slot:'ring',rarity:4,def:0,bonus:{maxStamina:10},passiveDesc:'+10 stamina massima.',setId:null,icon:'H',eventOnly:true};
    if(!ALL_EQUIPMENT.hornet_ring)ALL_EQUIPMENT.hornet_ring={id:'hornet_ring',name:'Anello del Calabrone',slot:'ring',rarity:4,def:0,bonus:{},passiveDesc:'+50% danno critico.',setId:null,icon:'H',eventOnly:true};
    if(!ALL_EQUIPMENT.quelana_helm)ALL_EQUIPMENT.quelana_helm={id:'quelana_helm',name:'Cappuccio di Quelana',slot:'helmet',rarity:4,def:4,bonus:{intelligence:4,faith:4,arcane:4},passiveDesc:'Parte del set di Quelana.',setId:'quelana',icon:'Q',eventOnly:true};
    if(!ALL_EQUIPMENT.quelana_armor)ALL_EQUIPMENT.quelana_armor={id:'quelana_armor',name:'Veste di Quelana',slot:'armor',rarity:4,def:7,bonus:{intelligence:5,faith:5,arcane:5},passiveDesc:'Parte del set di Quelana.',setId:'quelana',icon:'Q',eventOnly:true};
    if(!ALL_EQUIPMENT.quelana_gloves)ALL_EQUIPMENT.quelana_gloves={id:'quelana_gloves',name:'Guanti di Quelana',slot:'gloves',rarity:4,def:3,bonus:{arcane:5},passiveDesc:'Parte del set di Quelana.',setId:'quelana',icon:'Q',eventOnly:true};
    if(!ALL_EQUIPMENT.quelana_legs)ALL_EQUIPMENT.quelana_legs={id:'quelana_legs',name:'Gambali di Quelana',slot:'legs',rarity:4,def:4,bonus:{dexterity:3,arcane:4},passiveDesc:'Parte del set di Quelana.',setId:'quelana',icon:'Q',eventOnly:true};
    GIANT_BLACKSMITH_SHOP.forEach(eq=>{
      if(!ALL_EQUIPMENT[eq.id])ALL_EQUIPMENT[eq.id]={...eq};
      if(!EQUIP_POOL.some(e=>e.id===eq.id))EQUIP_POOL.push({...eq});
    });
    MAGIC_BLACKSMITH_SHOP.filter(o=>o.kind==='equip').forEach(eq=>{
      if(!ALL_EQUIPMENT[eq.id])ALL_EQUIPMENT[eq.id]={...eq};
      if(!EQUIP_POOL.some(e=>e.id===eq.id))EQUIP_POOL.push({...eq});
    });
    if(!ITEMS.some(i=>i.id==='lordvessel'))ITEMS.push({id:'lordvessel',name:'Ricettacolo degli Dei',icon:'V',rarity:4,unique:true,desc:'Un vaso sacro destinato al Prescelto. Non ha effetto immediato.',effect:'lordvessel'});
    PYRO_MOVES.forEach(m=>{if(!ALL_MOVES.some(x=>x.id===m.id))ALL_MOVES.push(m);});
    QUEST_MOVES.forEach(m=>{if(!ALL_MOVES.some(x=>x.id===m.id))ALL_MOVES.push(m);});
    if(!ALL_MOVES.some(m=>m.id==='inner_power'))ALL_MOVES.push({id:'inner_power',name:'Forza Interiore',type:'buff',rarity:3,cost:2,effect:'self_cost_20_dmgbuff',desc:'Perdi 20% HP. Danni +50% per 3 turni.'});
    if(!ENEMIES.some(e=>e.id==='kirk'))ENEMIES.push(enemyTpl('kirk','Kirk, Cavaliere di Spine',{isElite:true,eventOnly:true,dropEquip:'beast_dark_ring'}));
    if(!ENEMIES.some(e=>e.id==='blighttown_parasite'))ENEMIES.push(enemyTpl('blighttown_parasite',"L'Inserto di Blighttown",{isElite:true,eventOnly:true,_eventRewardMove:'inner_power'}));
    if(!ENEMIES.some(e=>e.id==='giant_blacksmith'))ENEMIES.push(enemyTpl('giant_blacksmith','Fabbro Gigante',{isElite:true,eventOnly:true,dropEquip:'giant_blacksmith_hammer',hp:18,strength:18,vigor:16}));
    if(!ENEMIES.some(e=>e.id==='gwyndolin'))ENEMIES.push(enemyTpl('gwyndolin','Sole Oscuro Gwyndolin',{isElite:true,eventOnly:true,hp:16,intelligence:18,faith:18,dexterity:14}));
    if(!ENEMIES.some(e=>e.id==='lautrec'))ENEMIES.push(enemyTpl('lautrec','Lautrec di Carim',{isElite:true,eventOnly:true,dropEquip:'ring_carim',hp:16,dexterity:18,arcane:12}));
    if(!ENEMIES.some(e=>e.id==='solaire_event'))ENEMIES.push(enemyTpl('solaire_event','Solaire di Astora',{isElite:true,eventOnly:true,dropEquip:'sun_shield',hp:18,strength:16,faith:18}));
    if(!ENEMIES.some(e=>e.id==='logan_mad'))ENEMIES.push(enemyTpl('logan_mad','Logan il Grande Cappello',{isElite:true,eventOnly:true,dropEquip:'logan_crystal_catalyst',hp:20,intelligence:24,faith:8,arcane:16,dexterity:10,sprite:'images/logan.png'}));
    if(!ENEMIES.some(e=>e.id==='ceaseless_discharge'))ENEMIES.push(enemyTpl('ceaseless_discharge','Scarica Infinita',{isElite:true,eventOnly:true,hp:22,strength:18,arcane:16}));
    if(!ENEMIES.some(e=>e.id==='havel'))ENEMIES.push(enemyTpl('havel','Havel la Roccia',{isElite:true,eventOnly:true,dropEquip:'havel_ring',hp:24,strength:22,vigor:24,dexterity:6,sprite:'images/havel.png'}));
    if(!ENEMIES.some(e=>e.id==='cavaliere_nero_alabarda'))ENEMIES.push(enemyTpl('cavaliere_nero_alabarda','Cavaliere Nero Alabarda',{isElite:true,eventOnly:true,hp:18,strength:18,vigor:16,dexterity:12}));
    if(!ENEMIES.some(e=>e.id==='spirito_cavaliere_artorias'))ENEMIES.push(enemyTpl('spirito_cavaliere_artorias','Spirito del Cavaliere',{isElite:true,eventOnly:true,hp:20,strength:18,vigor:18,dexterity:14,sprite:'images/cavalierenero.png'}));
    if(!ENEMIES.some(e=>e.id==='custode_calabrone'))ENEMIES.push(enemyTpl('custode_calabrone',"Custode del Calabrone",{isElite:true,eventOnly:true,dropEquip:'hornet_ring',hp:22,strength:16,vigor:18,dexterity:18,sprite:'images/guerriero.png'}));
    ['cavaliere_argento_alabarda','cavaliere_argento_arco','cavaliere_argento_spada_scudo'].forEach(id=>{if(!ENEMIES.some(e=>e.id===id))ENEMIES.push(enemyTpl(id,id.replaceAll('_',' '),{isElite:false,eventOnly:true,sprite:`images/${id}.png`}));});
  }
  addData();

  function setEvent(img,text,buttons){
    resetNpcDialogLayout();
    document.getElementById('re-bg').style.backgroundImage=`url('${img}')`;
    document.getElementById('re-text').innerHTML=text;
    document.getElementById('re-choices').innerHTML=buttons;
    showScreen('random-event');
  }
  function pctHp(pct){return Math.max(1,Math.round(G.player.maxHp*pct));}
  function giveItem(id,msg,img=EVENT_IMAGES.muro){
    const item=ITEMS.find(i=>i.id===id);if(item&&!hasItem(id))addPlayerItem(item);
    setEvent(img,msg,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  }
  function giveMove(id,msg){
    const m=ALL_MOVES.find(x=>x.id===id);
    if(m&&!G.player.deck.some(x=>x.id===id))G.player.deck.push({...m});
    document.getElementById('re-text').innerHTML=msg;
    document.getElementById('re-choices').innerHTML=`<button class="btn" onclick="completeEvent()">Prosegui</button>`;
  }
  function hasMoveCard(id){
    const p=G.player||{};
    return [...(p.deck||[]),...(p.moves||[]),...(p.discard||[]),...(p.exhaust||[])].some(m=>m.id===id);
  }
  function removeMoveCardEverywhere(id){
    const p=G.player||{};
    ['deck','moves','discard','exhaust'].forEach(k=>{if(Array.isArray(p[k]))p[k]=p[k].filter(m=>m.id!==id);});
  }
  function healPlayer(amount){
    G.player.hp=clamp((G.player.hp||1)+amount,1,G.player.maxHp||1);
    renderPlayerHUD();
  }
  function hurtPlayer(amount){
    G.player.hp=Math.max(1,(G.player.hp||1)-amount);
    renderPlayerHUD();
  }

  const oldCompleteEvent=completeEvent;
  completeEvent=function(){
    if(G._afterRestEvent){
      const next=G._afterRestEvent;
      G._afterRestEvent=null;
      next();
      return;
    }
    oldCompleteEvent();
  };

  const EVENTS_BY_ZONE={
    undead_burg:['re_viverna','re_dark_knight','re_solaire'],
    depths:['re_depths_wall','re_depths_kirk','re_depths_fat'],
    blighttown:['re_blight_quelana','re_blight_parasite','re_blight_siegmeyer'],
    darkroot:['re_darkroot_tunnel_bonfire','re_darkroot_hydra_havel','re_darkroot_lake_item','re_darkroot_risky_bonfire'],
    artorias_grave:['re_artorias_hunters_covenant','re_artorias_knight_tomb','re_artorias_hornet_ring'],
    sens:['re_sens_axes','re_sens_arrows','re_sens_rock','re_sens_logan_key','re_sens_logan','re_sens_siegmeyer'],
    anor_londo:['re_anor_giant_blacksmith','re_anor_solaire','re_anor_gwynevere','re_anor_black_eye_orb','re_anor_orb_call','re_anor_siegmeyer'],
    new_londo:['re_new_ingward','re_new_distant_item','re_new_magic_blacksmith'],
    lost_izalith:['re_lost_siegmeyer','re_lost_fair_lady','re_lost_solaire','re_lost_quelana_tomb'],
    dukes_archives:['re_dukes_archive_key','re_dukes_logan_cage','re_dukes_logan_library','re_dukes_mad_logan'],
    kiln:['re_kiln_threshold']
  };
  const NPC_EVENT_OWNER={
    re_solaire:'solaire',
    re_depths_kirk:'kirk',
    re_blight_quelana:'quelana',
    re_blight_siegmeyer:'siegmeyer',
    re_artorias_hunters_covenant:'alvina',
    re_darkroot_hydra_havel:'havel',
    re_sens_logan:'logan',
    re_sens_siegmeyer:'siegmeyer',
    re_anor_giant_blacksmith:'giant_blacksmith',
    re_anor_solaire:'solaire',
    re_anor_gwynevere:'gwynevere',
    re_anor_orb_call:'lautrec',
    re_anor_siegmeyer:'siegmeyer',
    re_new_ingward:'ingward',
    re_new_magic_blacksmith:'magic_blacksmith',
    re_lost_siegmeyer:'siegmeyer',
    re_lost_fair_lady:'fair_lady',
    re_lost_solaire:'solaire',
    re_dukes_logan_cage:'logan',
    re_dukes_logan_library:'logan',
    re_dukes_mad_logan:'logan'
  };

  const oldStartRandomEvent=startRandomEvent;
  startRandomEvent=function(){
    const zone=G.zone||'undead_burg';
    if(!EVENTS_BY_ZONE[zone]){oldStartRandomEvent();return;}
    const pool=EVENTS_BY_ZONE[zone];
    const key=zone;
    const used=G._usedRandomEvents[key]||[];
    const available=pool.filter(id=>!used.includes(id)).filter(id=>{
      if(NPC_EVENT_OWNER[id]&&isNpcKilled(NPC_EVENT_OWNER[id]))return false;
      if(id==='re_anor_solaire')return (G.npcProgress?.solaire||0)>0;
      if(id==='re_anor_orb_call')return hasMoveCard('black_eye_orb_curse');
      if(id==='re_sens_logan_key')return !hasMoveCard('logan_key_curse')&&!hasItem('logan_freed')&&!(G.npcProgress?.logan);
      if(id==='re_sens_logan')return hasMoveCard('logan_key_curse');
      if(id==='re_sens_siegmeyer')return (G.npcProgress?.siegmeyer||0)>=1;
      if(id==='re_anor_siegmeyer')return (G.npcProgress?.siegmeyer||0)>=2;
      if(id==='re_lost_siegmeyer')return (G.npcProgress?.siegmeyer||0)>=3;
      if(id==='re_lost_solaire')return (G.npcProgress?.solaire||0)>=2;
      if(id==='re_dukes_archive_key')return !hasMoveCard('logan_archive_key_curse')&&!G.npcProgress?.loganArchivesFreed;
      if(id==='re_dukes_logan_cage')return hasMoveCard('logan_archive_key_curse')&&!G.npcProgress?.loganArchivesFreed;
      if(id==='re_dukes_logan_library')return !!G.npcProgress?.loganArchivesFreed&&!G.npcProgress?.loganShopComplete;
      if(id==='re_dukes_mad_logan')return !!G.npcProgress?.loganShopComplete;
      return true;
    });
    if(!available.length){showChestChoice();return;}
    const evId=choice(available);
    G._usedRandomEvents[key]=[...used,evId];
    if(EVENT_DISPATCH[evId])EVENT_DISPATCH[evId]();
    else oldStartRandomEvent();
  };

  window.showDevPlaytest=function(){
    G._devClass=G._devClass||'warrior';
    G._devZone=G._devZone||'undead_burg';
    G._devHumanity=clamp(G._devHumanity||0,0,totalKillableNpcs());
    G._devLordSouls=clamp(G._devLordSouls||0,0,4);
    G._devBossStart=!!G._devBossStart;
    G._devStats=G._devStats||{strength:0,vigor:0,intelligence:0,dexterity:0,faith:0,arcane:0,maxStamina:0};
    renderDevPlaytest();
    showScreen('dev-playtest');
  };
  const DEV_STAT_KEYS=[
    ['strength','STR'],['vigor','VIG'],['intelligence','INT'],
    ['dexterity','DEX'],['faith','FAI'],['arcane','ARC'],['maxStamina','Stamina']
  ];
  const DEV_GWYN_TEST_MOVE={id:'dev_gwyn_probe',name:'Colpo da Playtest',type:'atk',rarity:5,cost:1,power:4.0,scaling:'strength',desc:'Solo playtest: 400% STR per controllare le fasi boss.'};
  function renderDevPlaytest(){
    const cg=document.getElementById('dev-class-grid'),zg=document.getElementById('dev-zone-grid'),rg=document.getElementById('dev-resource-grid'),btn=document.getElementById('dev-start-btn');
    if(!cg||!zg)return;
    const maxHumanity=totalKillableNpcs();
    cg.innerHTML=CLASSES.map(cls=>`<button class="btn ${G._devClass===cls.id?'gold':''}" onclick="pickDevClass('${cls.id}')" style="font-size:10px;padding:8px;border-color:${G._devClass===cls.id?cls.color:'#556073'};color:${G._devClass===cls.id?cls.color:'#d6ddf2'}">${cls.name}</button>`).join('');
    zg.innerHTML=Object.entries(ZONES).map(([id,z])=>`<button class="btn ${G._devZone===id?'gold':''}" onclick="pickDevZone('${id}')" style="display:flex;justify-content:space-between;gap:8px;font-size:10px;padding:7px 9px;text-align:left;border-color:${G._devZone===id?'#5ee0c2':'#556073'};color:${G._devZone===id?'#5ee0c2':'#d6ddf2'}"><span>${z.name}</span><span style="color:#888">T${z.tier||1}</span></button>`).join('');
    const statSliders=DEV_STAT_KEYS.map(([key,label])=>{
      const max=key==='maxStamina'?8:180;
      const step=key==='maxStamina'?1:5;
      const value=clamp(parseInt(G._devStats?.[key],10)||0,0,max);
      const shown=key==='maxStamina'?(value?`+${value}`:'base'):(value||'base');
      return `<label style="display:grid;gap:4px;background:#0c1220;border:1px solid #263244;border-radius:7px;padding:6px">
        <span style="display:flex;justify-content:space-between;font-size:9px;color:#cbd5e1"><b>${label}</b><span style="color:#5ee0c2">${shown}</span></span>
        <input type="range" min="0" max="${max}" step="${step}" value="${value}" oninput="pickDevStat('${key}',this.value)">
      </label>`;
    }).join('');
    if(rg)rg.innerHTML=`
      <label style="display:grid;gap:5px;background:#111827;border:1px solid #334155;border-radius:8px;padding:8px">
        <span style="display:flex;justify-content:space-between;font-size:10px;color:#d6ddf2"><b>Umanita iniziale</b><span style="color:#f7f7f7">${G._devHumanity||0}/${maxHumanity}</span></span>
        <input type="range" min="0" max="${maxHumanity}" value="${G._devHumanity||0}" oninput="pickDevHumanity(this.value)">
      </label>
      <label style="display:grid;gap:5px;background:#111827;border:1px solid #334155;border-radius:8px;padding:8px">
        <span style="display:flex;justify-content:space-between;font-size:10px;color:#d6ddf2"><b>Anime dei Lord iniziali</b><span style="color:#f0c040">${G._devLordSouls||0}/4</span></span>
        <input type="range" min="0" max="4" value="${G._devLordSouls||0}" oninput="pickDevLordSouls(this.value)">
      </label>
      <label style="display:flex;align-items:center;justify-content:space-between;gap:8px;background:#111827;border:1px solid #334155;border-radius:8px;padding:8px;font-size:10px;color:#d6ddf2">
        <span><b>Parti direttamente dal boss</b><br><span style="color:#7f8ea3">Utile per Gwyn/Fornace</span></span>
        <input type="checkbox" ${G._devBossStart?'checked':''} onchange="pickDevBossStart(this.checked)">
      </label>
      <div style="display:grid;gap:7px;background:#0b1220;border:1px solid #334155;border-radius:8px;padding:8px">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
          <div style="font-size:10px;color:#d6ddf2"><b>Statistiche base playtest</b></div>
          <div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end">
            <button class="btn" onclick="setDevStatPreset('base')" style="font-size:9px;padding:3px 7px">Base</button>
            <button class="btn" onclick="setDevStatPreset('strong')" style="font-size:9px;padding:3px 7px">Forte</button>
            <button class="btn gold" onclick="setDevStatPreset('gwyn')" style="font-size:9px;padding:3px 7px">Test Gwyn fase 2</button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${statSliders}</div>
      </div>`;
    if(btn)btn.disabled=!(G._devClass&&G._devZone);
  }
  window.pickDevClass=function(id){G._devClass=id;renderDevPlaytest();};
  window.pickDevZone=function(id){G._devZone=id;renderDevPlaytest();};
  window.pickDevHumanity=function(value){G._devHumanity=clamp(parseInt(value,10)||0,0,totalKillableNpcs());renderDevPlaytest();};
  window.pickDevLordSouls=function(value){G._devLordSouls=clamp(parseInt(value,10)||0,0,4);renderDevPlaytest();};
  window.pickDevBossStart=function(value){G._devBossStart=!!value;renderDevPlaytest();};
  window.pickDevStat=function(key,value){
    G._devStats=G._devStats||{};
    const max=key==='maxStamina'?8:180;
    G._devStats[key]=clamp(parseInt(value,10)||0,0,max);
    renderDevPlaytest();
  };
  window.setDevStatPreset=function(kind){
    if(kind==='base')G._devStats={strength:0,vigor:0,intelligence:0,dexterity:0,faith:0,arcane:0,maxStamina:0};
    else if(kind==='strong')G._devStats={strength:45,vigor:35,intelligence:45,dexterity:45,faith:45,arcane:45,maxStamina:3};
    else {
      G._devClass='warrior';
      G._devZone='kiln';
      G._devHumanity=0;
      G._devLordSouls=4;
      G._devBossStart=true;
      G._devStats={strength:150,vigor:80,intelligence:80,dexterity:80,faith:80,arcane:80,maxStamina:5};
    }
    renderDevPlaytest();
  };
  function applyDevStats(player,devStats){
    if(!player||!devStats)return;
    ['strength','vigor','intelligence','dexterity','faith','arcane'].forEach(k=>{
      const v=parseInt(devStats[k],10)||0;
      if(v>0)player[k]=v;
    });
    const bonusStamina=parseInt(devStats.maxStamina,10)||0;
    if(bonusStamina>0){
      player.maxStamina=(player.maxStamina||0)+bonusStamina;
      player.baseStamina=(player.baseStamina||0)+bonusStamina;
      player.stamina=player.maxStamina;
    }
    if((parseInt(devStats.vigor,10)||0)>0){
      player.maxHp=Math.max(player.maxHp||1,Math.round(80+player.vigor*5));
      player.hp=player.maxHp;
    }
    if(Object.values(devStats).some(v=>(parseInt(v,10)||0)>0)){
      player.deck=[DEV_GWYN_TEST_MOVE,...(player.deck||[])];
    }
  }
  window.startDevPlaytest=function(){
    const cls=CLASSES.find(c=>c.id===G._devClass)||CLASSES[0];
    const zone=G._devZone||'undead_burg';
    const keepClass=G._devClass,keepZone=G._devZone,keepHumanity=clamp(G._devHumanity||0,0,totalKillableNpcs()),keepLordSouls=clamp(G._devLordSouls||0,0,4),keepBossStart=!!G._devBossStart,keepDevStats={...(G._devStats||{})};
    initGame();
    G._devClass=keepClass;G._devZone=keepZone;G._devHumanity=keepHumanity;G._devLordSouls=keepLordSouls;G._devBossStart=keepBossStart;G._devStats=keepDevStats;
    G.player=makePlayer(cls);
    applyDevStats(G.player,keepDevStats);
    G.zone=zone;
    G.floor=ZONES[zone]?.tier||1;
    G.humanity=keepHumanity;
    G.lordSoulFragments=keepLordSouls;
    G.lordSoulFragmentsByBoss={};
    ['quelag','nito','seath','four_kings'].slice(0,keepLordSouls).forEach(id=>{G.lordSoulFragmentsByBoss[id]=true;});
    G.completedZones=[];
    G.defeatedBosses={};
    G._usedRandomEvents={};
    buildMap();
    if(keepBossStart){
      startBattle(true);
      if(Object.values(keepDevStats).some(v=>(parseInt(v,10)||0)>0)){
        G.player.moves=G.player.moves.filter(m=>m.id!==DEV_GWYN_TEST_MOVE.id);
        G.player.moves.unshift({...DEV_GWYN_TEST_MOVE});
        renderBattle(false);
      }
      return;
    }
    showMap();
  };

  const EVENT_DISPATCH={
    re_viverna:()=>showEventViverna(),
    re_dark_knight:()=>showEventDarkKnight(),
    re_solaire:()=>showEventSolaire(),
    re_depths_wall:showDepthsWall,
    re_depths_kirk:showDepthsKirk,
    re_depths_fat:showDepthsFat,
    re_blight_quelana:showQuelana,
    re_blight_parasite:showBlightParasite,
    re_blight_siegmeyer:showSiegmeyer,
    re_darkroot_tunnel_bonfire:showDarkrootTunnelBonfire,
    re_darkroot_hydra_havel:showDarkrootHydraHavel,
    re_darkroot_lake_item:showDarkrootLakeItem,
    re_darkroot_risky_bonfire:showDarkrootRiskyBonfire,
    re_artorias_hunters_covenant:showArtoriasHuntersCovenant,
    re_artorias_knight_tomb:showArtoriasKnightTomb,
    re_artorias_hornet_ring:showArtoriasHornetRing,
    re_sens_axes:()=>showDodgeEvent('axes'),
    re_sens_arrows:()=>showDodgeEvent('arrows'),
    re_sens_rock:()=>showDodgeEvent('rock'),
    re_sens_logan_key:showLoganKey,
    re_sens_logan:showLogan,
    re_sens_siegmeyer:showSensSiegmeyer,
    re_anor_giant_blacksmith:showAnorGiantBlacksmith,
    re_anor_solaire:showAnorSolaire,
    re_anor_gwynevere:showAnorGwynevere,
    re_anor_black_eye_orb:showBlackEyeOrb,
    re_anor_orb_call:showOrbCall,
    re_anor_siegmeyer:showAnorSiegmeyer,
    re_new_ingward:showIngward,
    re_new_distant_item:()=>showDistantItem(1),
    re_new_magic_blacksmith:showMagicBlacksmithWall,
    re_lost_siegmeyer:showLostSiegmeyer,
    re_lost_fair_lady:showFairLady,
    re_lost_solaire:showLostSolaire,
    re_lost_quelana_tomb:showQuelanaTomb,
    re_dukes_archive_key:showDukesArchiveKey,
    re_dukes_logan_cage:showDukesLoganCage,
    re_dukes_logan_library:showDukesLoganLibrary,
    re_dukes_mad_logan:showDukesMadLogan,
    re_kiln_threshold:showKilnThreshold
  };

  function allLoganArchiveSpellsOwned(){
    return LOGAN_ARCHIVE_SHOP.every(o=>hasMoveCard(o.id));
  }
  function showDukesArchiveKey(){
    setEvent(EVENT_IMAGES.dukesArchiveKey,`Tra gli scaffali degli Archivi trovi un'altra chiave. E troppo pesante per essere casuale, ma nessuna serratura vicina sembra reclamarla. La prendi?`,`
      <button class="btn gold" onclick="takeDukesArchiveKey()">Prendi la chiave</button>
      <button class="btn" onclick="completeEvent()">Lasciala dov'e</button>`);
  }
  window.takeDukesArchiveKey=function(){
    if(!hasMoveCard(LOGAN_ARCHIVE_KEY_CURSE.id))G.player.deck.push({...LOGAN_ARCHIVE_KEY_CURSE});
    setEvent(EVENT_IMAGES.dukesArchiveKey,`La chiave finisce nel mazzo come una maledizione: non puoi usarla in combattimento, ma forse aprira qualcosa piu avanti.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };
  function showDukesLoganCage(){
    if(!hasMoveCard(LOGAN_ARCHIVE_KEY_CURSE.id)){
      showNpcEvent('logan',EVENT_IMAGES.dukesLoganCage,`Dietro le sbarre riconosci Logan. La serratura e antica, e senza la chiave puoi solo lasciarlo li.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
      return;
    }
    showNpcEvent('logan',EVENT_IMAGES.dukesLoganCage,`Logan e di nuovo intrappolato in una gabbia. Quando ti vede, inclina appena il cappello.<br><br><em>"Ah, there you are. I was beginning to wonder whether you had turned hollow."</em>`,`
      <button class="btn gold" onclick="freeDukesLogan()">Libera Logan</button>
      <button class="btn" onclick="completeEvent()">Non rischiare</button>`);
  }
  window.freeDukesLogan=function(){
    removeMoveCardEverywhere(LOGAN_ARCHIVE_KEY_CURSE.id);
    G.npcProgress=G.npcProgress||{};
    G.npcProgress.loganArchivesFreed=true;
    const pool=ALL_MOVES.filter(m=>(m.rarity||1)>=3&&!G.player.deck.some(pm=>pm.id===m.id));
    const reward=choice(pool.length?pool:ALL_MOVES.filter(m=>(m.rarity||1)>=3));
    if(reward&&!G.player.deck.some(m=>m.id===reward.id))G.player.deck.push({...reward});
    setEvent(EVENT_IMAGES.dukesLoganCage,`La serratura cede. Logan si ricompone con calma, come se fosse uscito da una sala lettura e non da una prigione. Ti lascia una mossa rara in segno di gratitudine: <b>${reward?reward.name:'una lezione silenziosa'}</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };
  function showDukesLoganLibrary(){
    if(!G.npcProgress?.loganArchivesFreed){completeEvent();return;}
    showNpcEvent('logan',EVENT_IMAGES.dukesLoganLibrary,`Trovi Logan chino sui libri degli Archivi. Le pagine riflettono una luce fredda, quasi cristallina.<br><br><em>"Brilliant, aren't they? The wisdom of Seath is unlike any sorcery known in Vinheim."</em><br><br>Ti chiede se vuoi diventare suo allievo.`,`
      <button class="btn gold" onclick="openLoganArchiveShop()">Diventa suo allievo</button>
      <button class="btn" onclick="exitLoganArchiveShop()">Non ora</button>`);
  }
  window.openLoganArchiveShop=function(){
    if(npcShopBlocked('logan',EVENT_IMAGES.dukesLoganLibrary))return;
    if(allLoganArchiveSpellsOwned()){
      G.npcProgress=G.npcProgress||{};
      G.npcProgress.loganShopComplete=true;
      setEvent(EVENT_IMAGES.dukesLoganLibrary,`Logan guarda gli scaffali, poi te. Per un attimo sembra non riconoscerti piu. <em>"..."</em>`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
      return;
    }
    const buttons=LOGAN_ARCHIVE_SHOP.map(o=>{
      const m=ALL_MOVES.find(x=>x.id===o.id);
      const owned=hasMoveCard(o.id);
      const price=routeShopPrice(o.price);
      const disabled=owned||(G.coins||0)<price;
      const label=owned?'Gia imparata':`${price} anime`;
      return `<button class="btn ${owned?'':'gold'}" ${disabled?'disabled':''} onclick="buyLoganArchiveSpell('${o.id}',${o.price})"><b>${m?.name||o.id}</b><br><span style="font-size:10px;color:#aaa">${label}</span></button>`;
    }).join('');
    setEvent(EVENT_IMAGES.dukesLoganLibrary,`Logan apre il suo grimorio. Le magie di Seath hanno un costo alto, ma qui dentro sembrano respirare come creature vive.<br><br><b>Anime:</b> ${G.coins||0}${npcKillCount()>5?npcShopFearText('logan'):''}`,`${buttons}<button class="btn" onclick="exitLoganArchiveShop()">Esci</button>`);
  };
  window.buyLoganArchiveSpell=function(id,price){
    price=routeShopPrice(price);
    if(hasMoveCard(id)||(G.coins||0)<price){openLoganArchiveShop();return;}
    const m=ALL_MOVES.find(x=>x.id===id);if(!m){openLoganArchiveShop();return;}
    G.coins-=price;
    G.player.deck.push({...m});
    openLoganArchiveShop();
  };
  window.exitLoganArchiveShop=function(){
    if(!allLoganArchiveSpellsOwned()){
      G._usedRandomEvents=G._usedRandomEvents||{};
      G._usedRandomEvents.dukes_archives=(G._usedRandomEvents.dukes_archives||[]).filter(id=>id!=='re_dukes_logan_library');
    }
    completeEvent();
  };
  function showDukesMadLogan(){
    showNpcEvent('logan',EVENT_IMAGES.dukesMadLogan,`Nella biblioteca rivedi Logan, senza armatura, con solo il grande cappello a coprirgli il volto. Non sta piu studiando: ti corre incontro come un uomo divorato dalla propria scoperta.<br><br><em>"...Who are you... Stay clear... stay clear of my work..."</em>`,`
      <button class="btn danger" onclick="startNpcBattle('logan')">Affronta Logan</button>`,{noFight:true,ignoreMassacreRefusal:true});
  }
  function showKilnThreshold(){
    setNpcDialogEvent(EVENT_IMAGES.kilnThreshold,`After your long journey, you have finally reached your destination.<br><br>You have no idea what awaits you, but you show no sign of turning back.<br><br><em>"You are filled with determination."</em>`,`<button class="btn gold" onclick="completeEvent()">Continue</button>`);
  }
  function showDepthsWall(){
    setEvent(EVENT_IMAGES.muro,`Qualcosa non torna in questo corridoio. Il muro sembra diverso dagli altri... e sul tavolo del macellaio c'è qualcosa che potrebbe essere cibo.`,`
      <button class="btn" onclick="depthsWallRoll()">Rotola contro il muro</button>
      <button class="btn" onclick="depthsWallEat()">Mangia dal tavolo</button>`);
  }
  window.depthsWallRoll=function(){
    if(Math.random()<0.5)giveItem('large_ember',`Il muro cede con un tonfo umido. Dietro trovi il <b>Tizzone Grande</b>.`);
    else setEvent(EVENT_IMAGES.muro,`Il muro non cede. Il Macellaio invece sì: ti piomba alle spalle con la mannaia alzata.`,`<button class="btn danger" onclick="startEventBattle('macellaio_pazzo')">Combatti</button>`);
  };
  window.depthsWallEat=function(){
    const dmg=pctHp(0.15);
    if(Math.random()<0.7){G.player.hp=clamp(G.player.hp+dmg,0,G.player.maxHp);setEvent(EVENT_IMAGES.muro,`Non chiederti cosa fosse. Funziona. <b>+${dmg} HP</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);}
    else{G.player.hp=Math.max(1,G.player.hp-dmg);setEvent(EVENT_IMAGES.muro,`Il cibo era avariato da tempo. <b>-${dmg} HP</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);}
  };

  function showDepthsKirk(){
    setEvent(EVENT_IMAGES.kirk1,`Un bagliore fioco si intravede tra le ombre. Qualcuno... o qualcosa... sembra averlo lasciato lì apposta.`,`
      <button class="btn" onclick="kirkIgnore()">Ignora e prosegui</button>
      <button class="btn gold" onclick="kirkTake()">Vai a prendere l'oggetto</button>`);
  }
  window.kirkIgnore=function(){
    document.getElementById('re-text').innerHTML=`Puoi apprendere una mossa casuale. Vuoi farlo?`;
    document.getElementById('re-choices').innerHTML=`<button class="btn gold" onclick="kirkLearnMove()">Sì</button><button class="btn" onclick="completeEvent()">No</button>`;
  };
  window.kirkLearnMove=function(){
    const pool=getRewardPool(G.player.id).filter(m=>!G.player.deck.some(pm=>pm.id===m.id));
    const m=choice(pool.length?pool:ALL_MOVES);
    G.player.deck.push({...m});
    giveMove(m.id,`Hai imparato <b>${m.name}</b>.`);
  };
  window.kirkTake=function(){
    setEvent(EVENT_IMAGES.kirk2,`Non eri il primo a notarlo. Kirk, Cavaliere di Spine, ti blocca la strada con un ghigno sotto l'elmo. Non lascerà passare nessuno.`,`<button class="btn danger" onclick="startEventBattle('kirk')">Combatti Kirk</button>`);
  };

  function showDepthsFat(){
    setEvent(EVENT_IMAGES.fat,`Il passaggio sembra quasi percorribile. Quasi.`,`
      <button class="btn danger" onclick="fatTry()">Tenta di passare</button>
      <button class="btn gold" onclick="fatRead()">Leggi il messaggio</button>
      <button class="btn" onclick="fatWisdom()">Rinuncia con dignità</button>`);
  }
  window.fatTry=function(){const dmg=pctHp(0.22);G.player.hp=Math.max(1,G.player.hp-dmg);setEvent(EVENT_IMAGES.fat,`Cadi di sotto con pochissima eleganza. <b>-${dmg} HP</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);};
  window.fatRead=function(){const stat=choice(['atk','def','mag']);applyStage(G.player,stat,1,3);setEvent(EVENT_IMAGES.fat,`Qualcuno è passato di qui prima di te. Probabilmente era più magro.<br><br>Ti fermi a riflettere: <b>${stat.toUpperCase()} ▲1 stage</b> per 3 turni.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);};
  window.fatWisdom=function(){G._fatWisdom=(G._fatWisdom||0)+1;setEvent(EVENT_IMAGES.fat,`Non succede nulla. Il gioco annota silenziosamente la tua saggezza.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);};

  function showQuelana(){
    if(!hasItem('gift_anello_strega')){setEvent(EVENT_IMAGES.quelanaHidden,`Una presenza antica aleggia nell'aria viziata, ma i tuoi occhi non riescono ad afferrarla.`, `<button class="btn" onclick="completeEvent()">Prosegui</button>`);return;}
    showNpcEvent('quelana',EVENT_IMAGES.quelana2,`Sei riuscito a trovarmi. Forse sei degno di apprendere ciò che so.<br><br><em>"Hmm... A mere Undead, yet you can see me? Fascinating..."</em>`,`<button class="btn gold" onclick="openQuelanaShop()">Diventa suo discepolo</button><button class="btn" onclick="completeEvent()">Vai via</button>`);
  }
  window.openQuelanaShop=function(){
    if(npcShopBlocked('quelana',EVENT_IMAGES.quelana2))return;
    if(!G.npcProgress)G.npcProgress={};G.npcProgress.quelana=1;
    renderQuelanaShop();
  };
  window.renderQuelanaShop=function(){
    const offers=[EQUIP_POOL.find(e=>e.id==='pyromancy_flame'),...PYRO_MOVES].filter(Boolean);
    document.getElementById('re-bg').style.backgroundImage=`url('${EVENT_IMAGES.quelana2}')`;
    document.getElementById('re-text').innerHTML=`Shop di Quelana<br><span style="color:#c0a0ff">Anime: ${G.coins||0}</span>${npcKillCount()>5?npcShopFearText('quelana'):''}`;
    document.getElementById('re-choices').innerHTML=offers.map((o,i)=>{
      const price=routeShopPrice(o.slot?80:35+(o.rarity||1)*25), owned=o.slot?G.player.equipment?.weapon?.id===o.id:G.player.deck.some(m=>m.id===o.id), can=(G.coins||0)>=price&&!owned;
      return `<button class="btn" ${can?`onclick="buyQuelana(${i})"`:'disabled'}>${owned?'✓ ':''}${o.name} · ${price} anime</button>`;
    }).join('')+`<button class="btn" onclick="completeEvent()">Esci</button>`;
    G._quelanaOffers=offers;
  };
  window.buyQuelana=function(i){
    const o=G._quelanaOffers?.[i];if(!o)return;
    const price=routeShopPrice(o.slot?80:35+(o.rarity||1)*25);if((G.coins||0)<price)return;
    G.coins-=price;
    if(o.slot)applyEquipPiece(G.player,o);else G.player.deck.push({...o});
    renderQuelanaShop();
  };

  function showBlightParasite(){
    setEvent(EVENT_IMAGES.inserto,`Qualcosa di vivo si muove sul muro. Non sembra accorgersi di te... ancora.`,`
      <button class="btn danger" onclick="startEventBattle('blighttown_parasite')">Attaccalo</button>
      <button class="btn" onclick="completeEvent()">Ignoralo</button>`);
  }

  function showSiegmeyer(){
    showNpcEvent('siegmeyer',EVENT_IMAGES.siegmeyerBlight,`Ah, eccoti. Stavo giusto rimuginando sul mio predicamento... questo posto è un veleno per il corpo e per l'anima. Letteralmente.<br><br><em>"The Poison Swamp... It's like quicksand in there... Mmm..."</em>`,`
      <button class="btn gold" onclick="siegmeyerTrade()">Aiuta Siegmeyer</button>
      <button class="btn" onclick="completeEvent()">Lascia stare</button>`);
  }
  window.siegmeyerTrade=function(){
    if(!G.npcProgress)G.npcProgress={};G.npcProgress.siegmeyer=Math.max(G.npcProgress.siegmeyer||0,1);
    const inv=G.player.items||[];
    if(!inv.length){setEvent(EVENT_IMAGES.siegmeyerBlight,`Non hai nulla da offrirgli. Siegmeyer sospira dentro l'elmo.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);return;}
    const lost=choice(inv);G.player.items=inv.filter(i=>i!==lost);
    const reward=choice(ITEMS.filter(i=>!i.unique&&!hasItem(i.id)));
    if(reward)addPlayerItem(reward);
    setEvent(EVENT_IMAGES.siegmeyerBlight,`Non è un granché come scambio, lo so. Ma un cavaliere di Catarina non dimentica i favori.<br><br>Hai dato <b>${lost.name}</b> e ricevuto <b>${reward?.name||'nulla'}</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };

  function showDarkrootTunnelBonfire(){
    setEvent(EVENT_IMAGES.darkrootTunnelBonfire,`Ti trovi davanti a un falò dentro un tunnel scavato nella pietra. Il calore è basso, quasi nascosto, ma sembra abbastanza vivo da offrirti riposo.<br><br>Vuoi andare a riposarci?`,`<button class="btn gold" onclick="restDarkrootTunnelBonfire()">Riposa al falò</button><button class="btn" onclick="completeEvent()">Ignoralo</button>`);
  }
  window.restDarkrootTunnelBonfire=function(){
    healPlayer(30);
    G._afterRestEvent=function(){
    setEvent(EVENT_IMAGES.darkrootTunnelBonfire,`Esci dal falò, ma ti trovi davanti una figura familiare: un Cavaliere Nero con l'alabarda blocca il tunnel.`,`<button class="btn danger" onclick="startEventBattle('cavaliere_nero_alabarda')">Combatti</button>`);
    };
    showRest();
  };

  function showDarkrootHydraHavel(){
    setEvent(EVENT_IMAGES.darkrootHydraHavel,`L'Hydra ti sta sparando addosso i suoi getti d'acqua. Nella fretta di cercare un rifugio ti ritrovi davanti a una porta di legno consumata.<br><br>Cosa fai?`,`<button class="btn danger" onclick="enterHavelDoor()">Entra</button><button class="btn" onclick="ignoreHavelDoor()">Resta fuori</button>`);
  }
  window.enterHavelDoor=function(){
    setEvent(EVENT_IMAGES.darkrootHydraHavel,`Spalanchi la porta e trovi una stanza di pietra. Dentro, una massa corazzata si volta lentamente: Havel la Roccia non sembra gradire visite.`,`<button class="btn danger" onclick="startEventBattle('havel')">Affronta Havel</button>`);
  };
  window.ignoreHavelDoor=function(){
    hurtPlayer(50);
    setEvent(EVENT_IMAGES.darkrootHydraHavel,`Esiti un secondo di troppo. Un getto dell'Hydra ti raggiunge in pieno dalla distanza. <b>-50 HP</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };

  function showDarkrootLakeItem(){
    setEvent(EVENT_IMAGES.darkrootLakeItem,`Vedi un oggetto in mezzo al lago. La superficie sembra calma, ma non capisci dove finisca l'acqua sicura e dove inizi il fondo traditore.<br><br>Cosa fai?`,`<button class="btn gold" onclick="tryDarkrootLakeItem()">Provi a prenderlo</button><button class="btn" onclick="completeEvent()">Lo lasci lì</button>`);
  }
  window.tryDarkrootLakeItem=function(){
    if(Math.random()<0.5){
      const pool=ITEMS.filter(i=>!i.unique&&!hasItem(i.id));
      const item=choice(pool.length?pool:ITEMS.filter(i=>!i.unique));
      if(item)addPlayerItem(item);
    setEvent(EVENT_IMAGES.darkrootLakeItem,`Avanzi con cautela, afferri l'oggetto e torni indietro prima che il lago ti tradisca.<br><br>Hai ottenuto <b>${item?.name||'un oggetto'}</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
      return;
    }
    hurtPlayer(50);
    setEvent(EVENT_IMAGES.darkrootLakeItem,`Il terreno sparisce sotto i piedi. Riesci a tirarti fuori, ma l'acqua e la caduta ti lasciano il segno. <b>-50 HP</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };

  function showDarkrootRiskyBonfire(){
    setEvent(EVENT_IMAGES.darkrootRiskyBonfire,`Hai appena superato una sfilza di nemici e vorresti riposarti. Vedi un falò poco più avanti, ma raggiungerlo non sarà facile.<br><br>Cosa fai?`,`<button class="btn gold" onclick="tryDarkrootRiskyBonfire()">Cerchi di raggiungerlo</button><button class="btn" onclick="completeEvent()">Lo ignori</button>`);
  }
  window.tryDarkrootRiskyBonfire=function(){
    if(Math.random()<0.5){
      healPlayer(50);
      showRest();
      return;
    }
    hurtPlayer(50);
    setEvent(EVENT_IMAGES.darkrootRiskyBonfire,`Il sentiero cede sotto il tuo peso. Ti salvi per un soffio, ma il falò resta lontano. <b>-50 HP</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };

  function showArtoriasHuntersCovenant(){
    showNpcEvent('alvina',EVENT_IMAGES.artoriasHunters,`Tra le rovine della tomba una presenza felina ti osserva senza muoversi. La voce arriva come un pensiero, fredda e antica: la foresta accetta solo chi sa cacciare.<br><br>Vuoi stringere il patto dei cacciatori?`,`<button class="btn gold" onclick="acceptForestHunters()">Accetta il patto</button><button class="btn danger" onclick="refuseForestHunters()">Rifiuta</button>`);
  }
  window.acceptForestHunters=function(){
    const m=ALL_MOVES.find(x=>x.id==='forest_hunter');
    if(m&&!G.player.deck.some(x=>x.id===m.id))G.player.deck.push({...m});
    setEvent(EVENT_IMAGES.artoriasHunters,`La presenza felina scompare tra gli alberi. Nel mazzo senti una nuova tecnica: <b>Cacciatore della Foresta</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };
  window.refuseForestHunters=function(){
    setEvent(EVENT_IMAGES.artoriasHunters,`Il silenzio si spezza. Dalle rovine emergono i protettori della foresta: mago, ladro e cavaliere ti hanno gia circondato.`,`<button class="btn danger" onclick="startForestHuntersBattle()">Combatti</button>`);
  };
  window.startForestHuntersBattle=function(){startEventGroup(['protettore_mago','protettore_ladro','protettore_cavaliere']);};

  function showArtoriasKnightTomb(){
    setEvent(EVENT_IMAGES.artoriasTomb,`Trovi una lapide spezzata con i resti di un antico guerriero. L'erba attorno alla tomba non si muove, come se il tempo qui fosse rimasto fermo.<br><br>Cosa fai?`,`<button class="btn gold" onclick="prayArtoriasKnightTomb()">Prega</button><button class="btn danger" onclick="profaneArtoriasKnightTomb()">Profana la tomba</button>`);
  }
  window.prayArtoriasKnightTomb=function(){
    G.player._artoriasBlessingCombats=Math.max(G.player._artoriasBlessingCombats||0,3);
    setEvent(EVENT_IMAGES.artoriasTomb,`Ti inginocchi davanti alla lapide. Per un istante senti una forza austera passarti nelle ossa.<br><br><b>+10% a tutte le statistiche per i prossimi 3 combattimenti.</b>`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };
  window.profaneArtoriasKnightTomb=function(){
    if(Math.random()<0.5){
      const eqPool=Object.values(ALL_EQUIPMENT).filter(e=>e&&!e.eventOnly&&e.slot&&G.player.equipment?.[e.slot]?.id!==e.id);
      const itemPool=ITEMS.filter(i=>!i.unique&&!hasItem(i.id));
      if(Math.random()<0.5&&eqPool.length){
        const eq=choice(eqPool);
        applyEquipPiece(G.player,eq);
        setEvent(EVENT_IMAGES.artoriasTomb,`Sotto la pietra trovi un pezzo d'equipaggiamento ancora utilizzabile: <b>${eq.name}</b>. Lo equipaggi subito.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
        return;
      }
      const item=choice(itemPool.length?itemPool:ITEMS.filter(i=>!i.unique));
      if(item)addPlayerItem(item);
      setEvent(EVENT_IMAGES.artoriasTomb,`Tra i resti trovi <b>${item?.name||'un oggetto'}</b>. La tomba resta muta.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
      return;
    }
    setEvent(EVENT_IMAGES.artoriasTomb,`La pietra si incrina. Dal terreno si alza uno spirito ostile, armato del rancore di chi non voleva essere disturbato.`,`<button class="btn danger" onclick="startEventBattle('spirito_cavaliere_artorias')">Combatti</button>`);
  };

  function showArtoriasHornetRing(){
    setEvent(EVENT_IMAGES.artoriasHornetRing,`Un cadavere vicino alla tomba stringe qualcosa tra le dita irrigidite: un piccolo anello decorato con il simbolo del calabrone.<br><br>Vuoi prenderlo?`,`<button class="btn gold" onclick="takeHornetRingEvent()">Prendi l'anello</button><button class="btn" onclick="completeEvent()">Lascialo</button>`);
  }
  window.takeHornetRingEvent=function(){
    if(Math.random()<0.5){
      applyEquipPiece(G.player,ALL_EQUIPMENT.hornet_ring);
      setEvent(EVENT_IMAGES.artoriasHornetRing,`Sfili l'anello senza fare rumore. Hai ottenuto <b>Anello del Calabrone</b>: i tuoi critici faranno piu male.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
      return;
    }
    setEvent(EVENT_IMAGES.artoriasHornetRing,`Appena tocchi l'anello, un custode esce dall'ombra della tomba. Se vuoi il Calabrone, dovrai guadagnartelo.`,`<button class="btn danger" onclick="startEventBattle('custode_calabrone')">Combatti il custode</button>`);
  };

  function showLoganKey(){
    setEvent(EVENT_IMAGES.loganKeySens,`Tra ingranaggi e celle sospese trovi una chiave particolare, sottile e annerita dal tempo. Non apre una porta qualunque: sembra fatta per una gabbia precisa.<br><br>Vuoi prenderla? Diventera una carta maledizione nel tuo mazzo finche non la userai.`,`<button class="btn danger" onclick="takeLoganKey()">Prendi la chiave</button><button class="btn" onclick="completeEvent()">Lasciala</button>`);
  }
  window.takeLoganKey=function(){
    if(!hasMoveCard('logan_key_curse'))G.player.deck.push({...LOGAN_KEY_CURSE});
    setEvent(EVENT_IMAGES.loganKeySens,`La chiave sparisce tra le tue cose. La senti pesare nel mazzo: non servira in combattimento, ma forse aprira una prigione.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };

  function showLogan(){
    if(!hasMoveCard('logan_key_curse')){showNpcEvent('logan',EVENT_IMAGES.loganCageSens,`Grandes tome... devono esserci da qualche parte... Ehi tu, per favore, hai una chiave?<br><br>Non puoi fare nulla. Logan rimane nella gabbia.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);return;}
    showNpcEvent('logan',EVENT_IMAGES.loganCageSens,`La serratura cede. Logan si rialza, confuso ma vivo. Ti ringrazia e promette di ricambiare più avanti.`,`<button class="btn gold" onclick="freeLogan()">Libera Logan</button>`);
  }
  window.freeLogan=function(){if(!G.npcProgress)G.npcProgress={};G.npcProgress.logan=1;removeMoveCardEverywhere('logan_key_curse');giveItem('logan_freed',`Logan è libero. La chiave usata non pesa piu sul tuo mazzo. Il suo shop sarà disponibile in seguito.`,EVENT_IMAGES.loganCageSens);};

  function showAnorGiantBlacksmith(){
    showNpcEvent('giant_blacksmith',EVENT_IMAGES.giantBlacksmith,`Tra incudini enormi e mura dorate trovi il fabbro gigante di Anor Londo. Solleva appena lo sguardo e borbotta: <em>"Forge, I can. Strong, I am."</em><br><br>Non sembra ostile, ma il suo martello potrebbe valere una follia.`,`<button class="btn gold" onclick="openGiantBlacksmithShop()">Visita il negozio</button>`);
  }
  window.openGiantBlacksmithShop=function(){
    if(npcShopBlocked('giant_blacksmith',EVENT_IMAGES.giantBlacksmith))return;
    if(!G._giantBlacksmithOffers)G._giantBlacksmithOffers=GIANT_BLACKSMITH_SHOP.map(x=>({...x,bought:false}));
    setNpcDialogEvent(EVENT_IMAGES.giantBlacksmith,`Il fabbro gigante abbassa il martello e ti lascia avvicinare all'incudine.<br><br>${npcDialogueOnlyHtml('giant_blacksmith','shop')}`,`<button class="btn gold" onclick="renderGiantBlacksmithShop()">Apri inventario</button><button class="btn" onclick="completeEvent()">Vai via</button>`);
  };
  window.renderGiantBlacksmithShop=function(){
    document.getElementById('re-bg').style.backgroundImage=`url('${EVENT_IMAGES.giantBlacksmith}')`;
    document.getElementById('re-text').innerHTML=`Il fabbro gigante apre una mano immensa verso l'armatura esposta.<br><span style="color:#c0a0ff">Anime: ${G.coins||0}</span>${npcKillCount()>5?npcShopFearText('giant_blacksmith'):''}`;
    document.getElementById('re-choices').innerHTML=(G._giantBlacksmithOffers||[]).map((o,i)=>{
      const price=routeShopPrice(o.price);
      const can=(G.coins||0)>=price&&!o.bought;
      const owned=G.player.equipment?.[o.slot]?.id===o.id;
      return `<button class="btn" ${can&&!owned?`onclick="buyGiantBlacksmithItem(${i})"`:'disabled'} style="text-align:left">
        ${owned?'Equipaggiato - ':o.bought?'Comprato - ':''}${o.name}<br><span style="font-size:9px;color:${can?'#f0c040':'#666'}">${o.slot} - DEF ${o.def||0} - ${price} anime</span>
      </button>`;
    }).join('')+`<button class="btn" onclick="completeEvent()">Esci</button>`;
  };
  window.buyGiantBlacksmithItem=function(i){
    const o=G._giantBlacksmithOffers?.[i],price=o?routeShopPrice(o.price):0;if(!o||o.bought||(G.coins||0)<price)return;
    G.coins-=price;o.bought=true;applyEquipPiece(G.player,o);
    renderGiantBlacksmithShop();
  };

  function showAnorSolaire(){
    showNpcEvent('solaire',EVENT_IMAGES.anorSolaire,`Ritrovi Solaire tra le sale di Anor Londo. Si volta verso di te con il suo solito calore impossibile.<br><br><em>"You really are fond of chatting with me, aren't you? If I didn't know better, I'd think you had feelings for me! Oh, no, dear me. Pretend you didn't hear that! Hah hah hah!"</em>`,`<button class="btn gold" onclick="completeAnorSolaire()">Prosegui</button>`);
  }
  window.completeAnorSolaire=function(){
    if(!G.npcProgress)G.npcProgress={};
    G.npcProgress.solaire=Math.max(G.npcProgress.solaire||0,2);
    completeEvent();
  };

  function showAnorGwynevere(){
    showNpcEvent('gwynevere',EVENT_IMAGES.gwynevere,`La sala della principessa è immobile, troppo luminosa per essere vera. Gwynevere ti osserva dall'alto e sussurra: <em>"Chosen Undead, I bequeath the Lordvessel to thee."</em><br><br>Cosa fai?`,`<button class="btn danger" onclick="strikeGwynevere()">Profana l'illusione</button><button class="btn gold" onclick="acceptLordvessel()">Assecondala</button>`,{noFight:true});
  }
  window.acceptLordvessel=function(){
    setNpcDialogEvent(EVENT_IMAGES.gwynevere,`Gwynevere tende verso di te il <b>Ricettacolo degli Dei</b>. La luce della cattedrale si fa immobile, come se attendesse la tua risposta.<br><br><em>"O chosen Undead. I am Gwynevere."</em><br><br>Accetti il dono?`,`<button class="btn gold" onclick="takeLordvessel()">Accetta il Ricettacolo</button><button class="btn" onclick="refuseLordvessel()">Non accettarlo</button>`);
  };
  window.takeLordvessel=function(){
    const item=ITEMS.find(i=>i.id==='lordvessel');
    if(item&&!hasItem('lordvessel'))addPlayerItem(item);
    setNpcDialogEvent(EVENT_IMAGES.gwynevere,`Ricevi il <b>Ricettacolo degli Dei</b>. La luce di Anor Londo sembra trattenere il respiro.<br><br><em>"May the flames guide thee."</em>`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };
  window.refuseLordvessel=function(){
    setNpcDialogEvent(EVENT_IMAGES.gwynevere,`Abbassi lo sguardo e lasci il Ricettacolo dov'è. Gwynevere non insiste: la sua benedizione resta sospesa nel silenzio della sala.<br><br><em>"Farewell, chosen Undead."</em>`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };
  window.strikeGwynevere=function(){
    registerNpcKill('gwynevere');
    setNpcDialogEvent(EVENT_IMAGES.gwyndolinReveal,`L'illusione si spezza. Una voce gelida riempie la cattedrale.<br><br><em>"O heretic, swathed in Dark..."</em><br><br>Gwyndolin ti condanna e appare tra le ombre.`,`<button class="btn danger" onclick="startNpcBattle('gwyndolin')">Affronta Gwyndolin</button>`);
  };

  function showBlackEyeOrb(){
    setEvent(EVENT_IMAGES.blackEyeOrb,`In una sala laterale trovi un globo scuro, freddo, quasi vivo. Dentro pulsa un'accusa antica: l'Occhio Cinereo cerca un colpevole.<br><br>Puoi prenderlo, ma diventera una carta maledizione nel tuo mazzo.`,`<button class="btn danger" onclick="takeBlackEyeOrb()">Aggiungilo al mazzo</button><button class="btn" onclick="completeEvent()">Lascialo</button>`);
  }
  window.takeBlackEyeOrb=function(){
    if(!hasMoveCard('black_eye_orb_curse'))G.player.deck.push({...BLACK_EYE_ORB_CURSE});
    setEvent(EVENT_IMAGES.blackEyeOrb,`Il globo scompare tra le tue cose. Lo sentirai ancora: occupa spazio nel mazzo, ma non risponde ai tuoi comandi.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };

  function showOrbCall(){
    setEvent(EVENT_IMAGES.blackEyeOrb,`Il Globo dell'Occhio Cinereo comincia a vibrare. Il mondo si assottiglia, come se una colpa lontana avesse finalmente lasciato una traccia.`,`<button class="btn danger" onclick="followBlackEyeOrb()">Segui la chiamata</button><button class="btn" onclick="completeEvent()">Ignora</button>`);
  }
  window.followBlackEyeOrb=function(){
    removeMoveCardEverywhere('black_eye_orb_curse');
    showNpcEvent('lautrec',EVENT_IMAGES.lautrec,`Invadi il mondo del colpevole. Lautrec di Carim ti attende con un sorriso sprezzante e le lame gia pronte.<br><br><em>"Well, what have we here?"</em>`,`<button class="btn danger" onclick="startNpcBattle('lautrec')">Affronta Lautrec</button>`,{noFight:true,ignoreMassacreRefusal:true});
  };

  function showSensSiegmeyer(){
    if(!G.npcProgress)G.npcProgress={};
    G.npcProgress.siegmeyer=Math.max(G.npcProgress.siegmeyer||0,2);
    showNpcEvent('siegmeyer',EVENT_IMAGES.siegmeyerSens,`Tra lame, massi e meccanismi assurdi ritrovi Siegmeyer seduto a riflettere.<br><br><em>"Hmm... This fortress is most peculiar. I have run up against a wall, or a gate, or perhaps merely my own confusion."</em><br><br>Ti ringrazia per avergli parlato: per ora continuera a studiare la fortezza.`,`<button class="btn gold" onclick="completeEvent()">Prosegui</button>`);
  }

  function startEventGroup(enemyIds,rewardKind,dropEquip){
    const enemies=enemyIds.map(id=>{
      const base=ENEMIES.find(e=>e.id===id)||getEnemyTemplate(id);
      const enemy=scaleEnemy(base,zoneTier());
      if(rewardKind)enemy._eventRewardMovePool=rewardKind;
      if(dropEquip)enemy.dropEquip=dropEquip;
      return enemy;
    }).filter(Boolean);
    if(!enemies.length){completeEvent();return;}
    G.enemies=enemies;G.enemy=enemies[0];resetBattleRuntimeState();G._eventBattle=true;G._mimicBattle=false;G._pendingNpcKillId=null;G._npcBattleId=null;G._pendingDropEquip=dropEquip||null;
    G.log=[];_initCombat();G.busy=false;closeMenus();
    showScreen('battle');
    document.getElementById('battle-floor-label').textContent=`EVENTO - ${zoneName(G.zone)}`;
    addLog(`Nemici in arrivo!`,'system');
    renderBattle();
  }

  function showAnorSiegmeyer(){
    showNpcEvent('siegmeyer',EVENT_IMAGES.siegmeyerAnor,`Siegmeyer e incastrato in una sala laterale. Tre cavalieri d'argento pattugliano tra lui e l'uscita.<br><br><em>"Still closed... Still closed... Mmm. This is quite a fix."</em>`,`<button class="btn danger" onclick="helpAnorSiegmeyer()">Aiutalo</button><button class="btn" onclick="completeEvent()">Non intervenire</button>`);
  }
  window.helpAnorSiegmeyer=function(){
    if(!G.npcProgress)G.npcProgress={};G.npcProgress.siegmeyer=Math.max(G.npcProgress.siegmeyer||0,3);
    const pool=['cavaliere_argento_alabarda','cavaliere_argento_arco','cavaliere_argento_spada_scudo'];
    startEventGroup([choice(pool),choice(pool),choice(pool)],'siegmeyer_epic_legendary');
  };

  function showIngward(){
    showNpcEvent('ingward',EVENT_IMAGES.ingward,`Tra i tetti allagati di Petite Londo trovi Ingward, il Sigillatore vestito di rosso. Parla piano, come chi e rimasto troppo a lungo con i fantasmi.<br><br><em>"New Londo was sacrificed to contain the Darkwraiths."</em>`,`<button class="btn gold" onclick="openIngwardShop()">Apri lo shop</button><button class="btn" onclick="completeEvent()">Vai via</button>`);
  }
  window.openIngwardShop=function(){
    if(npcShopBlocked('ingward',EVENT_IMAGES.ingward))return;
    const m=ALL_MOVES.find(x=>x.id==='resist_curse'),owned=G.player.deck.some(x=>x.id==='resist_curse'),price=routeShopPrice(85),can=(G.coins||0)>=price&&!owned;
    setEvent(EVENT_IMAGES.ingward,`Ingward offre un solo incantesimo.<br><span style="color:#c0a0ff">Anime: ${G.coins||0}</span>${npcKillCount()>5?npcShopFearText('ingward'):''}`,`<button class="btn gold" ${can?`onclick="buyIngwardResistCurse()"`:'disabled'}>${owned?'Gia posseduta':'Compra Resistenza Maledizioni'} - ${price} anime</button><button class="btn" onclick="completeEvent()">Esci</button>`);
  };
  window.buyIngwardResistCurse=function(){const price=routeShopPrice(85),m=ALL_MOVES.find(x=>x.id==='resist_curse');if(!m||(G.coins||0)<price)return;G.coins-=price;G.player.deck.push({...m});openIngwardShop();};

  function showDistantItem(rarity){
    const names={1:'comune',2:'raro',3:'epico',4:'leggendario'};
    const advance=rarity<4?`<button class="btn danger" onclick="advanceDistantItem(${rarity+1})">Avanza (-15 HP)</button>`:'';
    setEvent(EVENT_IMAGES.distantItem,`In lontananza brilla un oggetto <b>${names[rarity]}</b>. Il passaggio e stretto, scivoloso, e ogni passo verso il fondo sembra chiedere sangue.`,`${advance}<button class="btn gold" onclick="takeDistantItem(${rarity})">Prendi l'oggetto ${names[rarity]}</button>`);
  }
  window.advanceDistantItem=function(next){G.player.hp=Math.max(1,G.player.hp-15);renderPlayerHUD();showDistantItem(next);};
  window.takeDistantItem=function(rarity){
    const pool=ITEMS.filter(i=>(i.rarity||1)===rarity&&!i.unique&&!hasItem(i.id));
    const item=choice(pool.length?pool:ITEMS.filter(i=>!i.unique));
    if(item)addPlayerItem(item);
    setEvent(EVENT_IMAGES.distantItem,`Hai raccolto <b>${item?.name||'un oggetto'}</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);
  };

  function showMagicBlacksmithWall(){
    showNpcEvent('magic_blacksmith',EVENT_IMAGES.magicBlacksmith,`Noti una persona che si sporge da una fessura nel muro, come se Petite Londo l'avesse murata dentro. Vuoi provare a raggiungerla?`,`<button class="btn danger" onclick="tryReachMagicBlacksmith()">Si</button><button class="btn" onclick="completeEvent()">No</button>`);
  }
  window.tryReachMagicBlacksmith=function(){
    if(Math.random()<0.5){G.player.hp=Math.max(1,G.player.hp-20);renderPlayerHUD();setEvent(EVENT_IMAGES.magicBlacksmith,`Scivoli tra pietra e acqua nera. Non riesci a raggiungerlo e ti ferisci. <b>-20 HP</b>.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);return;}
    showNpcEvent('magic_blacksmith',EVENT_IMAGES.magicBlacksmith,`Raggiungi il fabbro magico. Non dice molto: ti mostra catalizzatori e formule scritte con mani tremanti.`,`<button class="btn gold" onclick="openMagicBlacksmithShop()">Apri lo shop</button>`);
  };
  window.openMagicBlacksmithShop=function(){
    if(npcShopBlocked('magic_blacksmith',EVENT_IMAGES.magicBlacksmith))return;
    document.getElementById('re-bg').style.backgroundImage=`url('${EVENT_IMAGES.magicBlacksmith}')`;
    document.getElementById('re-text').innerHTML=`Shop del fabbro magico<br><span style="color:#c0a0ff">Anime: ${G.coins||0}</span>${npcKillCount()>5?npcShopFearText('magic_blacksmith'):''}`;
    document.getElementById('re-choices').innerHTML=MAGIC_BLACKSMITH_SHOP.map((o,i)=>{
      const data=o.kind==='move'?ALL_MOVES.find(m=>m.id===o.id):ALL_EQUIPMENT[o.id];
      const owned=o.kind==='move'?G.player.deck.some(m=>m.id===o.id):G.player.equipment?.[data.slot]?.id===o.id;
      const price=routeShopPrice(o.price),can=(G.coins||0)>=price&&!owned;
      return `<button class="btn" ${can?`onclick="buyMagicBlacksmith(${i})"`:'disabled'}>${owned?'Gia posseduto - ':''}${data.name} - ${price} anime</button>`;
    }).join('')+`<button class="btn" onclick="completeEvent()">Esci</button>`;
  };
  window.buyMagicBlacksmith=function(i){
    const o=MAGIC_BLACKSMITH_SHOP[i],price=o?routeShopPrice(o.price):0;if(!o||(G.coins||0)<price)return;G.coins-=price;
    if(o.kind==='move'){const m=ALL_MOVES.find(x=>x.id===o.id);if(m)G.player.deck.push({...m});}
    else applyEquipPiece(G.player,ALL_EQUIPMENT[o.id]);
    openMagicBlacksmithShop();
  };

  function showLostSiegmeyer(){
    showNpcEvent('siegmeyer',EVENT_IMAGES.siegmeyerLost,`Siegmeyer guarda il magma e i nemici oltre la pietra spezzata. Per una volta non sembra solo confuso: sembra deciso.<br><br><em>"Friend, I have an idea. A good one, really."</em><br><br>Vuoi aiutarlo?`,`<button class="btn danger" onclick="helpLostSiegmeyer()">Aiutalo</button><button class="btn" onclick="abandonLostSiegmeyer()">Non aiutarlo</button>`);
  }
  window.helpLostSiegmeyer=function(){if(!G.npcProgress)G.npcProgress={};G.npcProgress.siegmeyer=Math.max(G.npcProgress.siegmeyer||0,4);startEventGroup(['undead','undead','undead'],null,'zweihander_siegmeyer');};
  window.abandonLostSiegmeyer=function(){if(!G.npcProgress)G.npcProgress={};G.npcProgress.siegmeyer_dead=true;setEvent(EVENT_IMAGES.siegmeyerLost,`Lo lasci solo davanti alla fossa. Quando torni a guardare, Siegmeyer non c'e piu.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);};

  function showFairLady(){
    const understands=hasItem('gift_anello_strega');
    const text=understands?`La Guardiana del Fuoco, fragile e mostruosa, sussurra con dolcezza dolorosa: <em>"Quelaag? My dear sister... do not mind me, it does not hurt terribly."</em><br><br>Capisci le sue parole grazie all'Anello della Strega.`:`La Guardiana del Fuoco sembra un ragno incastrato nel muro. Muove appena le labbra, ma non riesci a capire una sola parola.`;
    showNpcEvent('fair_lady',EVENT_IMAGES.fairLady,text,`${understands?`<button class="btn gold" onclick="donateFairLady()">Offri 2000 anime</button>`:''}<button class="btn" onclick="completeEvent()">Vai via</button>`,understands?{}:{noOriginalLine:true});
  }
  window.donateFairLady=function(){if((G.coins||0)<2000){setEvent(EVENT_IMAGES.fairLady,`Non hai abbastanza anime.`, `<button class="btn" onclick="completeEvent()">Prosegui</button>`);return;}G.coins-=2000;if(!G.npcProgress)G.npcProgress={};G.npcProgress.solaireSaved=true;setEvent(EVENT_IMAGES.fairLady,`La tua offerta placa una parte del dolore. Da qualche parte, una strada verso il sole resta aperta.`,`<button class="btn" onclick="completeEvent()">Prosegui</button>`);};

  function showLostSolaire(){
    if(G.npcProgress?.solaireSaved){showNpcEvent('solaire',EVENT_IMAGES.lostSolaireSaved,`Solaire e vivo, ma spezzato dalla ricerca.<br><br><em>"After all this searching, I still cannot find it... Was it all a lie? Have I done this all, for nothing? Oh, my dear sun... What now, what should I do...? ...My sun, my dear, dear sun..."</em>`,`<button class="btn gold" onclick="takeGwynLightning()">Ricevi Fulmine di Gwyn</button>`);}
    else showNpcEvent('solaire',EVENT_IMAGES.lostSolaireMad,`Solaire barcolla nella luce malata, la voce rotta dalla follia.<br><br><em>"...Hrg, rg... Arrrgh... ...Finally, I have found it, I have!... ...My very own sun... I...am the sun!..."</em>`,`<button class="btn danger" onclick="startNpcBattle('solaire')">Affronta Solaire</button>`,{noFight:true,ignoreMassacreRefusal:true});
  }
  window.takeGwynLightning=function(){const m=ALL_MOVES.find(x=>x.id==='gwyn_lightning');if(m&&!G.player.deck.some(x=>x.id===m.id))G.player.deck.push({...m});setEvent(EVENT_IMAGES.lostSolaireSaved,`Hai ricevuto <b>Fulmine di Gwyn</b>.`, `<button class="btn" onclick="completeEvent()">Prosegui</button>`);};

  function showQuelanaTomb(){
    setEvent(EVENT_IMAGES.quelanaTomb,`Davanti a una tomba arsa dal calore vedi delle vesti da piromante. L'aria vibra come se qualcuno, o qualcosa, le stesse ancora proteggendo.`,`<button class="btn danger" onclick="takeQuelanaVestments()">Prendi le vesti</button><button class="btn" onclick="completeEvent()">Lasciale</button>`);
  }
  window.takeQuelanaVestments=function(){startEventBattle('ceaseless_discharge');G._ceaselessQuelanaReward=true;};

  function showDodgeEvent(kind){
    const cfg={
      axes:{img:EVENT_IMAGES.axes,title:'Le asce',text:"Non c'è tempo per pensare.",hazard:'axe',dmg:10,total:10},
      arrows:{img:EVENT_IMAGES.arrows,title:'Le frecce',text:'Le statue si animano. Corri.',hazard:'arrow',dmg:6,total:14},
      rock:{img:EVENT_IMAGES.rock,title:'La roccia',text:'Senti il rumore prima di vederla.',hazard:'rock',dmg:14,total:7}
    }[kind];
    setEvent(cfg.img,`${cfg.text}<br><br><b>${cfg.title}</b>`, `<button class="btn danger" onclick="startDodgeMinigame('${kind}')">Inizia</button>`);
  }
  window.startDodgeMinigame=function(kind){
    const cfg={
      axes:{img:EVENT_IMAGES.axes,label:'asce',dmg:10,total:10,speed:2.8},
      arrows:{img:EVENT_IMAGES.arrows,label:'frecce',dmg:6,total:14,speed:3.5},
      rock:{img:EVENT_IMAGES.rock,label:'roccia',dmg:14,total:7,speed:2.3}
    }[kind];
    if(kind==='axes'){startBlueHeartAxes(cfg);return;}
    if(kind==='arrows'){startBlueHeartArrows(cfg);return;}
    if(kind==='rock'){startBlueHeartRock(cfg);return;}
    const bg=document.getElementById('re-bg'),txt=document.getElementById('re-text'),choices=document.getElementById('re-choices');
    bg.style.backgroundImage=`url('${cfg.img}')`;
    bg.innerHTML=`<div id="ut-game" tabindex="0" style="position:relative;width:100%;height:100%;overflow:hidden;background:rgba(0,0,0,.28)">
      <div id="ut-heart" style="position:absolute;left:50%;bottom:34px;width:18px;height:18px;background:#ff4060;border:2px solid #ffd0d8;transform:translate(-50%,0);box-shadow:0 0 12px #ff4060"></div>
      <div id="ut-status" style="position:absolute;left:10px;top:10px;background:rgba(0,0,0,.72);padding:6px 9px;border:1px solid #555;border-radius:6px;font-size:11px;color:#f0c040"></div>
    </div>`;
    txt.innerHTML=`Schiva le ${cfg.label}. Usa <b>A/D</b> o le <b>frecce</b>. Ogni colpo infligge ${cfg.dmg} HP.`;
    choices.innerHTML='';
    runDodge(cfg);
  };
  function runDodge(cfg){
    const box=document.getElementById('ut-game'),heart=document.getElementById('ut-heart'),status=document.getElementById('ut-status');
    let x=50,hits=0,spawned=0,done=false,keys={};
    box.focus();
    const down=e=>{keys[e.key]=true;};
    const up=e=>{keys[e.key]=false;};
    window.addEventListener('keydown',down);window.addEventListener('keyup',up);
    const hazards=[];
    const spawn=setInterval(()=>{
      if(spawned>=cfg.total){clearInterval(spawn);return;}
      spawned++;
      const el=document.createElement('div');
      const size=cfg.label==='roccia'?44:cfg.label==='asce'?34:24;
      el.style.cssText=`position:absolute;left:${rand(5,88)}%;top:-50px;width:${size}px;height:${size}px;background:${cfg.label==='frecce'?'#d8d8e8':'#706070'};border:2px solid #eee;border-radius:${cfg.label==='roccia'?'50%':'4px'};box-shadow:0 0 14px #000`;
      box.appendChild(el);hazards.push({el,y:-50,hit:false,size});
    },520);
    const loop=setInterval(()=>{
      if(keys.ArrowLeft||keys.a||keys.A)x-=3.2;if(keys.ArrowRight||keys.d||keys.D)x+=3.2;x=clamp(x,4,96);heart.style.left=x+'%';
      const rect=box.getBoundingClientRect(),hx=rect.width*x/100,hy=rect.height-34;
      hazards.forEach(h=>{
        h.y+=cfg.speed;h.el.style.top=h.y+'px';
        const ex=parseFloat(h.el.style.left)*rect.width/100,ey=h.y;
        if(!h.hit&&Math.abs(ex-hx)<24&&Math.abs(ey-hy)<24){h.hit=true;hits++;G.player.hp=Math.max(1,G.player.hp-cfg.dmg);h.el.style.background='#ff4050';}
        if(h.y>rect.height+60)h.el.remove();
      });
      status.textContent=`Colpi subiti: ${hits} · HP ${G.player.hp}/${G.player.maxHp}`;
      if(spawned>=cfg.total&&hazards.every(h=>h.y>rect.height+50)&&!done){
        done=true;clearInterval(loop);clearInterval(spawn);window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);
        document.getElementById('re-text').innerHTML=hits?`Ne esci vivo, ma non intatto. Colpi subiti: <b>${hits}</b>.`:`Perfetto. Non hai subito danni.`;
        document.getElementById('re-choices').innerHTML=`<button class="btn" onclick="finishDodgeEvent()">Prosegui</button>`;
      }
    },16);
  }
  function startBlueHeartAxes(cfg){
    const bg=document.getElementById('re-bg'),txt=document.getElementById('re-text'),choices=document.getElementById('re-choices');
    bg.style.backgroundImage='none';
    bg.innerHTML=`<div style="position:absolute;inset:0;background-image:url('${cfg.img}');background-size:cover;background-position:center;filter:brightness(.38)"></div>
    <div id="ut-game" tabindex="0" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:54%;height:54%;overflow:hidden;background:#020204;border:3px solid #f4f4f4;box-shadow:0 18px 40px rgba(0,0,0,.58),inset 0 0 0 2px #111">
      <div id="ut-heart" style="position:absolute;width:18px;height:18px;background:#1f66ff;border:2px solid #9fd0ff;box-shadow:0 0 10px #1f66ff;z-index:6"></div>
      <div id="ut-status" style="position:absolute;left:10px;top:10px;background:#000;padding:6px 9px;border:1px solid #777;border-radius:4px;font-size:11px;color:#f0c040;z-index:8"></div>
      <div id="ut-spikes-bottom" style="position:absolute;left:0;right:0;bottom:0;height:28px;z-index:2;background:repeating-linear-gradient(90deg,#f4f4f4 0 4px,transparent 4px 8px)"></div>
      <div style="position:absolute;left:0;top:0;bottom:0;width:18px;z-index:2;background:repeating-linear-gradient(180deg,#f4f4f4 0 5px,transparent 5px 10px)"></div>
      <div style="position:absolute;right:0;top:0;bottom:0;width:18px;z-index:2;background:repeating-linear-gradient(180deg,#f4f4f4 0 5px,transparent 5px 10px)"></div>
    </div>`;
    txt.innerHTML=`Cuore blu: usa <b>A/D</b> o <b>frecce</b> per muoverti, <b>W</b>, <b>↑</b> o <b>Spazio</b> per saltare. Le piattaforme scorrono, spine e asce infliggono <b>10 HP</b>.`;
    choices.innerHTML='';
    runBlueHeartAxes();
  }
  function runBlueHeartAxes(){
    const box=document.getElementById('ut-game'),heart=document.getElementById('ut-heart'),status=document.getElementById('ut-status');
    const state={x:0,y:0,vx:0,vy:0,w:18,h:18,hits:0,start:performance.now(),lastSpikeHit:0,lastAxeHit:0,done:false};
    let keys={},platforms=[],axes=[];
    box.focus();
    const down=e=>{keys[e.key]=true;if(['ArrowLeft','ArrowRight','ArrowUp',' ','a','A','d','D','w','W'].includes(e.key))e.preventDefault();};
    const up=e=>{keys[e.key]=false;};
    window.addEventListener('keydown',down);window.addEventListener('keyup',up);
    const damage=(amount,kind,cooldown)=>{
      const now=performance.now(),last=kind==='spike'?state.lastSpikeHit:state.lastAxeHit;
      if(now-last<cooldown)return;
      if(kind==='spike')state.lastSpikeHit=now;else state.lastAxeHit=now;
      state.hits++;G.player.hp=Math.max(1,G.player.hp-amount);
      heart.style.filter='brightness(2.2)';
      setTimeout(()=>{heart.style.filter='';},120);
    };
    const makePlatform=(x,y,w=92)=>{
      const el=document.createElement('div');
      el.style.cssText=`position:absolute;left:${x}px;top:${y}px;width:${w}px;height:12px;background:#f4f4f4;border:2px solid #999;z-index:4`;
      box.appendChild(el);platforms.push({el,x,y,w,h:12});
    };
    const makeAxe=()=>{
      const el=document.createElement('div');
      const x=rand(38,Math.max(40,box.clientWidth-62));
      el.style.cssText=`position:absolute;left:${x}px;top:-42px;width:14px;height:42px;background:#f4f4f4;border-radius:3px;z-index:5;box-shadow:0 0 6px #fff`;
      box.appendChild(el);axes.push({el,x,y:-42,w:14,h:42,hit:false});
    };

    // 3 altezze fisse: alta, media, bassa. La distanza è calibrata per
    // poter saltare da bassa a media e da media ad alta, ma NON da bassa ad alta.
    // bh viene calcolato in seguito, ma le percentuali lo fanno funzionare per qualunque dimensione del box.
    const PLAT_HEIGHTS_PCT=[0.38,0.56,0.72]; // alto, medio, basso (come % di bh)
    const PLAT_SPACING=180; // pixel fissi tra spawn successivi
    let _nextPlatX=0; // verrà inizializzato dopo placeStart
    let _platHeightIdx=0; // indice ciclico nelle 3 altezze, avanza in ordine casuale

    const spawnNextPlatform=()=>{
      const bh=box.clientHeight;
      // scegli una delle 3 altezze in modo che non si ripeta la stessa due volte di fila
      const prev=_platHeightIdx;
      let next;do{next=Math.floor(Math.random()*3);}while(next===prev&&Math.random()<0.7);
      _platHeightIdx=next;
      const y=Math.round(bh*PLAT_HEIGHTS_PCT[next]);
      const w=rand(78,110);
      makePlatform(_nextPlatX,y,w);
      _nextPlatX+=PLAT_SPACING;
    };

    const startPlat={x:0,y:0,w:108};
    const placeStart=()=>{
      const bh=box.clientHeight;
      startPlat.x=Math.max(22,box.clientWidth-startPlat.w-34);
      startPlat.y=Math.round(bh*PLAT_HEIGHTS_PCT[2]); // parte all'altezza bassa
      makePlatform(startPlat.x,startPlat.y,startPlat.w);
      state.x=startPlat.x+Math.round(startPlat.w*0.5)-Math.round(state.w*0.5);
      state.y=startPlat.y-state.h;
      heart.style.left=state.x+'px';heart.style.top=state.y+'px';
      // la prima piattaforma arriva già vicina, a PLAT_SPACING dal bordo destro visibile
      _nextPlatX=box.clientWidth+30;
    };
    placeStart();
    // spawna subito 3 piattaforme per riempire lo schermo dall'inizio
    spawnNextPlatform();spawnNextPlatform();spawnNextPlatform();
    const platTimer=setInterval(spawnNextPlatform,1400);
    const axeTimer=setInterval(makeAxe,400); // asce più frequenti
    let last=performance.now();
    const loop=setInterval(()=>{
      const now=performance.now(),dt=Math.min(32,now-last)/16.67;last=now;
      const bw=box.clientWidth,bh=box.clientHeight,floorY=bh-state.h-28;
      const moveLeft=keys.ArrowLeft||keys.a||keys.A,moveRight=keys.ArrowRight||keys.d||keys.D;
      const jump=keys.ArrowUp||keys.w||keys.W||keys[' '];
      state.vx=moveLeft?-1.25:moveRight?1.25:0;
      state.vy+=0.06*dt;
      state.x+=state.vx*dt;
      state.y+=state.vy*dt;
      let grounded=false,onPlatform=false;
      platforms.forEach(p=>{
        p.x-=0.82*dt;p.el.style.left=p.x+'px';
        const wasAbove=state.y+state.h-state.vy*dt<=p.y+4;
        const overlapX=state.x+state.w>p.x&&state.x<p.x+p.w;
        const falling=state.vy>=0;
        if(falling&&wasAbove&&overlapX&&state.y+state.h>=p.y&&state.y+state.h<=p.y+p.h+12){
          state.y=p.y-state.h;state.vy=0;grounded=true;onPlatform=true;
          state.x+=-0.82*dt;
        }
        if(p.x+p.w<-30){p.el.remove();p._dead=true;}
      });
      platforms=platforms.filter(p=>!p._dead);
      if(state.y>=floorY){state.y=floorY;state.vy=0;grounded=true;}
      if(jump&&grounded&&!state._jumpHeld){state.vy=-3.6;grounded=false;}
      state._jumpHeld=!!jump;
      state.x=clamp(state.x,18,bw-state.w-18);
      axes.forEach(a=>{
        a.y+=3.2*dt;a.el.style.top=a.y+'px'; // velocità asce aumentata
        const hit=state.x<a.x+a.w&&state.x+state.w>a.x&&state.y<a.y+a.h&&state.y+state.h>a.y;
        if(hit&&!a.hit){a.hit=true;damage(10,'axe',450);a.el.style.background='#ff4050';}
        if(a.y>bh+50){a.el.remove();a._dead=true;}
      });
      axes=axes.filter(a=>!a._dead);
      const touchingSpikeFloor=!onPlatform&&state.y>=floorY-1;
      const touchingSide=state.x<=19||state.x+state.w>=bw-19;
      if(touchingSpikeFloor||touchingSide)damage(10,'spike',1000);
      heart.style.left=state.x+'px';heart.style.top=state.y+'px';
      const remain=Math.max(0,Math.ceil((26000-(now-state.start))/1000));
      status.textContent=`Tempo ${remain}s - Colpi ${state.hits} - HP ${G.player.hp}/${G.player.maxHp}`;
      if(now-state.start>=26000&&!state.done){
        state.done=true;clearInterval(loop);clearInterval(platTimer);clearInterval(axeTimer);
        window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);
        // Il box di gioco è position:absolute sopra re-text/re-choices e blocca i click.
        // Lo svuotiamo e lo rimuoviamo così il bottone è cliccabile.
        const gameBox=document.getElementById('ut-game');if(gameBox)gameBox.remove();
        document.getElementById('re-bg').innerHTML='';
        document.getElementById('re-text').innerHTML=state.hits?`Hai superato il corridoio delle asce. Colpi subiti: <b>${state.hits}</b>.`:`Hai attraversato il corridoio senza subire colpi.`;
        document.getElementById('re-choices').innerHTML=`<button class="btn" onclick="finishDodgeEvent()">Prosegui</button>`;
      }
    },16);
  }
  // ── FRECCE ──────────────────────────────────────────────────────────────────
  function startBlueHeartArrows(cfg){
    const bg=document.getElementById('re-bg'),txt=document.getElementById('re-text'),choices=document.getElementById('re-choices');
    bg.style.backgroundImage='none';
    bg.innerHTML=`<div style="position:absolute;inset:0;background-image:url('${cfg.img}');background-size:cover;background-position:center;filter:brightness(.32)"></div>
    <div id="ut-game" tabindex="0" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:54%;height:54%;overflow:hidden;background:#020204;border:3px solid #f4f4f4;box-shadow:0 0 40px rgba(0,0,0,.8),inset 0 0 0 2px #111">
      <div id="ut-heart" style="position:absolute;width:18px;height:18px;background:#1f66ff;border:2px solid #9fd0ff;box-shadow:0 0 10px #1f66ff;z-index:6"></div>
      <div id="ut-status" style="position:absolute;left:10px;top:10px;background:#000;padding:6px 9px;border:1px solid #777;border-radius:4px;font-size:11px;color:#f0c040;z-index:8"></div>
    </div>`;
    txt.innerHTML=`Cuore blu: <b>A</b> corsia sinistra, <b>D</b> corsia destra. Le frecce arrivano a ondate di 2 — trova la corsia libera.`;
    choices.innerHTML='';
    runBlueHeartArrows(cfg);
  }
  function runBlueHeartArrows(cfg){
    const box=document.getElementById('ut-game'),heart=document.getElementById('ut-heart'),status=document.getElementById('ut-status');
    // 3 corsie: 0=sx, 1=centro, 2=dx. Il cuore scatta istantaneamente.
    let lane=1,hits=0,done=false,lastHit=0,waveCooldown=false;
    const LANE_PCT=[0.22,0.50,0.78]; // centro X di ogni corsia come % della larghezza
    const ARROW_W=18,ARROW_H=40;
    const waves=[];
    box.focus();
    // posiziona il cuore nella corsia centrale in fondo al box
    const placeHeart=()=>{
      const bw=box.clientWidth,bh=box.clientHeight;
      heart.style.width='18px';heart.style.height='18px';
      heart.style.left=(bw*LANE_PCT[lane]-9)+'px';
      heart.style.top=(bh*0.80-9)+'px';
    };
    placeHeart();
    const keydown=e=>{
      if(done)return;
      if((e.key==='a'||e.key==='A'||e.key==='ArrowLeft')&&lane>0){lane--;placeHeart();e.preventDefault();}
      if((e.key==='d'||e.key==='D'||e.key==='ArrowRight')&&lane<2){lane++;placeHeart();e.preventDefault();}
    };
    window.addEventListener('keydown',keydown);

    // Genera un'ondata: sceglie 2 corsie occupate, 1 libera (casuale ma bilanciata)
    const spawnWave=()=>{
      if(done)return;
      const freeLane=Math.floor(Math.random()*3);
      const occupied=[0,1,2].filter(l=>l!==freeLane);
      const waveArrows=[];
      occupied.forEach(l=>{
        const el=document.createElement('div');
        const bw=box.clientWidth;
        const x=bw*LANE_PCT[l]-ARROW_W/2;
        el.style.cssText=`position:absolute;left:${x}px;top:-${ARROW_H+10}px;width:${ARROW_W}px;height:${ARROW_H}px;background:#e0e0f0;border:2px solid #fff;border-radius:3px 3px 6px 6px;z-index:5;box-shadow:0 0 8px rgba(255,255,255,.6)`;
        // punta della freccia
        el.innerHTML=`<div style="position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-top:12px solid #e0e0f0"></div>`;
        box.appendChild(el);
        waveArrows.push({el,lane:l,y:-(ARROW_H+10),hit:false});
      });
      waves.push(waveArrows);
    };

    // Prima ondata subito, poi ogni ~1.1s
    spawnWave();
    const waveTimer=setInterval(spawnWave,1100);
    // Smette di spawnare dopo 14 ondate (~15s)
    let waveCount=1;
    const waveLimit=setInterval(()=>{waveCount++;if(waveCount>=14){clearInterval(waveTimer);clearInterval(waveLimit);}},1100);

    let last=performance.now();
    const loop=setInterval(()=>{
      const now=performance.now(),dt=Math.min(32,now-last)/16.67;last=now;
      const bw=box.clientWidth,bh=box.clientHeight;
      const heartX=bw*LANE_PCT[lane];
      const heartY=bh*0.80;
      // velocità frecce: parte da 4, sale fino a 7 col tempo
      const elapsed=(now-G._arrowStart)/1000;
      const speed=(4+Math.min(3,elapsed*0.2))*dt;
      let allGone=true;
      waves.forEach(wave=>{
        wave.forEach(a=>{
          a.y+=speed;a.el.style.top=a.y+'px';
          if(a.y<bh+60)allGone=false;
          // collisione: centro freccia vs centro cuore
          const ax=bw*LANE_PCT[a.lane],ay=a.y+ARROW_H/2;
          if(!a.hit&&Math.abs(ax-heartX)<18&&Math.abs(ay-heartY)<28&&now-lastHit>400){
            a.hit=true;lastHit=now;hits++;
            G.player.hp=Math.max(1,G.player.hp-cfg.dmg);
            heart.style.filter='brightness(2.5)';
            setTimeout(()=>{heart.style.filter='';},120);
            a.el.style.background='#ff4050';a.el.style.borderColor='#ff8080';
          }
          if(a.y>bh+60&&!a._removed){a._removed=true;a.el.remove();}
        });
      });
      // aggiorna posizione cuore (nel caso il box si ridimensioni)
      heart.style.left=(bw*LANE_PCT[lane]-9)+'px';
      heart.style.top=(bh*0.80-9)+'px';
      status.textContent=`Colpi ${hits} · HP ${G.player.hp}/${G.player.maxHp}`;
      // fine: tutte le frecce uscite e spawn terminato
      if(waveCount>=14&&allGone&&!done){
        done=true;clearInterval(loop);window.removeEventListener('keydown',keydown);
        const gameBox=document.getElementById('ut-game');if(gameBox)gameBox.remove();
        document.getElementById('re-bg').innerHTML='';
        document.getElementById('re-text').innerHTML=hits?`Hai attraversato il corridoio. Colpi subiti: <b>${hits}</b>.`:`Perfetto. Hai schivato ogni freccia.`;
        document.getElementById('re-choices').innerHTML=`<button class="btn" onclick="finishDodgeEvent()">Prosegui</button>`;
      }
    },16);
    G._arrowStart=performance.now();
  }

  // ── ROCCE ───────────────────────────────────────────────────────────────────
  function startBlueHeartRock(cfg){
    const bg=document.getElementById('re-bg'),txt=document.getElementById('re-text'),choices=document.getElementById('re-choices');
    bg.style.backgroundImage='none';
    bg.innerHTML=`<div style="position:absolute;inset:0;background-image:url('${cfg.img}');background-size:cover;background-position:center;filter:brightness(.32)"></div>
    <div id="ut-game" tabindex="0" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:58%;height:60%;overflow:hidden;background:#020204;border:3px solid #f4f4f4;box-shadow:0 0 40px rgba(0,0,0,.8),inset 0 0 0 2px #111">
      <div id="ut-heart" style="position:absolute;width:18px;height:18px;background:#1f66ff;border:2px solid #9fd0ff;box-shadow:0 0 10px #1f66ff;z-index:6"></div>
      <div id="ut-status" style="position:absolute;left:10px;top:10px;background:#000;padding:6px 9px;border:1px solid #777;border-radius:4px;font-size:11px;color:#f0c040;z-index:8"></div>
    </div>`;
    txt.innerHTML=`Cuore blu: <b>A/D</b> muoviti, <b>W/↑/Spazio</b> salta. Passa tra le piattaforme per cambiare corsia, schiva le rocce.`;
    choices.innerHTML='';
    runBlueHeartRock(cfg);
  }
  function runBlueHeartRock(cfg){
    const box=document.getElementById('ut-game'),heart=document.getElementById('ut-heart'),status=document.getElementById('ut-status');
    const HEART_W=18,HEART_H=18;
    const PLAT_H=10;   // altezza fila
    const TILE=54;     // piattaforme e buchi tre volte piu larghi
    const PLAT_SPEED=0.6;
    const BOULDER_SPEED=3.2;
    const NUM_ROWS=4;

    // Le 5 corsie devono essere EQUIDISTANTI.
    // Il box ha altezza bh. Struttura verticale:
    //   corsia0 | PLAT_H | corsia1 | PLAT_H | corsia2 | PLAT_H | corsia3 | PLAT_H | corsia4
    // Spazio totale per corsie = bh - NUM_ROWS*PLAT_H, diviso in 5 parti uguali.
    // rowY[r] = r*(LANE_H + PLAT_H) + LANE_H   (bordo superiore della fila r)
    // Viene calcolato runtime perché bh è noto solo dopo il render.

    const state={x:0,y:0,vx:0,vy:0,w:HEART_W,h:HEART_H,hits:0,start:performance.now(),lastHit:0,done:false};
    let keys={},platRows=[],boulders=[];
    box.focus();
    const keydown=e=>{keys[e.key]=true;if(['ArrowLeft','ArrowRight','ArrowUp',' ','a','A','d','D','w','W'].includes(e.key))e.preventDefault();};
    const keyup=e=>{keys[e.key]=false;};
    window.addEventListener('keydown',keydown);window.addEventListener('keyup',keyup);

    const getLaneH=()=>(box.clientHeight-NUM_ROWS*PLAT_H)/5;
    const getRowY=(r)=>getLaneH()*(r+1)+PLAT_H*r; // bordo superiore fila r
    // Centro Y della corsia c (0=top, 4=bottom)
    const getLaneCY=(c)=>{
      const lh=getLaneH();
      return lh*c+PLAT_H*c+lh/2;
    };

    // Costruisce una fila con alternanza tile/buco (TILE:TILE).
    // Tutti i pezzi sono fisicamente nel DOM e scorrono in loop.
    const buildRow=(rowIdx)=>{
      const bw=box.clientWidth;
      const y=getRowY(rowIdx);
      const dir=rowIdx%2===0?1:-1;
      const segments=[];
      // quanti tile ci vogliono per coprire bw + buffer di scorrimento
      const totalTiles=Math.ceil((bw+TILE*4)/TILE);
      for(let i=0;i<totalTiles;i++){
        if(i%2===1)continue; // i dispari = buco, i pari = piattaforma
        const el=document.createElement('div');
        const px=(dir===1?0:bw)+(dir===1?i*TILE:-(i*TILE+TILE));
        el.style.cssText=`position:absolute;left:${px}px;top:${y}px;width:${TILE}px;height:${PLAT_H}px;background:#c8c8d4;border:1px solid #777;z-index:4`;
        box.appendChild(el);
        segments.push({el,x:px,y,w:TILE,h:PLAT_H,dir});
      }
      return segments;
    };

    for(let r=0;r<NUM_ROWS;r++)platRows.push(buildRow(r));

    // Cuore parte nella corsia più bassa
    const initHeart=()=>{
      const bw=box.clientWidth;
      state.x=bw*0.3-HEART_W/2;
      state.y=getLaneCY(4)-HEART_H/2;
      heart.style.left=state.x+'px';heart.style.top=state.y+'px';
    };
    initHeart();

    const spawnBoulder=()=>{
      const bh=box.clientHeight,bw=box.clientWidth;
      const corsiaIdx=Math.floor(Math.random()*5);
      const cy=getLaneCY(corsiaIdx);
      const fromLeft=Math.random()<0.5;
      // raggio = 80% dell'altezza della corsia così la roccia riempie quasi tutta la corsia
      const r=Math.round(getLaneH()*0.50);
      const el=document.createElement('div');
      const diameter=r*2;
      const startX=fromLeft?-(diameter+10):bw+10;
      el.style.cssText=`position:absolute;left:${startX}px;top:${cy-r}px;width:${r*2}px;height:${r*2}px;background:#8a8a8a;border:2px solid #cfcfcf;border-radius:50%;z-index:5;box-shadow:0 0 10px #000,inset -8px -8px 0 rgba(0,0,0,.18)`;
      box.appendChild(el);
      boulders.push({el,x:startX,y:cy-r,r,cy,diameter,vx:fromLeft?BOULDER_SPEED:-BOULDER_SPEED,hit:false});
    };

    const boulderTimer=setInterval(spawnBoulder,650);
    spawnBoulder();

    let last=performance.now();
    const loop=setInterval(()=>{
      const now=performance.now(),dt=Math.min(32,now-last)/16.67;last=now;
      const bw=box.clientWidth,bh=box.clientHeight;
      const laneH=getLaneH();

      const moveLeft=keys.ArrowLeft||keys.a||keys.A,moveRight=keys.ArrowRight||keys.d||keys.D;
      const jump=keys.ArrowUp||keys.w||keys.W||keys[' '];
      state.vx=moveLeft?-2.0:moveRight?2.0:0;
      state.vy+=0.055*dt;
      state.x+=state.vx*dt;
      state.y+=state.vy*dt;

      let grounded=false;
      platRows.forEach((row,rowIdx)=>{
        const rowY=getRowY(rowIdx);
        row.forEach(p=>{
          p.x+=p.dir*PLAT_SPEED*dt;p.el.style.left=p.x+'px';
          // wrap: quando il tile esce da un lato rientra dall'altro
          if(p.dir===1&&p.x>bw+2){p.x=-(TILE);p.el.style.left=p.x+'px';}
          if(p.dir===-1&&p.x<-(TILE+2)){p.x=bw;p.el.style.left=p.x+'px';}
          // collisione dall'alto
          const wasAbove=state.y+state.h-state.vy*dt<=rowY+2;
          const overlapX=state.x+state.w>p.x+1&&state.x<p.x+p.w-1;
          if(state.vy>=0&&wasAbove&&overlapX&&state.y+state.h>=rowY&&state.y+state.h<=rowY+p.h+10){
            state.y=rowY-state.h;state.vy=0;grounded=true;
          }
        });
      });

      const floorY=bh-HEART_H-2;
      if(state.y>=floorY){state.y=floorY;state.vy=0;grounded=true;}
      if(state.y<1){state.y=1;state.vy=0;}

      if(jump&&grounded&&!state._jumpHeld){
        // salto calibrato: h_max = laneH + PLAT_H + piccolo margine
        // vy²/(2g) = target  →  vy = sqrt(2g*target)
        const target=laneH+PLAT_H+4;
        state.vy=-Math.sqrt(2*0.055*target);
        grounded=false;
      }
      state._jumpHeld=!!jump;
      state.x=Math.max(2,Math.min(bw-state.w-2,state.x));

      boulders.forEach(b=>{
        b.x+=b.vx*dt;b.el.style.left=b.x+'px';
        // hitbox: la roccia occupa quasi tutta la corsia in altezza,
        // colpisce se il cuore è nella stessa fascia Y e si sovrappone in X
        const hcx=state.x+state.w/2,hcy=state.y+state.h/2;
        const bcx=b.x+b.r;
        // usa hitbox rettangolare: roccia = [x, y, 2r, 2r], cuore = [x, y, w, h]
        const overlapX=hcx>b.x-4&&hcx<b.x+b.r*2+4;
        const overlapY=hcy>b.y-4&&hcy<b.y+b.r*2+4;
        if(!b.hit&&overlapX&&overlapY&&now-state.lastHit>500){
          b.hit=true;state.lastHit=now;state.hits++;
          G.player.hp=Math.max(1,G.player.hp-cfg.dmg);
          heart.style.filter='brightness(2.5)';setTimeout(()=>{heart.style.filter='';},120);
          b.el.style.background='#ff4050';
        }
        if((b.vx>0&&b.x>bw+30)||(b.vx<0&&b.x<-b.diameter-30)){b.el.remove();b._dead=true;}
      });
      boulders=boulders.filter(b=>!b._dead);

      heart.style.left=state.x+'px';heart.style.top=state.y+'px';
      const remain=Math.max(0,Math.ceil((24000-(now-state.start))/1000));
      status.textContent=`Tempo ${remain}s · Colpi ${state.hits} · HP ${G.player.hp}/${G.player.maxHp}`;
      if(now-state.start>=24000&&!state.done){
        state.done=true;clearInterval(loop);clearInterval(boulderTimer);
        window.removeEventListener('keydown',keydown);window.removeEventListener('keyup',keyup);
        const gameBox=document.getElementById('ut-game');if(gameBox)gameBox.remove();
        document.getElementById('re-bg').innerHTML='';
        document.getElementById('re-text').innerHTML=state.hits?`Hai attraversato la fortezza. Colpi subiti: <b>${state.hits}</b>.`:`Hai attraversato la fortezza illeso.`;
        document.getElementById('re-choices').innerHTML=`<button class="btn" onclick="finishDodgeEvent()">Prosegui</button>`;
      }
    },16);
  }

  window.finishDodgeEvent=function(){document.getElementById('re-bg').innerHTML='';completeEvent();};

  const baseStartEventBattle=startEventBattle;
  startEventBattle=function(enemyId){
    const base=ENEMIES.find(e=>e.id===enemyId)||getEnemyTemplate(enemyId);
    if(!base||base.id==='fantoccio_placeholder'){baseStartEventBattle(enemyId);return;}
    const enemy=scaleEnemy(base,zoneTier());
    G.enemies=[enemy];
    G.enemy=enemy;
    resetBattleRuntimeState();
    G._eventBattle=true;
    G._mimicBattle=false;
    G._pendingNpcKillId=null;
    G._npcBattleId=null;
    G._pendingDropEquip=base.dropEquip||null;
    G.log=[];_initCombat();G.busy=false;closeMenus();
    showScreen('battle');
    document.getElementById('battle-floor-label').textContent=`⚠ EVENTO — ${zoneName(G.zone)}`;
    addLog(`Appare ${enemy.name}!`,'system');
    renderBattle();
  };

  const baseShowRewardScreen=showRewardScreen;
  showRewardScreen=function(){
    const moveId=G.enemy?._eventRewardMove;
    const movePool=G.enemy?._eventRewardMovePool;
    baseShowRewardScreen();
    if(G._ceaselessQuelanaReward){
      G._ceaselessQuelanaReward=false;
      const ids=['quelana_helm','quelana_armor','quelana_gloves','quelana_legs'];
      const rc=document.getElementById('reward-content');
      if(rc){
        rc.innerHTML=`<div style="max-width:380px;margin:0 auto;text-align:center;background:#12121e;border:2px solid #f0c040;border-radius:10px;padding:16px">
          <div style="font-size:13px;color:#f0c040;font-weight:bold;margin-bottom:8px">Set Orlato d'Oro Nero</div>
          <div style="font-size:10px;color:#aaa;margin-bottom:12px">Scarica Infinita e caduto. Le vesti sono tue.</div>
          ${ids.map(id=>`<button class="btn gold" onclick="equipQuelanaPiece('${id}')" style="margin-bottom:6px">${ALL_EQUIPMENT[id].name}</button>`).join('')}
          <button class="btn" onclick="completeEvent()">Continua</button>
        </div>`;
      }
      return;
    }
    if(movePool==='siegmeyer_epic_legendary'){
      const pool=ALL_MOVES.filter(m=>(m.rarity||1)>=3&&!G.player.deck.some(pm=>pm.id===m.id));
      const offered=shuffle(pool).slice(0,3);
      const rc=document.getElementById('reward-content');
      if(rc){
        rc.innerHTML=`<div style="max-width:420px;margin:0 auto;text-align:center;background:#12121e;border:2px solid #f0c040;border-radius:10px;padding:16px">
          <div style="font-size:13px;color:#f0c040;font-weight:bold;margin-bottom:8px">Siegmeyer ti ringrazia</div>
          <div style="font-size:10px;color:#aaa;margin-bottom:12px">Scegli una mossa epica o leggendaria.</div>
          ${offered.map((m,i)=>`<button class="btn gold" onclick="takeSiegmeyerReward(${i})">${m.name}</button>`).join('')}
        </div>`;
        G._siegmeyerRewardMoves=offered;
      }
      return;
    }
    if(moveId){
      const m=ALL_MOVES.find(x=>x.id===moveId);
      const rc=document.getElementById('reward-content');
      if(m&&rc){
        rc.innerHTML=`<div style="max-width:340px;margin:0 auto;text-align:center;background:#12121e;border:2px solid #c060ff;border-radius:10px;padding:16px">
          <div style="font-size:13px;color:#f0c040;font-weight:bold;margin-bottom:8px">${m.name}</div>
          <div style="font-size:10px;color:#aaa;margin-bottom:12px">${m.desc}</div>
          <button class="btn gold" onclick="takeEventRewardMove('${m.id}')">Aggiungi al mazzo</button>
        </div>`;
      }
    }
  };
  window.takeEventRewardMove=function(id){
    const m=ALL_MOVES.find(x=>x.id===id);
    if(m&&!G.player.deck.some(x=>x.id===id))G.player.deck.push({...m});
    completeEvent();
  };
  window.takeSiegmeyerReward=function(i){
    const m=G._siegmeyerRewardMoves?.[i];
    if(m&&!G.player.deck.some(x=>x.id===m.id))G.player.deck.push({...m});
    G._siegmeyerRewardMoves=null;
    completeEvent();
  };
  window.equipQuelanaPiece=function(id){
    const eq=ALL_EQUIPMENT[id];if(!eq)return;
    applyEquipPiece(G.player,eq);
    const btn=[...document.querySelectorAll('#reward-content button')].find(b=>b.getAttribute('onclick')===`equipQuelanaPiece('${id}')`);
    if(btn){btn.disabled=true;btn.textContent=`Equipaggiato - ${eq.name}`;}
  };
})();





