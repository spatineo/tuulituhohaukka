# Tuulituhohaukka

## Aineistokatalogi
Tällä hetkellä sovelluksessa on käytössä seuraavia aineistoja:
- Tuulituhoriski (2.11.2020 - )
- MML 2m Maastomalli (2020)
- Landsat vuosittaiset indeksit (1984-2011)
- Landsat pintaheijastus vuosikuvat (1985, 1990 ja 1995)
- SMK Latvuskorkeusmalli
- Monilähdeinventoinnin Metsävarateema (2005-2019)
- Myrskytuhoriskikartta
- Sentinel-1 päivittäiset mosaiikit (3.1.2017 - )
- Sentinel-1 dekadi mosaiikit (1.10.2014 - )
- Sentinel-1 osakuvat (4.10.2014 - )
- Sentinel-2 Global mosaic (dekadi) (1.2.2017 - )
- Sentinel-2 Global mosaic (vuosi) (2018 - )
- Sentinel-2 indeksimosaiikit (1.4.2016 - )

## Karttasovellus
### Yleistä

### Sovelluksen käyttö ###

Sovelluksen käyttö alkaa kalenterinäkymästä:
1. Valitaan kuukausi vuosinäkymästä
-> Kalenterinäkymä päivittyy
2. Valitaan päivä kuukausinäkymästä
-> Tuholista päivittyy
-> Karttojen aineistot päivittyvät 
3. Valitaan tuhoalue tuholistasta
-> Kartat kohdentuvat alueeseen
-> Indeksikartta näyttää alueen sijainnin

(Vertailuaikaa ei ole pakko valita tässä vaiheessa, tuho-alueita voi jo nyt tutkia eri kartta-aineistoilla)


### Kalenterinäkymä

Sivupaneelin kalenterinäkymä sisältää aikavalitsimen, tuholistan ja indeksikartan. Kalenterinäkymästä voi tarkastella tuulituhoja kolmella eri tarkkuustasolla:
- kuukausittain
- päivittäin
- tuhoalueittain

- Vuosinäkymästä voi tarkastella, minä kuukausina on arvion mukaan tapahtunut merkittävimpiä tuulituhoja: tolpan korkeus kuvaa tuulituhojen arvioitua laajuutta
- Kuukausinäkymässä korostetaan eri värillä ne päivät, joina analyysin mukaan on merkittäviä tuhoja. Valittuaan tarkasteluajan, tuulituhoja voi etsiä ja selata karttanäkymien avulla, mutta myös maakuntakohtaisesta
- tuholistasta, johon on nostettu merkittävimmät tuhot. Tästä valikosta käyttäjä voi valita kiinnostavan tuulituhoalueen näytettäväksi kartalla 

Valinnan tehtyään kaikki karttanäkymät tarkentavat automaattisesti esittämään kyseisen alueen tietoja. Aineistojen päivämäärät esitetään karttanäkymien alalaidassa

### Karttanäkymät

Karttakanvaasi sisältää käyttäjän lisäämät ja visualisoimat karttanäkymät eri aineistoilla.

Käyttäjä voi valita näkyviin eri aineistoja tarpeensa mukaan 
- Karttanäkymiä lisätään lisäysnapista ja valitsemalla haluttu aineisto aineistovalikosta
- Karttanäkymiä voi vähentää poistettavan karttanäkymän poistonapista
- Kussakin karttanäkymässä näytetään yhtä aineistoa kerrallaan selkeyden vuoksi
- Poikkeuksena tuulituhoarviot (vektori) esitetään kaikissa karttanäkymissä

Karttanäkymiä voi lisätä kanvaasille niin monta kuin haluaa, jolloin saman aineiston tarkastelu eri visualisointivalinnoilla on mahdollista!

### Visualisointi

Karttaikkunoihin, joissa tarkastellaan Sentinel-1 ja -2 aineistoja, on käytössä kanavavalitsin-työkalu, jolla on mahdollista valita eri kanavien väriyhdistelmiä.
- Käyttäjä voi määrittää eri kanavien väriyhdistelmiä asettamalla punaiselle, vihreälle ja siniselle eri kanavat 
- Valinta tapahtuu raahaamalla haluttu kanava punaisen, vihreän tai sinisen värin kohdalle
- Värien voimakkuutta voi säätää liukukytkimellä 
- Kanavavalitsin on aineisto- ja karttanäkymäkohtainen

Kanavavalitsin avautuu Visualisointi -pudotusvalikosta.

### Aikasarja

Aikasarja-työkalulla käyttäjä voi tarkastella karttanäkymässä kunkin tuotteen pikselin/alueen arvojen aikasarjaa 
- Aikasarja-ikkuna avautuu isommaksi ja esittää tähtäimen osoittaman pikselin/alueen mitatut arvot siten että x-akselilla on aika ja y-akselilla esitetään pikselin arvo
- Käyttäjä voi tarkastella tuotteen yksittäisen tai useamman kanavan arvoa
- Huomatessaan käyristä jonkin mielenkiintoisen piirteen, käyttäjä voi hiiren painauksella valita kyseisen ajankohdan vertailuajankohdaksi. Tämän jälkeen linssityökalu näyttää tämän vertailuajankohdan mukaista aineistoa

### Aikaerottelu

Sovelluksessa on valittuna erikseen tarkasteluaika ja vertailuaika: 
1. Tarkasteluaika valitaan ensisijaisesti kalenterista:
- Vertailuaika voidaan valita automaattisesti tarkasteluaikaa edeltäväksi kuva-aineistoksi, kun päivämäärä on valittu kalenterinäkymästä
- Kalenterinäkymästä erottaa helposti ne päivät, jolloin tuulituhon riski on suuri
- Käyttäjän valitessa tarkasteluaika kalenterinäkymästä, kaikki karttanäkymät päivittyvät esittämään kyseisen päivän, tai tarkasteluaikaa seuraavan ajankohdan, dataa
- Valittu ajanhetki tulee näkyviin myös aikajanalle
2. Toinen tapa valita aineistojen tarkasteluaika on aikasarjanäkymän kautta:
- Käyttäjä voi huomata mielenkiintoisen ajanhetken
- Käyttäjä voi klikata aikasarjalta ja valita siten uusi vertailuaika. Tämä päivittää karttanäkymät esittämään vertailuajankohdan tai sitä lähinnä seuraavan ajankohdan dataa

Linssi-työkalun avulla käyttäjä voi tarkastella kiinnostavasta kohteesta kahta eri kuvaa eri ajankohdilta
- Linssi kulkee käyttäjän hiiren mukana tai vaihtoehtoisesti karttanäkymän keskipisteessä
- Linssi “paljastaa” alta vertailuajankohdan aineiston
- Linssin avulla käyttäjä voi helposti vertailla esim. kahden peräkkäisen kuvausajankohdan Sentinel-2 kuvia nähdäkseen, onko merkittävää muutosta tapahtunut kuvien välillä (esim. myrskytuhoja)
- Linssin näyttämän aineiston vertailuajankohta on oletuksena valittua tuulituhohetkeä edeltävä ajankohta, mutta ajankohtaa voi myös muuttaa aikajanan avulla


