// MVP content pass: larger Dark Souls-inspired loot, moves and equipment pools.
// Loaded last so it can extend data without disturbing event scripts.
(function(){
  const REMOVED_ARMOR_NAMES=[
    'Casco di Cuoio','Casco a Maglia','Elmo di Piastra',"Cappuccio dell'Ombra",'Cerchio del Mago',
    'Armatura di Cuoio','Cotta di Maglia','Armatura di Piastra',"Veste dell'Apprendista",'Veste Arcana',
    'Gambali di Cuoio','Gambali a Maglia','Gambali di Piastra',
    'Stivali di Cuoio','Stivali Veloci','Stivali di Ferro','Stivali Arcani',
    'Cappello del Giocatore','Giacca del Giocatore','Pantaloni del Giocatore','Stivali del Giocatore'
  ];
  window.MVP_REMOVED_ARMOR_NAMES=REMOVED_ARMOR_NAMES;

  const PLACEHOLDER_ITEM_IDS=['item_comune','item_raro','item_epico','item_leggend'];
  const REMOVED_EQUIP_IDS=[
    'sword_iron','sword_steel','axe_heavy','sword_silver','staff_oak','staff_crystal','staff_void',
    'dagger_bone','dagger_serp','blade_faith','blade_sacred','shield_wood','shield_iron','shield_tower',
    'orb_arcane','tome_dark','helm_leather','helm_chain','helm_plate','hood_shadow','circlet_mage',
    'armor_leather','armor_chain','armor_plate','robe_apprentice','robe_arcane',
    'legs_leather','legs_chain','legs_plate','boots_leather','boots_swift','boots_iron','boots_arcane',
    'ring_iron','ring_power','ring_wisdom','ring_shadow','ring_faith','ring_vitality',
    'gambler_helmet','gambler_armor','gambler_legs','gambler_boots'
  ];

  function removeIds(arr,ids){
    const blocked=new Set(ids);
    for(let i=arr.length-1;i>=0;i--){
      if(blocked.has(arr[i]?.id)||arr[i]?.slot==='boots')arr.splice(i,1);
    }
  }
  removeIds(ITEMS,[...PLACEHOLDER_ITEM_IDS,'humanity','twin_humanities']);
  removeIds(EQUIP_POOL,REMOVED_EQUIP_IDS);

  function addMove(move){if(!ALL_MOVES.some(m=>m.id===move.id))ALL_MOVES.push(move);}
  function addItem(item){if(!ITEMS.some(i=>i.id===item.id))ITEMS.push(item);}
  function addEquipment(piece,{pool=true,preserve=false}={}){
    if(!ALL_EQUIPMENT[piece.id])ALL_EQUIPMENT[piece.id]={...piece};
    else if(!preserve)ALL_EQUIPMENT[piece.id]={...ALL_EQUIPMENT[piece.id],...piece};
    if(pool&&!EQUIP_POOL.some(e=>e.id===piece.id))EQUIP_POOL.push(ALL_EQUIPMENT[piece.id]);
  }
  function replaceEquipment(id,piece){ALL_EQUIPMENT[id]={...(ALL_EQUIPMENT[id]||{}),...piece};}
  function upsertSetBonus(id,desc,effect){SET_BONUSES[id]={desc,effect};}

  // Starting armor is re-themed into actual Dark Souls Remastered armor sets.
  replaceEquipment('soldier_helmet',{id:'soldier_helmet',name:'Elmo Standard',slot:'helmet',def:3,bonus:{vigor:1},passiveDesc:'Parte del set Cuoio Rigido.',setId:'hard_leather',icon:'H'});
  replaceEquipment('soldier_armor',{id:'soldier_armor',name:'Armatura di Cuoio Rigido',slot:'armor',def:5,bonus:{vigor:1},passiveDesc:'Parte del set Cuoio Rigido.',setId:'hard_leather',icon:'A'});
  replaceEquipment('soldier_boots',{id:'soldier_boots',name:'Guanti di Cuoio Rigido',slot:'gloves',def:2,bonus:{strength:1},passiveDesc:'Parte del set Cuoio Rigido.',setId:'hard_leather',icon:'G'});
  replaceEquipment('soldier_legs',{id:'soldier_legs',name:'Stivali di Cuoio Rigido',slot:'legs',def:3,bonus:{},passiveDesc:'Parte del set Cuoio Rigido.',setId:'hard_leather',icon:'B'});

  replaceEquipment('apprentice_helmet',{id:'apprentice_helmet',name:'Cappello dello Stregone',slot:'helmet',def:1,bonus:{intelligence:2},passiveDesc:'Parte del set Stregone.',setId:'sorcerer',icon:'H'});
  replaceEquipment('apprentice_armor',{id:'apprentice_armor',name:'Mantello dello Stregone',slot:'armor',def:2,bonus:{intelligence:2,arcane:1},passiveDesc:'Parte del set Stregone.',setId:'sorcerer',icon:'A'});
  replaceEquipment('apprentice_boots',{id:'apprentice_boots',name:'Guanti dello Stregone',slot:'gloves',def:1,bonus:{intelligence:1},passiveDesc:'Parte del set Stregone.',setId:'sorcerer',icon:'G'});
  replaceEquipment('apprentice_legs',{id:'apprentice_legs',name:'Stivali dello Stregone',slot:'legs',def:1,bonus:{arcane:1},passiveDesc:'Parte del set Stregone.',setId:'sorcerer',icon:'B'});
  replaceEquipment('sorcerer_staff',{id:'sorcerer_staff',name:'Catalizzatore dello Stregone',slot:'weapon',def:0,bonus:{intelligence:2},passiveDesc:'Primo incantesimo per turno: -1 stamina',setId:null,icon:'C'});

  replaceEquipment('brigand_helmet',{id:'brigand_helmet',name:'Cappuccio del Brigante',slot:'helmet',def:1,bonus:{dexterity:1},passiveDesc:'Parte del set Brigante.',setId:'brigand',icon:'H'});
  replaceEquipment('brigand_armor',{id:'brigand_armor',name:'Armatura del Brigante',slot:'armor',def:3,bonus:{dexterity:1},passiveDesc:'Parte del set Brigante.',setId:'brigand',icon:'A'});
  replaceEquipment('brigand_boots',{id:'brigand_boots',name:'Guanti del Brigante',slot:'gloves',def:1,bonus:{dexterity:1},passiveDesc:'+1 stamina regen per turno.',setId:'brigand',icon:'G'});
  replaceEquipment('brigand_legs',{id:'brigand_legs',name:'Pantaloni del Brigante',slot:'legs',def:2,bonus:{arcane:1},passiveDesc:'Parte del set Brigante.',setId:'brigand',icon:'B'});

  replaceEquipment('crusader_helmet',{id:'crusader_helmet',name:'Elmo del Paladino',slot:'helmet',def:4,bonus:{faith:1},passiveDesc:'Parte del set Paladino.',setId:'paladin',icon:'H'});
  replaceEquipment('crusader_armor',{id:'crusader_armor',name:'Armatura del Paladino',slot:'armor',def:7,bonus:{faith:1,vigor:1},passiveDesc:'Parte del set Paladino.',setId:'paladin',icon:'A'});
  replaceEquipment('crusader_boots',{id:'crusader_boots',name:'Guanti del Paladino',slot:'gloves',def:3,bonus:{faith:1},passiveDesc:'Parte del set Paladino.',setId:'paladin',icon:'G'});
  replaceEquipment('crusader_legs',{id:'crusader_legs',name:'Gambali del Paladino',slot:'legs',def:4,bonus:{vigor:1},passiveDesc:'Parte del set Paladino.',setId:'paladin',icon:'B'});
  replaceEquipment('sacred_board',{id:'sacred_board',name:'Talismano di Tela',slot:'weapon',def:0,bonus:{faith:2},passiveDesc:'Cure +10%',setId:null,icon:'T'});
  replaceEquipment('sacred_shield',{id:'sacred_shield',name:'Scudo Effigie',slot:'offhand',def:5,bonus:{faith:1},passiveDesc:'10% blocco colpi',setId:null,icon:'S'});

  upsertSetBonus('hard_leather','Sotto 50% HP: recuperi 3% HP max a fine turno','soldier_regen');
  upsertSetBonus('sorcerer','Grandezza mano +1','apprentice_hand');
  upsertSetBonus('brigand','Schivata +10%','brigand_dodge');
  upsertSetBonus('paladin','Riflesso Sacro +50% piu forte con DEF potenziata','crusader_reflect');
  upsertSetBonus('giant','DEF +20% e immunita ai debuff diretti','havel_stone');
  upsertSetBonus('elite_knight','DEF +12% e recupero lieve a fine combattimento','elite_knight_guard');
  upsertSetBonus('knight','DEF +10% e stamina max +1','knight_guard');
  upsertSetBonus('black_knight','Attacchi fisici +12%; colpi pesanti possono bruciare','black_knight_fury');
  upsertSetBonus('silver_knight','FAI +8% e primo miracolo del turno costa 1 in meno','silver_knight_oath');
  upsertSetBonus('havel','DEF +25%, immune ai debuff','havel_stone');
  upsertSetBonus('catarina','Se finisci il turno sotto 45% HP, recuperi 5% HP','catarina_resolve');
  upsertSetBonus('gold_hemmed','Bruciature inflitte durano +1 turno','chaos_robes');
  upsertSetBonus('shadow','Schivata +10% e critico +8%','shadow_dance');
  upsertSetBonus('painting_guardian','Ogni buff MAG pesca 1 carta','guardian_focus');
  upsertSetBonus('brass','Miracoli e cure +10%','brass_prayer');
  upsertSetBonus('ornstein','Primo attacco fisico del combattimento: critico','ornstein_charge');
  upsertSetBonus('favor','HP e stamina effettivi piu stabili','favor_protection');
  upsertSetBonus('thorns','Quando subisci danni, rifletti spine pari al 10% DEF','thorn_reflect');
  upsertSetBonus('artorias','ATK, DEF e MAG +10% durante i boss','artorias_legacy');
  upsertSetBonus('wanderer','+1 stamina regen se giochi almeno 2 mosse nel turno','wanderer_flow');
  upsertSetBonus('black_leather','Schivata +10%','brigand_dodge');
  upsertSetBonus('crimson','MAG +10% e debuff subiti durano 1 turno in meno','crimson_sage');
  upsertSetBonus('cleric','Cure +10% e FAI +2 effettiva','cleric_prayer');

  function addArmorSet(id,rarity,def,bonus,names,effectIcon='A'){
    addEquipment({id:`${id}_helmet`,name:names[0],slot:'helmet',rarity,def:def[0],bonus:bonus[0]||{},passiveDesc:`Parte del set ${names[4]}.`,setId:id,icon:'H'});
    addEquipment({id:`${id}_armor`,name:names[1],slot:'armor',rarity,def:def[1],bonus:bonus[1]||{},passiveDesc:`Parte del set ${names[4]}.`,setId:id,icon:effectIcon});
    addEquipment({id:`${id}_gloves`,name:names[2],slot:'gloves',rarity,def:def[2],bonus:bonus[2]||{},passiveDesc:`Parte del set ${names[4]}.`,setId:id,icon:'G'});
    addEquipment({id:`${id}_legs`,name:names[3],slot:'legs',rarity,def:def[3],bonus:bonus[3]||{},passiveDesc:`Parte del set ${names[4]}.`,setId:id,icon:'B'});
  }

  addArmorSet('elite_knight',2,[4,7,3,4],[{vigor:1},{vigor:2},{strength:1},{vigor:1}],['Elmo del Cavaliere Elite','Armatura del Cavaliere Elite','Guanti del Cavaliere Elite','Gambali del Cavaliere Elite','Cavaliere Elite']);
  addArmorSet('knight',1,[3,6,2,3],[{vigor:1},{vigor:1},{},{vigor:1}],['Elmo del Cavaliere','Armatura del Cavaliere','Guanti del Cavaliere','Gambali del Cavaliere','Cavaliere']);
  addArmorSet('black_knight',4,[6,10,4,6],[{strength:2},{strength:3,vigor:1},{strength:1},{vigor:2}],['Elmo del Cavaliere Nero','Armatura del Cavaliere Nero','Guanti del Cavaliere Nero','Gambali del Cavaliere Nero','Cavaliere Nero']);
  addArmorSet('silver_knight',3,[5,9,4,5],[{faith:1},{faith:2,vigor:1},{dexterity:1},{vigor:1}],["Elmo del Cavaliere d'Argento","Armatura del Cavaliere d'Argento","Guanti del Cavaliere d'Argento","Gambali del Cavaliere d'Argento","Cavaliere d'Argento"]);
  addArmorSet('havel',4,[8,14,6,8],[{vigor:3},{vigor:5,strength:2},{strength:2},{vigor:3}],["Elmo di Havel","Armatura di Havel","Guanti di Havel","Gambali di Havel","Havel"]);
  addArmorSet('catarina',3,[5,9,4,5],[{vigor:2},{vigor:2},{faith:1},{vigor:1}],['Elmo di Catarina','Armatura di Catarina','Guanti di Catarina','Gambali di Catarina','Catarina']);
  addArmorSet('shadow',2,[2,3,1,2],[{dexterity:2},{dexterity:1,arcane:1},{dexterity:1},{arcane:1}],["Maschera dell'Ombra","Veste dell'Ombra","Guanti dell'Ombra","Gambali dell'Ombra","Ombra"],'S');
  addArmorSet('painting_guardian',2,[2,3,1,2],[{dexterity:1},{faith:2},{dexterity:1},{faith:1}],['Cappuccio del Guardiano','Veste del Guardiano','Guanti del Guardiano','Gambali del Guardiano','Guardiano del Dipinto']);
  addArmorSet('brass',3,[4,8,3,4],[{faith:2},{faith:3,vigor:1},{faith:1},{vigor:1}],['Elmo di Ottone','Armatura di Ottone','Guanti di Ottone','Gambali di Ottone','Ottone']);
  addArmorSet('ornstein',4,[6,10,4,6],[{dexterity:2},{dexterity:3,faith:2},{strength:1},{dexterity:2}],['Elmo di Ornstein','Armatura di Ornstein','Guanti di Ornstein','Gambali di Ornstein','Ornstein'], 'O');
  addArmorSet('favor',3,[4,7,3,4],[{faith:1},{faith:2,dexterity:1},{dexterity:1},{vigor:1}],['Elmo del Favore','Abito del Favore','Guanti del Favore','Gambali del Favore','Favore']);
  addArmorSet('thorns',3,[4,8,3,4],[{arcane:1},{vigor:2,arcane:1},{strength:1},{vigor:1}],['Elmo di Spine','Armatura di Spine','Guanti di Spine','Gambali di Spine','Spine']);
  addArmorSet('artorias',4,[6,11,4,6],[{strength:1,dexterity:1},{strength:2,dexterity:2},{dexterity:1},{vigor:2}],['Elmo di Artorias','Armatura di Artorias','Guanti di Artorias','Gambali di Artorias','Artorias'], 'A');
  addArmorSet('wanderer',1,[2,3,1,2],[{dexterity:1},{dexterity:1},{},{arcane:1}],['Cappuccio del Viandante','Cappotto del Viandante','Manchette del Viandante','Stivali del Viandante','Viandante']);
  addArmorSet('black_leather',1,[2,3,1,2],[{dexterity:1},{dexterity:1},{arcane:1},{dexterity:1}],['Maschera del Ladro','Armatura di Cuoio Nero','Guanti di Cuoio Nero','Stivali di Cuoio Nero','Cuoio Nero']);
  addArmorSet('crimson',2,[2,4,1,2],[{intelligence:1},{intelligence:2,arcane:1},{arcane:1},{intelligence:1}],['Cappuccio Cremisi','Veste Cremisi','Guanti Cremisi','Gonna Cremisi','Cremisi']);
  addArmorSet('cleric',1,[2,4,2,3],[{faith:1},{faith:1,vigor:1},{faith:1},{vigor:1}],['Elmo del Chierico','Armatura del Chierico','Guanti del Chierico','Gambali del Chierico','Chierico']);

  // Event armor renamed into the DS1 Gold-Hemmed Black Set.
  if(ALL_EQUIPMENT.quelana_helm)Object.assign(ALL_EQUIPMENT.quelana_helm,{name:"Cappuccio Orlato d'Oro Nero",setId:'gold_hemmed',passiveDesc:"Parte del set Orlato d'Oro Nero.",icon:'H'});
  if(ALL_EQUIPMENT.quelana_armor)Object.assign(ALL_EQUIPMENT.quelana_armor,{name:"Veste Orlata d'Oro Nero",setId:'gold_hemmed',passiveDesc:"Parte del set Orlato d'Oro Nero.",icon:'A'});
  if(ALL_EQUIPMENT.quelana_gloves)Object.assign(ALL_EQUIPMENT.quelana_gloves,{name:"Guanti Orlati d'Oro Nero",setId:'gold_hemmed',passiveDesc:"Parte del set Orlato d'Oro Nero.",icon:'G'});
  if(ALL_EQUIPMENT.quelana_legs)Object.assign(ALL_EQUIPMENT.quelana_legs,{name:"Gonna Orlata d'Oro Nero",setId:'gold_hemmed',passiveDesc:"Parte del set Orlato d'Oro Nero.",icon:'B'});
  ['quelana_helm','quelana_armor','quelana_gloves','quelana_legs'].forEach(id=>{
    if(ALL_EQUIPMENT[id]&&!EQUIP_POOL.some(e=>e.id===id))EQUIP_POOL.push(ALL_EQUIPMENT[id]);
  });

  // Dark Souls Remastered rings. Existing rings are preserved, then made findable.
  const rings=[
    {id:'bellowing_dragoncrest_ring',name:'Anello del Drago Ruggente',rarity:3,bonus:{intelligence:5},passiveDesc:'MAG +15% tramite potere arcano.'},
    {id:'bloodbite_ring',name:'Anello Morso del Sangue',rarity:2,bonus:{vigor:2},passiveDesc:'Il sanguinamento si accumula piu lentamente.'},
    {id:'blue_tearstone_ring',name:'Anello Pietra Blu',rarity:2,bonus:{},passiveDesc:'Sotto 30% HP: DEF +40%.'},
    {id:'cat_covenant_ring',name:'Anello Patto del Gatto',rarity:2,bonus:{dexterity:2,arcane:1},passiveDesc:'Inizio combattimento: +2 stamina.'},
    {id:'cloranthy_ring',name:'Anello Cloranzia',rarity:3,bonus:{maxStamina:2},passiveDesc:'+2 stamina regen a fine turno.'},
    {id:'covenant_of_artorias',name:'Patto di Artorias',rarity:4,bonus:{arcane:4,vigor:2},passiveDesc:'Durante i boss: ATK, DEF e MAG +8%.'},
    {id:'covetous_gold_serpent_ring',name:"Anello d'Oro del Serpente",rarity:4,bonus:{arcane:5},passiveDesc:'Migliora la rarita delle ricompense.'},
    {id:'covetous_silver_serpent_ring',name:"Anello d'Argento del Serpente",rarity:4,bonus:{},passiveDesc:'+20% anime dai combattimenti.'},
    {id:'cursebite_ring',name:'Anello Morso della Maledizione',rarity:2,bonus:{arcane:2},passiveDesc:'Immunita ai debuff diretti.'},
    {id:'dark_wood_grain_ring',name:'Anello Legno Oscuro',rarity:4,bonus:{dexterity:4},passiveDesc:'15% di schivare i colpi.'},
    {id:'darkmoon_blade_covenant_ring',name:'Anello Patto Lama della Luna Oscura',rarity:3,bonus:{faith:4,dexterity:1},passiveDesc:'Miracoli offensivi piu incisivi.'},
    {id:'darkmoon_seance_ring',name:'Anello Seduta Luna Oscura',rarity:2,bonus:{faith:2},passiveDesc:'Pesca +1 carta nella mano iniziale.'},
    {id:'dusk_crown_ring',name:'Anello Corona del Crepuscolo',rarity:3,bonus:{intelligence:4,arcane:2},passiveDesc:'Magie e miracoli costano 1 stamina in meno.'},
    {id:'east_wood_grain_ring',name:"Anello Legno d'Oriente",rarity:2,bonus:{dexterity:2,maxStamina:1},passiveDesc:'Equip leggero e mosse fisiche piu fluide.'},
    {id:'flame_stoneplate_ring',name:'Anello Pietra della Fiamma',rarity:2,bonus:{vigor:2,faith:1},passiveDesc:'Bruciatura subita ridotta.'},
    {id:'hawk_ring',name:'Anello del Falco',rarity:2,bonus:{dexterity:3},passiveDesc:'Le mosse AOE e a distanza colpiscono con piu precisione.'},
    {id:'leo_ring',name:'Anello del Leone',rarity:4,bonus:{strength:2,dexterity:3},passiveDesc:'Armi da affondo colpiscono piu forte dopo una mossa pesante nemica.'},
    {id:'lingering_dragoncrest_ring',name:'Anello del Drago Persistente',rarity:3,bonus:{intelligence:3},passiveDesc:'I tuoi buff durano 1 turno in piu.'},
    {id:'old_witch_ring',name:'Anello della Vecchia Strega',rarity:3,bonus:{faith:2,arcane:3},passiveDesc:'Bruciature inflitte durano +1 turno.'},
    {id:'orange_charred_ring',name:'Anello Arancione Carbonizzato',rarity:4,bonus:{vigor:3,faith:2},passiveDesc:'Immunita pratica alla bruciatura.'},
    {id:'poisonbite_ring',name:'Anello Morso del Veleno',rarity:2,bonus:{vigor:2,arcane:1},passiveDesc:'Immunita pratica al veleno.'},
    {id:'rare_ring_sacrifice',name:'Anello Sacrificale Raro',rarity:3,bonus:{},passiveDesc:'Una volta per run evita la morte e si rompe.'},
    {id:'red_tearstone_ring',name:'Anello Pietra Rossa',rarity:3,bonus:{},passiveDesc:'Sotto 30% HP: ATK e MAG +35%.'},
    {id:'ring_favor_protection',name:'Anello del Favore e Protezione',rarity:4,bonus:{vigor:3,maxStamina:3},passiveDesc:'HP effettivi, difesa e stamina piu solidi.'},
    {id:'ring_fog',name:'Anello della Nebbia',rarity:3,bonus:{arcane:3},passiveDesc:'10% di schivare i colpi.'},
    {id:'ring_sacrifice',name:'Anello Sacrificale',rarity:2,bonus:{},passiveDesc:'Una volta per run evita la morte e si rompe.'},
    {id:'steel_protection_ring',name:"Anello d'Acciaio Protettivo",rarity:3,bonus:{vigor:4},passiveDesc:'DEF +12%.'},
    {id:'evil_eye_ring',name:'Anello del Malocchio',rarity:3,bonus:{arcane:2},passiveDesc:'Dopo un combattimento: recuperi 8% HP max.'},
    {id:'sun_princess_ring',name:'Anello della Principessa del Sole',rarity:4,bonus:{faith:5},passiveDesc:'Cure +20%.'},
    {id:'sun_firstborn_ring',name:'Anello del Primogenito del Sole',rarity:4,bonus:{faith:6},passiveDesc:'Miracoli offensivi piu potenti.'},
    {id:'rusted_iron_ring',name:'Anello di Ferro Arrugginito',rarity:2,bonus:{maxStamina:2},passiveDesc:'Il congelamento pesa meno sulla stamina.'},
    {id:'slumbering_dragoncrest_ring',name:'Anello del Drago Silente',rarity:3,bonus:{dexterity:2,arcane:2},passiveDesc:'Primo colpo del combattimento: critico.'},
    {id:'speckled_stoneplate_ring',name:'Anello Pietra Maculata',rarity:3,bonus:{vigor:2,faith:2,arcane:2},passiveDesc:'Resistenza generale agli status.'},
    {id:'spell_stoneplate_ring',name:'Anello Pietra Magica',rarity:2,bonus:{intelligence:2,vigor:1},passiveDesc:'Riduce l impatto delle magie nemiche.'},
    {id:'thunder_stoneplate_ring',name:'Anello Pietra del Tuono',rarity:2,bonus:{faith:2,vigor:1},passiveDesc:'Stabilizza contro fulmini e miracoli.'},
    {id:'tiny_being_ring',name:'Anello del Piccolo Essere',rarity:1,bonus:{vigor:2},passiveDesc:'+HP effettivi tramite VIG.'},
    {id:'white_seance_ring',name:'Anello Seduta Bianca',rarity:2,bonus:{faith:2},passiveDesc:'Pesca +1 carta nella mano iniziale.'},
    {id:'wolf_ring',name:'Anello del Lupo',rarity:3,bonus:{vigor:3,strength:1},passiveDesc:'DEF +8% e resistenza agli stordimenti.'},
    {id:'calamity_ring',name:'Anello della Calamita',rarity:5,bonus:{arcane:8},passiveDesc:'Rende la run piu rischiosa, ma alza la fortuna delle ricompense.'}
  ];
  rings.forEach(r=>addEquipment({slot:'ring',def:0,setId:null,icon:'R',...r}));
  addEquipment({id:'havel_ring',name:"Anello di Havel",slot:'ring',rarity:4,def:0,bonus:{maxStamina:10},passiveDesc:'+10 stamina massima.',setId:null,icon:'H'}, {preserve:true});
  addEquipment({id:'hornet_ring',name:'Anello del Calabrone',slot:'ring',rarity:4,def:0,bonus:{},passiveDesc:'+50% danno critico.',setId:null,icon:'H'}, {preserve:true});

  const weaponsAndShields=[
    {id:'claymore',name:'Claymore',slot:'weapon',rarity:2,def:0,bonus:{strength:4,dexterity:2},passiveDesc:'Attacchi fisici flessibili: +crit leggero.',icon:'W'},
    {id:'bastard_sword',name:'Spada Bastarda',slot:'weapon',rarity:1,def:0,bonus:{strength:4},passiveDesc:'Buona base per build STR.',icon:'W'},
    {id:'balder_side_sword',name:'Spada Laterale Balder',slot:'weapon',rarity:3,def:0,bonus:{dexterity:6},passiveDesc:'Affondi precisi: sinergia con critici e Anello del Leone.',icon:'W'},
    {id:'uchigatana',name:'Uchigatana',slot:'weapon',rarity:2,def:0,bonus:{dexterity:5,arcane:1},passiveDesc:'Attacchi fisici applicano sanguinamento leggero.',icon:'K'},
    {id:'iaito',name:'Iaito',slot:'weapon',rarity:3,def:0,bonus:{dexterity:7},passiveDesc:'Primo attacco dopo un buff: critico migliorato.',icon:'K'},
    {id:'chaos_blade',name:'Lama del Caos',slot:'weapon',rarity:4,def:0,bonus:{dexterity:9,arcane:4},passiveDesc:'Sanguinamento alto, ma gli attacchi fisici costano vita.',icon:'K'},
    {id:'quelaag_furysword',name:'Spada Furiosa di Quelaag',slot:'weapon',rarity:4,def:0,bonus:{dexterity:6,faith:4,arcane:3},passiveDesc:'Attacchi fisici applicano bruciatura leggera; bruciatura dura di piu con set Orlato.',icon:'F'},
    {id:'lifehunt_scythe',name:'Falce del Cacciatore di Vita',slot:'weapon',rarity:4,def:0,bonus:{dexterity:8,arcane:4},passiveDesc:'Attacchi fisici applicano molto sanguinamento.',icon:'S'},
    {id:'priscilla_dagger',name:'Pugnale di Priscilla',slot:'weapon',rarity:4,def:0,bonus:{dexterity:8,arcane:2},passiveDesc:'Critici applicano sanguinamento enorme.',icon:'D'},
    {id:'server',name:'Server',slot:'weapon',rarity:3,def:0,bonus:{strength:5,dexterity:3},passiveDesc:'Attacchi fisici drenano una piccola quantita di HP.',icon:'C'},
    {id:'gravelord_sword',name:'Spada del Re Tombale',slot:'weapon',rarity:4,def:0,bonus:{strength:6,arcane:6},passiveDesc:'Attacchi fisici applicano morbo mortale.',icon:'G'},
    {id:'moonlight_greatsword',name:'Spadone della Luna',slot:'weapon',rarity:4,def:0,bonus:{intelligence:10},passiveDesc:'Le mosse MAG colpiscono piu forte.',icon:'M'},
    {id:'greatsword_artorias',name:'Spadone di Artorias',slot:'weapon',rarity:4,def:0,bonus:{strength:6,dexterity:4,faith:4,arcane:2},passiveDesc:'Durante i boss: ATK e MAG +8%.',icon:'A'},
    {id:'black_knight_sword',name:'Spada del Cavaliere Nero',slot:'weapon',rarity:3,def:0,bonus:{strength:7},passiveDesc:'Fisico puro che applica bruciatura leggera.',icon:'B'},
    {id:'black_knight_greataxe',name:'Grande Ascia del Cavaliere Nero',slot:'weapon',rarity:4,def:0,bonus:{strength:12,vigor:2},passiveDesc:'Colpi pesanti devastanti, ottima con Forza Interiore.',icon:'B'},
    {id:'black_knight_halberd',name:'Alabarda del Cavaliere Nero',slot:'weapon',rarity:4,def:0,bonus:{strength:9,dexterity:3},passiveDesc:'Affondo pesante, sinergia con Anello del Leone.',icon:'B'},
    {id:'silver_knight_spear',name:"Lancia del Cavaliere d'Argento",slot:'weapon',rarity:3,def:0,bonus:{dexterity:6,faith:2},passiveDesc:'Affondi sacri: ottima con miracoli e Anello del Leone.',icon:'P'},
    {id:'dragonslayer_spear',name:'Lancia Ammazzadraghi',slot:'weapon',rarity:4,def:0,bonus:{dexterity:6,faith:6},passiveDesc:'Miracoli offensivi e affondi si potenziano a vicenda.',icon:'P'},
    {id:'great_club',name:'Grande Clava',slot:'weapon',rarity:2,def:0,bonus:{strength:8},passiveDesc:'Critici fisici stordiscono.',icon:'C'},
    {id:'dragon_king_greataxe',name:'Grande Ascia del Re Drago',slot:'weapon',rarity:4,def:0,bonus:{strength:14,vigor:3},passiveDesc:'Se sei sotto 50% HP, fisico +10%.',icon:'D'},
    {id:'gargoyle_tail_axe',name:'Ascia Coda Gargoyle',slot:'weapon',rarity:3,def:0,bonus:{strength:4,dexterity:4},passiveDesc:'Arma fisica elastica: critici e colpi multipli lavorano meglio.',icon:'G'},
    {id:'demon_greataxe',name:'Grande Ascia Demoniaca',slot:'weapon',rarity:3,def:0,bonus:{strength:12},passiveDesc:'Colpi pesanti devastanti, ideale con stamina alta e buff fisici.',icon:'D'},
    {id:'demon_great_machete',name:'Grande Mannaia Demoniaca',slot:'weapon',rarity:3,def:0,bonus:{strength:10},passiveDesc:'Danni enormi, costo alto compensato dalla stamina.',icon:'D'},
    {id:'golem_axe',name:'Ascia del Golem',slot:'weapon',rarity:4,def:0,bonus:{strength:10,vigor:3},passiveDesc:'Colpi pesanti creano pressione: ottima con scudi e build robuste.',icon:'G'},
    {id:'smough_hammer',name:'Martello di Smough',slot:'weapon',rarity:4,def:0,bonus:{strength:14,vigor:5},passiveDesc:'Attacchi fisici lenti ma brutali; se hai molta vita diventano ancora piu affidabili.',icon:'H'},
    {id:'tin_banishment_catalyst',name:'Catalizzatore Banditore',slot:'weapon',rarity:2,def:0,bonus:{intelligence:4,dexterity:2},passiveDesc:'Magie e affondi ibridi.',icon:'C'},
    {id:'oolacile_ivory_catalyst',name:"Catalizzatore d'Avorio di Oolacile",slot:'weapon',rarity:2,def:0,bonus:{intelligence:4,arcane:3},passiveDesc:'Buono per build di pesca e controllo.',icon:'C'},
    {id:'logan_catalyst',name:'Catalizzatore di Logan',slot:'weapon',rarity:4,def:0,bonus:{intelligence:12,arcane:3},passiveDesc:'Magie pure molto piu forti.',icon:'C'},
    {id:'tin_crystallization_catalyst',name:'Catalizzatore di Stagno Cristallizzato',slot:'weapon',rarity:5,def:0,bonus:{intelligence:18,arcane:4},passiveDesc:'MAG altissima; le magie costano +1 ma colpiscono durissimo.',icon:'C'},
    {id:'darkmoon_talisman',name:'Talismano della Luna Oscura',slot:'weapon',rarity:4,def:0,bonus:{faith:12,arcane:3},passiveDesc:'Miracoli offensivi +12%.',icon:'T'},
    {id:'velka_talisman',name:'Talismano di Velka',slot:'weapon',rarity:3,def:0,bonus:{intelligence:5,faith:5,arcane:2},passiveDesc:'Miracoli oscuri scalano meglio con INT e FAI.',icon:'T'},
    {id:'ascended_pyromancy_flame',name:'Mano della Piromanzia Ascesa',slot:'weapon',rarity:4,def:0,bonus:{intelligence:4,faith:4,arcane:8},passiveDesc:'Piromanzie e bruciature piu affidabili.',icon:'F'},
    {id:'grass_crest_shield',name:'Scudo Cimiero Erboso',slot:'offhand',rarity:3,def:5,bonus:{maxStamina:1},passiveDesc:'+2 stamina regen a fine turno.',icon:'S'},
    {id:'crest_shield',name:'Scudo Cimiero',slot:'offhand',rarity:2,def:6,bonus:{vigor:2,intelligence:1},passiveDesc:'Difesa stabile contro magia.',icon:'S'},
    {id:'dragon_crest_shield',name:'Scudo Cimiero Drago',slot:'offhand',rarity:2,def:6,bonus:{vigor:2,faith:1},passiveDesc:'Riduce bruciatura e supporta miracoli.',icon:'S'},
    {id:'bloodshield',name:'Scudo di Sangue',slot:'offhand',rarity:3,def:6,bonus:{vigor:2,arcane:2},passiveDesc:'Sanguinamento e veleno si accumulano piu lentamente.',icon:'S'},
    {id:'spider_shield',name:'Scudo del Ragno',slot:'offhand',rarity:2,def:5,bonus:{vigor:2,arcane:1},passiveDesc:'Ottimo contro veleno.',icon:'S'},
    {id:'silver_knight_shield',name:"Scudo del Cavaliere d'Argento",slot:'offhand',rarity:3,def:8,bonus:{vigor:2,faith:1},passiveDesc:'Difesa elegante per build FAI.',icon:'S'},
    {id:'black_knight_shield',name:'Scudo del Cavaliere Nero',slot:'offhand',rarity:3,def:8,bonus:{strength:2,vigor:2},passiveDesc:'Riduce bruciatura, ottimo con armi pesanti.',icon:'S'},
    {id:'greatshield_artorias',name:'Grande Scudo di Artorias',slot:'offhand',rarity:4,def:13,bonus:{vigor:5,strength:2},passiveDesc:'Immunita ai debuff diretti.',icon:'S'},
    {id:'havel_greatshield',name:'Grande Scudo di Havel',slot:'offhand',rarity:4,def:14,bonus:{vigor:6,strength:3},passiveDesc:'DEF enorme, ideale con Colpo dello Scudo.',icon:'S'},
    {id:'sanctus',name:'Sanctus',slot:'offhand',rarity:4,def:7,bonus:{faith:5,vigor:2},passiveDesc:'Rigenera HP a fine turno.',icon:'S'},
    {id:'crystal_ring_shield',name:'Scudo Anello di Cristallo',slot:'offhand',rarity:4,def:6,bonus:{intelligence:5},passiveDesc:'Quando subisci danni, riflette danno magico.',icon:'S'},
    {id:'dark_hand',name:'Mano Oscura',slot:'offhand',rarity:4,def:5,bonus:{arcane:7,faith:1},passiveDesc:'Off-hand dell Abisso: premia build ARC e route oscure senza occupare l arma.',icon:'D'},
    {id:'eagle_shield',name:"Scudo dell'Aquila",slot:'offhand',rarity:2,def:9,bonus:{vigor:3},passiveDesc:'Difesa alta per build lente.',icon:'S'},
    {id:'balder_shield',name:'Scudo Balder',slot:'offhand',rarity:2,def:6,bonus:{dexterity:1,vigor:1},passiveDesc:'Leggero, difensivo e preciso.',icon:'S'}
  ];
  weaponsAndShields.forEach(addEquipment);

  // Items: non-ring passives and permanent relics from DS1/DS3.
  [
    {id:'green_blossom',name:'Fiore Verde',icon:'G',rarity:1,desc:'+2 stamina massima e +2 stamina regen a fine turno.',effect:'mvp_stats',bonusStats:{maxStamina:2}},
    {id:'charcoal_pine_resin',name:'Resina Carbonizzata',icon:'F',rarity:1,desc:'Gli attacchi fisici applicano bruciatura leggera.',effect:'charcoal_pine_resin'},
    {id:'gold_pine_resin',name:'Resina Dorata',icon:'L',rarity:2,desc:'Gli attacchi fisici possono stordire e abbassare DEF.',effect:'gold_pine_resin'},
    {id:'rotten_pine_resin',name:'Resina Marcia',icon:'P',rarity:1,desc:'Gli attacchi fisici applicano veleno leggero.',effect:'rotten_pine_resin'},
    {id:'carthus_rouge',name:'Belletto di Carthus',icon:'B',rarity:2,desc:'Gli attacchi fisici accumulano sanguinamento.',effect:'carthus_rouge'},
    {id:'human_pine_resin',name:'Resina Umana',icon:'D',rarity:3,desc:'Gli attacchi fisici accumulano morbo mortale.',effect:'human_pine_resin'},
    {id:'purple_moss_clump',name:'Ciuffo di Muschio Viola',icon:'M',rarity:1,desc:'+2 VIG. Il veleno si consuma piu in fretta.',effect:'mvp_stats',bonusStats:{vigor:2}},
    {id:'blooming_purple_moss',name:'Muschio Viola Fiorito',icon:'M',rarity:2,desc:'+2 VIG, +2 ARC. Resistenza alta al veleno.',effect:'mvp_stats',bonusStats:{vigor:2,arcane:2}},
    {id:'benda_sporca',name:'Ciuffo di Muschio Rosso',icon:'M',rarity:1,desc:'Sotto 25% HP: piccola rigenerazione a inizio turno.',effect:'benda_sporca'},
    {id:'sacca_ossa',name:'Osso del Ritorno',icon:'B',rarity:1,desc:'Dopo i combattimenti normali recuperi +5% HP massimi.',effect:'sacca_ossa'},
    {id:'moneta_fortuna',name:"Moneta d'Oro",icon:'C',rarity:2,desc:'+15% anime dai combattimenti.',effect:'moneta_fortuna'},
    {id:'black_firebomb',name:'Bomba Nera',icon:'F',rarity:2,desc:'+2 STR, +2 ARC. Le bruciature sono piu interessanti.',effect:'mvp_stats',bonusStats:{strength:2,arcane:2}},
    {id:'lloyd_talisman',name:'Talismano di Lloyd',icon:'T',rarity:2,desc:'+3 FAI. I debuff nemici durano leggermente meno.',effect:'mvp_stats',bonusStats:{faith:3}},
    {id:'transient_curse',name:'Maledizione Transitoria',icon:'C',rarity:2,desc:'+3 ARC. I tuoi debuff durano meglio.',effect:'mvp_stats',bonusStats:{arcane:3}},
    {id:'roccia',name:'Pietra Purificante',icon:'P',rarity:2,desc:'Immunita ai debuff diretti.',effect:'roccia'},
    {id:'cuore_pietra',name:'Pietra Torso di Drago',icon:'D',rarity:3,desc:'Immunita ai debuff diretti e +3 VIG.',effect:'mvp_stats',bonusStats:{vigor:3}},
    {id:'repair_powder',name:'Polvere Riparante',icon:'R',rarity:1,desc:'+1 VIG, +1 DEX. Equip stabile e flessibile.',effect:'mvp_stats',bonusStats:{vigor:1,dexterity:1}},
    {id:'elizabeth_mushroom',name:'Fungo di Elizabeth',icon:'E',rarity:3,desc:'Rigeneri HP a inizio turno.',effect:'elizabeth_mushroom'},
    {id:'divine_blessing',name:'Benedizione Divina',icon:'D',rarity:3,desc:'+15 HP massimi, +3 FAI, cure +5%.',effect:'mvp_stats',bonusStats:{maxHp:15,faith:3},healBonus:0.05},
    {id:'fire_keeper_soul_relic',name:'Anima della Custode del Fuoco',icon:'S',rarity:4,desc:'+25 HP massimi, cure +10%.',effect:'mvp_stats',bonusStats:{maxHp:25},healBonus:0.10},
    {id:'estus_shard',name:'Frammento di Estus',icon:'E',rarity:2,desc:'+10 HP massimi, cure +5%.',effect:'mvp_stats',bonusStats:{maxHp:10},healBonus:0.05},
    {id:'undead_bone_shard',name:"Frammento d'Osso di Non Morto",icon:'B',rarity:3,desc:'Cure +12%.',effect:'mvp_stats',healBonus:0.12},
    {id:'dragon_scale',name:'Scaglia di Drago',icon:'D',rarity:3,desc:'+3 STR, +3 VIG, +2 ARC.',effect:'mvp_stats',bonusStats:{strength:3,vigor:3,arcane:2}},
    {id:'demon_titanite',name:'Titanite Demoniaca',icon:'T',rarity:3,desc:'+4 STR. Le armi uniche fisiche colpiscono meglio.',effect:'mvp_stats',bonusStats:{strength:4}},
    {id:'twinkling_titanite',name:'Titanite Scintillante',icon:'T',rarity:3,desc:'+2 a STR, DEX, INT e FAI.',effect:'mvp_stats',bonusStats:{strength:2,dexterity:2,intelligence:2,faith:2}},
    {id:'sunlight_medal',name:'Medaglia del Sole',icon:'S',rarity:2,desc:'+3 FAI, cure +5%.',effect:'mvp_stats',bonusStats:{faith:3},healBonus:0.05},
    {id:'souvenir_reversal',name:'Ricordo della Rappresaglia',icon:'R',rarity:2,desc:'+2 FAI, +2 DEX, critico +4%.',effect:'mvp_stats',bonusStats:{faith:2,dexterity:2},critBonus:0.04},
    {id:'tractor',name:"Occhio della Morte",icon:'E',rarity:3,desc:'+15% critico e critici piu pesanti.',effect:'tractor'},
    {id:'black_eye_orb',name:"Globo dell'Occhio Nero",icon:'O',rarity:3,desc:'Dopo un grosso colpo subito, la prossima mossa infligge +50%.',effect:'amuleto_vendetta'},
    {id:'amuleto_vendetta',name:'Globo Occhio Nero Incrinato',icon:'O',rarity:2,desc:'Dopo un grosso colpo subito, la prossima mossa infligge +50%.',effect:'amuleto_vendetta'},
    {id:'pozione_furia',name:'Resina Rossa di Sangue',icon:'R',rarity:2,desc:'Sotto 40% HP: ATK +25%.',effect:'pozione_furia'},
    {id:'cuore_drago',name:'Pietra Testa di Drago',icon:'D',rarity:4,desc:'Sotto 50% HP: ATK e MAG +30%.',effect:'cuore_drago'},
    {id:'psyfly',name:'Anima della Farfalla della Luna',icon:'M',rarity:3,desc:'20% di schivare i colpi.',effect:'psyfly'},
    {id:'elmetto_arrugginito',name:'Zanna del Cinghiale Corazzato',icon:'B',rarity:2,desc:'Riduce di 5 i colpi subiti sopra 5 danni.',effect:'elmetto_arrugginito'},
    {id:'elmo_cinghiale',name:'Elmo del Cinghiale Zannuto',icon:'B',rarity:3,desc:'Riduce i critici subiti.',effect:'elmo_cinghiale'},
    {id:'occhio_serpente',name:'Dente di Uomo-Serpente',icon:'S',rarity:2,desc:'I tuoi critici avvelenano se il nemico non e gia avvelenato.',effect:'occhio_serpente'},
    {id:'lama_cavaliere',name:'Scheggia di Spada del Cavaliere Nero',icon:'K',rarity:3,desc:'Gli attacchi fisici abbassano la DEF nemica per 2 turni.',effect:'lama_cavaliere'},
    {id:'artiglio_garg',name:'Alabarda del Gargoyle Spezzata',icon:'G',rarity:4,desc:'25%: una mossa fisica si ripete una volta.',effect:'artiglio_garg'},
    {id:'dente_idra',name:"Dente d'Idra",icon:'H',rarity:3,desc:'Rigeneri ogni turno; se sei avvelenato rigeneri di piu.',effect:'dente_idra'},
    {id:'rammus',name:'Scheggia di Spine di Kirk',icon:'K',rarity:3,desc:'Quando subisci danni, rifletti il 10% della tua DEF.',effect:'rammus'},
    {id:'seed_giant_tree',name:"Seme dell'Albero dei Giganti",icon:'G',rarity:4,desc:'+4 VIG, +2 ARC. Build difensive piu robuste.',effect:'mvp_stats',bonusStats:{vigor:4,arcane:2}},
    {id:'champion_bones',name:'Ossa del Campione',icon:'C',rarity:5,desc:'+4 a tutte le statistiche principali.',effect:'mvp_stats',bonusStats:{strength:4,vigor:4,intelligence:4,dexterity:4,faith:4,arcane:4}}
  ].forEach(addItem);

  const m=[
    {id:'ds1_heavy_soul_arrow',name:"Freccia dell'Anima Pesante",type:'mag',rarity:1,cost:2,power:1.2,desc:'Infliggi 120% INT.'},
    {id:'ds1_fire_orb',name:'Globo di Fuoco',type:'mag',rarity:1,cost:2,power:1.0,effect:'burn',desc:'Infliggi 100% INT. Può bruciare.'},
    {id:'ds1_force',name:'Forza',type:'debuff',rarity:1,cost:1,effect:'force_push',desc:'ATK nemico giu e -1 stamina nemica.'},
    {id:'ds1_heal',name:'Cura',type:'heal',rarity:1,cost:1,power:0.7,desc:'Cura 70% tra MAG/DEF.'},
    {id:'ds1_magic_weapon',name:'Arma Magica',type:'buff',rarity:1,cost:1,effect:'magic_weapon',desc:'Attacchi fisici +15% per 3 turni.'},
    {id:'ds1_flash_sweat',name:'Sudore Ardente',type:'buff',rarity:1,cost:1,effect:'flash_sweat',desc:'Rimuovi e blocca bruciatura per 4 turni.'},
    {id:'ds1_poison_mist',name:'Nebbia Velenosa',type:'debuff',rarity:1,cost:1,effect:'poison',desc:'Avvelena il nemico.'},
    {id:'ds3_great_farron_dart',name:'Grande Dardo di Farron',type:'mag',rarity:1,cost:1,power:0.75,desc:'Infliggi 75% INT. Economica.'},
    {id:'ds3_farron_flashsword',name:'Spadone Lampo di Farron',type:'mag',rarity:1,cost:1,power:0.85,desc:'Infliggi 85% INT; ottima con catalizzatori rapidi.'},
    {id:'ds3_deep_soul',name:'Anima Profonda',type:'mag',rarity:1,cost:1,power:0.75,effect:'debuff_mag',desc:'Infliggi 75% INT e indebolisce MAG.'},
    {id:'ds3_boulder_heave',name:'Masso Sollevato',type:'atk',rarity:1,cost:2,power:1.1,effect:'stun_on_crit',desc:'Infliggi 110% STR. Se critico, stordisce.'},

    {id:'ds1_great_heal',name:'Grande Cura',type:'heal',rarity:2,cost:2,power:1.2,desc:'Cura 120% tra MAG/DEF.'},
    {id:'ds1_replenishment',name:'Reintegrazione',type:'buff',rarity:2,cost:1,effect:'regen',desc:'Rigenerazione per 3 turni.'},
    {id:'ds1_emit_force',name:'Emetti Forza',type:'mag',rarity:2,cost:2,power:1.05,effect:'force_push',desc:'Infliggi 105% FAI/INT e spinge via stamina.'},
    {id:'ds1_lightning_spear',name:'Lancia del Fulmine',type:'mag',rarity:2,cost:2,power:1.25,effect:'debuff_def',desc:'Infliggi 125% FAI e DEF nemica giu.'},
    {id:'ds1_great_magic_weapon',name:'Grande Arma Magica',type:'buff',rarity:2,cost:1,effect:'great_magic_weapon',desc:'Attacchi fisici +25% per 3 turni.'},
    {id:'ds1_strong_magic_shield',name:'Grande Scudo Magico',type:'buff',rarity:2,cost:1,effect:'strong_magic_shield',desc:'DEF su di 3 stage per 3 turni.'},
    {id:'ds1_great_combustion',name:'Grande Combustione',type:'mag',rarity:2,cost:2,power:1.25,effect:'burn',desc:'Infliggi 125% INT. Può bruciare.'},
    {id:'ds1_fire_whip',name:'Frusta di Fuoco',type:'mag',rarity:2,cost:2,power:0.55,hits:3,effect:'burn',desc:'3 colpi da 55% INT. Può bruciare.'},
    {id:'ds1_toxic_mist',name:'Nebbia Tossica',type:'debuff',rarity:2,cost:2,effect:'toxic_mist',desc:'Veleno forte e morbo mortale leggero.'},
    {id:'ds1_acid_surge',name:'Getto Acido',type:'debuff',rarity:2,cost:2,effect:'acid_surge',desc:'DEF nemica giu di 2 stage.'},
    {id:'ds1_dark_orb',name:'Globo Oscuro',type:'mag',rarity:2,cost:2,power:1.2,effect:'debuff_mag',desc:'Infliggi 120% INT e MAG nemica giu.'},
    {id:'ds1_dark_fog',name:'Nebbia Oscura',type:'debuff',rarity:2,cost:2,effect:'toxic_mist',desc:'Veleno e morbo mortale leggero.'},
    {id:'ds3_great_deep_soul',name:'Grande Anima Profonda',type:'mag',rarity:2,cost:2,power:1.35,effect:'debuff_mag',desc:'Infliggi 135% INT e MAG nemica giu.'},
    {id:'ds3_farron_hail',name:'Grandine di Farron',type:'mag',rarity:2,cost:2,power:0.35,hits:5,desc:'5 colpi da 35% INT.'},
    {id:'ds3_stance_break',name:'Postura: Spezzaguardia',type:'atk',rarity:2,cost:2,power:1.2,effect:'debuff_def',desc:'Infliggi 120% STR e abbassa DEF.'},
    {id:'ds3_spin_slash',name:'Taglio Rotante',type:'atk',rarity:2,cost:2,power:0.6,hits:2,aoe:true,desc:'2 colpi da 60% STR a tutti.'},

    {id:'ds1_wrath_gods',name:'Ira degli Dei',type:'mag',rarity:3,cost:3,power:1.25,aoe:true,effect:'wrath_push',desc:'Infliggi 125% FAI a tutti, DEF giu e stamina nemica a zero.'},
    {id:'ds1_great_lightning_spear',name:'Grande Lancia del Fulmine',type:'mag',rarity:3,cost:3,power:1.65,effect:'debuff_def',desc:'Infliggi 165% FAI e DEF nemica giu.'},
    {id:'ds1_sunlight_blade',name:'Lama del Sole',type:'buff',rarity:3,cost:2,effect:'sunlight_blade',desc:'Attacchi fisici +30% e scalano con FAI per 3 turni.'},
    {id:'ds1_darkmoon_blade',name:'Lama della Luna Oscura',type:'buff',rarity:3,cost:2,effect:'darkmoon_blade',desc:'Attacchi fisici +30%, critici piu pericolosi per 3 turni.'},
    {id:'ds1_great_magic_barrier',name:'Grande Barriera Magica',type:'buff',rarity:3,cost:2,effect:'great_magic_barrier',desc:'DEF e MAG su di 2 stage per 4 turni.'},
    {id:'ds1_tranquil_walk',name:'Cammino Tranquillo della Pace',type:'debuff',rarity:3,cost:2,effect:'tranquil_walk',desc:'Congela e rallenta il nemico.'},
    {id:'ds1_vow_silence',name:'Voto del Silenzio',type:'debuff',rarity:3,cost:2,effect:'vow_silence',desc:'Stamina nemica a zero e MAG giu.'},
    {id:'ds1_gravelord_sword_dance',name:'Danza della Spada del Re Tombale',type:'mag',rarity:3,cost:3,power:0.65,hits:3,aoe:true,statusChance:{bleed:12,plague:0.12,poison:0,burn:0,freeze:0},desc:'3 colpi AOE. Sanguinamento e morbo.'},
    {id:'ds1_firestorm',name:'Tempesta di Fuoco',type:'mag',rarity:3,cost:3,power:0.8,hits:3,aoe:true,effect:'burn',desc:'3 colpi da 80% INT a tutti. Può bruciare.'},
    {id:'ds1_fire_tempest',name:'Tormenta di Fuoco',type:'mag',rarity:3,cost:3,power:0.95,hits:3,aoe:true,effect:'burn',desc:'3 colpi da 95% INT a tutti. Può bruciare.'},
    {id:'ds1_chaos_fire_whip',name:'Frusta di Fuoco Caotica',type:'mag',rarity:3,cost:3,power:0.65,hits:4,effect:'burn',desc:'4 colpi da 65% INT. Brucia spesso.'},
    {id:'ds1_black_flame',name:'Fiamma Nera',type:'mag',rarity:3,cost:2,power:1.35,effect:'debuff_def',desc:'Infliggi 135% INT e incrina la DEF.'},
    {id:'ds1_dark_bead',name:'Perle Oscure',type:'mag',rarity:3,cost:3,power:0.45,hits:6,effect:'debuff_mag',desc:'6 colpi da 45% INT e MAG giu.'},
    {id:'ds1_pursuers',name:'Inseguitori',type:'mag',rarity:3,cost:3,power:0.5,hits:5,effect:'debuff_mag',desc:'5 colpi oscuri da 50% INT.'},
    {id:'ds3_soul_greatsword',name:"Spadone dell'Anima",type:'mag',rarity:3,cost:3,power:1.25,aoe:true,desc:'Infliggi 125% INT a tutti.'},
    {id:'ds3_pestilent_mist',name:'Nebbia Pestilenziale',type:'debuff',rarity:3,cost:3,effect:'pestilent_mist',desc:'Morbo mortale consistente.'},
    {id:'ds3_chaos_bed_vestiges',name:'Vestigia della Culla del Caos',type:'mag',rarity:3,cost:3,power:1.75,effect:'burn',desc:'Infliggi 175% INT. Può bruciare.'},
    {id:'ds3_black_serpent',name:'Serpente Nero',type:'mag',rarity:3,cost:3,power:1.4,effect:'burn',aoe:true,desc:'Infliggi 140% INT a tutti. Può bruciare.'},
    {id:'ds3_profaned_flame',name:'Fiamma Profanata',type:'mag',rarity:3,cost:3,power:1.5,effect:'burn',desc:'Infliggi 150% INT e brucia.'},
    {id:'ds3_lightning_stake',name:'Paletto del Fulmine',type:'mag',rarity:3,cost:3,power:1.75,effect:'debuff_def',desc:'Miracolo ravvicinato: 175% FAI e DEF giu.'},
    {id:'ds3_dorhys_gnawing',name:'Rosicchiamento di Dorhys',type:'mag',rarity:3,cost:3,power:0.9,hits:2,statusChance:{bleed:35,poison:0,burn:0,freeze:0,plague:0.1},desc:'2 colpi oscuri, sanguinamento alto.'},
    {id:'ds3_lifehunt_scythe',name:'Falce Cacciavita',type:'mag',rarity:3,cost:3,power:1.45,effect:'drain_heal',statusChance:{bleed:20,poison:0,burn:0,freeze:0,plague:0},desc:'Infliggi danno oscuro, sanguina e cura.'},
    {id:'ds3_sacred_oath',name:'Giuramento Sacro',type:'buff',rarity:3,cost:3,effect:'sacred_oath',desc:'ATK, DEF e MAG su di 2 stage per 3 turni.'},
    {id:'ds3_deep_protection',name:'Protezione Profonda',type:'buff',rarity:3,cost:2,effect:'deep_protection',desc:'ATK, DEF, MAG su; piccola schivata per 3 turni.'},

    {id:'ds1_sunlight_spear',name:'Lancia del Sole',type:'mag',rarity:4,cost:4,power:2.35,effect:'debuff_def',desc:'Infliggi 235% FAI e DEF nemica giu.'},
    {id:'ds1_crystal_magic_weapon',name:'Arma Magica Cristallizzata',type:'buff',rarity:4,cost:2,effect:'crystal_magic_weapon',desc:'Attacchi fisici +40% per 3 turni.'},
    {id:'ds1_karmic_justice',name:'Giustizia Karmica',type:'buff',rarity:4,cost:2,effect:'karmic_justice',desc:'Per 3 turni, i colpi subiti riflettono luce esplosiva.'},
    {id:'ds1_bountiful_sunlight',name:'Luce Solare Benefica',type:'buff',rarity:4,cost:3,effect:'bountiful_sunlight',desc:'Rigenerazione potente per 5 turni.'},
    {id:'ds1_soothing_sunlight',name:'Luce Solare Rilassante',type:'heal',rarity:4,cost:3,effect:'soothing_sunlight',desc:'Cura il 45% degli HP massimi.'},
    {id:'ds1_chaos_storm',name:'Tempesta del Caos',type:'mag',rarity:4,cost:4,power:1.0,hits:4,aoe:true,effect:'burn',desc:'4 colpi AOE da 100% INT. Brucia.'},
    {id:'ds3_old_moonlight',name:'Vecchia Luna',type:'mag',rarity:4,cost:4,power:2.0,aoe:true,desc:'Infliggi 200% INT a tutti.'},
    {id:'ds3_soul_stream',name:"Fiume d'Anime",type:'mag',rarity:4,cost:4,power:0.75,hits:5,effect:'debuff_def',desc:'5 colpi da 75% INT e DEF giu.'},
    {id:'ds3_great_soul_dregs',name:"Grandi Residui d'Anima",type:'mag',rarity:4,cost:4,power:2.05,effect:'debuff_mag',desc:'Infliggi 205% INT e MAG nemica giu.'},
    {id:'ds3_lightning_storm',name:'Tempesta di Fulmini',type:'mag',rarity:4,cost:4,power:1.25,hits:3,aoe:true,effect:'debuff_def',desc:'3 colpi AOE da 125% FAI e DEF giu.'},
    {id:'ds3_lightning_arrow',name:'Freccia di Fulmine',type:'mag',rarity:4,cost:2,power:1.55,effect:'scarica_finale',desc:'Infliggi 155% FAI. Se svuoti la stamina, +30% danno.'},
    {id:'ds3_tears_denial',name:'Lacrime del Rifiuto',type:'buff',rarity:4,cost:3,effect:'tears_denial',desc:'Una volta nel combattimento, sopravvivi a 1 HP.'},
    {id:'ds3_dark_edge',name:'Lama Oscura',type:'mag',rarity:4,cost:4,power:1.8,effect:'debuff_def',desc:'Infliggi 180% INT e DEF giu.'},
    {id:'ds3_moonlight_vortex',name:'Vortice di Luna',type:'mag',rarity:4,cost:4,power:1.45,aoe:true,effect:'debuff_mag',desc:'Onda lunare AOE, MAG nemica giu.'},
    {id:'ds3_falling_bolt',name:'Fulmine Cadente',type:'mag',rarity:4,cost:4,power:2.0,effect:'debuff_def',desc:'Colpo di lancia sacra, 200% FAI.'},
    {id:'ds3_wolf_sword',name:'Spada del Lupo',type:'atk',rarity:4,cost:3,power:1.65,aoe:true,effect:'battle_flow',desc:'165% STR a tutti; cresce con le mosse giocate.'},

    {id:'myth_gwyn_first_flame',name:'Prima Fiamma di Gwyn',type:'mag',rarity:5,cost:5,power:2.8,aoe:true,effect:'debuff_def',desc:'Infliggi 280% FAI a tutti e abbatte la DEF.'},
    {id:'myth_manus_pursuers',name:"Oscurita di Manus",type:'mag',rarity:5,cost:5,power:0.75,hits:7,effect:'pestilent_mist',desc:'7 colpi oscuri da 75% INT e grande morbo mortale.'}
  ];
  m.forEach(addMove);

  // Mechanics extensions for the new content.
  const baseApplyItemStats=applyItemStats;
  applyItemStats=function(p,item){
    baseApplyItemStats(p,item);
    if(!p||!item)return;
    Object.entries(item.bonusStats||{}).forEach(([stat,val])=>{
      if(stat==='maxHp'){p.maxHp+=val;p.hp=clamp(p.hp+val,0,p.maxHp);}
      else if(stat==='maxStamina'){p.maxStamina=(p.maxStamina||0)+val;p.baseStamina=(p.baseStamina||0)+val;p.stamina=clamp((p.stamina||0)+val,0,p.maxStamina);}
      else p[stat]=(p[stat]||0)+val;
    });
    if(item.healBonus)p._mvpHealBonus=(p._mvpHealBonus||0)+item.healBonus;
    if(item.critBonus)p._mvpCritBonus=(p._mvpCritBonus||0)+item.critBonus;
  };

  const baseApplyStage=applyStage;
  applyStage=function(unit,stat,stage,turns,isDebuff=false){
    if(unit===G.player&&!isDebuff&&G.player.equipment?.ring?.id==='lingering_dragoncrest_ring')turns+=1;
    if(unit===G.player&&isDebuff&&(hasItem('lloyd_talisman')||getActiveSetBonus(G.player)?.effect==='crimson_sage'))turns=Math.max(1,turns-1);
    if(unit!==G.player&&isDebuff&&hasItem('transient_curse'))turns+=1;
    baseApplyStage(unit,stat,stage,turns,isDebuff);
  };

  const baseAddBleed=addBleed;
  addBleed=function(target,baseValue,arcane){
    let value=baseValue;
    if(target===G.player){
      const ring=G.player.equipment?.ring?.id,off=G.player.equipment?.offhand?.id;
      if(ring==='bloodbite_ring')value*=0.45;
      if(off==='bloodshield')value*=0.55;
      if(ring==='speckled_stoneplate_ring')value*=0.75;
    }
    baseAddBleed(target,value,arcane);
  };

  const baseApplyEffect=applyEffect;
  applyEffect=function(eff,caster,target,ip){
    const mvpDebuffs=['debuff_mag','force_push','wrath_push','tranquil_walk','vow_silence','toxic_mist','acid_surge','pestilent_mist'];
    const debuffBlocked=target===G.player&&mvpDebuffs.includes(eff)&&(
      hasItem('roccia')||hasItem('cuore_pietra')||
      G.player.equipment?.ring?.id==='cursebite_ring'||
      G.player.equipment?.offhand?.id==='greatshield_artorias'||
      getActiveSetBonus(G.player)?.effect==='havel_stone'
    );
    if(debuffBlocked){addLog('Immunità ai debuff!','passive');return;}
    switch(eff){
      case 'burn':{
        const sourceArcane=caster?.arcane||10;
        const chance=Math.min(0.85,0.45+Math.max(0,sourceArcane-10)*0.01);
        if(Math.random()<chance){
          target.statusEffects.burn=(target.statusEffects.burn||0)+3;
          addLog(`${target.name} prende fuoco!`,'system');
        } else addLog(`${target.name} resiste alla bruciatura.`,'system');
        return;
      }
      case 'debuff_mag': applyStage(target,'mag',1,3,true);addLog(`${target.name} perde MAG!`,'system');return;
      case 'force_push': applyStage(target,'atk',1,3,true);target.stamina=Math.max(0,(target.stamina||0)-1);addLog(`${target.name} viene respinto!`,'system');return;
      case 'wrath_push': applyStage(target,'def',1,3,true);target.stamina=0;addLog(`${target.name} viene travolto dall'Ira!`,'system');return;
      case 'magic_weapon': caster.statusEffects.magic_weapon=3;addLog('Arma Magica: attacchi fisici +15%!','passive');return;
      case 'great_magic_weapon': caster.statusEffects.great_magic_weapon=3;addLog('Grande Arma Magica: attacchi fisici +25%!','passive');return;
      case 'crystal_magic_weapon': caster.statusEffects.crystal_magic_weapon=3;addLog('Arma Cristallizzata: attacchi fisici +40%!','passive');return;
      case 'sunlight_blade': caster.statusEffects.sunlight_blade=3;addLog('Lama del Sole: fisico +30%!','passive');return;
      case 'darkmoon_blade': caster.statusEffects.darkmoon_blade=3;addLog('Lama della Luna Oscura: fisico +30%!','passive');return;
      case 'strong_magic_shield': applyStage(caster,'def',3,3);addLog('Grande Scudo Magico: DEF su di 3 stage!','system');return;
      case 'great_magic_barrier': applyStage(caster,'def',2,4);applyStage(caster,'mag',2,4);addLog('Grande Barriera Magica!','system');return;
      case 'tranquil_walk': applyFreeze(target);applyStage(target,'atk',1,3,true);addLog(`${target.name} rallenta!`,'system');return;
      case 'vow_silence': target.stamina=0;applyStage(target,'mag',3,3,true);addLog(`${target.name} e zittito!`,'system');return;
      case 'toxic_mist': target.statusEffects.poison=(target.statusEffects.poison||0)+5;addPlague(target,8);addLog(`${target.name} respira tossine!`,'system');return;
      case 'acid_surge': applyStage(target,'def',2,3,true);addLog(`${target.name} viene corroso!`,'system');return;
      case 'pestilent_mist': addPlague(target,22);addLog(`${target.name} viene divorato dal morbo!`,'system');return;
      case 'sacred_oath': ['atk','def','mag'].forEach(s=>applyStage(caster,s,2,3));addLog('Giuramento Sacro: tutto su di 2 stage!','system');return;
      case 'deep_protection': ['atk','def','mag'].forEach(s=>applyStage(caster,s,1,3));caster.statusEffects.deep_protection=3;addLog('Protezione Profonda!','system');return;
      case 'karmic_justice': caster.statusEffects.karmic_justice=3;addLog('Giustizia Karmica e pronta.','passive');return;
      case 'bountiful_sunlight': caster.statusEffects.regen=5;addLog('Luce benefica: rigenerazione lunga!','heal');return;
      case 'soothing_sunlight':{const h=Math.round(caster.maxHp*0.45*_healBonus(ip));caster.hp=clamp(caster.hp+h,0,caster.maxHp);addLog(`Luce Solare: cura ${h} HP!`,'heal');return;}
      case 'flash_sweat': caster.statusEffects.fire_guard=4;caster.statusEffects.burn=0;addLog('Sudore Ardente: bruciatura bloccata!','system');return;
      case 'tears_denial': caster.statusEffects.tears_denial=1;addLog('Lacrime del Rifiuto: sopravvivenza preparata.','passive');return;
      default: baseApplyEffect(eff,caster,target,ip);
    }
  };

  const baseTickBuffs=tickBuffs;
  tickBuffs=function(unit){
    baseTickBuffs(unit);
    ['magic_weapon','great_magic_weapon','crystal_magic_weapon','sunlight_blade','darkmoon_blade','deep_protection','karmic_justice','fire_guard'].forEach(k=>{
      if((unit.statusEffects[k]||0)>0)unit.statusEffects[k]--;
    });
  };

  const baseTickStatus=tickStatus;
  tickStatus=function(unit){
    if(unit===G.player){
      const ring=G.player.equipment?.ring?.id;
      const off=G.player.equipment?.offhand?.id;
      if(ring==='poisonbite_ring'||ring==='speckled_stoneplate_ring')unit.statusEffects.poison=0;
      if(unit.statusEffects.poison>0&&hasItem('blooming_purple_moss'))unit.statusEffects.poison=Math.max(0,unit.statusEffects.poison-2);
      else if(unit.statusEffects.poison>0&&hasItem('purple_moss_clump'))unit.statusEffects.poison=Math.max(0,unit.statusEffects.poison-1);
      if(ring==='orange_charred_ring'||unit.statusEffects.fire_guard>0)unit.statusEffects.burn=0;
      else if(unit.statusEffects.burn>0&&(ring==='flame_stoneplate_ring'||off==='dragon_crest_shield'||off==='black_knight_shield'))unit.statusEffects.burn=Math.max(0,unit.statusEffects.burn-1);
      if(ring==='rusted_iron_ring'&&unit.statusEffects.freeze>0)unit.statusEffects.freeze=Math.max(0,unit.statusEffects.freeze-1);
    }
    const stunned=baseTickStatus(unit);
    if(unit===G.player&&hasItem('elizabeth_mushroom')){
      const h=Math.round(unit.maxHp*0.04);unit.hp=clamp(unit.hp+h,0,unit.maxHp);addLog(`Fungo di Elizabeth: +${h} HP!`,'heal');
    }
    if(unit===G.player&&G.player.equipment?.offhand?.id==='sanctus'){
      const h=Math.max(1,Math.round(unit.maxHp*0.02));unit.hp=clamp(unit.hp+h,0,unit.maxHp);addLog(`Sanctus: +${h} HP!`,'heal');
    }
    return stunned;
  };

  const baseGetAtk=getAtk;
  getAtk=function(u,ip){
    let v=baseGetAtk(u,ip);
    if(ip&&u===G.player){
      const se=u.statusEffects||{},eq=u.equipment||{},ring=eq.ring?.id,weapon=eq.weapon?.id,set=getActiveSetBonus(u)?.effect;
      if(se.magic_weapon)v*=1.15;if(se.great_magic_weapon)v*=1.25;if(se.crystal_magic_weapon)v*=1.40;
      if(se.sunlight_blade||se.darkmoon_blade)v*=1.30;
      if(ring==='red_tearstone_ring'&&u.hp<u.maxHp*0.3)v*=1.35;
      if(ring==='ring_favor_protection')v*=1.05;
      if(ring==='covenant_of_artorias'&&G.enemy?.isBoss)v*=1.08;
      if(ring==='calamity_ring')v*=1.08;
      if(weapon==='dragon_king_greataxe'&&u.hp<u.maxHp*0.5)v*=1.10;
      if(weapon==='greatsword_artorias'&&G.enemy?.isBoss)v*=1.08;
      if(set==='black_knight_fury')v*=1.12;
      if(set==='artorias_legacy'&&G.enemy?.isBoss)v*=1.10;
      if(set==='ornstein_charge'&&!G._mvpOrnsteinChargeUsed){v*=1.12;}
    }
    return Math.max(1,Math.round(v));
  };

  const baseGetMag=getMag;
  getMag=function(u,ip){
    let v=baseGetMag(u,ip);
    if(ip&&u===G.player){
      const eq=u.equipment||{},ring=eq.ring?.id,weapon=eq.weapon?.id,set=getActiveSetBonus(u)?.effect;
      if(ring==='bellowing_dragoncrest_ring')v*=1.15;
      if(ring==='red_tearstone_ring'&&u.hp<u.maxHp*0.3)v*=1.35;
      if(ring==='covenant_of_artorias'&&G.enemy?.isBoss)v*=1.08;
      if(weapon==='moonlight_greatsword')v*=1.12;
      if(weapon==='logan_catalyst')v*=1.12;
      if(weapon==='tin_crystallization_catalyst')v*=1.25;
      if(weapon==='ascended_pyromancy_flame')v*=1.10;
      if(set==='chaos_robes'||set==='crimson_sage')v*=1.10;
      if(set==='artorias_legacy'&&G.enemy?.isBoss)v*=1.10;
    }
    return Math.max(1,Math.round(v));
  };

  const baseGetEffFai=getEffFai;
  getEffFai=function(u,ip){
    let v=baseGetEffFai(u,ip);
    if(ip&&u===G.player){
      const ring=u.equipment?.ring?.id,weapon=u.equipment?.weapon?.id,set=getActiveSetBonus(u)?.effect;
      if(ring==='sun_firstborn_ring'||ring==='darkmoon_blade_covenant_ring')v*=1.15;
      if(ring==='sun_princess_ring')v*=1.05;
      if(u.equipment?.offhand?.id==='sun_shield')v*=1.08;
      if(weapon==='darkmoon_talisman')v*=1.12;
      if(weapon==='dragonslayer_spear')v*=1.08;
      if(set==='brass_prayer'||set==='cleric_prayer')v*=1.10;
    }
    return Math.max(1,Math.round(v));
  };

  const baseGetDef=getDef;
  getDef=function(u){
    let v=baseGetDef(u);
    if(u===G.player){
      const ring=u.equipment?.ring?.id,set=getActiveSetBonus(u)?.effect;
      if(ring==='blue_tearstone_ring'&&u.hp<u.maxHp*0.3)v*=1.40;
      if(ring==='steel_protection_ring')v*=1.12;
      if(ring==='wolf_ring')v*=1.08;
      if(ring==='ring_favor_protection')v*=1.08;
      if(ring==='calamity_ring')v*=0.75;
      if(set==='havel_stone')v*=1.25;
      if(set==='knight_guard'||set==='elite_knight_guard'||set==='artorias_legacy')v*=1.10;
      if(set==='artorias_legacy'&&!G.enemy?.isBoss)v/=1.10;
    }
    return Math.max(0,Math.round(v));
  };

  const baseGetCrit=getCrit;
  getCrit=function(u,ip,mc){
    let c=baseGetCrit(u,ip,mc);
    if(ip&&u===G.player){
      const ring=u.equipment?.ring?.id,weapon=u.equipment?.weapon?.id,set=getActiveSetBonus(u)?.effect;
      if(u._mvpCritBonus)c+=u._mvpCritBonus;
      if(ring==='ring_fog')c+=0.04;
      if(ring==='beast_dark_ring'&&u.hp<u.maxHp*0.5)c+=0.10;
      if(ring==='slumbering_dragoncrest_ring'&&!G._firstAttackDone)c+=0.20;
      if(weapon==='claymore')c+=0.03;
      if(weapon==='gargoyle_tail_axe')c+=0.04;
      if(weapon==='iaito'&&(
        u.statusEffects?.magic_weapon>0||
        u.statusEffects?.great_magic_weapon>0||
        u.statusEffects?.crystal_magic_weapon>0||
        u.statusEffects?.sunlight_blade>0||
        u.statusEffects?.darkmoon_blade>0||
        u.statusEffects?.deep_protection>0||
        u.statusEffects?.night_veil_ready>0
      ))c+=0.08;
      if(set==='shadow_dance')c+=0.08;
    }
    return clamp(c,0,0.95);
  };

  const baseHealBonus=_healBonus;
  _healBonus=function(ip){
    let b=baseHealBonus(ip);
    if(ip&&G.player){
      if(G.player._mvpHealBonus)b+=G.player._mvpHealBonus;
      const ring=G.player.equipment?.ring?.id,set=getActiveSetBonus(G.player)?.effect;
      if(ring==='sun_princess_ring')b+=0.20;
      if(G.player.equipment?.offhand?.id==='sun_shield')b+=0.08;
      if(set==='brass_prayer'||set==='cleric_prayer')b+=0.10;
    }
    return b;
  };

  const basePlayerMoveCost=playerMoveCost;
  playerMoveCost=function(move,{consume=false}={}){
    let cost=basePlayerMoveCost(move,{consume});
    const ring=G.player?.equipment?.ring?.id,weapon=G.player?.equipment?.weapon?.id,set=getActiveSetBonus(G.player)?.effect;
    if(ring==='dusk_crown_ring'&&(move.type==='mag'||move.type==='heal'))cost=Math.max(0,cost-1);
    if(set==='silver_knight_oath'&&!G._mvpSilverMiracleDiscount&&move.type==='mag'&&G.player?.id==='paladin'){
      cost=Math.max(0,cost-1);if(consume)G._mvpSilverMiracleDiscount=true;
    }
    if(G.player?.statusEffects?.cost_minus1>0&&!move._isShiv){
      cost=Math.max(0,cost-1);
      if(consume)G.player.statusEffects.cost_minus1=0;
    }
    if(weapon==='tin_crystallization_catalyst'&&move.type==='mag')cost+=1;
    return cost;
  };

  const baseDrawCards=drawCards;
  drawCards=function(player,n){
    if(player===G.player&&arguments.length<2){
      const ring=G.player.equipment?.ring?.id;
      if(ring==='darkmoon_seance_ring'||ring==='white_seance_ring'||ring==='dusk_crown_ring')n=(player.handSize||5)+1;
    }
    baseDrawCards(player,n);
  };

  const baseInitCombat=_initCombat;
  _initCombat=function(){
    baseInitCombat();
    const p=G.player,ring=p.equipment?.ring?.id,set=getActiveSetBonus(p)?.effect;
    G._mvpSilverMiracleDiscount=false;G._mvpOrnsteinChargeUsed=false;
    if(ring==='cat_covenant_ring')p.stamina=clamp(p.stamina+2,0,p.maxStamina);
    if(ring==='slumbering_dragoncrest_ring'||set==='ornstein_charge')p.statusEffects.night_veil_ready=1;
  };

  const baseFinishTurn=finishTurn;
  finishTurn=function(){
    const wasBattle=document.getElementById('screen-battle')?.classList.contains('active');
    const movesBefore=G._movesThisTurn||0;
    const pBefore=G.player;
    const doubleRegen=!!pBefore?.statusEffects?.double_next_stamina;
    const cosmicRegen=!!pBefore?.statusEffects?.cosmic_resonance;
    const wasFrozen=!!pBefore?.statusEffects?.freeze;
    const vigorBonus=Math.round((pBefore?.vigor||10)*0.4);
    const regenPct=pBefore?.maxStamina>0?pBefore.stamina/pBefore.maxStamina:0;
    let baseRegen=Math.max(1,Math.round(2+regenPct*vigorBonus));
    if(pBefore?.equipment?.gloves?.id==='brigand_boots')baseRegen+=1;
    baseFinishTurn();
    const p=G.player;
    if(!wasBattle||!p||p.hp<=0||allEnemiesDead?.()||G.busy)return;
    let extra=0;
    const ring=p.equipment?.ring?.id,off=p.equipment?.offhand?.id,set=getActiveSetBonus(p)?.effect;
    if(doubleRegen){if(!wasFrozen)extra+=baseRegen;p.statusEffects.double_next_stamina=0;}
    if(cosmicRegen&&!wasFrozen)extra+=2;
    if(hasItem('green_blossom'))extra+=2;
    if(ring==='cloranthy_ring')extra+=2;
    if(off==='grass_crest_shield')extra+=2;
    if(ring==='ring_favor_protection')extra+=1;
    if(set==='wanderer_flow'&&movesBefore>=2)extra+=1;
    if(extra>0){p.stamina=clamp(p.stamina+extra,0,p.maxStamina);addLog(`Recupero bonus: +${extra} stamina!`,'passive');}
    if(set==='catarina_resolve'&&p.hp<p.maxHp*0.45){const h=Math.round(p.maxHp*0.05);p.hp=clamp(p.hp+h,0,p.maxHp);addLog(`Catarina: +${h} HP!`,'heal');}
    renderBattle(true);
  };

  const baseRollRarity=rollRarity;
  rollRarity=function(){
    let r=baseRollRarity();
    const ring=G.player?.equipment?.ring?.id;
    if((ring==='covetous_gold_serpent_ring'||ring==='calamity_ring')&&Math.random()<0.18)r=Math.min(5,r+1);
    return r;
  };

  const baseOnHit=_onHit;
  _onHit=function(att,def,dmg,move,ip){
    baseOnHit(att,def,dmg,move,ip);
    if(ip&&att===G.player&&dmg>0){
      const p=G.player,weapon=p.equipment?.weapon?.id,ring=p.equipment?.ring?.id,set=getActiveSetBonus(p)?.effect;
      const isPhysical=move.type==='atk'||move._isShiv;
      if(isPhysical){
        if(hasItem('charcoal_pine_resin')||weapon==='quelaag_furysword'||weapon==='black_knight_sword'||weapon==='coda_viverna')def.statusEffects.burn=(def.statusEffects.burn||0)+1;
        if(hasItem('gold_pine_resin')&&Math.random()<0.22){def.statusEffects.stunned=1;applyStage(def,'def',1,2,true);addLog('Resina Dorata: stordimento e DEF giu!','passive');}
        if(hasItem('rotten_pine_resin'))def.statusEffects.poison=(def.statusEffects.poison||0)+1;
        if(hasItem('carthus_rouge')||weapon==='uchigatana'||weapon==='lifehunt_scythe')addBleed(def,weapon==='lifehunt_scythe'?18:8,p.arcane||10);
        if(hasItem('human_pine_resin')||weapon==='gravelord_sword')addPlague(def,weapon==='gravelord_sword'?8:5);
        if(weapon==='server'){const h=Math.max(1,Math.round(dmg*0.08));p.hp=clamp(p.hp+h,0,p.maxHp);addLog(`Server: +${h} HP!`,'heal');}
        if(weapon==='chaos_blade'){const c=Math.max(1,Math.round(p.maxHp*0.03));p.hp=Math.max(1,p.hp-c);addBleed(def,12,p.arcane||10);addLog(`Lama del Caos: -${c} HP, sanguinamento!`,'passive');}
        if(weapon==='priscilla_dagger'&&G._lastCrit)addBleed(def,45,p.arcane||10);
        if(weapon==='great_club'&&G._lastCrit){def.statusEffects.stunned=1;addLog(`${def.name} e stordito dalla Grande Clava!`,'system');}
        if((weapon==='balder_side_sword'||weapon==='silver_knight_spear'||weapon==='black_knight_halberd')&&ring==='leo_ring'&&G._enemyUsedHeavy){
          const bonus=Math.round(dmg*0.25);def.hp=Math.max(0,def.hp-bonus);addLog(`Anello del Leone: +${bonus} danni!`,'passive');
        }
        if(set==='black_knight_fury'&&Math.random()<0.18)def.statusEffects.burn=(def.statusEffects.burn||0)+2;
      }
      if((ring==='old_witch_ring'||set==='chaos_robes')&&def.statusEffects.burn>0)def.statusEffects.burn+=1;
      if(set==='guardian_focus'&&move.type==='buff'&&move.effect?.includes('mag'))drawCards(p,1);
    }
    if(!ip&&def===G.player&&dmg>0){
      const p=G.player,off=p.equipment?.offhand?.id,set=getActiveSetBonus(p)?.effect;
      if(p.statusEffects?.deep_protection>0&&Math.random()<0.10){p.hp=clamp(p.hp+dmg,0,p.maxHp);addLog('Protezione Profonda evita il colpo!','passive');}
      if(p.statusEffects?.karmic_justice>0){const ref=Math.round(p.maxHp*0.12);G.enemy.hp=Math.max(0,G.enemy.hp-ref);addLog(`Giustizia Karmica: ${ref} danni riflessi!`,'passive');}
      if(off==='crystal_ring_shield'){const ref=Math.round(getMag(p,true)*0.35);G.enemy.hp=Math.max(0,G.enemy.hp-ref);addLog(`Scudo Anello di Cristallo: ${ref} danni!`,'passive');}
      if(set==='thorn_reflect'){const ref=Math.max(1,Math.round(getDef(p)*0.10));G.enemy.hp=Math.max(0,G.enemy.hp-ref);addLog(`Spine: ${ref} danni riflessi!`,'passive');}
    }
  };

  const baseShowGameOver=showGameOver;
  showGameOver=function(){
    const p=G.player,ring=p?.equipment?.ring?.id;
    if(p?.statusEffects?.tears_denial&&p.hp<=0){
      p.statusEffects.tears_denial=0;p.hp=1;G.busy=false;addLog('Lacrime del Rifiuto: sopravvivi a 1 HP!','heal');renderBattle(true);return;
    }
    if((ring==='ring_sacrifice'||ring==='rare_ring_sacrifice')&&!G._mvpSacrificeUsed){
      G._mvpSacrificeUsed=true;delete p.equipment.ring;p.hp=Math.max(1,Math.round(p.maxHp*0.35));G.busy=false;addLog('Anello Sacrificale spezzato: la morte e stata evitata.','heal');renderBattle(true);return;
    }
    baseShowGameOver();
  };
})();
