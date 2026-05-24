---
date: May 24, 2026
course: "[[KAS 1]]"
domain:
---

#publish 

# Mga Pangulo ng Ikatlong Republika

```dataviewjs
const pages = dv.pages('"public-notes/content/notes"')
  .where(p => p.domain && p.domain.path.includes("Pagsasarili at Pambansang Pagpapasya"))
  .sort(p => p.file.name)

let html = `<div class="president-grid">`

for (const p of pages) {

  // prevent duplicate image rendering
  let cover = p.cover ?? ""

  // remove ![[ ]]
  cover = cover.replace(/!\[\[(.*?)\]\]/, "$1")

  html += `
    <div class="president-card">
      <a href="${p.file.path}" class="internal-link">
        <img src="${cover}">
        
        <div class="president-info">
          <h3>${p.file.name}</h3>
          <p>${p.term ?? ""}</p>
        </div>
      </a>
    </div>
  `
}

html += `</div>`

dv.paragraph(html)
```

# Kontekstong Pang-Rehiyon
- Cold War ^[Geopolotical and ideological rivalry] sa pagitang ng Estados Unidos at USSR (Union of Soviet Socialist Republics) o Soviet Union
- Proxy War; Paghahati ng Korea into North and South
- Pagkapanalo ng Komunismo sa Tsina (Mao Zedong and Chiang Kaishek)
- Neutralidad ng Timog-Silangang Asya (Malayo na mmula sa koonya; Dutch, French, British)
- Pagpapalawak ng nasyonalismo sa komunismong rebolusyon sa Indochina
- Paglaganap ng demokrasyang estilong Amerikano (na makikita sa Pilipinas)

# Pagtatapos ng Partyless Democracy
- **Nagkaron ng Poliical Parties na hindi lang kontrolado ng isang tao**
- Mga bagong "strongmen"
- Halimbawa
	- [[Ferdinand E. Marcos]] ng Ilocos Norte
	- Salipada Pendatun ng Cotobato
	- [[Ramon Magsaysay]] ng Zambales

# Mga isyu pagkatapos ng digmaan
- **Second Most Destructed City ang Manila**
- Isyu sa pakikipagkolarobasyon sa mga Hapones
- "Back pay" sa mga empleyado ng gobyerno; **Compensations sa mga empleyado na apektado ng  digmaan**
- **Issues on agrarian reform**; kilusan ng mga pesante bilang tugon sa mga bayolenteng pag-atake ng mga Philippine Consabulary at pribadong hukbo ng mga may-ari ng lupain

## Laurel at Osemeña
- Mga hindi nanalo sa eleksyon
1. Jose P. Laurel
	-  Hindi pagsuporta kay Laurel at kanyang kaalyado dahil sa puppet government
	- Nasyonalismong anti-kolonyalismo
	- Nilitis bilang mga nakipag kolaorasyon sa mga Haponas
2. Sergio Osemeña Sr.
	- Hindi sinuportahan ni MacArthur
	- Nakipag-alyansasaDemocratic Alliance ^[Isang koalisyon ng mga radikal na Nacionalista at Partido Komunista ng Pilipinas (PKP)]
	- Hindi sinuportahan ng mga elite na may lupain

# [[Manuel Roxas]]
- Agaisnt Osemeña
- Liberal Party
- Rehabilistasyon at Reporma after WWII
- Pondo para sa rehabilitasyon ay napunta sa mga mayamang Pilipinong may pamumuhunan sa lupa at kalakalan
- Malaking demand sa import
- Korapsyon, laganap na pagtaas ng presyo, inflation, kawalan ng trabaho

# [[Elpidio Quirino]]
- Pumalit kay [[Manuel Roxas|Roxas]] nung siya ay namatay
- Nagsimula ang [[Elpidio Quirino#Rebelyon ng mga Huk|rebelyon]] ng mga Huk
- Haka-haka noong 1950s na makukuha na ng Huks ang Malacañang, which is hindi nagkatotoo
- Kalaunan ay sumuko rin ang mga Huks dahil nahuli ang mga Lider
- Hindi nabigyang-pansin ang pagtatangkang isaayos ang ekonomiya
- Naging lamat ang usapin sa korapsyon

# [[Ramon Magsaysay]]
- Pauso siya ng first ever political jingle na [Mambo Magsaysay](https://youtu.be/bFBRgGCw06E?si=eLVxHPbPipOubzCZ)
- Kauna-unahang nahalalna galing as probinsyal na lebel
- Galing sa lower-class na pamilya
- Unang pangulo na hindi abugado
- Pumalit sakanya si [[Carlos Garcia|Garcia]] sa pagka Pangulo nung siya ay namatay

# [[Carlos Garcia]]
- Kinuha bilang oportunidad ang pagkontrol ng imports upang igiit ang katayuan ng mga FIlipino sa ekonomiya
- May nagplanong magpatalsik sakanya mula sa mga opisyales sa AFP na hindi niya binigyan ng pwesto sa executive agency
- May nais maghain ng impeachment
- Tumakbo muli para sa halalan noong 1961, pero natalo ng kandidato mula sa Liberal Party

# [[Diosdado Macapagal]]
- "Poor boy from Lubao"
- Nasa oposisyon
- Noong Mayo 12, 1962, binalik ang Araw ng Kalayaan from Hulyo 4 (American Independence) to Hunyo 12 (pagdeklara ni Aguinaldo sa Kawit)

# Tatlong Nangingibabaw na tema
1. Pagkatapos ng Digmaan
2. Neokolonyalismo at Cold War
3. Nasyonalismo at Pagbubuo ng isang Nasyon