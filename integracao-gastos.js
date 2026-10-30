(function(){
  if(window.parent===window)return;
  function enviar(){
    if(typeof data==='undefined'||typeof fields==='undefined')return;
    const registros=[];
    Object.keys(data).forEach(i=>(data[i]||[]).forEach(r=>{
      if(r._id)registros.push({id:r._id,dia:r.dia,tipo:r.tipo,areaHa:Number(fields[i]?.[1]||0),areaNome:fields[i]?.[0]||'',produtos:r.produtos||[]});
    }));
    window.parent.postMessage({tipo:'PAINEIRA_MANEJO_V1',registros},'https://marcioespindolamge-star.github.io');
  }
  if(typeof carregarBanco==='function'){
    const original=carregarBanco;
    carregarBanco=async function(){const resultado=await original.apply(this,arguments);enviar();return resultado};
  }
  window.addEventListener('message',e=>{
    if(e.origin==='https://marcioespindolamge-star.github.io'&&e.data?.tipo==='PAINEIRA_SOLICITAR_MANEJOS_V1')enviar();
  });
  setTimeout(enviar,1500);
})();