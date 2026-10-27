# Hammadde: Oyun Tasarım Belgesi

Oct 24, 2026 · @Boğaç

## Özet

Hammadde, tek bir insanın çıplak elle taş toplamaktan başlayıp gezegenler ve galaksiler kurmaya kadar ilerlediği, tarifleri oyuncunun kendisinin keşfettiği bir üretim ve idle oyunudur. Oyuncu ham maddeleri toplar, birleştirerek yeni malzemeler ve objeler bulur, bulduklarını otomatikleştirir ve oyun kapalıyken de büyümeye devam eder.

| Karar | Seçim |
| --- | --- |
| Tür | Idle / üretim zinciri / keşif |
| Oyuncu | Tek bir kişi |
| Tarifler | Oyuncu deneyerek kendisi bulur |
| Yanlış deneme | Malzeme yok olmaz |
| Ölçek | Sınırsız: taştan galaksiye |
| Görsel tarz | Piksel art |
| Çevrimdışı üretim | Var, otomatik yapılar için |
| Platformlar | Steam, PlayStation Store, Android, Apple App Store |

"Hammadde" çalışma adıdır; nihai isim sonra seçilecek.

## Temel oyun döngüsü

Oyunun kalbi dört adımlık bir döngüdür ve her tur oyuncuyu bir öncekinden daha büyük bir şeye götürür.

1. **Topla:** Oyuncu ham maddeye dokunarak elle toplar (taş, odun, su, kum).
2. **Birleştir:** İki veya daha fazla malzemeyi birleştirme alanına koyup dener.
3. **Keşfet:** Doğru birleşim yeni bir malzeme veya obje açar; bu tarif kalıcı olarak kitaba yazılır.
4. **Otomatikleştir:** Bazı keşifler bir yapı açar (ocak, maden, testere). Yapılar o malzemeyi kendi kendine üretir ve oyuncunun eli yeni denemelere serbest kalır.

Oyuncu her döngüde iki şey hisseder: merak ("bunu neyle birleştirsem?") ve büyüme ("artık bunu ben yapmıyorum, fabrikam yapıyor").

## Hikâye ve yolculuk

Kahramanın başından adaya düşmeden önce bir şeyler geçmiştir; oyun onu çıplak elle taş toplayan bir kazazededen uzaya çıkan birine taşıyan uzun bir yol haritasıdır. Hikâye henüz yazılmadı; şu an kesin olanlar:

- **Başlangıç:** Fırtına onu bilinmeyen bir kıyıya atar (yeni oyunun kararan ekranı bunu söyler). Neden denizde olduğu, nereden geldiği sonra açılacak bir sır.
- **Yol:** Ada → yeni biyomlar ve adalar → çağlar → uzay. Her biyom ve ada yeni ham maddelerle zenginleşir; adının hakkını veren şey, ham madde çeşitliliğinin hiç bitmemesidir.
- **Taşıyıcılar:** Ekin (adanın geçmişi), Meltem (bilgi ve kazan), Hasan (tarım), Nazlı (pazar), Dursun (demirci, aletler), Yıldızsız Gezgin (otomasyon ve başka dünyalar), Nuri (dış dünya ve ticaret).
- **Sınır yok:** Malzeme ve tarif sayısına üst sınır konmaz; her güncelleme yenilerini ekler.

## Kazan ve çok bileşenli tarifler (yeni sistem)

Eski ikili sistem kalktı; artık her tarif 4–15 bileşenden oluşur ve Cadı Meltem'in kazanında, tarif seçilerek yapılır. Normal modda tarifler malzemeleri buldukça kendiliğinden açılır; Zor modda kazanda deneyerek bulunur (aşağıdaki "Keşif sistemi" bölümü).

- **Bileşen sayısı:** Eşyanın değeri arttıkça bileşen sayısı artar (en ucuzlar 4, en pahalılar 13–15; tek istisna eğitimde kaynatılan keskin taş: 2 taş). Ana malzemeler azdır; geri kalanı tarifin türüne uygun ucuz dolgu malzemeleridir (aletlerde ip, dal, taş; yiyeceklerde su, yaprak gibi).
- **Otomatik fiyat:** Temel fiyat = kullanılan malzemelerin toplam değeri × zincir çarpanı (+ gerekli aletin değerinin %10'u), yukarı yuvarlanır. Zincir çarpanı, eşyanın ham maddeden kaç birleştirme uzakta olduğuna göre artar: 1 adım ×1,20, 2 adım ×1,25, 3 adım ×1,30, 4 adım ×1,35, 5 adım ×1,40, 6 ve üstü ×1,45. Uzun zincirler daha kârlıdır ama tek adımlık eşyalar şişmez. Örnek: keskin taş = 2 taş → 3 sikke; taş balta (3 adım) → 71 sikke (eskiden 68). Oyundaki satış fiyatı bu temel fiyatın üstüne yetenek ve seviye bonuslarıyla artar.
- **Tarif açılması:** Bir tarif, içindeki her malzeme (ve alet) bir kez elde edilince tarif kitabında açılır. Kapalı tarifler 50 sikkeye, tüccardan 25 sikkeye ya da İpucu ustası yeteneğiyle açılabilir.
- **Kazan:** Tarif seçilir, malzemeler kazana sürüklenir ya da dokunularak atılır ("Hepsini koy" ile tek seferde). Tarif tamamlanınca Kaynat. Yarıda başka tarife geçilirse kazandakiler envantere geri döner; Boşalt da aynısını yapar. Aletler kazana atılmaz, envanterde olmaları yeter.
- **Tarif kitabı:** Bütün açık tarifler bileşenleriyle listelenir; yanındaki + o tarifi kazanda seçer.
- **Cadı Meltem:** Başlangıç kampının yanında, kaynayan yeşil kazanının başında durur. Kazan ancak yanındayken kullanılır (B düğmesi uzaktaysa kazanı okla gösterir).
- **Veritabanı:** Taş Çağı'nın 569 ikili tarifi aynı malzeme mantığı korunarak 584 çok bileşenli tarife dönüştürüldü (15'i yeni tarım tarifi); son görev için Yelkenli sal eklendi, toplam 585. Her tarifin malzeme türü kümesi benzersizdir: aynı malzeme türleriyle iki farklı tarif yapılamaz (deneyerek keşif buna dayanır). "Taş Çağı tarifleri" sekmesindeki ikili tablolar eski sürümü gösterir; güncel liste Hammadde_tarifler.md dosyasındadır.

**Zorluk modları** (Yeni oyun'dan sonra seçilir):

| Mod | Tarifler nasıl açılır | Kitapta kapalı tarifler | Kime |
| --- | --- | --- | --- |
| Normal | Bütün malzemeleri bir kez elde edilince kendiliğinden; tarif satın alınmaz (zaten hepsi bu yolla açılır), ipucu var | Bilinen malzemeler ikonuyla, bilinmeyenler "?" olarak; ad, bilinen malzeme oranında açılır; bilinmeyen harfler bozuk sinyal gibi titreyen kutucuklardır (ara sıra yanlış ya da doğru bir harf belirir, uzunluk tahmin edilebilir); bilinmeyen malzemeler kırmızı ? ile gösterilir | Rahat oynamak isteyenler (önerilen) |
| Zor | Kazanda deneyerek keşif; takılınca satın alma (kitap 50, tüccar 25 sikke) ve ipucu. Keskin taş eğitim için açık başlar | Ad ve malzemeler tamamen "?" | Keşif merakını isteyenler |
| İmkânsız (planlandı, oyunda yok) | Yalnızca deneyerek keşif; hiçbir tarif satın alınamaz | Ad ve malzemeler tamamen "?" | Aşırı rekabetçi oyuncular |

Zor mod seçilince kırmızı, sarsılan bir uyarı ekranı çıkar ve onay ister; oyunda sikke sayacının yanında kırmızı ZOR etiketi, kayıt yuvalarında "ZOR" yazar.

## Keşif sistemi

Zor modda tarifleri oyuncu kazanda deneyerek bulur; yanlış deneme hiçbir şeyi yok etmez ve kazan her denemeyi oyuncu yerine hatırlar. Normal modda tarifler malzemeler buldukça kendiliğinden açıldığı için deneme kipi görünmez.

- **Deneyerek bul kipi:** Kazanın üstünde "Tarifle kaynat" ve "Deneyerek bul" sekmeleri var. Oyuncu en fazla 6 farklı malzemeyi kazana atar ve Dene'ye basar. Adetler önemli değil; yalnızca hangi malzeme türlerinin bir arada olduğu önemli. Aletler kazana atılmaz.
- **Yok etmeyen deneme:** Denemek hiçbir malzemeyi harcamaz; tek bedeli zaman (her deneme 1,2 saniyelik bir kaynama).
- **Kazanın cevabı (sıcak-soğuk):** Türler bir tarifle tam eşleşirse tarif açılır (+5 XP, keşif ekranı). Bir tarifin parçasıysa "Kazan fokurdadı, en yakın tarife N malzeme daha lazım" der. Tarif tutuyor ama alet eksikse hangi aletin gerektiğini söyler. Hiçbir tarifte birlikte değilse "Hiçbir şey olmadı" der.
- **Deneme günlüğü:** Her karışım ve sonucu solda listelenir; aynı karışım tekrar denenirse "Bunu zaten denemiştin" der. Günlükteki bir satıra dokunmak o karışımı kazana geri koyar.
- **Yetenek bağı:** Sezgi, Zor modda bir malzemenin kaç kapalı tarifte kullanıldığını gösterir. Akıl yürütme, kazandakilerle hiçbir tarifte birleşemeyecek malzemeleri soluk gösterir.
- **Takılan oyuncu için:** Yalnızca Zor modda tarif kitabından (50 sikke) ve tüccardan (25 sikke) tarif satın alma; her modda İpucu ustası yeteneği. Normal modda tarif satışı yok, çünkü tarifler malzemeler elde edilince kendiliğinden açılır; İmkânsız modda da olmayacak.
- **Mantıklı tarifler:** Birleşimler gerçek dünyaya dayanır (kum + ateş = cam). Oyuncu tahmin ederek ilerleyebilmeli, rastgele deneme zorunda kalmamalı.
- **Tarif kitabı:** Deneyerek bulunan tarifler kitapta "deneyerek bulundu" etiketiyle görünür. Koleksiyonu tamamlamak başlı başına bir hedef olur.

**Değişmez iki kural** (her çağ eklenirken yeniden kontrol edilir):

1. **Doğaya dayanma:** Her malzeme ya doğada bulunur ya da doğada bulunan malzemelerin birleşimiyle yapılır. Geriye doğru izlenen her zincir ham maddelerde biter.
2. **Tek sonuç:** Aynı malzeme türleri her zaman aynı sonucu verir; sıra, adet ve alet bir tarifi diğerinden ayırmaya yetmez. Her tarifin malzeme türü kümesi benzersiz olmalı (örnek: kalas = odun + dal + lif, kabuk = odun + yaprak + su). "Herhangi" kabul eden genel tarifler, belirli bir türü isteyen tariflerle çakışamaz.

## Otomasyon ve çevrimdışı üretim

Otomatik yapılar oyun kapalıyken de üretir; oyuncu geri döndüğünde birikenleri bir özet ekranında toplar.

- **Toplayıcılar:** Ham madde üretir (taş ocağı, oduncu kulübesi, kuyu).
- **İşleyiciler:** Bir malzemeyi diğerine çevirir (ocak: kum → cam). Girdisi yoksa durur; bu da oyuncuya zincirin neresinin tıkandığını gösterir.
- **Yükseltmeler:** Her yapının hızı ve kapasitesi artırılabilir.
- **Çevrimdışı özet:** "Sen yokken 5.000 taş ve 320 cam üretildi" gibi bir karşılama ekranı.
- **Depo sınırı:** Biriken miktarın bir tavanı olur; oyuncu depoyu büyüterek daha uzun süre uzak kalabilir. Bu, geri dönme isteği yaratır ama oyuncuyu cezalandırmaz.
- **Elle yapılan iş:** Keşif her zaman oyuncunun elinde kalır. Otomasyon sadece bilineni üretir, yeniyi bulamaz.

**Otomasyon sırası:** robot köpekler (ilk otomatik toplama, oyunda var) → toplayıcı ve işleyici yapılar → fabrikalar → uzaya kadar giden tesisler. Çevrimdışı üretim yapılarla birlikte gelir.

## Ekonomi

Toplanan her şey satılabilir ve kazanılan para aletleri yükseltmeye ve yapı almaya gider; böylece her malzemenin bir değeri olur.

- **Para:** Tek bir para birimi (çalışma adı: sikke).
- **Satış fiyatı:** İşlenmiş malzeme, içindeki malzemelerin toplamının zincir çarpanı katına satılır (×1,20'den ×1,45'e; ayrıntısı "Kazan ve çok bileşenli tarifler" bölümünde). Örnek: taş 1 sikke, keskin taş (2 taş) 3 sikke. Bu belgedeki bütün fiyatlar temel fiyattır; oyunda Pazarlıkçı, Değerli işçilik, Toptancı ve seviye bonusları satış fiyatını yükseltir. Birleştirmek hem keşif hem kazanç demektir.
- **Sabit fiyatlar:** Bir malzemeyi çok satmak fiyatını düşürmez.
- **Alet gerektiren malzemeler:** Bazı ham maddeler alet olmadan hiç toplanamaz: odun için balta, kil için kürek, balık için ağ, cevher için kazma. Taş, dal, lif, su ve çakmaktaşı elle toplanır.
- **Alet yükseltme:** Alet önce tarifle keşfedilir, sonra parayla seviye atlatılır (Taş balta Sv.1 → Sv.10). Her seviye toplama hızını artırır. Yeni çağ yeni bir kademe açar: taş balta → bronz balta → demir balta.
- **Aletler harcanmaz:** Bir tarifte alet kullanılıyorsa (odun + taş balta = kalas) alet yerinde kalır.
- **Yapılar:** Keşifle açılır, parayla satın alınır, birden fazla alınabilir. Her yeni adet öncekinden biraz pahalıdır.
- **Otomatik satış, oyuncunun seçimi:** Her yapıda bir "otomatik sat" anahtarı olur. Kapalıysa üretim depoda birikir; oyuncu geri geldiğinde ister elle satar, ister o malzemeleri tariflerde ve hedeflerinde kullanır.

## Yetenek ağacı

Sikke harcanarak açılan beş dallı bir yetenek ağacı oyuncuyu topla-birleştir-sat döngüsünün her adımında güçlendirir; her dalda fiyatlar 100'den 2.500 sikkeye çıkar.

- **Yapı:** Ortadaki başlangıçtan beş dal açılır. Bir düğümü almak için önkoşulunu almış olmak gerekir. Fiyatlar 100 → 250 → 500 → 1.000 → 2.500 sikke merdiveniyle artar.
- **Etkiler toplanır:** Pazarlıkçı I ve II birlikte satışları %20 artırır (II, I'in üstüne eklenmez; toplam değeri verir).

| Dal | Yetenek | Etki | Fiyat (sikke) | Önkoşul |
| --- | --- | --- | --- | --- |
| Ticaret | Pazarlıkçı I | Satış fiyatları +%10 | 100 |  |
| Ticaret | Şanslı müşteri | Her satışta %5 ihtimalle çift ödeme | 250 | Pazarlıkçı I |
| Ticaret | Toptancı | "Hepsini sat" ile satışlarda ek +%5 | 250 | Pazarlıkçı I |
| Ticaret | Pazarlıkçı II | Satış fiyatları toplam +%20 | 500 | Pazarlıkçı I |
| Ticaret | İlk keşif ödülü | Yeni bir malzeme ilk bulunduğunda fiyatının 5 katı sikke | 1.000 | Şanslı müşteri |
| Ticaret | Pazarlıkçı III | Satış fiyatları toplam +%35 | 2.500 | Pazarlıkçı II |
| Toplayıcılık | Çevik eller I | Toplama süresi −%15 | 100 |  |
| Toplayıcılık | Bereket | %10 ihtimalle bir yerine iki malzeme | 250 | Çevik eller I |
| Toplayıcılık | Oduncu | Odun %50 daha hızlı toplanır | 250 | Çevik eller I |
| Toplayıcılık | Taşçı | Taş, çakmaktaşı, çakıl, kum ve kil %50 daha hızlı | 250 | Çevik eller I |
| Toplayıcılık | Su taşıyıcı | Su %50 daha hızlı toplanır | 250 | Çevik eller I |
| Toplayıcılık | Çevik eller II | Toplama süresi toplam −%30 | 500 | Çevik eller I |
| Toplayıcılık | Verimli toprak | Malzemeler haritada %40 daha çabuk yeniden çıkar | 1.000 | Bereket |
| Toplayıcılık | Çevik eller III | Toplama süresi toplam −%45 | 2.500 | Çevik eller II |
| Zanaat | Tutumlu usta I | Birleştirmede %10 ihtimalle bir malzeme elde kalır | 100 |  |
| Zanaat | Tutumlu usta II | Bu ihtimal toplam %20 | 500 | Tutumlu usta I |
| Zanaat | Değerli işçilik | Birleştirilerek yapılan eşyalar +%15 değerli satılır | 500 | Tutumlu usta I |
| Zanaat | Usta işi | %5 ihtimalle iki ürün çıkar | 1.000 | Tutumlu usta I |
| Gezgin | Hızlı adımlar I | Hareket hızı +%10 | 100 |  |
| Gezgin | Uzun kol | E ile %50 daha uzaktan toplama | 250 | Hızlı adımlar I |
| Gezgin | Hızlı adımlar II | Hareket hızı toplam +%20 | 500 | Hızlı adımlar I |
| Gezgin | Keskin göz | Nadir malzemeler (çakmaktaşı, böğürtlen) haritada parlar | 500 | Uzun kol |
| Gezgin | Kâşif gözü | Haritada açılan alan neredeyse iki kat genişler (küçük harita artık herkeste var) | 1.000 | Hızlı adımlar I |
| Gezgin | Hızlı adımlar III | Hareket hızı toplam +%30 | 2.500 | Hızlı adımlar II |
| Bilgelik | Sezgi | Her malzemenin kutusunda henüz bulunmamış kaç tarifte kullanıldığı görünür | 100 |  |
| Bilgelik | Akıl yürütme | Birleştirmede, seçilen malzemeyle hiçbir tarifi olmayan malzemeler soluk görünür | 500 | Sezgi |
| Bilgelik | İpucu ustası | Tarif kitabında 2 dakikada bir, elindeki malzemelerle yapılabilecek bulunmamış bir tarif için ipucu | 1.000 | Sezgi |

Yapılar eklendiğinde altıncı dal olarak **Otomasyon** gelir: yapıların üretim hızı ve çevrimdışı üretim süresi.

Eğitim akışı ve görevler artık Yaşlı Ekin üzerinden yürür; ayrıntısı aşağıdaki "Yaşlı Ekin ve görevler" bölümünde.

## Aletler ve Demirci Dursun

Aletler kazanda kaynatılmaz, **Demirci Dursun'un örsünde dövülür**. Toplama aletleri bir kez dövülerek keşfedilir; sonrası yine Dursun'dan satın alınır, kullandıkça körelir ve onda bilenir. (Eski "Malzemeci" menüsü Dursun'un "Al ve bile" sekmesi oldu.)

- **Kazan mı, örs mü:** Oyundaki 49 alet (balta, kazma, bıçak, mızrak, kazıyıcı, tırmık, sulama kabı, tırpan, kürek, olta, ağ, tuzak, sepet, meşale…) yalnızca örste yapılır; kazanın tarif listesinde görünmezler. Parçaları (sopa, ip, bağlı uç, keskin taş…) Meltem'in kazanında yapılır, alet Dursun'da birleştirilir. Zor modda yanlış yerde doğru karışımı denersen "bu örste şekillenir, Dursun'a götür" ya da "bu kazanda denenir" uyarısı çıkar; tarif açılmaz.
- **Demirci menüsü (Tab):** İki sekme: **Alet dök** (kazanla aynı arayüz, düğme "Döv", ateş renkli örs) ve **Al ve bile** (keşfedilmiş toplama aletini satın al, körelmişi bile).
- **Tek keşif:** Bir toplama aleti bir kez dövüldü mü, tekrar dövmek yerine "Al ve bile" sekmesine yönlendirir.
- **Demirci Dursun:** şişman, deri önlüklü, kel ve kara sakallı; yanında taş bir ocak ve örs var, örsteki kılıcı durmadan döver (kıvılcımlar, yakındaysan çınlama sesi). Kılıç dövmeye bayılır ama adada savaşacak kimse olmadığı için balta, kazma döver.
- **Dayanıklılık ve bileme:** Her aletin hızı ve kullanım sayısı vardır; körelince o işi yapmaz, bileme fiyatı aletin fiyatının onda biridir.

| Alet | Fiyat (sikke) | Süre | Dayanıklılık | Bileme |
| --- | --- | --- | --- | --- |
| Taş balta | 100 | 3 sn | 25 kesim | 10 |
| Çakmaktaşı balta | 250 | 2,5 sn | 35 | 25 |
| Kuvars balta | 500 | 2 sn | 50 | 50 |
| Bazalt balta | 1.000 | 1,6 sn | 70 | 100 |
| Obsidyen balta | 2.500 | 1,2 sn | 100 | 250 |
| Kürek | 100 | 3 sn | 25 | 10 |
| Boynuz kazma | 250 | 2 sn | 40 | 25 |

Kazma, mızrak, ağ, olta ve tuzak aynı merdiveni izler; av, balıkçılık ve kayalık biyomu oyuna girdikçe işlev kazanır.

## Seviye ve karakter

Oyuncu XP toplayarak seviye atlar; her seviye temel özellikleri biraz artırır ve bazı yetenekler seviye ister.

- **XP kaynakları:** toplama +1, birleştirme +2 (adet başına), yeni tarif +12, tüccar siparişi +15, görev ödülleri.
- **Seviye eğrisi:** ilk seviye 20 XP, her seviye öncekinden %35 fazla (20, 27, 36, 49, 66…).
- **Özellikler (seviye başına):** toplama hızı +0,03, hareket hızı +0,02, satış değeri +0,01, şans +%0,5 (bütün ihtimal yeteneklerine eklenir).
- **Seviye isteyen yetenekler:** 250 sikkelikler seviye 2, 500'lükler 3, 1.000'likler 5, 2.500'lükler 8.
- **Arayüz:** alt kenarda büyük seviye rozeti ve XP çubuğu; sikke sayacı vurgulu çerçeveyle, büyük yazıyla hemen bunun üstünde durur (oyunun amacı para kazanmak, oyuncunun gözüne bu vurmalı). Sikke kazanılan her yerde (satış, sipariş, hile tuşu) sayaçtan altınlar saçılır, sayaç zıplar ve altın sesi çalar. Eğitim ve görev kartı sağ üstte, ayarlar ve karakter düğmelerinin hemen solunda bir kart olarak durur; haritanın ortasını kapatmaz. Bir eğitim adımı tamamlanınca açık kalan menü (pazar, kazan) kendiliğinden kapanır; kazanılan XP karakterin üstünde uçan yazıyla görünür; seviye atlayınca ekranın ortasında renkli "Seviye atladın!" yazısı ve konfeti.

## Yaşlı Ekin ve görevler

Oyun sessiz bir kıyıda başlar; ilk eğitim adımları kimse olmadan, yalnızca ekrandaki kartla yapılır. Eğitim bitince kamp ateşinin başında Yaşlı Ekin belirir; görevleri o verir ve ödülleri o öder.

- **Hikâye:** Oyuncuyu fırtına kıyıya atmıştır; Ekin kırk yıl önce batan bir tüccar gemisinin aşçısıdır ve adanın sırlarını anlatır (pınar, obsidyen, tüccarlar, ormandaki ışıklar).
- **Görev akışı:** Başında ! olan Ekin'le konuşup görevi kabul et → görevi yap → başında ? olan Ekin'e dönüp ödülü al. Daha önce seçilmiş konuşma seçenekleri soluk görünür.
- **Eğitim (NPC'siz, 5 adım + Cadının dersi):** önce WASD / ok tuşlarıyla (telefonda yön tuşlarıyla) biraz yürü → M ile (telefonda küçük haritaya dokunarak) haritayı aç ve kapat → işaretli dalın yanında E ile topla (yeşil çubuk dolana kadar bekle) → pusula okunu izleyip Pazarcı Nazlı'ya yürü ve dalı sat → sikke sayacı (kart aşağıdaki büyük sayacı gösterir) ve yetenek ağacı → Cadı Meltem belirir: 2 taş topla, kazanda keskin taş kaynat ve Nazlı'da sat (Cadının dersi, 3 adım; Meltem batıdaki ormanın kıyısında belirir, ok ona götürür) → kart "Biri seni çağırıyor" der ve Ekin ortaya çıkar. Yürüme adımında oyuncunun altında yeşil bir halka yanıp söner ve kartta bir ilerleme çubuğu dolar. Birleştirme dersi açılış eğitiminin içinde; Ekin ilk görevini oyuncu birleştirmeyi öğrendikten sonra verir.

| # | Görev | Ödül |
| --- | --- | --- |
| 1 | 100 sikke biriktir ve ilk yeteneğini al | 30 sikke |
| 2 | Seviye 3'e ulaş | 50 sikke |
| 3 | Taş balta yap | 40 sikke, 20 XP |
| 4 | 5 odun kes | 40 sikke |
| 5 | 10 farklı tarif bul | 60 sikke, 30 XP |
| 6 | Seviye 5'e ulaş ve 250 sikkelik bir yetenek al | 100 sikke |
| 7 | 25 farklı tarif bul | 150 sikke, 50 XP |
| 8 | Yelkenli sal yap (tarif görev alınınca kitaba yazılır) | 200 sikke, 80 XP |
| 9 | Salı iskeleden denize indir (8 teslim edilince kendiliğinden başlar) | Oyunun sonu: kazanma ekranı |

**Prototipin sonu: adadan ayrılmak.** Ekin, kırk yıl önce batan geminin doğuya gittiğini ve sisin ardında başka bir kara olduğunu anlatır. **Yelkenli sal** = 1 sal, 3 hasır, 2 halat, 2 uzun sopa, 1 kürek, 1 hasat sepeti (alet: taş balta); balta, odun ve tarım zincirinin hepsini ister. Tüccarın yanaştığı kumsalda artık bir iskele var; sal yapılınca iskelenin yanında bağlı durur ve mavi bir ok yolu gösterir.

E'ye basınca oyuncu sala biner ve açılır, ekran kararır ("Yelken rüzgârla doldu… Ufukta yeni bir kara belirdi") ve kazanma ekranı gelir: süre, seviye, kaynatılan tarif, sikke, mod. Oyuncu adaya dönüp oynamaya devam edebilir. İleride bu an ikinci biyoma geçiş olacak; biyomlar arasında gidip gelinecek, bütün tarifler buldurulacak ve çağ atlanacak.

### NPC'lerin ortaya çıkış sırası

Ada kalabalık başlamaz; karakterler oyuncu ilerledikçe birer birer, kısa bir ışık ve ses efektiyle belirir.

1. **Eğitim:** yalnızca oyuncu ve Çiftçi Hasan'ın tarlası vardır. Oyuncunun dikkati eğitim kartında kalsın diye Hasan'ın başındaki "!" eğitim ve Cadının dersi bitene, Ekin'le tanışılana kadar görünmez.
2. **Yaşlı Ekin:** Cadının dersi bitince kamp ateşinin başında belirir ve ilk görevi verir.
3. **Cadı Meltem ve kazanı:** temel eğitim (yürü, harita, topla, sat, yetenek ağacı) bitince, Ekin'den önce "yeşil bir duman yükselir", Meltem kazanıyla gelir ve birleştirmeyi öğretir. Kazan ondan önce kullanılamaz.
4. **Yıldızsız Gezgin:** oyuncu ilk kez tam 500 sikkeye ulaşınca belirir, robot köpeği satar ve ilk köpek işe başlayınca toz bulutu olup kaybolur.
5. **Tüccar Nuri:** zamanlayıcıyla gemiyle gelir (değişmedi).

**Pazarcı Nazlı** ve **Demirci Dursun** baştan beri adadadır.

### Adanın yerleşimi ve yol gösterme

NPC'ler birbirinden uzaktadır; birinden ötekine gitmek için en az bir ekran yürümek gerekir.

| Kim | Nerede |
| --- | --- |
| Yaşlı Ekin | Başlangıç noktasının yanında, kamp ateşi |
| Cadı Meltem ve kazanı | Batıdaki ormanın kıyısı |
| Çiftçi Hasan ve tarla | Doğudaki çayır, nehrin güneyi |
| Pazarcı Nazlı | Güneydoğu, kıyıya yakın tezgâh |
| Demirci Dursun | Güneybatı, ocak ve örs |
| İskele (tüccar) | Güney kumsalı |

- **Menüler yerinde açılır:** Kazan (B) yalnızca Meltem'in yanında, Pazar (P) yalnızca Nazlı'nın tezgâhında, Demirci (Tab) yalnızca Dursun'un yanında açılır. Uzaktayken sol üstteki bu düğmelerin köşesinde küçük bir konum iğnesi görünür ve ikon soluklaşır; basınca "oraya yürü" uyarısı çıkar ve ok o kişiyi gösterir. Meltem'le daha tanışılmadıysa kazan düğmesi bunu söyler.
- **Pusula oku:** Gidilmesi gereken yer varsa karakterin çevresinde sarı bir ok o yönü gösterir, altında kişinin adı ve kaç metre kaldığı yazar. Hedef ekrana girince üstünde zıplayan bir ok belirir. Küçük ve büyük haritada hedef, keşfedilmemiş olsa bile, yanıp sönen sarı bir halkayla işaretlenir (büyük haritada "Hedef: …").
- **Ok ne zaman çıkar:** eğitimde pazarda satış adımlarında (Nazlı), Cadının dersinde kazana gitme adımında (Meltem), Ekin konuşmak istediğinde ya da ödül beklerken (Ekin), taş balta görevinde parçalar hazır olunca (Dursun), balta körelince (Dursun), yelkenli sal malzemeleri hazır olunca (kazan), salı denize indirme görevinde (iskele), Hasan'ın istediği alet elindeyse (Hasan) ya da yapılabilir durumdaysa (Dursun). Kapalı bir menüye basınca da o kişiye 16 saniyelik bir ok çıkar.

### Pazarcı Nazlı

Mor başörtülü, yeşil elbiseli bir kadın; çizgili tenteli, meyve ve taş dolu bir tezgâhın yanında durur, ara sıra el sallar. Pazar menüsü iki sekmelidir:

- **Sat:** Eski pazar; fiyatlar sabit, "Aletler hariç hepsini sat" düğmesi.
- **Satın al:** Oyuncunun bildiği **toplanabilir** malzemeleri (dal, taş, lif, yaprak, böğürtlen, çakmaktaşı, nehir çakılı, kum, su, nehir kili, odunlar) Nazlı'ya sattığı fiyatın **3 katına** satar (yukarı yuvarlanır, en az 1 sikke). 1 ya da 10 adet alınır. Zaman kazandırır, para yakar.
- Eğitimdeyken ona dokunmak doğrudan pazarı açar; eğitimden sonra ilk konuşmada kendini tanıtır.

Çiftçi Hasan baştan beri adadadır, ama tarlası ancak oyuncu ona üç aleti sırayla getirince tamamen işler.

## Çiftçi Hasan ve tarım

Başlangıç kampının yakınında 4×3 karelik bir tarla ve hasır şapkalı Çiftçi Hasan vardır; oyuncuya tarla sürmeyi öğretir ve tohum satar.

- **Döngü:** Tırmıkla toprağı hazırla → tohum ek → sulama kabıyla sula → büyümesini bekle → tırpanla biç. Sulanmamış tohum büyümez (üstünde mavi damla yanıp söner). Hasattan sonra toprak yeniden tırmıklanır.
- **Alet zinciri:** Hasan'ın aletleri fırtınada denize gitmiştir. Her seferinde tek birini ister ve tarifini kitaba yazar; getirince ödülünü verip sıradakini ister (aşağıdaki tablo).
- **Aletler:** Tırmık (80 sikke, 30 kullanım), sulama kabı (100, 25), tırpan (120, 30). Çapa kaldırıldı. Demirci Dursun'un örsünde bir kez dövülür, sonrası Dursun'dan satın alınır ve yenilenir.
- **XP:** Her tarla işi +1, hasat +3 XP.

| Sıra | İstenen alet | Tarif (adanın malzemeleri) | Hasan'ın ödülü |
| --- | --- | --- | --- |
| 1 | Tırmık | 2× Sopa, 3× Keskin taş, 1× İp | 4 buğday tohumu, 15 sikke, 10 XP; tohum dükkânı açılır |
| 2 | Sulama kabı | 1× herhangi çömlek, 2× İp, 1× Sopa | 2 havuç tohumu, 20 sikke, 10 XP |
| 3 | Tırpan | 1× Uzun sopa, 2× Çakmaktaşı pulu, 2× İp, 1× Dal | 2 patates + 2 soğan tohumu, 40 sikke, 10 XP |

| Ürün | Tohum (Hasan'dan) | Büyüme | Hasat |
| --- | --- | --- | --- |
| Buğday | 6 sikke | 60 sn | 2–4 |
| Havuç | 8 | 80 sn | 2–4 |
| Soğan | 8 | 90 sn | 2–4 |
| Patates | 10 | 100 sn | 2–5 |
| Ayçiçeği | 12 | 120 sn | 2–3 |
| Kabak | 16 | 150 sn | 1–2 |

Her hasatta %45 ihtimalle bir tohum geri gelir. Ürünlerden 12 tarif yapılır: buğday unu, ekmek, havuç çorbası, patates püresi, közde patates, kabak çorbası, kavrulmuş kabak çekirdeği, ayçiçek yağı, çiftçi yahnisi, soğan halkası, korkuluk ve hasat sepeti.

## Yıldızsız Gezgin ve robot köpekler

Oyuncu ilk kez tam 500 sikkeye ulaştığında bu dünyadan olmayan bir sihirbaz karanlık bir aurayla yakınında belirir. Tarif vermez; başka bir gezegenden bir hediye getirdiğini söyler ve o hediyeyi, bir robot köpeği, 500 sikkeye satar.

- **Belirme:** Ekran kararır, mor bir enerji yayılır, "Onunla konuş" yazısı çıkar. Sihirbaz NPC'lerin, tarlanın ve iskelenin uzağında, oyuncunun yakınında belirir.
- **Konuşma:** "Selam, dünyalı… sana gezegenimden bir hediye getirdim." → "Ne hediyesi?" → robot köpek, "hediye dedim ama yolculuk pahalıydı, 500 sikke yeter". Ödeme yapılınca sikkeleri evirip çevirir: "Bu bir dünyalı sikkesi. Bununla benim gezegenimde hiçbir şey alınmaz. Neyse… zaten çok hırçın bir köpekti."
- **İlk köpek ve veda:** Köpek oyuncunun yanında canlanır, köpek menüsü açılır ve köpek ne toplayacağı seçilene kadar oyuncunun yanında bekler. Malzeme seçilince menü kapanır, köpek işe koyulur, sihirbaz bir toz bulutu içinde kaybolur ve karakterin üstünde "Ne garip bir adam…" konuşma balonu çıkar. Sihirbaz bir daha gelmez.
- **Fiyat:** İlk köpek 500 sikke; sonrakiler köpek menüsünden alınır ve her biri bir öncekinin 1,6 katıdır (500, 800, 1.280, 2.050…).
- **Görev seçimi:** Her köpeğe toplayacağı malzeme seçilir (dal, taş, lif, yaprak, kum, çakıl, çakmaktaşı, böğürtlen). Köpek en yakın kaynağa gider, toplar ve envantere ekler.
- **Sabit güç, yarım hız:** Köpekler oyuncunun ilk günkü (temel) değerlerinin %50'siyle çalışır: yarı hızda yürür, toplama iki kat sürer. Yeteneklerden ve seviyeden etkilenmez, XP vermez.
- **Çağırma ve sevme:** Köpek menüsünden "Yanıma çağır" denince köpek işini bırakıp koşarak gelir ve oyuncunun etrafında zıplayıp şebeklik yapar. Bu sırada yanındayken E'ye basmak ya da köpeğe dokunmak onu sever (kalpler çıkar, havlar). "İşine gönder" ile köpek seçili malzemeyi toplamaya döner.
- **Yönetim:** İlk köpekten sonra sol menüde Robot köpekler (R) düğmesi açılır; her köpeğin durumu, topladığı miktar ve çağır / işe gönder / sev düğmeleri görünür.

## Tüccar gemisi ve tarif satın alma

Belli aralıklarla adaya bir tüccar gemisi yanaşır; pazardan çok daha iyi ödeyen siparişler, Zor modda da ucuz tarifler getirir. Tarif satın alma (gemi ve kitap) yalnızca Zor moddadır.

- **Zamanlama:** İlk gemi oyunun 2,5. dakikasında, sonrakiler ayrıldıktan 6–9 dakika sonra gelir; geldiğinde korna sesi çalar ve gemi başlangıca en yakın kumsala yanaşır. Kıyıda 10 dakika kalır; kalan süre ekranda görünür.
- **Sipariş:** Tüccar Nuri, oyuncunun tanıdığı malzemelerden 2–3 tanesini rastgele miktarlarda ister. Hepsi teslim edilirse pazar değerinin 3 katı + 25 sikke ve 15 XP öder.
- **Ucuz tarif:** Gemide bulunmamış 3 tarif satılır; her biri 25 sikke, ilk malzemesi ipucu olarak görünür.
- **Tarif kitabından satın alma:** Her zaman 50 sikkeye rastgele, henüz bulunmamış bir tarif öğrenilebilir; öncelik oyuncunun tanıdığı malzemelerle yapılanlardadır.

## Birleştirme, kayıt ve ses

- **Birleştirme:** Malzemeler dokunarak ya da sürükleyerek yuvalara konur. Adet seçiciyle aynı tarif tek seferde birden çok kez yapılır ("Maks" elindekinin yettiği kadar). Birleştirmeden sonra yuvalar boşalır.
- **Giriş ekranı:** Yeni oyun, Devam et, Kayıttan yükle, Ayarlar. Yeni oyun seçilince ekran kararır, "Fırtına dindi. Dalgalar seni bilmediğin bir kıyıya bıraktı…" yazısı belirir ve ada yavaşça açılır (Zor modda altında kırmızı "Zor mod · Bol şans"). Kayıt yüklenince aynı kararma kısa ve yazısız olur. Oyunda Esc duraklatma menüsünü açar: devam, kaydet, yükle, ayarlar, ana menü.
- **Kayıt:** 3 elle kayıt yuvası ve dakikada bir otomatik kayıt; kayıtlar tarayıcıda tutulur.
- **Hile modu (yalnızca test için):** Ayarlar'da açılıp kapanır. Açıkken 5 tuşu +100 sikke, 6 tuşu +100 XP verir; dokunmatik ekranda aynı işi gören iki küçük düğme çıkar.
- **Harita ve keşif sisi:** Sağ alt köşede her zaman bir küçük harita var (LoL'deki gibi; yatay telefonda E düğmesinin üstünde). Biyomlar renkle, oyuncu yanıp sönen sarı kareyle, NPC'ler, iskele, tarla, tüccar ve robot köpekler noktalarla görünür. Oyuncunun etrafındaki 7 karelik çember açılır; gidilmemiş yerler dalgalanan gri bir dumanla kaplıdır, dumandan ara sıra siyah soru işaretleri belirip yumuşakça kaybolur (en fazla 5). M büyük haritayı açıp kapatır (telefonda küçük haritaya dokunulur). Keşif kayıtla saklanır.
- **Tuşlar:** WASD yürü · E topla/konuş · I envanter · B kazan · K tarif kitabı · P pazar · Y yetenekler · C karakter · G görevler · R robot köpekler · Tab Demirci · M harita · O ayarlar · Esc duraklat.
- **Dokunmatik ve fare kontrolleri:** Telefonda yön tuşları ve E düğmesi yok. Parmağı basılı tutup sürükleyince joystick belirir (ne kadar çekilirse o kadar hızlı). Bir yere dokununca karakter oraya yürür; malzemeye, ağaca, tarla karesine, karaktere, kazana, iskeleye ya da suya dokununca yanına yürüyüp kendiliğinden toplar, keser, konuşur ya da doldurur. Hedef sarı halkayla gösterilir; joystick'in kendisi ekranda çizilmez. Telefondaki eğitim önce kayan bir parmak iziyle sürükleyerek yürümeyi, sonra dokunarak yürümeyi, sonra dala dokunarak toplamayı gösterir (dal ekranda yoksa karakterin yanına getirilir). Bilgisayarda fareyle tıklamak da aynı işi yapar; WASD ve E çalışmaya devam eder.
- **Su:** Deniz, nehir ya da göl kenarına yaklaşınca en yakın su karesinin üstünde zıplayan mavi bir damla ve "Su al" yazısı belirir; damlaya dokunmak ya da tıklamak su doldurur.
- **Ses:** Kendi içinde üretilen sakin bir lo-fi döngüsü (76 BPM, elektrikli piyano, yumuşak bas ve davul), toplama, birleştirme, keşif, satış, seviye ve korna efektleri. Müzik ve efekt sesi ayarlardan ayrı ayrı ayarlanır; ayarlarda ses testi düğmesi vardır.

## Çağlar ve ilerleme

Ölçeğin sınırı yok, ama oyun çağlara bölünür: her çağ kendi içinde tamamlanabilir bir bölümdür ve bir sonrakinin kapısını açan bir "anahtar obje" ile biter.

| Çağ | Örnek ham maddeler | Örnek objeler | Çağı bitiren anahtar obje |
| --- | --- | --- | --- |
| 1. Taş | Taş, odun, kil, su, lif | Keskin taş, ip, ateş, mızrak | Çömlek fırını |
| 2. Maden | Bakır cevheri, kalay, kömür | Bronz, balta, çekiç, saban | Demir ocağı |
| 3. Tarım ve şehir | Buğday, yün, kireç | Ekmek, kumaş, tuğla, ev | Su değirmeni |
| 4. Sanayi | Demir, çelik, buhar | Dişli, ray, buhar makinesi | Fabrika |
| 5. Elektrik | Bakır tel, cam, kauçuk | Ampul, motor, telefon | Elektrik santrali |
| 6. Dijital | Silikon, plastik, nadir toprak | Çip, bilgisayar, robot | Yapay zekâ çekirdeği |
| 7. Uzay | Yakıt, titanyum, güneş paneli | Uydu, roket, uzay istasyonu | Ay üssü |
| 8. Gezegen | Asteroit madeni, gaz devi | Terraform makinesi, yörünge şehri | Dyson küresi |
| 9. Yıldız ve galaksi | Yıldız maddesi, karanlık madde | Yıldız, kara delik, galaksi | Açık uçlu |

**Örnek tarif zinciri (ampule giden yol):** kum + ateş = cam · bakır cevheri + ateş = bakır · bakır + çekiç = tel · tel + karbon = filament · cam + filament = ampul.

Yeni çağlar oyun yayınlandıktan sonra güncellemelerle eklenir; oyun hiç "bitmez".

## Biyomlar

Dünya biyomlara bölünür; her biyomun kendi ham maddeleri, ağaç türleri ve balıkları vardır ve yeni biyomlar genellikle bir ulaşım aracı keşfedilince açılır.

| Biyom | Çağ | Örnek kaynaklar | Nasıl açılır |
| --- | --- | --- | --- |
| Orman kenarı (başlangıç) | Taş | Meşe, çam, huş ve 8 ağaç daha; geyik, yaban domuzu; mantarlar, orman meyveleri | Oyun burada başlar |
| Nehir (başlangıç) | Taş | Çakmaktaşı, nehir kili, söğüt; sazan, alabalık, mersin balığı | Oyun burada başlar |
| Çayır | Taş | Yabani tahıllar, keten, kenevir, şifalı otlar; yaban öküzü, yaban atı; bal | Sepet |
| Kayalık | Taş | Granit, kuvars, bazalt, obsidyen, ardıç; dağ keçisi, muflon | Taş kazma |
| Göl | Taş | Kamış, nilüfer, kızılağaç; turna balığı, su kuşları, kunduz | Sal |
| Mağara | Taş | Okr boyaları, tuz, kristal, beyaz kil; mağara ayısı | Meşale |
| Sahil | Maden | Deniz kabuğu, tuz, yosun; levrek, yengeç | Kayık |
| Dağ | Maden | Bakır ve kalay cevheri, kar | Bronz kazma ve yol |
| Çöl | Tarım ve şehir | Kum, kaktüs, tuz gölü, kumtaşı | Kervan |
| Tropik orman | Sanayi | Maun, bambu, kauçuk ağacı, egzotik meyve | Gemi |
| Açık deniz | Sanayi | Ton, köpekbalığı, inci, petrol | Büyük gemi |
| Kutup | Elektrik | Buz, fok, nadir mineraller | Buzkıran |
| Uzay biyomları | Uzay ve sonrası | Ay tozu, Mars demiri, asteroit metalleri | Roket |

- **Türler ve kategoriler:** Meşe, çam, huş birer "odun"dur. Genel tarifler herhangi bir odunu kabul eder; özel tarifler belirli bir tür ister (çam reçinesi meşale yapar, meşe sağlam alet sapı olur).
- **Fiyat farkı:** Nadir türler daha pahalı satılır; uzak biyomlara gitmenin parasal bir karşılığı olur.
- **Biyoma özel yapılar:** Her biyomda kendi toplayıcıları kurulur (ormanda oduncu, gölde balıkçı iskelesi, çölde tuz havuzu).
- **Keşif bağı:** Sal, kayık, gemi gibi taşıtlar tarifle bulunur; bir taşıt keşfetmek dünyanın yeni bir köşesini açar.

## Görsel ve ses tarzı

Oyun piksel art ile çizilir; her malzemenin, her yapının ve her çağın kendine ait çizimi olur.

- **İkonlar:** Her malzeme için 32×32 piksel ikon. Tarif sayısı binlere çıkacağı için tutarlı bir palet ve çizim kuralı şart.
- **Yapılar:** Madenler, ocaklar ve fabrikalar çalışırken hareket eden küçük animasyonlar (dönen çark, tüten baca).
- **Dünya görünümü:** Oyuncunun kurduğu tesis, çağ ilerledikçe büyüyen ve değişen bir manzarada görünür: mağaradan köye, şehre, yörüngeye.
- **Keşif anı:** Yeni bir tarif bulunduğunda ışık patlaması, ses ve kitaba eklenme animasyonu. Oyunun en tatmin edici anı bu olmalı.
- **Ses:** Her çağa uygun sakin bir müzik; toplama, birleştirme ve keşif için ayrı ses efektleri.

**Prototipteki atmosfer (şu an oyunda):** daha doygun bir palet (parlak çimen, turkuaz sığ deniz, koyu mavi açık deniz), denizde yuvarlanan dalga sırtları ve pırıltılar, nehirde akıntı çizgileri, kıyıda nefes alır gibi gelip giden köpük. Rüzgâr yavaşça güçlenip zayıflar; ağaçların tepesi gövdesinden çok sallanır, çalılar, lif ve çimen tutamları rüzgârla dalgalanır. Kelebekler, rüzgârla sürüklenen yapraklar, süzülen bulut gölgeleri ve ekranın ortasında sıcak bir ışık, kenarlarda hafif bir karartma vardır.

## Teknik plan

Önerim: önce tarayıcıda hızlı bir prototip ile eğlenceyi test etmek, sonra asıl oyunu tüm platformlara çıkabilen bir oyun motorunda kurmak.

- **Prototip:** Basit görsellerle tarayıcıda oynanan bir sürüm. Amaç güzel görünmek değil, "birleştirip keşfetmek eğlenceli mi?" sorusunu birkaç günde cevaplamak.
- **Motor:** 2D piksel art için Godot veya Unity. İkisi de Steam, Android ve iOS'a çıkabilir. PlayStation için Sony'nin geliştirici programına kayıt gerekir; bu karar motor seçiminden önce netleşmeli.
- **Veri odaklı tarifler:** Tüm malzemeler ve tarifler koddan ayrı bir veri dosyasında tutulur. Yeni çağ eklemek kod yazmadan, sadece veri ve çizim eklemekle olur.
- **Kayıt ve çevrimdışı hesap:** Oyun son kapanış zamanını kaydeder, açılışta geçen süreye göre üretimi hesaplar. Telefonda saati ileri alarak hile yapılmasına karşı bir kontrol eklenir.
- **Bulut kaydı:** Oyuncu telefonda başlayıp bilgisayarda devam edebilsin diye hesap bazlı kayıt (ikinci aşamada).
- **Kim ne yapar:** Kodu, tarif veritabanını, oyun dengesini ve tasarımı birlikte yazabiliriz. Mağaza hesapları, ödemeler, imzalama ve yayınlama senin hesaplarınla yapılır; piksel art için bir sanatçıyla çalışmak kaliteyi çok artırır.

## Yol haritası

İşe küçük bir tarayıcı prototipiyle başlıyoruz; her aşama, bir öncekinin kapısından geçtiğinde başlar.

&#91;embedded content: yol haritası · 5 aşama, 4 kapı\]

İlk iş: Taş Çağı'nın 30–40 tarifini yazmak ve prototipi kurmak.

Taş Çağı'nın tarif listesi: Taş Çağı tarifleri

## Açık sorular

- [ ] Oyunun nihai adı ne olacak?
- [ ] Para kazanma modeli: tek seferlik satın alma mı, ücretsiz + reklam/uygulama içi satın alma mı?
- [x] Birleştirmede kaç malzeme olsun? Karar: 4–15 bileşen, 1–6 farklı malzeme türü, sınırsız büyüyebilir.
- [x] Oyunda bir hikâye olsun mu? Karar: evet, kazazedenin uzaya giden yolculuğu; geçmişi henüz yazılmadı.
- [ ] Motor: Godot mu, Unity mi?
- [ ] Ekip: piksel art ve müzik için kimlerle çalışılacak?
- [ ] İmkânsız mod: ipucu ustası yeteneği de kapansın mı, ödülü ne olsun?
- [ ] Kahramanın adaya düşmeden önceki hikâyesi ne?
- [ ] Bir sonraki biyom hangisi: çayır mı, kayalık mı?
