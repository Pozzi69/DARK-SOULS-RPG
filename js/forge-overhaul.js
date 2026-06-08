// Forge overhaul. Loaded after game.js and replaces the old forge interaction.
(function(){
  const FORGE_EQUIP_PRICE={1:80,2:140,3:220,4:340,5:520};
  const SHIV_EFFECTS={
    shiv_2_def2:{base:'shiv_def',n:2,def:2,turns:3},
    shiv_3_def2:{base:'shiv_def',n:3,def:2,turns:3},
    shiv_4_def2:{base:'shiv_def',n:4,def:2,turns:3},
    shiv_3_exhaust:{base:'shiv_only',n:3},
    shiv_4_exhaust:{base:'shiv_only',n:4},
    shiv_5_exhaust:{base:'shiv_only',n:5},
    shiv_2_draw_discard:{base:'shiv_draw_discard',n:2,draw:1},
    shiv_3_draw_discard:{base:'shiv_draw_discard',n:3,draw:1},
    shiv_4_draw_discard:{base:'shiv_draw_discard',n:4,draw:1}
  };

  const baseApplyEffect=applyEffect;
  applyEffect=function(eff,caster,target,ip){
    const sh=SHIV_EFFECTS[eff];
    if(sh){
      addShivToHand(sh.n);
      if(sh.base==='shiv_def'){
        applyStage(caster,'def',sh.def,sh.turns);
        addLog(`${caster.name}: ${sh.n} Coltelli da lancio e DEF ▲${sh.def} st per ${sh.turns}t!`,'system');
      } else if(sh.base==='shiv_draw_discard'){
        drawCards(G.player,sh.draw);
        addLog(`${caster.name}: ${sh.n} Coltelli da lancio, pesca ${sh.draw} carta e scarta 1!`,'passive');
        G.busy=true;showShivDiscardChoice();
      } else {
        addLog(`${caster.name}: ${sh.n} Coltelli da lancio aggiunti alla mano!`,'passive');
      }
      return;
    }
    baseApplyEffect(eff,caster,target,ip);
  };

  function forgePriceForEquip(piece){return routeShopPrice(FORGE_EQUIP_PRICE[piece.rarity||1]||140);}
  function pickFrom(pool){return pool.length?choice(pool):null;}
  function pct(v){return `${Math.round(v*100)}%`;}
  function replaceFirstPercent(desc,newPower){return (desc||'').replace(/\d+%/,pct(newPower));}
  function replaceNumberAfter(desc,label,next){return (desc||'').replace(new RegExp(`${label} (\\d+)`,'i'),`${label} ${next}`);}
  function replaceShivText(desc,next){return (desc||'').replace(/Aggiungi \d+ (Shiv|Coltelli da lancio)/i,`Aggiungi ${next} Coltelli da lancio`);}
  function shivUpgradeEffect(eff){
    if(eff==='shiv_2_def2')return 'shiv_3_def2';
    if(eff==='shiv_3_def2')return 'shiv_4_def2';
    if(eff==='shiv_3_exhaust')return 'shiv_4_exhaust';
    if(eff==='shiv_4_exhaust')return 'shiv_5_exhaust';
    if(eff==='shiv_2_draw_discard')return 'shiv_3_draw_discard';
    if(eff==='shiv_3_draw_discard')return 'shiv_4_draw_discard';
    return null;
  }
  function describeUpgrade(up){return up._upgradeDesc||'Potenziamento applicato';}
  function forgeRollEquipOffers(){
    const offers=[];
    ['helmet','armor','legs','boots'].forEach(slot=>{
      const piece=pickFrom(shuffle(EQUIP_POOL.filter(e=>e.slot===slot)));
      if(piece)offers.push({...piece,_forgePrice:forgePriceForEquip(piece)});
    });
    const weapon=pickFrom(shuffle(EQUIP_POOL.filter(e=>e.slot==='weapon'&&!/staff|bastone/i.test(e.id+' '+e.name))));
    const staff=pickFrom(shuffle(EQUIP_POOL.filter(e=>e.slot==='weapon'&&/staff|bastone/i.test(e.id+' '+e.name))));
    const shield=pickFrom(shuffle(EQUIP_POOL.filter(e=>e.slot==='offhand'&&/shield|scudo|buckler/i.test(e.id+' '+e.name))));
    [weapon,staff,shield].filter(Boolean).forEach(piece=>offers.push({...piece,_forgePrice:forgePriceForEquip(piece)}));
    return offers;
  }
  function forgeUpgradeCard(m,advanced=false){
    const up={...m};
    const nextLevel=(m._upgradeLevel||0)+1;
    up._upgraded=true;
    up._upgradeLevel=advanced?nextLevel:1;
    const shivEff=shivUpgradeEffect(m.effect);
    if(shivEff){
      const before=SHIV_EFFECTS[m.effect]?.n||Number((m.desc||'').match(/Aggiungi (\d+) Shiv/i)?.[1]||0);
      const after=SHIV_EFFECTS[shivEff].n;
      up.effect=shivEff;
      up.desc=replaceShivText(m.desc,after);
      up._upgradeDesc=`Coltelli da lancio generati: ${before} → ${after}`;
    } else if(m.hits&&m.hits>0){
      up.hits=m.hits+1;
      up.desc=(m.desc||'').replace(new RegExp(`${m.hits} colpi`,'i'),`${up.hits} colpi`).replace(new RegExp(`×${m.hits}`,'i'),`×${up.hits}`);
      up._upgradeDesc=`Colpi: ${m.hits} → ${up.hits}`;
    } else if(m.power&&m.power>0){
      up.power=Math.round((m.power+0.2)*10)/10;
      up.desc=replaceFirstPercent(m.desc,up.power);
      up._upgradeDesc=`Danno/potenza: ${pct(m.power)} → ${pct(up.power)}`;
    } else if((m.cost||1)>1){
      up.cost=Math.max(1,(m.cost||1)-1);
      up.desc=`${m.desc||''} Costo ridotto: ${m.cost||1} → ${up.cost}.`;
      up._upgradeDesc=`Costo: ${m.cost||1} → ${up.cost}`;

    } else {
      up.cost=0;
      up.desc=`${m.desc||''} Potenziata: costo 0.`;
      up._upgradeDesc=`Costo: ${m.cost||1} → 0`;
    }
    up._lastUpgradeDesc=up._upgradeDesc;
    return up;
  }
  function forgeUpgradeCost(m,advanced=false){
    const base=routeShopPrice(FORGE_COST[m.rarity||1]||55);
    return advanced?Math.round(base*1.75):base;
  }
  function ensureForgeOffers(){
    if(!G._forgeEquipOffers||G._forgeZone!==G.zone||G._forgeRouteKills!==npcKillCount()){G._forgeZone=G.zone;G._forgeRouteKills=npcKillCount();G._forgeEquipOffers=forgeRollEquipOffers();}
  }
  function bonusStr(obj){return Object.entries(obj||{}).map(([k,v])=>`${v>0?'+':''}${v} ${k.toUpperCase()}`).join(', ')||'—';}
  function moveMiniHTML(m,title='Mossa attuale'){
    const r=RARITY_DATA[m.rarity||1];
    return `<div style="background:#12121e;border:2px solid ${r.color};border-radius:8px;padding:10px;box-shadow:0 0 8px ${r.glow}">
      <div style="font-size:9px;color:#888;margin-bottom:5px;text-transform:uppercase">${title}</div>
      <div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:5px"><b style="font-size:11px;color:#e0e0e0">${m.name}${m._upgraded?' ★':''}</b><span class="mtype type-${m.type}">${m.type.toUpperCase()}</span></div>
      <div style="display:flex;gap:6px;align-items:center;margin-bottom:5px">${rarityBadge(m)}<span style="font-size:9px;color:#60d060">${m._isShiv?'Gratis':costPips(m.cost||1)} ${m.cost||0}</span></div>
      <div style="font-size:10px;color:#aaa;line-height:1.45">${m.desc||''}</div>
    </div>`;
  }
  function renderForgeHub(message=''){
    ensureForgeOffers();
    const screen=document.getElementById('screen-forge');if(!screen)return;
    screen.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><h2 style="margin:0;color:#ff8040">🔨 Forgia di Andre</h2><div style="display:flex;gap:8px;align-items:center"><span style="font-size:13px;color:#c0a0ff;font-weight:bold">💀 <span id="forge-coins">${G.coins||0}</span></span><button class="btn" onclick="andreForgeFarewell()" style="font-size:11px;padding:5px 12px;border-color:#ff8040;color:#ff8040">Esci</button></div></div>
      ${npcKillCount()>5?npcShopFearText('andre'):''}
      ${message?`<div style="text-align:center;color:#40d040;font-size:11px;margin-bottom:10px">${message}</div>`:''}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px"><button class="btn gold" onclick="forgeShowUpgrade(false)" style="padding:12px">Potenzia una mossa</button><button class="btn" onclick="forgeShowUpgrade(true)" style="padding:12px;border-color:#c060ff;color:#c060ff">Potenzia una mossa potenziata</button></div>
      <div style="font-size:11px;color:#f0c040;letter-spacing:1px;margin-bottom:8px;border-bottom:1px solid #2a2010;padding-bottom:4px">EQUIPAGGIAMENTO IN VENDITA</div><div id="forge-equip-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">${forgeEquipGridHTML()}</div>`;
  }
  function forgeEquipGridHTML(){
    ensureForgeOffers();
    return (G._forgeEquipOffers||[]).map((piece,i)=>{
      if(piece._sold)return `<div style="background:#0d0d1a;border:1px solid #222;border-radius:8px;padding:10px;opacity:.45;text-align:center;color:#555;font-size:11px">Venduto</div>`;
      const r=RARITY_DATA[piece.rarity||1],can=(G.coins||0)>=(piece._forgePrice||0);
      return `<div style="background:#12121e;border:2px solid ${r.color};border-radius:8px;padding:10px;box-shadow:0 0 8px ${r.glow}"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><span style="font-size:20px">${piece.icon||'⚔'}</span><span style="font-size:9px;color:#888;text-transform:uppercase">${piece.slot}</span></div><div style="font-size:11px;color:#e0e0e0;font-weight:bold;margin-bottom:3px">${piece.name}</div><div style="margin-bottom:4px">${rarityBadge(piece)}</div><div style="font-size:9px;color:#80d080">${piece.def>0?'DEF +'+piece.def:'Nessuna DEF'}</div><div style="font-size:9px;color:#c0a0ff;margin-bottom:7px">${bonusStr(piece.bonus)}</div><button onclick="forgeBuyEquip(${i})" ${can?'':'disabled'} style="width:100%;padding:5px;border-radius:4px;border:1px solid ${can?'#f0c040':'#3a3000'};background:transparent;color:${can?'#f0c040':'#555'};cursor:${can?'pointer':'not-allowed'};font-family:'Courier New',monospace;font-size:10px">💀 ${piece._forgePrice}</button></div>`;
    }).join('')||'<div style="grid-column:1/-1;color:#555;text-align:center;font-size:11px;padding:18px">Nessun equipaggiamento disponibile</div>';
  }
  window.forgeBuyEquip=function(i){const piece=G._forgeEquipOffers?.[i];if(!piece||piece._sold||(G.coins||0)<piece._forgePrice)return;G.coins-=piece._forgePrice;applyEquipPiece(G.player,piece);piece._sold=true;renderForgeHub(`${piece.name} equipaggiato.`);};
  window.forgeShowUpgrade=function(advanced){G._forgeUpgradeAdvanced=advanced;G._forgeShowPreviewUpgraded=!!G._forgeShowPreviewUpgraded;renderForgeUpgradeList();};
  window.forgeTogglePreview=function(){G._forgeShowPreviewUpgraded=!G._forgeShowPreviewUpgraded;renderForgeUpgradeList();};
  function renderForgeUpgradeList(){
    const advanced=!!G._forgeUpgradeAdvanced;
    const pool=(G.player.deck||[]).filter(m=>advanced?m._upgraded:!m._upgraded);
    const screen=document.getElementById('screen-forge');
    screen.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><h2 style="margin:0;color:${advanced?'#c060ff':'#ff8040'}">${advanced?'Potenzia una mossa potenziata':'Potenzia una mossa'}</h2><div style="display:flex;gap:8px;align-items:center"><span style="font-size:13px;color:#c0a0ff;font-weight:bold">💀 ${G.coins||0}</span><button class="btn" onclick="openForgeInner()" style="font-size:11px;padding:5px 12px">Indietro</button></div></div><div style="display:flex;justify-content:flex-end;margin-bottom:8px"><button class="btn" onclick="forgeTogglePreview()" style="font-size:10px;padding:5px 10px;border-color:${G._forgeShowPreviewUpgraded?'#40d040':'#555'};color:${G._forgeShowPreviewUpgraded?'#40d040':'#888'}">${G._forgeShowPreviewUpgraded?'✓ ':''}Mostra versione potenziata</button></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${pool.length?pool.map(m=>forgeMoveCardHTML(m,advanced)).join(''):`<div style="grid-column:1/-1;color:#555;text-align:center;font-size:11px;padding:26px">Nessuna mossa disponibile.</div>`}</div>`;
  }
  function forgeMoveCardHTML(m,advanced){
    const deckIdx=G.player.deck.indexOf(m),up=forgeUpgradeCard(m,advanced),shown=G._forgeShowPreviewUpgraded?up:m,cost=forgeUpgradeCost(m,advanced),can=(G.coins||0)>=cost;
    return `<div onclick="forgePreviewUpgrade(${deckIdx},${advanced})" style="cursor:pointer">${moveMiniHTML(shown,G._forgeShowPreviewUpgraded?'Versione potenziata':'Versione attuale')}<div style="font-size:10px;color:#ff8040;margin:6px 0 7px;text-align:center">${describeUpgrade(up)}</div><button onclick="event.stopPropagation();forgePreviewUpgrade(${deckIdx},${advanced})" ${can?'':'disabled'} style="width:100%;padding:6px;border-radius:5px;border:1px solid ${can?'#f0c040':'#3a3000'};background:transparent;color:${can?'#f0c040':'#555'};cursor:${can?'pointer':'not-allowed'};font-family:'Courier New',monospace;font-size:10px">Apri anteprima · 💀 ${cost}</button></div>`;
  }
  window.forgePreviewUpgrade=function(deckIdx,advanced){
    const m=G.player.deck?.[deckIdx];if(!m)return;
    const up=forgeUpgradeCard(m,advanced),cost=forgeUpgradeCost(m,advanced),can=(G.coins||0)>=cost;
    const screen=document.getElementById('screen-forge');
    screen.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><h2 style="margin:0;color:#ff8040">Anteprima potenziamento</h2><button class="btn" onclick="forgeShowUpgrade(${advanced})" style="font-size:11px;padding:5px 12px">Indietro</button></div><div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:stretch;margin-bottom:12px">${moveMiniHTML(m,'Adesso')}<div style="display:flex;align-items:center;justify-content:center;color:#ff8040;font-size:24px">→</div>${moveMiniHTML(up,'Dopo')}</div><div style="text-align:center;color:#ff8040;font-size:12px;margin-bottom:10px">${describeUpgrade(up)}</div><div style="text-align:center"><button class="btn gold" onclick="forgeApplyUpgrade(${deckIdx},${advanced})" ${can?'':'disabled'}>${can?`Conferma · 💀 ${cost}`:`Anime insufficienti · 💀 ${cost}`}</button></div>`;
  };
  window.forgeApplyUpgrade=function(deckIdx,advanced){
    const m=G.player.deck?.[deckIdx];if(!m)return;if(advanced&&!m._upgraded)return;if(!advanced&&m._upgraded)return;
    const cost=forgeUpgradeCost(m,advanced);if((G.coins||0)<cost)return;
    const up=forgeUpgradeCard(m,advanced);G.coins-=cost;Object.assign(G.player.deck[deckIdx],up);G.player.moves.forEach((mv,j)=>{if(mv.id===m.id)Object.assign(G.player.moves[j],up);});renderForgeHub(`${up.name} potenziata: ${describeUpgrade(up)}`);
  };
  openForgeInner=function(){if(npcShopBlocked('andre','images/forgia.png'))return;showScreen('forge');renderForgeHub();};
})();

