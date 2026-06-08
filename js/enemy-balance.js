// Enemy balance pass: stamina-based multi-action turns, zone scaling and smarter AI.
// Loaded after content scripts so it can tune every existing template in one place.
(function(){
  'use strict';

  const ENEMY_MOVEBOOK={
    hollow_slash:{id:'eb_hollow_slash',name:'Fendente marcio',type:'atk',cost:1,power:0.72,desc:'Un colpo fisico rapido.'},
    spear_poke:{id:'eb_spear_poke',name:'Affondo di lancia',type:'atk',cost:1,power:0.78,effect:'debuff_def',desc:'Colpo preciso che incrina la difesa.'},
    axe_chop:{id:'eb_axe_chop',name:'Colpo d ascia',type:'atk',cost:2,power:1.18,desc:'Colpo pesante fisico.'},
    dog_bite:{id:'eb_dog_bite',name:'Morso famelico',type:'atk',cost:1,power:0.66,statusChance:{bleed:8,poison:0,burn:0,freeze:0,plague:0},desc:'Morso rapido con sanguinamento leggero.'},
    claw:{id:'eb_claw',name:'Artigliata',type:'atk',cost:1,power:0.76,statusChance:{bleed:7,poison:0,burn:0,freeze:0,plague:0},desc:'Artigliata fisica.'},
    guard:{id:'eb_guard',name:'Guardia chiusa',type:'buff',cost:1,effect:'buff_def_self',desc:'DEF su per qualche turno.'},
    rage:{id:'eb_rage',name:'Rabbia cava',type:'buff',cost:1,effect:'buff_atk_self',desc:'ATK su per qualche turno.'},
    heavy_swing:{id:'eb_heavy_swing',name:'Schianto pesante',type:'atk',cost:2,power:1.35,desc:'Colpo lento e forte.'},
    brutal_smash:{id:'eb_brutal_smash',name:'Schianto brutale',type:'atk',cost:3,power:1.72,desc:'Colpo devastante.'},
    double_cut:{id:'eb_double_cut',name:'Doppio taglio',type:'atk',cost:2,power:0.62,hits:2,desc:'Due colpi fisici.'},
    flurry:{id:'eb_flurry',name:'Raffica feroce',type:'atk',cost:3,power:0.48,hits:4,statusChance:{bleed:6,poison:0,burn:0,freeze:0,plague:0},desc:'Molti colpi rapidi.'},
    shield_bash:{id:'eb_shield_bash',name:'Spallata di scudo',type:'atk',cost:2,power:0.92,effect:'debuff_atk',desc:'Colpo difensivo che riduce ATK.'},
    soul_dart:{id:'eb_soul_dart',name:'Dardo dell anima',type:'mag',cost:1,power:0.82,desc:'Magia rapida.'},
    soul_spear:{id:'eb_soul_spear',name:'Lancia dell anima',type:'mag',cost:3,power:1.58,effect:'debuff_def',desc:'Magia perforante.'},
    crystal_spear:{id:'eb_crystal_spear',name:'Lancia cristallizzata',type:'mag',cost:3,power:1.72,effect:'debuff_def',statusChance:{freeze:0.08,poison:0,burn:0,bleed:0,plague:0},desc:'Magia cristallina.'},
    moon_barrage:{id:'eb_moon_barrage',name:'Raffica lunare',type:'mag',cost:2,power:0.54,hits:3,effect:'debuff_mag',desc:'Tre dardi magici.'},
    fireball:{id:'eb_fireball',name:'Sfera di fuoco',type:'mag',cost:2,power:1.05,effect:'burn',desc:'Piromanzia che puo bruciare.'},
    chaos_flame:{id:'eb_chaos_flame',name:'Fiamma del Caos',type:'mag',cost:3,power:1.45,effect:'burn',statusChance:{burn:0.10,poison:0,freeze:0,bleed:0,plague:0},desc:'Piromanzia pesante.'},
    fire_whip:{id:'eb_fire_whip',name:'Frusta di fuoco',type:'mag',cost:3,power:0.62,hits:3,effect:'burn',desc:'Tre colpi di fuoco.'},
    lightning:{id:'eb_lightning',name:'Lancia del fulmine',type:'mag',cost:2,power:1.22,effect:'debuff_def',desc:'Miracolo offensivo.'},
    sunlight:{id:'eb_sunlight',name:'Lancia solare',type:'mag',cost:4,power:1.65,effect:'debuff_def',statusChance:{burn:0.08,poison:0,freeze:0,bleed:0,plague:0},desc:'Miracolo potentissimo.'},
    dark_orb:{id:'eb_dark_orb',name:'Globo oscuro',type:'mag',cost:2,power:1.15,effect:'debuff_mag',desc:'Magia oscura.'},
    dark_beads:{id:'eb_dark_beads',name:'Perle oscure',type:'mag',cost:3,power:0.45,hits:5,effect:'debuff_mag',desc:'Raffica oscura.'},
    abyss_blast:{id:'eb_abyss_blast',name:'Impulso dell Abisso',type:'mag',cost:4,power:1.45,effect:'debuff_all',desc:'Oscurita concentrata.'},
    poison_spit:{id:'eb_poison_spit',name:'Sputo velenoso',type:'debuff',cost:1,effect:'poison',desc:'Avvelena il bersaglio.'},
    toxic_cloud:{id:'eb_toxic_cloud',name:'Nebbia tossica',type:'debuff',cost:2,effect:'toxic_mist',desc:'Veleno e morbo leggero.'},
    acid:{id:'eb_acid',name:'Getto acido',type:'debuff',cost:2,effect:'acid_surge',desc:'DEF giu pesante.'},
    curse:{id:'eb_curse',name:'Sguardo maledetto',type:'debuff',cost:2,effect:'curse',desc:'ATK e MAG giu.'},
    scream:{id:'eb_scream',name:'Urlo spezzante',type:'debuff',cost:1,effect:'debuff_atk',desc:'ATK giu.'},
    silence:{id:'eb_silence',name:'Voto del silenzio',type:'debuff',cost:2,effect:'vow_silence',desc:'Spegne la stamina e MAG giu.'},
    tranquil:{id:'eb_tranquil',name:'Cammino tranquillo',type:'debuff',cost:2,effect:'tranquil_walk',desc:'Congela e rallenta.'},
    channel:{id:'eb_channel',name:'Canalizzazione',type:'buff',cost:1,effect:'buff_mag_self5',desc:'MAG su.'},
    harden:{id:'eb_harden',name:'Pelle di pietra',type:'buff',cost:2,effect:'buff_def_2s_3t',desc:'DEF su forte.'},
    regen:{id:'eb_regen',name:'Rigenerazione oscura',type:'buff',cost:2,effect:'regen',desc:'Rigenera HP.'},
    heal:{id:'eb_heal',name:'Cura minore',type:'heal',cost:2,power:0.62,desc:'Recupera HP.'},
    great_heal:{id:'eb_great_heal',name:'Grande cura',type:'heal',cost:3,power:1.05,desc:'Recupera molti HP.'},
    infernal:{id:'eb_infernal',name:'Patto della fiamma',type:'buff',cost:3,effect:'infernal_contract',desc:'ATK DEF e MAG su molto.'},
    berserk:{id:'eb_berserk',name:'Furia sanguigna',type:'buff',cost:2,effect:'berserker_bonus',desc:'Prossimo colpo piu forte.'},
    wheel:{id:'eb_wheel',name:'Ruota d ossa',type:'atk',cost:2,power:0.42,hits:4,statusChance:{bleed:9,poison:0,burn:0,freeze:0,plague:0},desc:'Raffica rotante.'},
    tail_crush:{id:'eb_tail_crush',name:'Schianto di coda',type:'atk',cost:2,power:1.25,effect:'debuff_atk',desc:'Colpo che destabilizza.'},
    devour:{id:'eb_devour',name:'Divorare',type:'atk',cost:3,power:1.35,effect:'lifesteal',statusChance:{bleed:12,poison:0,burn:0,freeze:0,plague:0},desc:'Drena parte del danno.'},
    dragon_breath:{id:'eb_dragon_breath',name:'Soffio draconico',type:'mag',cost:3,power:1.35,effect:'burn',desc:'Soffio elementale.'},
    crystal_breath:{id:'eb_crystal_breath',name:'Soffio cristallino',type:'mag',cost:3,power:1.40,effect:'debuff_def',statusChance:{freeze:0.12,poison:0,burn:0,bleed:0,plague:0},desc:'Cristalli taglienti.'},
    grave_dance:{id:'eb_grave_dance',name:'Danza tombale',type:'mag',cost:3,power:0.62,hits:3,statusChance:{bleed:8,plague:0.04,poison:0,burn:0,freeze:0},desc:'Lame del Re Tombale.'},
    summon_skeletons:{id:'nito_evoca_scheletri',name:'Rito tombale',type:'buff',cost:1,effect:'summon_skeletons',desc:'Evoca 2 scheletri casuali.'}
  };

  const BALANCE={};
  const KIND_ROWS={
    normal:{hp:32,hpTier:7,main:8,mainTier:1.35,vigor:8,vigorTier:1.2,side:6,sideTier:0.7,stamina:6},
    elite:{hp:180,hpTier:20,main:12,mainTier:1.7,vigor:12,vigorTier:1.6,side:8,sideTier:0.9,stamina:8},
    boss:{hp:260,hpTier:36,main:8,mainTier:1.1,vigor:17,vigorTier:2.0,side:7,sideTier:0.7,stamina:10}
  };

  function move(id,extra={}){
    const m=ENEMY_MOVEBOOK[id];
    if(!m)throw new Error(`Enemy move not found: ${id}`);
    return {...m,...extra};
  }
  function moveList(ids){
    return ids.map(x=>Array.isArray(x)?move(x[0],x[1]||{}):move(x));
  }
  function profile(kind,tier,focus='str',mods={}){
    const row=KIND_ROWS[kind]||KIND_ROWS.normal;
    const main=Math.round(row.main+row.mainTier*tier);
    const side=Math.round(row.side+row.sideTier*tier);
    const vigor=Math.round(row.vigor+row.vigorTier*tier);
    const stats={
      hp:Math.round(row.hp+row.hpTier*tier),
      strength:side,
      vigor,
      intelligence:side,
      dexterity:side,
      faith:side,
      arcane:side,
      tier,
      maxStamina:row.stamina+(kind==='normal'?(tier>=5?1:0):(kind==='elite'?(tier>=4?2:0):(tier>=6?4:tier>=4?2:0))),
      actionLimit:kind==='normal'?(tier>=5?2:1):(kind==='elite'?(tier>=4?3:2):(tier>=7?5:tier>=4?4:3))
    };
    const applyFocus=f=>{
      if(f==='str'){stats.strength=main;}
      else if(f==='dex'){stats.strength=Math.round(main*0.9);stats.dexterity=main;}
      else if(f==='int'){stats.intelligence=main;stats.arcane=Math.max(stats.arcane,Math.round(main*0.7));}
      else if(f==='faith'){stats.intelligence=main;stats.faith=main;}
      else if(f==='arcane'){stats.intelligence=Math.round(main*0.9);stats.arcane=main;}
      else if(f==='tank'){stats.strength=Math.round(main*0.9);stats.vigor=Math.round(vigor*1.25);}
      else if(f==='mixed'){stats.strength=main;stats.intelligence=main;stats.faith=main;stats.arcane=Math.max(stats.arcane,main-2);}
    };
    (Array.isArray(focus)?focus:[focus]).forEach(applyFocus);
    return {...stats,...mods};
  }
  function set(ids,kind,tier,focus,moves,mods={}){
    ids.forEach(id=>{
      BALANCE[id]={...profile(kind,tier,focus,mods),kind,moves};
    });
  }
  function statsOnly(ids,kind,tier,focus,mods={}){
    ids.forEach(id=>{
      BALANCE[id]={...profile(kind,tier,focus,mods),kind,preserveMoves:true};
    });
  }

  // Undead Burg and early generic pool.
  set(['undead'],'normal',1,'str',['hollow_slash','rage']);
  set(['undeadspear'],'normal',1,'dex',['spear_poke','guard']);
  set(['undeadaxe'],'normal',1,'str',['hollow_slash','axe_chop']);
  set(['undeaddog'],'normal',1,'dex',['dog_bite','claw']);
  set(['balderknight','balder_spada'],'normal',2,'dex',['spear_poke','double_cut','guard']);
  set(['balder_arco'],'normal',2,'dex',['spear_poke','double_cut','scream']);
  set(['balder_stocco'],'normal',2,'dex',['spear_poke','double_cut','guard']);
  set(['cavalierenero','dark_knight'],'elite',2,'str',['heavy_swing','brutal_smash','guard','rage'],{maxStamina:9});
  set(['armoredboar'],'elite',2,'tank',['tail_crush','brutal_smash','harden'],{maxStamina:8});
  set(['channeler'],'elite',2,'int',['soul_dart','soul_spear','channel','scream'],{maxStamina:9});

  // Depths and Blighttown.
  set(['ratto'],'normal',2,'dex',['dog_bite','claw']);
  set(['rana_mortale'],'normal',2,'arcane',['poison_spit','curse','claw']);
  set(['slime'],'normal',2,'tank',['poison_spit','acid','tail_crush']);
  set(['ratto_gigante'],'elite',2,'dex',['dog_bite','claw','flurry','rage'],{maxStamina:9});
  set(['macellaio_pazzo'],'elite',2,'str',['axe_chop','heavy_swing','brutal_smash','rage'],{maxStamina:9});
  set(['cane_fuoco'],'normal',3,'dex',['dog_bite','fireball','claw']);
  set(['cerbottaniere_velenoso'],'normal',3,'arcane',['poison_spit','toxic_cloud','spear_poke']);
  set(['zanzara_gigante'],'normal',3,'dex',['poison_spit','claw','flurry']);
  set(['sanguisuga'],'normal',3,'arcane',['poison_spit','devour','scream']);
  set(['ragno_fuoco'],'normal',3,'arcane',['fireball','dog_bite','poison_spit']);
  set(['ogre_inf_mazza'],'elite',3,'str',['heavy_swing','brutal_smash','scream','rage'],{maxStamina:10});
  set(['ogre_inf_macigno'],'elite',3,'tank',['tail_crush','brutal_smash','harden','scream'],{maxStamina:10});

  // Darkroot and Artorias grave.
  set(['golem_cristallo','golem_cristallo_archive'],'normal',3,'tank',['hollow_slash','crystal_spear','harden']);
  set(['arbusto'],'normal',2,'arcane',['poison_spit','claw','regen']);
  set(['rana_rossa'],'normal',2,'arcane',['poison_spit','curse','claw']);
  set(['omino_fungo'],'normal',2,'tank',['tail_crush','guard','regen']);
  set(['protettore_mago'],'normal',3,'int',['soul_dart','soul_spear','channel']);
  set(['protettore_ladro'],'normal',3,'dex',['double_cut','poison_spit','flurry']);
  set(['protettore_cavaliere'],'normal',3,'str',['spear_poke','heavy_swing','guard']);
  set(['cavaliere_nero_alabarda'],'elite',3,'str',['spear_poke','heavy_swing','brutal_smash','rage'],{maxStamina:10});
  set(['golem_pietra_antico'],'elite',3,'tank',['tail_crush','brutal_smash','harden','regen'],{maxStamina:10});
  set(['gatto_gigante'],'elite',3,'dex',['claw','dog_bite','flurry','rage'],{maxStamina:10});
  set(['grande_uomo_fungo'],'elite',3,'tank',['tail_crush','brutal_smash','regen','harden'],{maxStamina:9});

  // Sen, Anor Londo and late zones.
  set(['uomo_serpente'],'normal',4,'str',['spear_poke','double_cut','heavy_swing','guard']);
  set(['mago_serpente'],'normal',4,'int',['soul_dart','soul_spear','channel','silence']);
  set(['demone_titanite'],'elite',4,'mixed',['lightning','tail_crush','brutal_smash','harden'],{maxStamina:11});
  set(['gigante_campana'],'elite',4,'str',['heavy_swing','brutal_smash','scream','harden'],{maxStamina:10});
  set(['imp'],'normal',5,'dex',['claw','fireball','double_cut','scream']);
  set(['cavaliere_argento_alabarda'],'normal',5,'faith',['spear_poke','lightning','guard','heavy_swing'],{maxStamina:8});
  set(['cavaliere_argento_spada_scudo'],'normal',5,'faith',['hollow_slash','shield_bash','guard','lightning'],{maxStamina:8});
  set(['cavaliere_argento_arco'],'normal',5,'dex',['spear_poke','double_cut','guard','scream'],{maxStamina:8});
  set(['guardiano_dipinto'],'normal',5,'dex',['double_cut','flurry','tranquil','guard'],{maxStamina:8});
  set(['gargoyle_anor'],'elite',5,'mixed',['tail_crush','dragon_breath','brutal_smash','harden'],{maxStamina:11});
  set(['sentinella_reale'],'elite',5,'tank',['shield_bash','heavy_swing','brutal_smash','harden'],{maxStamina:11});
  set(['scheletro'],'normal',6,'str',['hollow_slash','rage','claw'],{maxStamina:7});
  set(['scheletro_ruota'],'normal',6,'dex',['wheel','wheel','rage'],{maxStamina:7});
  set(['scheletro_gigante'],'normal',6,'tank',['heavy_swing','brutal_smash','guard'],{maxStamina:8});
  set(['scheletro_bestia'],'normal',6,'dex',['claw','dog_bite','flurry','rage'],{maxStamina:8});
  set(['cavaliere_nero_grande_ascia'],'elite',6,'str',['axe_chop','heavy_swing','brutal_smash','berserk'],{maxStamina:11});
  set(['girandola'],'elite',6,'int',['soul_dart','moon_barrage','channel','heal'],{maxStamina:10});
  set(['demone_capra_lost'],'normal',6,'str',['axe_chop','heavy_swing','brutal_smash','rage'],{maxStamina:8});
  set(['demone_toro_lost'],'normal',6,'str',['tail_crush','heavy_swing','brutal_smash','scream'],{maxStamina:8});
  set(['culo_drago'],'normal',6,'tank',['tail_crush','dragon_breath','brutal_smash'],{maxStamina:8});
  set(['mangiatore_caos'],'normal',6,'arcane',['chaos_flame','devour','toxic_cloud'],{maxStamina:8});
  set(['demone_centipede'],'elite',6,'mixed',['fire_whip','chaos_flame','claw','regen'],{maxStamina:12});
  set(['scarica_infinita'],'elite',6,'mixed',['chaos_flame','fire_whip','rage','brutal_smash'],{maxStamina:12});
  set(['demone_infuocato'],'elite',6,'mixed',['fireball','chaos_flame','heavy_swing','harden'],{maxStamina:12});
  set(['non_morto_cristallizzato'],'normal',6,'tank',['hollow_slash','crystal_spear','harden'],{maxStamina:8});
  set(['armoredboar_archive'],'normal',6,'tank',['tail_crush','brutal_smash','harden'],{maxStamina:8});
  set(['channeler_archive'],'normal',6,'int',['soul_dart','soul_spear','channel','scream'],{maxStamina:8});
  set(['conchiglia_mangiauomini'],'normal',6,'tank',['devour','tail_crush','acid'],{maxStamina:8});
  set(['golem_cristallo_dorato'],'elite',6,'tank',['crystal_breath','crystal_spear','harden','brutal_smash'],{maxStamina:12});
  set(['farfalla_luna_archivi'],'elite',6,'int',['moon_barrage','soul_spear','channel','tranquil'],{maxStamina:12});
  set(['fantasma'],'normal',6,'arcane',['dark_orb','curse','claw'],{maxStamina:8});
  set(['banshee'],'normal',6,'arcane',['scream','curse','dark_orb','tranquil'],{maxStamina:8});
  set(['wisp'],'normal',6,'int',['soul_dart','dark_orb','channel'],{maxStamina:8});
  set(['dark_wraith'],'elite',6,'arcane',['dark_orb','dark_beads','devour','guard'],{maxStamina:12});
  set(['massa_anime'],'elite',6,'arcane',['abyss_blast','curse','regen','dark_beads'],{maxStamina:12});

  // Event and NPC enemies.
  set(['orc'],'normal',2,'str',['hollow_slash','heavy_swing','rage']);
  set(['witch'],'normal',2,'int',['soul_dart','fireball','channel']);
  set(['troll'],'normal',2,'tank',['tail_crush','heavy_swing','regen']);
  set(['golem'],'normal',3,'tank',['harden','tail_crush','brutal_smash']);
  set(['vampire'],'normal',3,'arcane',['devour','dark_orb','curse']);
  set(['viverna'],'elite',3,'mixed',['dragon_breath','tail_crush','claw','harden'],{maxStamina:10});
  set(['mimic'],'elite',3,'str',['devour','claw','flurry','rage'],{maxStamina:10});
  set(['patches_npc'],'elite',3,'dex',['spear_poke','poison_spit','guard','heal'],{maxStamina:10});
  set(['andre_npc'],'elite',3,'str',['heavy_swing','brutal_smash','guard','rage'],{maxStamina:10});
  set(['solaire_event'],'elite',4,'faith',['hollow_slash','lightning','guard','heal'],{maxStamina:11});
  set(['quelana_npc'],'elite',5,'int',['fireball','chaos_flame','fire_whip','channel'],{maxStamina:12});
  set(['siegmeyer_npc'],'elite',4,'tank',['shield_bash','heavy_swing','guard','great_heal'],{maxStamina:11});
  set(['logan_mad'],'elite',6,'int',['soul_spear','crystal_spear','moon_barrage','channel'],{maxStamina:12});
  set(['giant_blacksmith'],'elite',5,'str',['heavy_swing','lightning','brutal_smash','harden'],{maxStamina:11});
  set(['gwynevere_npc'],'elite',5,'faith',['sunlight','great_heal','regen','silence'],{maxStamina:12});
  set(['gwyndolin','gwyndolin_npc'],'elite',5,'faith',['moon_barrage','dark_orb','channel','tranquil'],{maxStamina:12});
  set(['lautrec','lautrec_npc'],'elite',4,'dex',['double_cut','flurry','dark_orb','guard'],{maxStamina:11});
  set(['ingward_npc'],'elite',5,'arcane',['curse','dark_orb','silence','heal'],{maxStamina:11});
  set(['magic_blacksmith_npc'],'elite',4,'int',['soul_dart','soul_spear','channel','guard'],{maxStamina:10});
  set(['fair_lady_npc'],'elite',5,'arcane',['chaos_flame','toxic_cloud','regen','great_heal'],{maxStamina:11});
  set(['alvina_npc'],'elite',4,'arcane',['scream','tranquil','dark_orb','regen'],{maxStamina:11});
  set(['kirk','kirk_npc'],'elite',4,'dex',['double_cut','flurry','poison_spit','guard'],{maxStamina:11});
  set(['havel','havel_npc'],'elite',5,'tank',['brutal_smash','harden','shield_bash','heavy_swing'],{hp:150,maxStamina:11});
  set(['blighttown_parasite'],'elite',3,'arcane',['toxic_cloud','poison_spit','devour','regen'],{maxStamina:10});
  set(['ceaseless_discharge'],'elite',6,'mixed',['chaos_flame','fire_whip','rage','brutal_smash'],{maxStamina:12});
  set(['spirito_cavaliere_artorias'],'elite',5,'mixed',['double_cut','abyss_blast','berserk','flurry'],{maxStamina:12});
  set(['custode_calabrone'],'elite',4,'dex',['spear_poke','flurry','guard','rage'],{maxStamina:11});

  // Bosses.
  set(['gargoyle'],'boss',1,'mixed',['hollow_slash','tail_crush','dragon_breath','guard'],{hp:420,maxStamina:10});
  set(['demonetoro'],'boss',1,'str',['tail_crush','heavy_swing','brutal_smash','rage'],{hp:450,maxStamina:10});
  set(['demonecapra'],'boss',1,'str',['double_cut','axe_chop','heavy_swing','rage'],{hp:390,maxStamina:10});
  set(['hydra'],'boss',2,'mixed',['dragon_breath','tail_crush','claw','regen'],{hp:560,maxStamina:11});
  set(['lich'],'boss',3,'int',['soul_spear','dark_beads','curse','channel'],{hp:620,maxStamina:11});
  set(['drago_famelico'],'boss',2,'tank',['devour','tail_crush','poison_spit','brutal_smash'],{hp:620,maxStamina:11});
  set(['quelag'],'boss',3,'mixed',['fireball','fire_whip','chaos_flame','double_cut'],{hp:720,maxStamina:12});
  set(['farfalla_luna'],'boss',2,'int',['soul_dart','moon_barrage','soul_spear','channel'],{hp:500,maxStamina:11});
  set(['hydra_darkroot'],'boss',2,'mixed',['dragon_breath','tail_crush','claw','regen'],{hp:620,maxStamina:11});
  set(['sif'],'boss',3,'dex',['double_cut','flurry','heavy_swing','scream'],{hp:720,maxStamina:12});
  set(['golem_ferro'],'boss',4,'tank',['tail_crush','brutal_smash','harden','scream'],{hp:780,maxStamina:12});
  set(['ornstein'],'boss',5,'faith',['spear_poke','lightning','flurry','guard'],{hp:650,maxStamina:12,actionLimit:3,_fixedActionLimit:true});
  set(['smough'],'boss',5,'str',['heavy_swing','brutal_smash','harden','regen'],{hp:720,maxStamina:12,actionLimit:3,_fixedActionLimit:true});
  set(['nito'],'boss',6,'arcane',['grave_dance','toxic_cloud','dark_orb','summon_skeletons'],{hp:1050,maxStamina:13,_statScaleRate:0.06});
  set(['seath'],'boss',6,'int',['crystal_breath','crystal_spear','moon_barrage','curse'],{hp:1020,maxStamina:13,_statScaleRate:0.06});
  set(['four_kings','four_king'],'boss',6,'arcane',['dark_orb','dark_beads','devour','abyss_blast'],{hp:350,maxStamina:9,actionLimit:2,_fixedActionLimit:true,_statScaleRate:0.055});
  set(['gwyn'],'boss',7,'faith',['hollow_slash','lightning','sunlight','rage'],{hp:1150,maxStamina:12,actionLimit:4,_fixedActionLimit:true,_statScaleRate:0.045});
  statsOnly(['gwyndolin_finale'],'boss',7,'faith',{hp:360,maxStamina:10,actionLimit:2,_fixedActionLimit:true,_hpScaleRate:0.08,_statScaleRate:0.045});
  statsOnly(['re_senza_nome'],'boss',7,'faith',{hp:430,maxStamina:11,actionLimit:2,_fixedActionLimit:true,_hpScaleRate:0.08,_statScaleRate:0.045});
  statsOnly(['anima_tizzoni'],'boss',7,'mixed',{hp:1200,maxStamina:15,actionLimit:5,_fixedActionLimit:true,_statScaleRate:0.045});
  statsOnly(['gael_finale'],'boss',7,'arcane',{hp:1250,maxStamina:15,actionLimit:5,_fixedActionLimit:true,_statScaleRate:0.045});
  statsOnly(['manus_finale'],'boss',7,'arcane',{hp:1350,maxStamina:15,actionLimit:5,_fixedActionLimit:true,_statScaleRate:0.045});

  // Boss puzzle pieces and inert objects.
  ['fantoccio_placeholder','fantoccio_boss','fantoccio_elite','seath_crystal','sigillo_sinistro','sigillo_destro','culla_caos'].forEach(id=>{
    BALANCE[id]={preserveMoves:true,_skipBalance:true};
  });

  const KIND_SCALE={
    normal:{hp:0.14,stat:0.07},
    elite:{hp:0.16,stat:0.08},
    boss:{hp:0.18,stat:0.075}
  };

  function hasRealMoves(tpl){
    return (tpl.moves||[]).some(m=>m&&m.id&&!/^enemy_atk/.test(m.id));
  }
  function fallbackFocus(tpl){
    const n=((tpl?.id||'')+' '+(tpl?.name||'')).toLowerCase();
    if(/mage|mago|strega|witch|logan|channeler|cristall|crystal|farfalla|seath|lich/.test(n))return 'int';
    if(/gwyndolin|gwynevere|solaire|silver|argento|fulmine|sun|sole|nameless/.test(n))return 'faith';
    if(/dark|wraith|abisso|manus|fantasma|banshee|vampir|curse|maled/.test(n))return 'arcane';
    if(/ladro|assassin|dog|cane|gatto|wheel|ruota|balder|lautrec|kirk|sif/.test(n))return 'dex';
    if(/golem|havel|gigante|boar|cinghiale|smough|troll|mushroom|fungo/.test(n))return 'tank';
    return 'str';
  }
  function inferConfig(tpl){
    if(!tpl)return null;
    if(BALANCE[tpl.id])return BALANCE[tpl.id];
    if(/^four_king_/.test(tpl.id||''))return BALANCE.four_king;
    const kind=tpl.isBoss?'boss':tpl.isElite?'elite':'normal';
    const tier=(tpl.tier&&tpl.tier<20)?tpl.tier:(tpl.isBoss?3:tpl.isElite?2:1);
    const focus=fallbackFocus(tpl);
    const defaults=kind==='boss'?['hollow_slash','heavy_swing','brutal_smash','rage']:
      kind==='elite'?['hollow_slash','heavy_swing','guard','rage']:
      ['hollow_slash','heavy_swing','guard'];
    return {...profile(kind,tier,focus),kind,moves:defaults};
  }
  function applyTemplateBalance(tpl){
    if(!tpl||tpl._enemyBalanceApplied)return tpl;
    const cfg=inferConfig(tpl);
    if(!cfg||cfg._skipBalance)return tpl;
    const keep=cfg.preserveMoves&&hasRealMoves(tpl);
    const moves=keep?(tpl.moves||[]).map(m=>({...m})):moveList(cfg.moves||['hollow_slash']);
    Object.assign(tpl,{
      hp:cfg.hp??tpl.hp??10,
      strength:cfg.strength??tpl.strength??10,
      vigor:cfg.vigor??tpl.vigor??10,
      intelligence:cfg.intelligence??tpl.intelligence??10,
      dexterity:cfg.dexterity??tpl.dexterity??10,
      faith:cfg.faith??tpl.faith??10,
      arcane:cfg.arcane??tpl.arcane??10,
      tier:cfg.tier??tpl.tier??1,
      maxStamina:cfg.maxStamina??tpl.maxStamina,
      actionLimit:cfg.actionLimit??tpl.actionLimit,
      _fixedActionLimit:!!cfg._fixedActionLimit,
      _hpScaleRate:cfg._hpScaleRate,
      _statScaleRate:cfg._statScaleRate,
      _enemyKind:cfg.kind||(tpl.isBoss?'boss':tpl.isElite?'elite':'normal'),
      _noScale:false,
      moves,
      _enemyBalanceApplied:true
    });
    return tpl;
  }
  function actionLimitFor(enemy,floor=zoneTier()){
    if(enemy?._noAttack)return 0;
    if(enemy?._fixedActionLimit)return Math.max(1,enemy.actionLimit||1);
    if(enemy?._fourKing||/^four_king_/.test(enemy?.id||''))return 2;
    if(enemy?.isBoss)return clamp(Math.max(enemy.actionLimit||3,floor>=7?5:floor>=4?4:3),3,5);
    if(enemy?.isElite)return clamp(Math.max(enemy.actionLimit||2,floor>=4?3:2),2,3);
    return clamp(Math.max(enemy?.actionLimit||1,floor>=5?2:1),1,2);
  }
  function staminaFor(base,floor,kind){
    if(base.maxStamina)return base.maxStamina;
    if(kind==='boss')return floor>=7?15:floor>=6?14:floor>=4?12:10;
    if(kind==='elite')return floor>=6?12:floor>=4?10:8;
    return floor>=5?8:6;
  }

  const baseScaleEnemy=scaleEnemy;
  scaleEnemy=function(base,floor){
    if(!base)return baseScaleEnemy(base,floor);
    if(base._noAttack||base._fixedHp||/^fantoccio_/.test(base.id||'')){
      const inert=baseScaleEnemy(base,floor);
      inert.actionLimit=0;
      return inert;
    }
    const tpl=applyTemplateBalance(base);
    const kind=tpl._enemyKind||(tpl.isBoss?'boss':tpl.isElite?'elite':'normal');
    const rates=KIND_SCALE[kind]||KIND_SCALE.normal;
    const hpRate=tpl._hpScaleRate??rates.hp;
    const statRate=tpl._statScaleRate??rates.stat;
    const hpScale=tpl._noScale?1:1+(Math.max(1,floor)-1)*hpRate;
    const statScale=tpl._noScale?1:1+(Math.max(1,floor)-1)*statRate;
    const hp=Math.max(1,Math.round((tpl.hp||10)*hpScale));
    const stat=k=>Math.max(1,Math.round((tpl[k]||10)*statScale));
    const stamina=staminaFor(tpl,floor,kind);
    return {...tpl,
      maxHp:hp,hp,
      strength:stat('strength'),
      vigor:stat('vigor'),
      intelligence:stat('intelligence'),
      dexterity:stat('dexterity'),
      faith:stat('faith'),
      arcane:stat('arcane'),
      atk:stat('strength'),
      def:stat('vigor'),
      mag:stat('intelligence'),
      maxStamina:stamina,
      stamina,
      actionLimit:actionLimitFor(tpl,floor),
      buffs:{atk:[],def:[],mag:[]},
      debuffs:{atk:[],def:[],mag:[]},
      statusEffects:{},
      moves:(tpl.moves||[]).map(mv=>({...mv}))
    };
  };

  function applyAllTemplateBalances(){
    if(typeof allZoneTemplates!=='function')return;
    const seen=new Set();
    allZoneTemplates().forEach(tpl=>{
      if(!tpl||seen.has(tpl))return;
      seen.add(tpl);
      applyTemplateBalance(tpl);
    });
  }

  function statusValue(unit,key){return unit?.statusEffects?.[key]||0;}
  function stage(unit,stat){return typeof getNetStage==='function'?getNetStage(unit,stat):0;}
  function moveDoesDamage(m){return m&&(m.type==='atk'||m.type==='mag'||m.power||m._flat||m.effect==='flat_200');}
  function predictedDamage(enemy,m,target){
    if(!moveDoesDamage(m))return 0;
    try{return Math.max(0,_normalPreviewDamage(enemy,m,target,false));}
    catch(_){
      const atk=m.type==='mag'?(enemy.intelligence||enemy.mag||10):(enemy.strength||enemy.atk||10);
      const def=target?.vigor||0;
      return Math.max(1,Math.round(atk*(m.power||1)-def*0.5));
    }
  }
  function buffAlreadyUseful(enemy,m){
    const eff=m.effect;
    if(!eff)return false;
    if(eff==='buff_atk_self')return stage(enemy,'atk')>=2;
    if(eff==='buff_def_self'||eff==='buff_def_1s_5t'||eff==='buff_def_2s_3t')return stage(enemy,'def')>=2;
    if(eff==='buff_mag_self5')return stage(enemy,'mag')>=2;
    if(eff==='regen')return statusValue(enemy,'regen')>1||enemy.hp>=enemy.maxHp*0.85;
    if(eff==='infernal_contract')return statusValue(enemy,'infernal_contract')>1||stage(enemy,'atk')>=3;
    if(eff==='berserker_bonus')return statusValue(enemy,'berserker_bonus')>0;
    if(eff==='summon_skeletons')return (G.enemies||[]).filter(e=>e.hp>0).length>=4;
    return false;
  }
  function debuffAlreadyUseful(target,m){
    const eff=m.effect;
    if(!eff)return false;
    if(eff==='poison')return statusValue(target,'poison')>1;
    if(eff==='toxic_mist'||eff==='pestilent_mist')return statusValue(target,'poison')>1&&statusValue(target,'plague')>30;
    if(eff==='curse'||eff==='debuff_all')return stage(target,'atk')<=-2&&stage(target,'mag')<=-2;
    if(eff==='debuff_atk'||eff==='force_push')return stage(target,'atk')<=-2;
    if(eff==='debuff_def'||eff==='acid_surge'||eff==='wrath_push')return stage(target,'def')<=-3;
    if(eff==='debuff_mag'||eff==='vow_silence')return stage(target,'mag')<=-2;
    if(eff==='tranquil_walk')return statusValue(target,'freeze')>0;
    return false;
  }
  function hasAttackBuff(enemy){
    return stage(enemy,'atk')>0||stage(enemy,'mag')>0||statusValue(enemy,'berserker_bonus')>0||statusValue(enemy,'infernal_contract')>0;
  }

  enemyAI=function(enemy){
    const e=enemy||G.enemies?.[0];
    const p=G.player;
    if(!e||!p||e._noAttack)return null;
    const pool=(e.moves||[]).filter(m=>m&&!m._disabled&&(m.cost||1)<=e.stamina);
    if(!pool.length)return null;
    const hpRate=e.maxHp?e.hp/e.maxHp:1;
    const playerRate=p.maxHp?p.hp/p.maxHp:1;
    const used=e._enemyTurnUsedMoveIds||[];
    const actionLimit=actionLimitFor(e);
    const actionIndex=e._enemyActionsUsed||0;
    const scored=pool.map(m=>{
      const cost=m.cost||1;
      let score=rand(0,6);
      const dmg=predictedDamage(e,m,p);
      if(dmg>0){
        score+=dmg*2.2;
        if(dmg>=p.hp)score+=1000;
        if(playerRate<0.35)score+=18;
        if(hasAttackBuff(e))score+=8;
        if(cost>=3&&e.stamina-cost>=1&&actionIndex+1<actionLimit)score-=8;
        if(cost>=3&&actionIndex+1>=actionLimit)score+=12;
        if(used.includes(m.id)&&dmg<p.hp){
          score-=cost>=4?75:cost>=3?45:cost>=2?24:10;
        }
      }
      if(m.type==='heal'){
        const missing=e.maxHp-e.hp;
        const expected=Math.max(getMag(e,false),getDef(e))*(m.power||0.6);
        if(hpRate<0.30)score+=90+Math.min(missing,expected);
        else if(hpRate<0.55)score+=35+Math.min(missing,expected)*0.45;
        else score-=90;
        if(used.includes(m.id))score-=35;
      }
      if(m.type==='buff'){
        if(buffAlreadyUseful(e,m))score-=90;
        else{
          score+=e.isBoss?26:e.isElite?18:10;
          if(actionIndex===0)score+=10;
          if(hpRate<0.40&&(m.effect||'').includes('def'))score+=18;
          if(hpRate<0.35&&m.effect==='regen')score+=28;
          if(m.effect==='summon_skeletons'&&e.id==='nito')score+=(G.enemies||[]).length<=2?42:-60;
        }
        if(used.includes(m.id))score-=45;
      }
      if(m.type==='debuff'&&!m.power){
        if(debuffAlreadyUseful(p,m))score-=80;
        else{
          score+=e.isBoss?34:e.isElite?26:18;
          if(actionIndex===0)score+=8;
          if(playerRate<0.35)score-=8;
          if(m.effect==='vow_silence'&&p.stamina>=Math.max(4,p.maxStamina*0.35))score+=24;
          if(m.effect==='tranquil_walk'&&p.stamina>=Math.max(4,p.maxStamina*0.35))score+=18;
        }
        if(used.includes(m.id))score-=45;
      }
      if(m.type==='mag'&&stage(e,'mag')>0)score+=10;
      if(m.type==='atk'&&stage(e,'atk')>0)score+=10;
      if(e.stamina-cost===0)score+=actionIndex+1>=actionLimit?16:3;
      if(used.includes(m.id)&&!moveDoesDamage(m))score-=25;
      return {m,score};
    });
    scored.sort((a,b)=>b.score-a.score);
    const best=scored[0]?.m;
    if(!best)return pool.find(moveDoesDamage)||pool[0]||null;
    return best;
  };

  function canEnemyActAgain(e){
    if(!e||e.hp<=0||e._skipEnemyTurn)return false;
    if((e._enemyActionsUsed||0)>=actionLimitFor(e))return false;
    return (e.moves||[]).some(m=>m&&!m._disabled&&(m.cost||1)<=e.stamina);
  }
  function resetEnemyForTurn(e){
    if(!e||e.hp<=0)return;
    e._enemyActionsUsed=0;
    e._enemyTurnUsedMoveIds=[];
    e._skipEnemyTurn=false;
    if(statusValue(e,'stunned')>0){
      addLog(`${e.name} e' stordito e perde il turno!`,'system');
      e.statusEffects.stunned--;
      e.stamina=0;
      e._skipEnemyTurn=true;
      return;
    }
    if(statusValue(e,'freeze')>0){
      e.stamina=Math.max(1,Math.floor((e.maxStamina||6)/2));
      e.statusEffects.freeze--;
      addLog(`${e.name} e' congelato!`,'system');
    } else {
      e.stamina=e.maxStamina||6;
    }
  }

  doEnemyTurn=function(){
    G.enemies.forEach(resetEnemyForTurn);
    renderBattle(true);
    doNextEnemyAction(0);
  };
  doNextEnemyAction=function(idx){
    while(idx<G.enemies.length&&!canEnemyActAgain(G.enemies[idx]))idx++;
    if(idx>=G.enemies.length){finishTurn();return;}
    doEnemyAction(idx);
  };
  doEnemyAction=function(enemyIdx){
    const e=G.enemies[enemyIdx];
    if(!canEnemyActAgain(e)){doNextEnemyAction(enemyIdx+1);return;}
    const move=enemyAI(e);
    if(!move||e.stamina<=0){e._enemyActionsUsed=actionLimitFor(e);doNextEnemyAction(enemyIdx+1);return;}
    const cost=move.cost||1;
    if(cost>=3)G._enemyUsedHeavy=true;
    e.stamina=Math.max(0,e.stamina-cost);
    e._enemyActionsUsed=(e._enemyActionsUsed||0)+1;
    e._enemyTurnUsedMoveIds=e._enemyTurnUsedMoveIds||[];
    e._enemyTurnUsedMoveIds.push(move.id);
    renderBattle(true);
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
      const stillIdx=G.enemies.indexOf(e);
      const nextIdx=(stillIdx>=0&&canEnemyActAgain(e))?stillIdx:(stillIdx>=0?stillIdx+1:enemyIdx);
      setTimeout(()=>doNextEnemyAction(nextIdx),260);
    }});
  };

  const baseGetAtkEnemyBalance=getAtk;
  getAtk=function(u,ip){
    let v=baseGetAtkEnemyBalance(u,ip);
    if(!ip&&u&&u!==G.player){
      const se=u.statusEffects||{};
      if(se.magic_weapon)v*=1.15;
      if(se.great_magic_weapon)v*=1.25;
      if(se.crystal_magic_weapon)v*=1.40;
      if(se.sunlight_blade||se.darkmoon_blade)v*=1.30;
    }
    return Math.max(1,Math.round(v));
  };
  const baseGetCritEnemyBalance=getCrit;
  getCrit=function(u,ip,mc){
    let c=baseGetCritEnemyBalance(u,ip,mc);
    if(!ip&&u&&u!==G.player){
      if(u.statusEffects?.crit_boost)c*=2;
      if(u.statusEffects?.spectral)c+=0.12;
      if(u.statusEffects?.primal)c+=0.18;
    }
    return clamp(c,0,0.95);
  };
  const baseGetCritMultEnemyBalance=getCritMult;
  getCritMult=function(u,ip){
    let m=baseGetCritMultEnemyBalance(u,ip);
    if(!ip&&u&&u!==G.player){
      if(u.statusEffects?.crit_boost)m=2.0;
      if(u.statusEffects?.spectral)m=3.0;
    }
    return m;
  };

  const baseStartBattleEnemyBalance=startBattle;
  startBattle=function(isBoss){
    baseStartBattleEnemyBalance(isBoss);
    if(isBoss&&G.zone==='new_londo'&&G._fourKingsActive){
      const tier=zoneTier();
      G._fourKingsMaxHp=Math.round(430*(1+(tier-1)*0.16));
      G._fourKingsHp=G._fourKingsMaxHp;
      (G.enemies||[]).forEach(e=>{
        e.actionLimit=2;
        e._fixedActionLimit=true;
        e.maxStamina=Math.min(e.maxStamina||9,9);
        e.stamina=e.maxStamina;
      });
      addLog(`La vita condivisa dei 4 Re si stabilizza: ${G._fourKingsMaxHp} HP.`,'system');
      renderBattle(false);
    }
  };

  applyAllTemplateBalances();
  if(typeof window!=='undefined'){
    window.ENEMY_BALANCE={moves:ENEMY_MOVEBOOK,profiles:BALANCE,actionLimitFor,applyTemplateBalance};
  }
})();
