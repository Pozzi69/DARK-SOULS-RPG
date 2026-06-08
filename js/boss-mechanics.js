// Boss and zone extensions. Loaded after game.js so the core file can stay stable.
(function(){
  const SOUL_ITEMS=[
    {id:'soul_sif',name:'Anima di Sif',icon:'🐺',rarity:4,unique:true,desc:'Anima importante. Non ha effetto diretto, ma verrà usata per determinare i finali.',effect:'story_soul'},
    {id:'soul_four_kings',name:'Anima dei Quattro Re',icon:'👑',rarity:4,unique:true,desc:'Anima importante. Non ha effetto diretto, ma verrà usata per determinare i finali.',effect:'story_soul'},
    {id:'soul_seath',name:'Anima di Seath',icon:'💎',rarity:4,unique:true,desc:'Anima importante. Non ha effetto diretto, ma verrà usata per determinare i finali.',effect:'story_soul'},
    {id:'soul_nito',name:'Anima di Nito',icon:'☠️',rarity:4,unique:true,desc:'Anima importante. Non ha effetto diretto, ma verrà usata per determinare i finali.',effect:'story_soul'},
    {id:'soul_bed_chaos',name:'Anima della Culla del Caos',icon:'🔥',rarity:4,unique:true,desc:'Anima importante. Non ha effetto diretto, ma verrà usata per determinare i finali.',effect:'story_soul'}
  ];
  SOUL_ITEMS.forEach(item=>{if(!ITEMS.some(i=>i.id===item.id))ITEMS.push(item);});

  ZONE_NORMALS.new_londo=[
    enemyTpl('fantasma','Fantasma'),
    enemyTpl('banshee','Banshee'),
    enemyTpl('wisp','Wisp')
  ];
  ZONE_ELITES.new_londo=[
    enemyTpl('dark_wraith','Dark wraith',{isElite:true}),
    enemyTpl('massa_anime','Massa di anime',{isElite:true})
  ];
  ZONE_BOSSES.new_londo=[enemyTpl('four_kings','I 4 Re',{isBoss:true,_fourKings:true})];

  SPECIAL_ENEMIES.seath_crystal=enemyTpl('seath_crystal','Cristallo primordiale',{hp:10,_noAttack:true,_noScale:true});
  SPECIAL_ENEMIES.seath=enemyTpl('seath','Seath il senza scaglie',{isBoss:true});
  ZONE_BOSSES.dukes_archives=[enemyTpl('seath','Seath il senza scaglie',{isBoss:true,_group:['seath_crystal','seath']})];

  SPECIAL_ENEMIES.sigillo_sinistro.isBoss=false;
  SPECIAL_ENEMIES.sigillo_destro.isBoss=false;

  const nitoSummonMove={id:'nito_evoca_scheletri',name:'Rito tombale',type:'buff',cost:1,effect:'summon_skeletons',desc:'Evoca 2 scheletri casuali.'};
  ZONE_BOSSES.tomb_giants=[enemyTpl('nito','Nito il Re tombale',{isBoss:true,moves:[...PLACEHOLDER_MOVES,nitoSummonMove]})];

  const baseCanTargetEnemy=canTargetEnemy;
  canTargetEnemy=function(e){
    if(!baseCanTargetEnemy(e))return false;
    if(e.id==='seath'&&G.enemies?.some(x=>x.id==='seath_crystal'&&x.hp>0))return false;
    return true;
  };

  const baseEnemyAI=enemyAI;
  enemyAI=function(enemy){
    if(enemy?._noAttack)return null;
    return baseEnemyAI(enemy);
  };

  const baseBuildBadges=buildBadges;
  buildBadges=function(u){
    let b=baseBuildBadges(u);
    if(u?.statusEffects?.electric_aura)b+=`<span class="sbadge" style="background:#2a2600;color:#ffe27a">⚡ Gigante</span>`;
    if(u?.id==='seath'&&G.enemies?.some(x=>x.id==='seath_crystal'&&x.hp>0))b+=`<span class="sbadge" style="background:#1a2a3a;color:#80c0ff">Cristallo</span>`;
    return b;
  };

  const baseAllEnemiesDead=allEnemiesDead;
  allEnemiesDead=function(){
    if(G._fourKingsActive)return (G._fourKingsHp||0)<=0;
    return baseAllEnemiesDead();
  };

  function makeFourKing(){
    const idx=(G._fourKingsSpawned||0)+1;
    const king=scaleEnemy(enemyTpl(`four_king_${idx}`,`Re ${idx}`,{isBoss:true,_fourKing:true}),zoneTier());
    G._fourKingsSpawned=idx;
    return king;
  }
  function spawnFourKing(reason){
    if(!G._fourKingsActive)return;
    if(typeof cleanupDeadEnemies==='function')cleanupDeadEnemies();
    const alive=G.enemies.filter(e=>e._fourKing&&e.hp>0).length;
    if(alive>=3||G._fourKingsSpawned>=4)return;
    const king=makeFourKing();
    G.enemies.push(king);
    addLog(reason||`${king.name} emerge dall'Abisso!`,'system');
    renderBattle?.(false);
  }
  function renderFourKingsHud(){
    const hud=document.getElementById('four-kings-hud');
    if(hud)hud.remove();
  }

  const baseRenderBattle=renderBattle;
  renderBattle=function(skip){
    baseRenderBattle(skip);
    renderFourKingsHud();
    if(G.zone==='anor_londo'){
      (G.enemies||[]).forEach((e,i)=>{
        if(e.statusEffects?.electric_aura){
          const spr=document.getElementById(`spr-enemy-${i}`);
          if(spr)spr.style.filter='drop-shadow(0 0 22px #ffe27a) drop-shadow(0 4px 12px rgba(0,0,0,.8))';
        }
      });
    }
  };

  const baseStartBattle=startBattle;
  startBattle=function(isBoss){
    if(isBoss&&G.zone==='new_londo'){
      G._fourKingsActive=true;
      G._fourKingsMaxHp=40;
      G._fourKingsHp=40;
      G._fourKingsTurn=1;
      G._fourKingsSpawned=0;
      G.enemies=[makeFourKing()];
      G.enemy=G.enemies[0];
      G._defeatedEnemies=[];G._lastDefeatedEnemy=null;G._battleWon=false;
      G.log=[];_initCombat();G.busy=false;closeMenus();
      showScreen('battle');
      document.getElementById('battle-floor-label').textContent='⚠ BOSS — Petite Londo';
      addLog('Il primo Re emerge dall\'Abisso. La vita condivisa dei 4 Re è apparsa!','system');
      renderBattle();
      return;
    }
    G._fourKingsActive=false;
    baseStartBattle(isBoss);
  };

  const baseExecuteMove=executeMove;
  executeMove=function(att,move,def,ip){
    const hpBefore=def?.hp||0;
    baseExecuteMove(att,move,def,ip);
    if(ip&&def?._fourKing&&G._fourKingsActive){
      const dmg=Math.max(0,hpBefore-(def.hp||0));
      if(dmg>0){
        G._fourKingsHp=Math.max(0,(G._fourKingsHp||0)-dmg);
        addLog(`Vita condivisa dei 4 Re: -${dmg} (${G._fourKingsHp}/${G._fourKingsMaxHp})`,'system');
        if(G._fourKingsHp<=0){
          G.enemies.forEach(e=>{if(e._fourKing)e.hp=0;});
          addLog('La vita condivisa si spezza. I 4 Re cadono!','crit');
        } else if(!G.enemies.some(e=>e._fourKing&&e.hp>0)){
          spawnFourKing('Un nuovo Re emerge subito dall\'Abisso!');
        }
      }
    }
    if(ip&&G.zone==='anor_londo'&&!G._ornsteinSmoughPhase2){
      const duo=(G.enemies||[]).filter(e=>e.id==='ornstein'||e.id==='smough');
      const dead=duo.find(e=>e.hp<=0),alive=duo.find(e=>e.hp>0);
      if(dead&&alive){
        G._ornsteinSmoughPhase2=true;
        alive.name=`${alive.name} gigante`;
        alive._osPhase2Giant=true;
        dead._absorbedByPartner=true;
        alive.maxHp=Math.max(alive.maxHp*2,20);
        alive.hp=alive.maxHp;
        ['strength','vigor','intelligence','dexterity','faith','arcane','atk','def','mag'].forEach(k=>{alive[k]=Math.round((alive[k]||10)*1.6);});
        alive.statusEffects.electric_aura=1;
        G.enemy=alive;
        addLog(`${alive.name} assorbe il potere del compagno caduto! Vita piena, corpo gigantesco, aura elettrica!`,'crit');
        renderBattle();
      }
    }
  };

  const baseApplyEffect=applyEffect;
  applyEffect=function(eff,caster,target,ip){
    if(eff==='summon_skeletons'){
      const pool=['scheletro','scheletro_ruota','scheletro_gigante','scheletro_bestia'];
      let made=0;
      while(G.enemies.length<3&&made<2){
        const tpl=getEnemyTemplate(choice(pool));
        G.enemies.push(scaleEnemy(tpl,zoneTier()));
        made++;
      }
      addLog(made?`Nito evoca ${made} scheletri!`:'Non c’è spazio per altri scheletri.','system');
      return;
    }
    baseApplyEffect(eff,caster,target,ip);
  };

  const baseFinishTurn=finishTurn;
  finishTurn=function(){
    baseFinishTurn();
    if(G._fourKingsActive&&G.player?.hp>0&&(G._fourKingsHp||0)>0){
      G._fourKingsTurn=(G._fourKingsTurn||1)+1;
      if(G._fourKingsTurn>=3&&G._fourKingsTurn%2===1)spawnFourKing(`Turno ${G._fourKingsTurn}: un altro Re emerge dall'Abisso!`);
      renderFourKingsHud();
    }
  };

  function bossSoulForCurrentReward(){
    const id=G.enemy?.id;
    if(G.enemy?._fourKings||G.enemy?._fourKing||id==='four_kings'||id?.startsWith('four_king'))return SOUL_ITEMS.find(i=>i.id==='soul_four_kings');
    if(id==='sif')return SOUL_ITEMS.find(i=>i.id==='soul_sif');
    if(id==='seath')return SOUL_ITEMS.find(i=>i.id==='soul_seath');
    if(id==='nito')return SOUL_ITEMS.find(i=>i.id==='soul_nito');
    if(id==='culla_caos')return SOUL_ITEMS.find(i=>i.id==='soul_bed_chaos');
    return null;
  }
  const baseShowRewardScreen=showRewardScreen;
  showRewardScreen=function(){
    const soul=bossSoulForCurrentReward();
    if(soul&&G.enemy?.isBoss&&!hasItem(soul.id)){
      addPlayerItem(soul);
      G._lastBossSoulName=soul.name;
      addLog(`${soul.name} ottenuta!`,'system');
    }
    if(G.zone==='new_londo'&&G.enemy?.isBoss&&!G.npcProgress?.kaatheIntro){
      G._kaatheEncounterPending=true;
    }
    baseShowRewardScreen();
    if(G._lastBossSoulName){
      const rc=document.getElementById('reward-content');
      if(rc)rc.insertAdjacentHTML('afterbegin',`<div style="background:#160f22;border:1px solid #c0a0ff;border-radius:8px;padding:8px 10px;text-align:center;color:#c0a0ff;font-size:11px;margin-bottom:10px">✦ ${G._lastBossSoulName} ottenuta</div>`);
      G._lastBossSoulName=null;
    }
    if(G.zone==='new_londo')G._fourKingsActive=false;
  };
})();

