// Player content balance pass: explicit move scaling, broader stat support and rarity tuning.
(function(){
  'use strict';

  const MOVE_SOURCES=[WARRIOR_MOVES,MAGE_MOVES,ROGUE_MOVES,PALADIN_MOVES,ALL_MOVES];
  const ALL_STATS=['strength','dexterity','intelligence','faith','arcane'];

  function findMoves(id){
    const found=[];
    MOVE_SOURCES.forEach(src=>src.forEach(m=>{if(m.id===id)found.push(m);}));
    return found;
  }
  function annotate(id,scaling,patch={}){
    findMoves(id).forEach(m=>Object.assign(m,{scaling},patch));
  }
  function annotateMany(ids,scaling,patch={}){
    ids.forEach(id=>annotate(id,scaling,patch));
  }
  function upsertMove(move){
    const existing=ALL_MOVES.find(m=>m.id===move.id);
    if(existing)Object.assign(existing,move);
    else ALL_MOVES.push(move);
  }
  function upsertItem(item){
    const existing=ITEMS.find(i=>i.id===item.id);
    if(existing)Object.assign(existing,item);
    else ITEMS.push(item);
  }
  function upsertEquipment(piece){
    ALL_EQUIPMENT[piece.id]={...(ALL_EQUIPMENT[piece.id]||{}),...piece};
    if(!EQUIP_POOL.some(e=>e.id===piece.id))EQUIP_POOL.push(ALL_EQUIPMENT[piece.id]);
    else {
      const idx=EQUIP_POOL.findIndex(e=>e.id===piece.id);
      EQUIP_POOL[idx]=ALL_EQUIPMENT[piece.id];
    }
  }

  // Make older cards tell the engine what they really scale on.
  annotateMany(['w_fendente','w_fendente_2','w_colpo_poderoso','w_colpo_poderoso_2','w_carica','w_sanguina','w_rabbia','ds3_boulder_heave','ds3_stance_break','ds3_spin_slash','ds3_wolf_sword'],'strength');
  annotateMany(['r_pugnalata','r_pugnalata_2','r_affondata','r_affondata_2','r_veleno','r_doppio','r_esecuzione','shiv_strike','shiv_finisher','ds3_great_farron_dart','ds3_farron_flashsword','ds3_farron_hail'],'dexterity');
  annotateMany(['m_dardo','m_dardo_2','m_esplosione','m_esplosione_2','m_scarica','m_gelo','homing_soulmass','soul_spear','crystal_soul_spear','homing_crystal_soulmass','white_dragon_breath','ds3_soul_greatsword','ds3_old_moonlight','ds3_soul_stream','ds3_moonlight_vortex','card_mag_draw','magic_sword','magic_shield','ds1_magic_weapon','ds1_great_magic_weapon','ds1_strong_magic_shield','ds1_crystal_magic_weapon'],'intelligence');
  annotateMany(['p_colpo_sacro','p_colpo_sacro_2','p_punizione','p_punizione_2','p_scudo','p_cura','p_giudizio','p_voto','ds1_force','ds1_heal','ds1_great_heal','ds1_replenishment','ds1_emit_force','ds1_lightning_spear','ds1_great_lightning_spear','ds1_sunlight_spear','ds1_wrath_gods','ds1_great_magic_barrier','ds1_tranquil_walk','ds1_vow_silence','ds1_karmic_justice','ds1_bountiful_sunlight','ds1_soothing_sunlight','ds3_sacred_oath','ds3_tears_denial','ds3_lightning_stake','ds3_lightning_arrow','ds3_lightning_storm','ds3_falling_bolt','myth_gwyn_first_flame'],'faith');
  annotateMany(['pyro_fireball','pyro_fireball_intense','pyro_combustion','pyro_flame_whirl','pyro_wildfire','pyro_fire_rain','pyro_great_fireball','ds1_fire_orb','ds1_great_combustion','ds1_fire_whip','ds1_firestorm','ds1_fire_tempest'],'faith');
  annotateMany(['pyro_chaos_fireball','pyro_great_chaos_fireball','pyro_flame_fury','inner_power','ds1_poison_mist','ds1_toxic_mist','ds1_acid_surge','ds1_dark_orb','ds1_dark_fog','ds3_deep_soul','ds3_great_deep_soul','ds1_gravelord_sword_dance','ds1_chaos_fire_whip','ds1_black_flame','ds1_dark_bead','ds1_pursuers','ds3_pestilent_mist','ds3_chaos_bed_vestiges','ds3_black_serpent','ds3_profaned_flame','ds3_dorhys_gnawing','ds3_lifehunt_scythe','ds3_deep_protection','ds3_great_soul_dregs','ds3_dark_edge','myth_manus_pursuers','ds1_chaos_storm'],'arcane');

  annotate('p_giudizio','faith',{desc:'Infliggi 140% FAI. DEF nemica giu.'});
  annotate('m_tempesta','intelligence',{desc:'Infliggi danni INT crescenti con le mosse giocate questo turno.'});
  annotate('ds1_replenishment','faith',{desc:'Rigenerazione sacra per 3 turni.'});
  annotate('ds1_vow_silence','faith',{desc:'Silenzia il nemico: stamina a zero e MAG giu.'});
  annotate('ds1_black_flame','arcane',{desc:'Infliggi 135% ARC e incrina la DEF.'});
  annotate('ds1_chaos_storm','arcane',{desc:'Tempesta del Caos: danni ARC AOE e bruciatura.'});
  annotate('ds3_great_soul_dregs','arcane',{desc:'Infliggi 205% ARC e MAG nemica giu.'});
  annotate('pyro_chaos_fireball','arcane',{desc:'Infliggi 120% ARC e bruciatura.'});
  annotate('pyro_great_chaos_fireball','arcane',{desc:'Infliggi 165% ARC e bruciatura.'});
  annotate('ds3_great_farron_dart','dexterity',{desc:'Infliggi 75% DEX. Economica.'});
  annotate('ds3_farron_flashsword','dexterity',{desc:'Infliggi 85% DEX; ottima con armi rapide.'});
  annotate('ds3_farron_hail','dexterity',{desc:'5 colpi da 35% DEX.'});
  annotate('ds3_deep_soul','arcane',{desc:'Infliggi 75% ARC e indebolisce MAG.'});
  annotate('ds1_dark_orb','arcane',{desc:'Infliggi 120% ARC e MAG nemica giu.'});
  annotate('ds3_great_deep_soul','arcane',{desc:'Infliggi 135% ARC e MAG nemica giu.'});
  annotate('ds1_chaos_fire_whip','arcane',{desc:'4 colpi da 65% ARC. Brucia spesso.'});
  annotate('ds1_dark_bead','arcane',{desc:'6 colpi da 45% ARC e MAG giu.'});
  annotate('ds1_pursuers','arcane',{desc:'5 colpi oscuri da 50% ARC.'});
  annotate('ds3_chaos_bed_vestiges','arcane',{desc:'Infliggi 175% ARC. Puo bruciare.'});
  annotate('ds3_black_serpent','arcane',{desc:'Infliggi 140% ARC a tutti. Puo bruciare.'});
  annotate('ds3_profaned_flame','arcane',{desc:'Infliggi 150% ARC e brucia.'});
  annotate('ds3_dark_edge','arcane',{desc:'Infliggi 180% ARC e DEF giu.'});
  annotate('myth_manus_pursuers','arcane',{desc:'7 colpi oscuri da 75% ARC e grande morbo mortale.'});

  const newMoves=[
    // STR
    {id:'bal_str_iron_cleave',name:'Fendente del Ferro Nero',type:'atk',rarity:1,cost:1,power:0.95,scaling:'strength',desc:'Infliggi 95% STR. Solido e affidabile.'},
    {id:'bal_str_stonebreaker',name:'Spaccapietra',type:'atk',rarity:2,cost:2,power:1.25,effect:'debuff_def',scaling:'strength',desc:'Infliggi 125% STR e abbassi la DEF.'},
    {id:'bal_str_morne_warcry',name:'Grido di Morne',type:'buff',rarity:2,cost:1,effect:'buff_atk_self',scaling:'strength',desc:'ATK su. Ottimo prima dei colpi pesanti.'},
    {id:'bal_str_giant_guard',name:'Guardia del Gigante',type:'buff',rarity:2,cost:1,effect:'buff_def_2s_3t',scaling:'strength',desc:'DEF su di 2 stage per 3 turni.'},
    {id:'bal_str_ruin_throw',name:'Lanciapietra dei Demoni',type:'atk',rarity:2,cost:2,power:1.15,effect:'pierce',scaling:'strength',desc:'Infliggi 115% STR ignorando la difesa.'},
    {id:'bal_str_dragon_tooth',name:'Schianto del Dente di Drago',type:'atk',rarity:3,cost:3,power:1.65,effect:'stun_on_crit',scaling:'strength',desc:'Infliggi 165% STR. Se critico, stordisce.'},
    {id:'bal_str_ashen_tackle',name:'Spallata Cinerea',type:'atk',rarity:1,cost:1,power:0.70,effect:'debuff_atk',scaling:'strength',desc:'Infliggi 70% STR e indebolisci ATK.'},
    {id:'bal_str_colossus_vow',name:'Voto del Colosso',type:'buff',rarity:3,cost:2,effect:'vow_of_iron',scaling:'strength',desc:'Sacrifica vita per alzare molto la DEF.'},
    {id:'bal_str_last_heave',name:'Ultimo Masso',type:'atk',rarity:4,cost:4,power:2.15,effect:'recoil',scaling:'strength',desc:'Infliggi 215% STR, ma subisci contraccolpo.'},
    // DEX
    {id:'bal_dex_silver_flurry',name:'Raffica del Tracciante',type:'atk',rarity:1,cost:1,power:0.38,hits:3,scaling:'dexterity',desc:'3 colpi da 38% DEX.'},
    {id:'bal_dex_serpent_arrow',name:'Freccia del Serpente',type:'atk',rarity:2,cost:2,power:0.85,statusChance:{poison:0.25,burn:0,freeze:0,bleed:0,plague:0},scaling:'dexterity',desc:'Infliggi 85% DEX e puo avvelenare.'},
    {id:'bal_dex_shadowstep',name:'Passo Senza Suono',type:'buff',rarity:2,cost:1,effect:'spectral_form',scaling:'dexterity',desc:'Forma spettrale: schivata e critici migliori.'},
    {id:'bal_dex_falcon_counter',name:'Parata del Falco',type:'buff',rarity:2,cost:1,effect:'crit_boost',scaling:'dexterity',desc:'Critici potenziati per 3 turni.'},
    {id:'bal_dex_painted_dance',name:'Danza del Guardiano',type:'atk',rarity:3,cost:3,power:0.42,hits:4,effect:'debuff_def',scaling:'dexterity',desc:'4 colpi da 42% DEX e DEF giu.'},
    {id:'bal_dex_tracer_lunge',name:'Affondo del Tracciante',type:'atk',rarity:3,cost:2,power:1.30,effect:'guaranteed_crit_low_hp',scaling:'dexterity',desc:'130% DEX. Critico garantito sui nemici feriti.'},
    {id:'bal_dex_watcher_spin',name:'Ruota del Guardiano',type:'atk',rarity:4,cost:4,power:0.62,hits:4,aoe:true,scaling:'dexterity',desc:'4 colpi AOE da 62% DEX.'},
    // INT
    {id:'bal_int_vinheim_lattice',name:'Reticolo di Vinheim',type:'mag',rarity:1,cost:1,power:0.50,hits:2,scaling:'intelligence',desc:'2 colpi da 50% INT.'},
    {id:'bal_int_glass_memory',name:'Memoria di Cristallo',type:'buff',rarity:2,cost:1,effect:'buff_mag_draw',scaling:'intelligence',desc:'MAG su e pesca 1 carta.'},
    {id:'bal_int_shardfield',name:'Campo di Frammenti',type:'mag',rarity:2,cost:2,power:0.75,aoe:true,effect:'debuff_def',scaling:'intelligence',desc:'75% INT AOE e DEF giu.'},
    {id:'bal_int_silent_vector',name:'Vettore Silenzioso',type:'debuff',rarity:2,cost:2,effect:'debuff_mag',scaling:'intelligence',desc:'MAG nemica giu.'},
    {id:'bal_int_seath_vector',name:'Geometria di Seath',type:'mag',rarity:3,cost:3,power:1.65,effect:'debuff_def',scaling:'intelligence',desc:'165% INT e DEF giu.'},
    {id:'bal_int_hollow_star',name:'Stella Vuota',type:'mag',rarity:4,cost:4,power:1.75,aoe:true,scaling:'intelligence',desc:'175% INT a tutti.'},
    // FAI
    {id:'bal_fai_white_pulse',name:'Impulso della Via Bianca',type:'mag',rarity:1,cost:1,power:0.85,effect:'force_push',scaling:'faith',desc:'85% FAI e respinge il nemico.'},
    {id:'bal_fai_last_prayer',name:'Ultima Preghiera',type:'heal',rarity:2,cost:2,power:1.15,scaling:'faith',desc:'Cura 115% FAI.'},
    {id:'bal_fai_sunless_mercy',name:'Misericordia Senza Sole',type:'mag',rarity:2,cost:2,power:1.10,effect:'debuff_atk',scaling:'faith',desc:'110% FAI e ATK nemico giu.'},
    {id:'bal_fai_radiant_seal',name:'Sigillo Raggiante',type:'buff',rarity:3,cost:2,effect:'great_magic_barrier',scaling:'faith',desc:'DEF e MAG su per 4 turni.'},
    {id:'bal_fai_oath_ash',name:'Giuramento della Cenere',type:'buff',rarity:3,cost:3,effect:'sacred_oath',scaling:'faith',desc:'ATK, DEF e MAG su di 2 stage.'},
    {id:'bal_fai_first_flare',name:'Bagliore della Prima Fiamma',type:'mag',rarity:4,cost:4,power:1.90,effect:'debuff_def',scaling:'faith',desc:'190% FAI e DEF giu.'},
    // ARC
    {id:'bal_arc_humanity_rend',name:'Strappo di Umanita',type:'mag',rarity:1,cost:1,power:0.78,effect:'debuff_mag',scaling:'arcane',desc:'78% ARC e MAG nemica giu.'},
    {id:'bal_arc_grave_maggots',name:'Riti dei Vermi Tombali',type:'debuff',rarity:2,cost:2,effect:'toxic_mist',scaling:'arcane',desc:'Veleno forte e morbo leggero.'},
    {id:'bal_arc_darkroot_hex',name:'Maleficio di Radiceoscura',type:'mag',rarity:2,cost:2,power:0.62,hits:2,effect:'debuff_mag',scaling:'arcane',desc:'2 colpi da 62% ARC e MAG giu.'},
    {id:'bal_arc_blood_tax',name:'Decima di Sangue',type:'mag',rarity:3,cost:3,power:1.25,effect:'drain_heal',statusChance:{bleed:18,poison:0,burn:0,freeze:0,plague:0},scaling:'arcane',desc:'125% ARC, sanguina e cura.'},
    {id:'bal_arc_cursebrand',name:'Marchio della Maledizione',type:'debuff',rarity:3,cost:2,effect:'curse',scaling:'arcane',desc:'ATK e MAG nemiche giu pesante.'},
    {id:'bal_arc_manus_clutch',name:'Morsa Primordiale',type:'mag',rarity:4,cost:4,power:0.56,hits:5,effect:'debuff_all',scaling:'arcane',desc:'5 colpi da 56% ARC e debuff generale.'}
  ];
  newMoves.forEach(upsertMove);

  // The wilder flame cards work better as ARC tools: they reward status builds
  // without leaving FAI overloaded.
  annotateMany(['pyro_fireball_intense','pyro_flame_whirl','pyro_wildfire','pyro_fire_rain','ds1_great_combustion','ds1_fire_whip','ds1_firestorm','ds1_fire_tempest'],'arcane');
  annotate('pyro_fireball','faith',{desc:'Infliggi 65% FAI. Puo bruciare.'});
  annotate('pyro_combustion','faith',{desc:'Infliggi 80% FAI.'});
  annotate('pyro_great_fireball','faith',{desc:'Infliggi 135% FAI. Puo bruciare.'});
  annotate('ds1_fire_orb','faith',{desc:'Infliggi 100% FAI. Puo bruciare.'});
  annotate('pyro_fireball_intense','arcane',{desc:'Infliggi 95% ARC. Puo bruciare.'});
  annotate('pyro_flame_whirl','arcane',{desc:'2 colpi da 55% ARC. Puo bruciare.'});
  annotate('pyro_wildfire','arcane',{desc:'Infliggi 45% ARC a tutti. Puo bruciare.'});
  annotate('pyro_fire_rain','arcane',{desc:'3 colpi da 45% ARC. Puo bruciare.'});
  annotate('ds1_great_combustion','arcane',{desc:'Infliggi 125% ARC. Puo bruciare.'});
  annotate('ds1_fire_whip','arcane',{desc:'3 colpi da 55% ARC. Puo bruciare.'});
  annotate('ds1_firestorm','arcane',{desc:'3 colpi da 80% ARC a tutti. Puo bruciare.'});
  annotate('ds1_fire_tempest','arcane',{desc:'3 colpi da 95% ARC a tutti. Puo bruciare.'});

  const extraDexMoves=[
    {id:'bal_dex_mailbreaker_thrust',name:'Affondo dello Spezzamaglia',type:'atk',rarity:1,cost:1,power:0.72,effect:'pierce',scaling:'dexterity',desc:'Infliggi 72% DEX ignorando parte della difesa.'},
    {id:'bal_dex_burg_riposte',name:'Risposta di Burg',type:'atk',rarity:1,cost:1,power:0.95,effect:'crit_boost',scaling:'dexterity',desc:'Infliggi 95% DEX e prepari critici migliori.'},
    {id:'bal_dex_leaf_roll',name:'Rotolata della Foglia',type:'buff',rarity:1,cost:1,effect:'spectral_form',scaling:'dexterity',desc:'Schivata e critici migliori per pochi turni.'},
    {id:'bal_dex_bandit_flick',name:'Scatto del Bandito',type:'atk',rarity:1,cost:1,power:0.50,hits:2,scaling:'dexterity',desc:'2 colpi da 50% DEX.'},
    {id:'bal_dex_silver_spear',name:'Punta della Lancia d Argento',type:'atk',rarity:1,cost:1,power:0.90,scaling:'dexterity',desc:'Infliggi 90% DEX con un colpo preciso.'},
    {id:'bal_dex_gargoyle_tailcut',name:'Taglio di Coda del Gargoyle',type:'atk',rarity:1,cost:1,power:0.82,effect:'debuff_atk',scaling:'dexterity',desc:'Infliggi 82% DEX e indebolisci ATK.'},
    {id:'bal_dex_eastwood_feint',name:'Finta del Bosco Orientale',type:'debuff',rarity:1,cost:1,effect:'debuff_def',scaling:'dexterity',desc:'Abbassi la DEF nemica con una finta rapida.'},
    {id:'bal_dex_shortbow_volley',name:'Raffica d Arco Corto',type:'atk',rarity:2,cost:2,power:0.36,hits:4,scaling:'dexterity',desc:'4 colpi da 36% DEX.'},
    {id:'bal_dex_shadow_needle',name:'Ago delle Ombre',type:'atk',rarity:2,cost:2,power:0.75,statusChance:{poison:0.22,burn:0,freeze:0,bleed:0,plague:0},scaling:'dexterity',desc:'Infliggi 75% DEX e puo avvelenare.'},
    {id:'bal_dex_iaito_draw',name:'Estrazione dello Iaito',type:'atk',rarity:2,cost:2,power:1.05,statusChance:{poison:0,burn:0,freeze:0,bleed:16,plague:0},scaling:'dexterity',desc:'Infliggi 105% DEX e accumula sanguinamento.'},
    {id:'bal_dex_ricard_chain',name:'Catena di Ricard',type:'atk',rarity:2,cost:2,power:0.32,hits:5,scaling:'dexterity',desc:'5 colpi da 32% DEX.'},
    {id:'bal_dex_hornet_mark',name:'Marchio del Calabrone',type:'buff',rarity:2,cost:1,effect:'crit_boost',scaling:'dexterity',desc:'Critici potenziati per 3 turni.'},
    {id:'bal_dex_watchtower_sidestep',name:'Passo Laterale della Torre',type:'debuff',rarity:2,cost:1,effect:'debuff_atk',scaling:'dexterity',desc:'ATK nemico giu: lo fai colpire a vuoto.'},
    {id:'bal_dex_ghost_cut',name:'Taglio del Fantasma',type:'atk',rarity:2,cost:2,power:1.00,effect:'pierce',scaling:'dexterity',desc:'Infliggi 100% DEX ignorando la difesa.'},
    {id:'bal_dex_velka_wire',name:'Filo di Velka',type:'debuff',rarity:2,cost:2,effect:'debuff_mag',scaling:'dexterity',desc:'MAG nemica giu con un filo maledetto.'},
    {id:'bal_dex_lautrec_flurry',name:'Raffica di Lautrec',type:'atk',rarity:2,cost:2,power:0.48,hits:3,effect:'debuff_def',scaling:'dexterity',desc:'3 colpi da 48% DEX e DEF giu.'},
    {id:'bal_dex_needle_rain',name:'Pioggia di Aghi',type:'atk',rarity:2,cost:2,power:0.52,aoe:true,statusChance:{poison:0,burn:0,freeze:0,bleed:10,plague:0},scaling:'dexterity',desc:'52% DEX a tutti e lieve sanguinamento.'},
    {id:'bal_dex_forest_hunter_net',name:'Rete del Cacciatore',type:'debuff',rarity:2,cost:2,effect:'force_push',scaling:'dexterity',desc:'Blocchi il ritmo nemico e gli togli stamina.'},
    {id:'bal_dex_ciaran_waltz',name:'Valzer di Ciaran',type:'atk',rarity:3,cost:3,power:0.62,hits:3,effect:'guaranteed_crit_low_hp',scaling:'dexterity',desc:'3 colpi da 62% DEX. Critico sui nemici feriti.'},
    {id:'bal_dex_priscilla_step',name:'Passo di Priscilla',type:'buff',rarity:3,cost:2,effect:'spectral_form',scaling:'dexterity',desc:'Sparisci nel bianco: schivata e critici migliori.'}
  ];
  extraDexMoves.forEach(upsertMove);

  const balancedItems=[
    {id:'bal_item_splintered_giant_bone',name:'Osso di Gigante Spezzato',icon:'B',rarity:1,desc:'+2 STR. Una reliquia ruvida per build pesanti.',effect:'mvp_stats',bonusStats:{strength:2}},
    {id:'bal_item_silver_arrowhead',name:"Punta d'Argento",icon:'A',rarity:1,desc:'+2 DEX. Affina colpi rapidi e armi leggere.',effect:'mvp_stats',bonusStats:{dexterity:2}},
    {id:'bal_item_pale_scholar_shard',name:'Scheggia di Scolaro Pallido',icon:'S',rarity:1,desc:'+2 INT. Piccolo frammento di memoria arcana.',effect:'mvp_stats',bonusStats:{intelligence:2}},
    {id:'bal_item_sun_medal_cracked',name:'Medaglia del Sole Crepata',icon:'M',rarity:1,desc:'+2 FAI. Calore sbiadito, ma ancora vivo.',effect:'mvp_stats',bonusStats:{faith:2}},
    {id:'bal_item_dark_splinter',name:'Scheggia di Umanita Oscura',icon:'U',rarity:1,desc:'+2 ARC. Reagisce ai debuff e al sangue.',effect:'mvp_stats',bonusStats:{arcane:2}},
    {id:'bal_item_demon_horn_chip',name:'Scheggia di Corno Demoniaco',icon:'H',rarity:2,desc:'+3 STR, +1 VIG. Per colpi lenti e solidi.',effect:'mvp_stats',bonusStats:{strength:3,vigor:1}},
    {id:'bal_item_painted_silk',name:'Seta del Dipinto',icon:'P',rarity:2,desc:'+3 DEX, +1 ARC. Favorisce evasione e status.',effect:'mvp_stats',bonusStats:{dexterity:3,arcane:1}},
    {id:'bal_item_vinheim_ink',name:'Inchiostro di Vinheim',icon:'I',rarity:2,desc:'+3 INT, +1 DEX. Ottimo per stregonerie rapide.',effect:'mvp_stats',bonusStats:{intelligence:3,dexterity:1}},
    {id:'bal_item_canvas_thread',name:'Filo di Talismano',icon:'T',rarity:2,desc:'+3 FAI, +1 VIG. Miracoli piu stabili.',effect:'mvp_stats',bonusStats:{faith:3,vigor:1}},
    {id:'bal_item_abyss_residue',name:"Residuo dell'Abisso",icon:'R',rarity:2,desc:'+3 ARC, +1 INT. Oscurita addensata.',effect:'mvp_stats',bonusStats:{arcane:3,intelligence:1}},
    {id:'bal_item_titanite_core',name:'Nucleo di Titanite Pesante',icon:'C',rarity:3,desc:'+4 STR, +2 VIG. Build forza piu resistenti.',effect:'mvp_stats',bonusStats:{strength:4,vigor:2}},
    {id:'bal_item_hawk_pinion',name:'Penna del Falco',icon:'F',rarity:3,desc:'+4 DEX, +1 stamina max. Per turni agili.',effect:'mvp_stats',bonusStats:{dexterity:4,maxStamina:1}},
    {id:'bal_item_crystal_vein',name:'Vena di Cristallo',icon:'V',rarity:3,desc:'+4 INT, +2 ARC. Stregoneria e malefici ibridi.',effect:'mvp_stats',bonusStats:{intelligence:4,arcane:2}},
    {id:'bal_item_blind_saint_eye',name:'Occhio del Santo Cieco',icon:'E',rarity:3,desc:'+4 FAI, cure +5%.',effect:'mvp_stats',bonusStats:{faith:4},healBonus:0.05},
    {id:'bal_item_hollow_heart',name:'Cuore Cavo Pulsante',icon:'Q',rarity:3,desc:'+4 ARC, +2 DEX. Sanguinamento e maledizioni piu naturali.',effect:'mvp_stats',bonusStats:{arcane:4,dexterity:2}},
    {id:'bal_item_ancient_dragon_scale',name:'Scaglia Antica di Drago',icon:'D',rarity:4,desc:'+5 STR, +5 VIG. Leggendaria ma non universale.',effect:'mvp_stats',bonusStats:{strength:5,vigor:5}},
    {id:'bal_item_lost_prayer_ember',name:'Brace della Preghiera Perduta',icon:'L',rarity:4,desc:'+5 FAI, +3 INT. Per miracoli offensivi e ibridi.',effect:'mvp_stats',bonusStats:{faith:5,intelligence:3}},
    {id:'bal_item_primeval_dark_drop',name:'Goccia Oscura Primordiale',icon:'O',rarity:4,desc:'+5 ARC, +3 DEX. Forte su status e oscurita.',effect:'mvp_stats',bonusStats:{arcane:5,dexterity:3}}
  ];
  balancedItems.forEach(upsertItem);

  const balancedEquipment=[
    {id:'bal_stone_greataxe',name:'Grande Ascia di Pietra',slot:'weapon',rarity:2,def:0,bonus:{strength:7,vigor:1},passiveDesc:'+7 STR, +1 VIG. Arma pesante affidabile.',icon:'A'},
    {id:'bal_demon_knuckles',name:'Nocche Demoniache',slot:'weapon',rarity:3,def:0,bonus:{strength:8,dexterity:2},passiveDesc:'+8 STR, +2 DEX. Buone con combo fisiche.',icon:'N'},
    {id:'bal_painting_curved_sword',name:'Spada Curva del Dipinto',slot:'weapon',rarity:2,def:0,bonus:{dexterity:6,arcane:1},passiveDesc:'+6 DEX, +1 ARC. Tagli rapidi e status.',icon:'C'},
    {id:'bal_silver_tracer',name:'Tracciante d Argento',slot:'weapon',rarity:3,def:0,bonus:{dexterity:8,arcane:2},passiveDesc:'+8 DEX, +2 ARC. Critici e sanguinamento.',icon:'T'},
    {id:'bal_hunter_longbow',name:'Arco Lungo del Cacciatore',slot:'weapon',rarity:2,def:0,bonus:{dexterity:5,strength:1},passiveDesc:'+5 DEX, +1 STR. Per mosse di precisione.',icon:'B'},
    {id:'bal_vinheim_focus_staff',name:'Bastone Focale di Vinheim',slot:'weapon',rarity:2,def:0,bonus:{intelligence:6,dexterity:1},passiveDesc:'+6 INT, +1 DEX. Stregonerie rapide.',icon:'S'},
    {id:'bal_crystal_branch_staff',name:'Ramo Cristallino',slot:'weapon',rarity:3,def:0,bonus:{intelligence:8,arcane:2},passiveDesc:'+8 INT, +2 ARC. Cristallo e oscurita leggera.',icon:'R'},
    {id:'bal_canvas_talisman',name:'Talismano di Tela Consunta',slot:'weapon',rarity:2,def:0,bonus:{faith:6,vigor:1},passiveDesc:'+6 FAI, +1 VIG. Miracoli stabili.',icon:'T'},
    {id:'bal_sunless_chime',name:'Campana Senza Sole',slot:'weapon',rarity:3,def:0,bonus:{faith:6,arcane:4},passiveDesc:'+6 FAI, +4 ARC. Miracoli oscuri e maledizioni.',icon:'C'},
    {id:'bal_abyss_catalyst',name:"Catalizzatore dell'Abisso",slot:'weapon',rarity:3,def:0,bonus:{arcane:8,intelligence:2},passiveDesc:'+8 ARC, +2 INT. Malefici e status.',icon:'A'},
    {id:'bal_velka_talisman',name:'Talismano di Velka',slot:'weapon',rarity:4,def:0,bonus:{arcane:7,faith:5},passiveDesc:'+7 ARC, +5 FAI. Ibrido peccato/miracolo.',icon:'V'},
    {id:'bal_black_iron_shield',name:'Scudo di Ferro Nero Scheggiato',slot:'offhand',rarity:2,def:10,bonus:{strength:2,vigor:2},passiveDesc:'DEF alta, +2 STR e +2 VIG.',icon:'S'},
    {id:'bal_hawkwood_buckler',name:'Buckler del Disertore',slot:'offhand',rarity:2,def:4,bonus:{dexterity:4},passiveDesc:'+4 DEX. Scudo leggero da parata.',icon:'B'},
    {id:'bal_crystal_ward',name:'Guardia Cristallina',slot:'offhand',rarity:3,def:6,bonus:{intelligence:4,vigor:1},passiveDesc:'+4 INT e difesa media.',icon:'G'},
    {id:'bal_blessed_kite',name:'Scudo Benedetto del Nibbio',slot:'offhand',rarity:3,def:7,bonus:{faith:4,vigor:2},passiveDesc:'+4 FAI, +2 VIG. Difesa da chierico.',icon:'K'},
    {id:'bal_abyssal_guard',name:"Guardia dell'Abisso",slot:'offhand',rarity:3,def:5,bonus:{arcane:5,dexterity:1},passiveDesc:'+5 ARC, +1 DEX. Off-hand per oscurita.',icon:'G'},
    {id:'bal_ring_giant_grip',name:'Anello della Presa Gigante',slot:'ring',rarity:2,def:0,bonus:{strength:3},passiveDesc:'+3 STR.',icon:'R'},
    {id:'bal_ring_hawkstep',name:'Anello del Passo di Falco',slot:'ring',rarity:2,def:0,bonus:{dexterity:3},passiveDesc:'+3 DEX.',icon:'R'},
    {id:'bal_ring_scholar_dusk',name:'Anello dello Scolaro del Crepuscolo',slot:'ring',rarity:2,def:0,bonus:{intelligence:3},passiveDesc:'+3 INT.',icon:'R'},
    {id:'bal_ring_white_vow',name:'Anello del Voto Bianco',slot:'ring',rarity:2,def:0,bonus:{faith:3},passiveDesc:'+3 FAI.',icon:'R'},
    {id:'bal_ring_dark_sigil',name:'Anello del Sigillo Oscuro',slot:'ring',rarity:2,def:0,bonus:{arcane:3},passiveDesc:'+3 ARC.',icon:'R'},
    {id:'bal_ring_split_soul',name:'Anello dell Anima Divisa',slot:'ring',rarity:3,def:0,bonus:{intelligence:2,faith:2,arcane:2},passiveDesc:'+2 INT, +2 FAI, +2 ARC.',icon:'R'}
  ];
  balancedEquipment.forEach(upsertEquipment);

  const baseRollRarityBalance=rollRarity;
  rollRarity=function(){
    let r=baseRollRarityBalance();
    if(r===5&&Math.random()<0.25)r=4;
    if(r===4&&Math.random()<0.30)r=3;
    if(r===3&&Math.random()<0.12)r=2;
    return r;
  };

  if(typeof window!=='undefined'){
    window.PLAYER_CONTENT_BALANCE={newMoves:newMoves.length+extraDexMoves.length,newItems:balancedItems.length,newEquipment:balancedEquipment.length,stats:ALL_STATS};
  }
})();
