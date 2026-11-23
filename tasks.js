const taskLabels={"flowers": "Flower Arrangement", "tofu": "Tofu Collection", "board": "Blackboard Cleaning", "plug": "Plug Insertion", "earphones": "Earphone Insertion", "peg": "Peg in Hole"};
const taskGroups=[{"id": "01_real_world", "clips": [{"id": "flowers", "title": "ALOHA \u00b7 Flower Arrangement"}, {"id": "tofu", "title": "ALOHA \u00b7 Tofu Collection"}, {"id": "board", "title": "ALOHA \u00b7 Blackboard Cleaning"}, {"id": "plug", "title": "Flexiv \u00b7 Plug Insertion"}, {"id": "earphones", "title": "Flexiv \u00b7 Earphone Insertion"}, {"id": "peg", "title": "Flexiv \u00b7 Peg in Hole"}]}, {"id": "environment", "clips": [{"id": "light-aloha", "title": "Lighting \u00b7 Tofu and flowers"}, {"id": "light-flexiv", "title": "Lighting \u00b7 Plug and peg"}, {"id": "colors", "title": "Appearance \u00b7 Blackboard cleaning"}]}, {"id": "positions", "clips": [{"id": "pos-tofu", "title": "Tofu collection"}, {"id": "pos-plug", "title": "Plug insertion"}, {"id": "pos-earphones", "title": "Earphone insertion"}, {"id": "pos-peg", "title": "Peg insertion"}]}, {"id": "recovery", "clips": [{"id": "recover-peg", "title": "Peg insertion"}, {"id": "recover-plug", "title": "Plug insertion"}]}];
document.querySelectorAll('[data-task-group]').forEach(root=>{
 const group=taskGroups.find(g=>g.id===root.dataset.taskGroup);
 if(!group)return;
 const video=root.querySelector('video'), title=root.querySelector('.task-title'), count=root.querySelector('.task-count'), dots=root.querySelector('.task-dots');
 let index=0, visible=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;
 function syncPlayback(){
  const play=visible&&!document.hidden&&!reduced.matches;
  video.autoplay=play;
  if(play)video.play().catch(()=>{});else video.pause();
 }
 const buttons=group.clips.map((clip,i)=>{
  const b=document.createElement('button');b.type='button';b.textContent=taskLabels[clip.id]||clip.title;b.title=clip.title;b.setAttribute('aria-label','Show '+clip.title);
  b.addEventListener('click',()=>select(i));dots.append(b);return b;
 });
 function select(i){
  video.pause();index=(i+group.clips.length)%group.clips.length;
  const clip=group.clips[index],base='assets/qualitative/'+clip.id;
  video.poster=base+'.jpg';video.src=base+'.mp4';video.load();
  video.setAttribute('aria-label',clip.title);title.textContent=clip.title;count.textContent=(index+1)+' / '+group.clips.length;
  buttons.forEach((b,k)=>{if(k===index)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});
  syncPlayback();
 }
 root.querySelector('[data-prev]').addEventListener('click',()=>select(index-1));
 root.querySelector('[data-next]').addEventListener('click',()=>select(index+1));
 root.addEventListener('keydown',e=>{
  if(e.target===video)return;
  if(e.key==='ArrowLeft'){e.preventDefault();select(index-1);}
  if(e.key==='ArrowRight'){e.preventDefault();select(index+1);}
 });
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncPlayback();},{threshold:.15}).observe(video);
 document.addEventListener('visibilitychange',syncPlayback);
 reduced.addEventListener('change',syncPlayback);
 select(0);
});
